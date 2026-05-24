import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PostType = "prayer" | "thanks";

export interface CommunityPost {
  id: string;
  user_id: string;
  post_type: PostType;
  content: string;
  is_answered: boolean;
  answered_at: string | null;
  reply_count: number;
  created_at: string;
  linked_prayer_id: string | null;
  linked_prayer_content?: string | null;
  linked_prayer_author?: string | null;
  author_name: string;
  author_avatar: string | null;
}

export interface CommunityReply {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author_name: string;
  author_avatar: string | null;
}

export interface ModerationNotice {
  id: string;
  reason: string;
  action: string;
  created_at: string;
  acknowledged: boolean;
}

export interface ActiveBan {
  banned_until: string;
  reason: string;
}

interface ProfileRow {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
}

async function attachAuthors<T extends { user_id: string }>(
  rows: T[]
): Promise<(T & { author_name: string; author_avatar: string | null })[]> {
  if (rows.length === 0) return [];
  const ids = Array.from(new Set(rows.map((r) => r.user_id)));
  const { data: profiles } = await supabase.rpc("get_community_profiles" as any, {
    p_user_ids: ids,
  });
  const map = new Map<string, ProfileRow>();
  ((profiles as any[]) || []).forEach((p) => map.set(p.user_id, p as ProfileRow));
  return rows.map((r) => {
    const p = map.get(r.user_id);
    return {
      ...r,
      author_name: p?.full_name || "Devocionalzeiro",
      author_avatar: p?.avatar_url ?? null,
    };
  });
}

async function attachLinkedPrayers(rows: CommunityPost[]): Promise<CommunityPost[]> {
  const ids = rows.map((r) => r.linked_prayer_id).filter(Boolean) as string[];
  if (ids.length === 0) return rows;
  const { data } = await supabase
    .from("community_posts" as any)
    .select("id, content, user_id")
    .in("id", ids);
  const list = (data || []) as any[];
  const withAuthors = await attachAuthors(list);
  const map = new Map<string, { content: string; author_name: string }>();
  withAuthors.forEach((p: any) => map.set(p.id, { content: p.content, author_name: p.author_name }));
  return rows.map((r) => {
    if (!r.linked_prayer_id) return r;
    const lp = map.get(r.linked_prayer_id);
    return {
      ...r,
      linked_prayer_content: lp?.content ?? null,
      linked_prayer_author: lp?.author_name ?? null,
    };
  });
}

export function useCommunityFeed(type: PostType) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("community_posts" as any)
      .select("*")
      .eq("post_type", type)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      console.error("Error fetching community posts:", error);
      setPosts([]);
      setLoading(false);
      return;
    }
    const enriched = await attachAuthors((data || []) as any);
    const withLinked = await attachLinkedPrayers(enriched as CommunityPost[]);
    setPosts(withLinked);
    setLoading(false);
  }, [type]);

  useEffect(() => {
    fetchPosts();
    const channel = supabase
      .channel(`community-feed-${type}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "community_posts", filter: `post_type=eq.${type}` },
        () => fetchPosts()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [type, fetchPosts]);

  return { posts, loading, refetch: fetchPosts };
}

export function useCommunityReplies(postId: string | null) {
  const [replies, setReplies] = useState<CommunityReply[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReplies = useCallback(async () => {
    if (!postId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("community_replies" as any)
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error fetching replies:", error);
      setReplies([]);
      setLoading(false);
      return;
    }
    const enriched = await attachAuthors((data || []) as any);
    setReplies(enriched as CommunityReply[]);
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    if (!postId) {
      setReplies([]);
      return;
    }
    fetchReplies();
    const channel = supabase
      .channel(`community-replies-${postId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "community_replies", filter: `post_id=eq.${postId}` },
        () => fetchReplies()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, fetchReplies]);

  return { replies, loading, refetch: fetchReplies };
}

function mapError(message: string | undefined): string {
  if (!message) return "Erro inesperado.";
  if (message.includes("Conteúdo bloqueado")) return "Conteúdo bloqueado pelas regras da comunidade (linguagem ofensiva ou inadequada).";
  if (message.includes("temporariamente impedido")) return "Você está temporariamente bloqueado de postar na comunidade.";
  if (message.includes("Daily limit")) return "Você atingiu o limite diário. Faça upgrade para postar à vontade.";
  if (message.includes("Feature blocked")) return "Recurso bloqueado para seu plano atual.";
  return message;
}

export interface CommunityActionResult {
  success: boolean;
  error?: string;
  limitReached?: boolean;
  blocked?: boolean;
}

function classify(message?: string): { limitReached?: boolean; blocked?: boolean } {
  if (!message) return {};
  if (message.includes("Daily limit")) return { limitReached: true };
  if (message.includes("Feature blocked")) return { blocked: true };
  return {};
}

export async function createCommunityPost(
  userId: string,
  type: PostType,
  content: string,
  linkedPrayerId?: string | null
): Promise<CommunityActionResult> {
  const trimmed = content.trim();
  if (!trimmed) return { success: false, error: "Mensagem vazia" };
  if (trimmed.length > 500) return { success: false, error: "Máximo 500 caracteres" };

  const featureKey = type === "prayer" ? "community_post_prayer" : "community_post_thanks";
  const { error: limitError } = await supabase.rpc("increment_daily_usage", { p_feature_key: featureKey });
  if (limitError) return { success: false, error: mapError(limitError.message), ...classify(limitError.message) };

  const payload: any = { user_id: userId, post_type: type, content: trimmed };
  if (linkedPrayerId) payload.linked_prayer_id = linkedPrayerId;

  const { error } = await supabase.from("community_posts" as any).insert(payload);
  if (error) return { success: false, error: mapError(error.message) };
  return { success: true };
}

export async function createCommunityReply(
  userId: string,
  postId: string,
  content: string
): Promise<CommunityActionResult> {
  const trimmed = content.trim();
  if (!trimmed) return { success: false, error: "Mensagem vazia" };
  if (trimmed.length > 500) return { success: false, error: "Máximo 500 caracteres" };

  const { error: limitError } = await supabase.rpc("increment_daily_usage", {
    p_feature_key: "community_reply",
  });
  if (limitError) return { success: false, error: mapError(limitError.message), ...classify(limitError.message) };

  const { error } = await supabase
    .from("community_replies" as any)
    .insert({ user_id: userId, post_id: postId, content: trimmed });

  if (error) return { success: false, error: mapError(error.message) };
  return { success: true };
}

export async function markPostAnswered(postId: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("community_posts" as any)
    .update({ is_answered: true, answered_at: new Date().toISOString() })
    .eq("id", postId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteCommunityPost(postId: string) {
  const { error } = await supabase.from("community_posts" as any).delete().eq("id", postId);
  return { success: !error, error: error?.message };
}

export async function updateCommunityPost(postId: string, content: string) {
  const trimmed = content.trim();
  if (!trimmed) return { success: false, error: "Mensagem vazia" };
  if (trimmed.length > 500) return { success: false, error: "Máximo 500 caracteres" };
  const { error } = await supabase
    .from("community_posts" as any)
    .update({ content: trimmed, updated_at: new Date().toISOString() })
    .eq("id", postId);
  if (error) return { success: false, error: mapError(error.message) };
  return { success: true };
}

export async function deleteCommunityReply(replyId: string) {
  const { error } = await supabase.from("community_replies" as any).delete().eq("id", replyId);
  return { success: !error, error: error?.message };
}

// Admin
export async function adminDeleteCommunityPost(postId: string, reason: string, banHours: number) {
  const { error } = await supabase.rpc("admin_delete_community_post" as any, {
    p_post_id: postId,
    p_reason: reason,
    p_ban_hours: banHours,
  });
  return { success: !error, error: error?.message };
}

export async function adminDeleteCommunityReply(replyId: string, reason: string, banHours: number) {
  const { error } = await supabase.rpc("admin_delete_community_reply" as any, {
    p_reply_id: replyId,
    p_reason: reason,
    p_ban_hours: banHours,
  });
  return { success: !error, error: error?.message };
}

// Bans + Notices for current user
export function useCommunityStatus(userId: string | undefined) {
  const [ban, setBan] = useState<ActiveBan | null>(null);
  const [notices, setNotices] = useState<ModerationNotice[]>([]);

  const fetchStatus = useCallback(async () => {
    if (!userId) return;
    const [banRes, noticeRes] = await Promise.all([
      supabase
        .from("community_bans" as any)
        .select("banned_until, reason")
        .eq("user_id", userId)
        .gt("banned_until", new Date().toISOString())
        .order("banned_until", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("community_moderation_notices" as any)
        .select("id, reason, action, created_at, acknowledged")
        .eq("user_id", userId)
        .eq("acknowledged", false)
        .order("created_at", { ascending: false }),
    ]);
    setBan((banRes.data as any) ?? null);
    setNotices(((noticeRes.data as any) || []) as ModerationNotice[]);
  }, [userId]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const ackNotice = async (id: string) => {
    await supabase
      .from("community_moderation_notices" as any)
      .update({ acknowledged: true })
      .eq("id", id);
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  return { ban, notices, ackNotice, refetch: fetchStatus };
}
