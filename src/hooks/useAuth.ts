import { useState, useEffect, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  reading_plan: "nt60" | "at90" | "90" | "184" | "365" | "custom" | null;
  preferred_reading_time: string | null;
  timezone: string;
  has_completed_onboarding: boolean;
  created_at: string;
  updated_at: string;
  community_rules_accepted_at?: string | null;
}

// Session cache to avoid redundant fetches across re-mounts
let cachedProfile: Profile | null = null;
let cachedUserId: string | null = null;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(cachedProfile);
  const [loading, setLoading] = useState(true);
  const fetchingRef = useRef(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use cache if same user
          if (cachedUserId === session.user.id && cachedProfile) {
            setProfile(cachedProfile);
            setLoading(false);
          } else {
            setTimeout(() => {
              fetchProfile(session.user.id);
            }, 0);
          }
        } else {
          cachedProfile = null;
          cachedUserId = null;
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        if (cachedUserId === session.user.id && cachedProfile) {
          setProfile(cachedProfile);
          setLoading(false);
        } else {
          fetchProfile(session.user.id);
        }
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id,user_id,full_name,avatar_url,reading_plan,preferred_reading_time,timezone,has_completed_onboarding,created_at,updated_at,community_rules_accepted_at")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      const p = data as Profile | null;
      cachedProfile = p;
      cachedUserId = userId;
      setProfile(p);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    // Always clear local state, regardless of API response
    // This handles cases where the session is already expired/invalid
    setUser(null);
    setSession(null);
    setProfile(null);
    
    // Clear any localStorage remnants
    localStorage.removeItem('supabase.auth.token');
    
    try {
      await supabase.auth.signOut();
    } catch (error) {
      // Ignore errors - session might already be invalid
      console.log('Sign out completed (session may have been already expired)');
    }
    
    return { error: null };
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/auth`;
    
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    
    return { data, error };
  };

  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile(data as Profile);
    }

    return { data, error };
  };

  return {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    refetchProfile: () => user && fetchProfile(user.id),
  };
};
