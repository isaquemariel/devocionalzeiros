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
  const { data: profiles } = await supabase
    .from("profiles")
    .select("user_id, full_name, avatar_url")
    .in("user_id", ids);
  const map = new Map<string, ProfileRow>();
  (profiles || []).forEach((p) => map.set(p.user_id, p as ProfileRow));
  return rows.map((r) => {
    const p = map.get(r.user_id);
    return {
      ...r,
      author_name: p?.full_name || "Devocionalzeiro",
      author_avatar: p?.avatar_url ?? null,
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
    setPosts(enriched as CommunityPost[]);
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

export async function createCommunityPost(
  userId: string,
  type: PostType,
  content: string
): Promise<{ success: boolean; error?: string }> {
  const trimmed = content.trim();
  if (!trimmed) return { success: false, error: "Mensagem vazia" };
  if (trimmed.length > 2000) return { success: false, error: "Máximo 2000 caracteres" };

  // Reserve daily slot (enforces limits per plan)
  const featureKey = type === "prayer" ? "community_post_prayer" : "community_post_thanks";
  const { error: limitError } = await supabase.rpc("increment_daily_usage", { p_feature_key: featureKey });
  if (limitError) {
    return { success: false, error: limitError.message };
  }

  const { error } = await supabase
    .from("community_posts" as any)
    .insert({ user_id: userId, post_type: type, content: trimmed });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function createCommunityReply(
  userId: string,
  postId: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  const trimmed = content.trim();
  if (!trimmed) return { success: false, error: "Mensagem vazia" };
  if (trimmed.length > 1000) return { success: false, error: "Máximo 1000 caracteres" };

  const { error: limitError } = await supabase.rpc("increment_daily_usage", {
    p_feature_key: "community_reply",
  });
  if (limitError) return { success: false, error: limitError.message };

  const { error } = await supabase
    .from("community_replies" as any)
    .insert({ user_id: userId, post_id: postId, content: trimmed });

  if (error) return { success: false, error: error.message };
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

export async function deleteCommunityReply(replyId: string) {
  const { error } = await supabase.from("community_replies" as any).delete().eq("id", replyId);
  return { success: !error, error: error?.message };
}
