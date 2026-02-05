export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievement_claims: {
        Row: {
          achievement_id: string
          claimed_at: string
          id: string
          points_awarded: number
          user_id: string
        }
        Insert: {
          achievement_id: string
          claimed_at?: string
          id?: string
          points_awarded?: number
          user_id: string
        }
        Update: {
          achievement_id?: string
          claimed_at?: string
          id?: string
          points_awarded?: number
          user_id?: string
        }
        Relationships: []
      }
      admin_metrics_backup: {
        Row: {
          active_users: number
          created_at: string
          gold_plans: number
          id: string
          premium_plans: number
          snapshot_date: string
          start_plans: number
          total_chapters_read: number
          total_devotionals_completed: number
          total_logins_today: number
          total_quiz_attempts: number
          total_users: number
        }
        Insert: {
          active_users?: number
          created_at?: string
          gold_plans?: number
          id?: string
          premium_plans?: number
          snapshot_date?: string
          start_plans?: number
          total_chapters_read?: number
          total_devotionals_completed?: number
          total_logins_today?: number
          total_quiz_attempts?: number
          total_users?: number
        }
        Update: {
          active_users?: number
          created_at?: string
          gold_plans?: number
          id?: string
          premium_plans?: number
          snapshot_date?: string
          start_plans?: number
          total_chapters_read?: number
          total_devotionals_completed?: number
          total_logins_today?: number
          total_quiz_attempts?: number
          total_users?: number
        }
        Relationships: []
      }
      authorized_purchases: {
        Row: {
          amount_paid: number | null
          commission: number | null
          cpf: string | null
          created_at: string
          customer_name: string | null
          email: string
          expires_at: string | null
          id: string
          payment_method: string | null
          phone: string | null
          plan_type: string
          product_id: string | null
          product_name: string | null
          purchased_at: string
          status: string
          transaction_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount_paid?: number | null
          commission?: number | null
          cpf?: string | null
          created_at?: string
          customer_name?: string | null
          email: string
          expires_at?: string | null
          id?: string
          payment_method?: string | null
          phone?: string | null
          plan_type?: string
          product_id?: string | null
          product_name?: string | null
          purchased_at?: string
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount_paid?: number | null
          commission?: number | null
          cpf?: string | null
          created_at?: string
          customer_name?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          payment_method?: string | null
          phone?: string | null
          plan_type?: string
          product_id?: string | null
          product_name?: string | null
          purchased_at?: string
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chapter_explanations_cache: {
        Row: {
          book_name: string
          chapter_number: number
          created_at: string
          explanation: string
          id: string
          updated_at: string
        }
        Insert: {
          book_name: string
          chapter_number: number
          created_at?: string
          explanation: string
          id?: string
          updated_at?: string
        }
        Update: {
          book_name?: string
          chapter_number?: number
          created_at?: string
          explanation?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_reading_plans: {
        Row: {
          chapters_per_day: number
          created_at: string
          id: string
          is_active: boolean | null
          plan_description: string | null
          plan_name: string
          selected_books: string[]
          total_chapters: number
          total_days: number
          user_id: string
        }
        Insert: {
          chapters_per_day: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          plan_description?: string | null
          plan_name: string
          selected_books: string[]
          total_chapters: number
          total_days: number
          user_id: string
        }
        Update: {
          chapters_per_day?: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          plan_description?: string | null
          plan_name?: string
          selected_books?: string[]
          total_chapters?: number
          total_days?: number
          user_id?: string
        }
        Relationships: []
      }
      daily_logins: {
        Row: {
          created_at: string
          id: string
          login_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          login_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          login_date?: string
          user_id?: string
        }
        Relationships: []
      }
      devotional_completions: {
        Row: {
          completed_at: string
          devotional_date: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          devotional_date: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string
          devotional_date?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      devotional_favorites: {
        Row: {
          created_at: string
          day_of_year: number
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          day_of_year: number
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          day_of_year?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      manual_sales: {
        Row: {
          amount: number
          commission: number | null
          created_at: string
          created_by: string | null
          customer_email: string | null
          customer_name: string
          id: string
          notes: string | null
          payment_method: string
          plan_type: string
          sale_date: string
        }
        Insert: {
          amount: number
          commission?: number | null
          created_at?: string
          created_by?: string | null
          customer_email?: string | null
          customer_name: string
          id?: string
          notes?: string | null
          payment_method?: string
          plan_type?: string
          sale_date?: string
        }
        Update: {
          amount?: number
          commission?: number | null
          created_at?: string
          created_by?: string | null
          customer_email?: string | null
          customer_name?: string
          id?: string
          notes?: string | null
          payment_method?: string
          plan_type?: string
          sale_date?: string
        }
        Relationships: []
      }
      monthly_ranking_history: {
        Row: {
          avatar_url: string | null
          chapters_read: number
          created_at: string
          devotional_points: number
          full_name: string | null
          id: string
          month_year: string
          quiz_points: number
          rank: number
          total_points: number
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          chapters_read?: number
          created_at?: string
          devotional_points?: number
          full_name?: string | null
          id?: string
          month_year: string
          quiz_points?: number
          rank: number
          total_points?: number
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          chapters_read?: number
          created_at?: string
          devotional_points?: number
          full_name?: string | null
          id?: string
          month_year?: string
          quiz_points?: number
          rank?: number
          total_points?: number
          user_id?: string
        }
        Relationships: []
      }
      plan_completions: {
        Row: {
          bonus_points: number
          completed_at: string
          custom_plan_id: string | null
          id: string
          plan_type: string
          user_id: string
        }
        Insert: {
          bonus_points?: number
          completed_at?: string
          custom_plan_id?: string | null
          id?: string
          plan_type: string
          user_id: string
        }
        Update: {
          bonus_points?: number
          completed_at?: string
          custom_plan_id?: string | null
          id?: string
          plan_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_completions_custom_plan_id_fkey"
            columns: ["custom_plan_id"]
            isOneToOne: false
            referencedRelation: "custom_reading_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          has_completed_onboarding: boolean | null
          id: string
          last_celebrated_plan: string | null
          preferred_reading_time: string | null
          reading_plan: string | null
          referral_source: string | null
          show_in_rankings: boolean | null
          timezone: string | null
          updated_at: string
          user_id: string
          whatsapp_enabled: boolean | null
          whatsapp_phone: string | null
          whatsapp_terms_accepted_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          has_completed_onboarding?: boolean | null
          id?: string
          last_celebrated_plan?: string | null
          preferred_reading_time?: string | null
          reading_plan?: string | null
          referral_source?: string | null
          show_in_rankings?: boolean | null
          timezone?: string | null
          updated_at?: string
          user_id: string
          whatsapp_enabled?: boolean | null
          whatsapp_phone?: string | null
          whatsapp_terms_accepted_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          has_completed_onboarding?: boolean | null
          id?: string
          last_celebrated_plan?: string | null
          preferred_reading_time?: string | null
          reading_plan?: string | null
          referral_source?: string | null
          show_in_rankings?: boolean | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
          whatsapp_enabled?: boolean | null
          whatsapp_phone?: string | null
          whatsapp_terms_accepted_at?: string | null
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          book_name: string
          chapter_number: number
          created_at: string
          id: string
          is_correct: boolean
          points_earned: number
          question_index: number
          quiz_date: string
          streak_count: number | null
          user_id: string
        }
        Insert: {
          book_name: string
          chapter_number: number
          created_at?: string
          id?: string
          is_correct?: boolean
          points_earned?: number
          question_index: number
          quiz_date?: string
          streak_count?: number | null
          user_id: string
        }
        Update: {
          book_name?: string
          chapter_number?: number
          created_at?: string
          id?: string
          is_correct?: boolean
          points_earned?: number
          question_index?: number
          quiz_date?: string
          streak_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      quiz_questions_cache: {
        Row: {
          book_name: string
          chapter_number: number
          created_at: string
          id: string
          questions: Json
          updated_at: string
        }
        Insert: {
          book_name: string
          chapter_number: number
          created_at?: string
          id?: string
          questions: Json
          updated_at?: string
        }
        Update: {
          book_name?: string
          chapter_number?: number
          created_at?: string
          id?: string
          questions?: Json
          updated_at?: string
        }
        Relationships: []
      }
      ranking_notifications: {
        Row: {
          created_at: string
          id: string
          notified_at: string
          rank_achieved: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notified_at?: string
          rank_achieved: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notified_at?: string
          rank_achieved?: number
          user_id?: string
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          book_name: string
          chapter_number: number
          completed_at: string
          id: string
          reading_time_minutes: number | null
          user_id: string
        }
        Insert: {
          book_name: string
          chapter_number: number
          completed_at?: string
          id?: string
          reading_time_minutes?: number | null
          user_id: string
        }
        Update: {
          book_name?: string
          chapter_number?: number
          completed_at?: string
          id?: string
          reading_time_minutes?: number | null
          user_id?: string
        }
        Relationships: []
      }
      reading_schedule: {
        Row: {
          book_name: string
          chapter_number: number
          completed_at: string | null
          id: string
          is_completed: boolean | null
          scheduled_date: string
          user_id: string
        }
        Insert: {
          book_name: string
          chapter_number: number
          completed_at?: string | null
          id?: string
          is_completed?: boolean | null
          scheduled_date: string
          user_id: string
        }
        Update: {
          book_name?: string
          chapter_number?: number
          completed_at?: string | null
          id?: string
          is_completed?: boolean | null
          scheduled_date?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_sermons: {
        Row: {
          content: string
          created_at: string
          id: string
          sermon_type: string
          theme: string
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          sermon_type: string
          theme: string
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          sermon_type?: string
          theme?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verse_devotionals_cache: {
        Row: {
          book_id: string
          chapter_number: number
          created_at: string
          devotional_data: Json
          id: string
          updated_at: string
          verse_number: number
          verse_text: string
        }
        Insert: {
          book_id: string
          chapter_number: number
          created_at?: string
          devotional_data: Json
          id?: string
          updated_at?: string
          verse_number: number
          verse_text: string
        }
        Update: {
          book_id?: string
          chapter_number?: number
          created_at?: string
          devotional_data?: Json
          id?: string
          updated_at?: string
          verse_number?: number
          verse_text?: string
        }
        Relationships: []
      }
      verse_favorites: {
        Row: {
          book_id: string
          chapter_number: number
          created_at: string
          id: string
          user_id: string
          verse_number: number
          verse_text: string
        }
        Insert: {
          book_id: string
          chapter_number: number
          created_at?: string
          id?: string
          user_id: string
          verse_number: number
          verse_text: string
        }
        Update: {
          book_id?: string
          chapter_number?: number
          created_at?: string
          id?: string
          user_id?: string
          verse_number?: number
          verse_text?: string
        }
        Relationships: []
      }
      verse_highlights: {
        Row: {
          book_id: string
          chapter_number: number
          created_at: string
          highlight_color: string
          id: string
          updated_at: string
          user_id: string
          verse_number: number
        }
        Insert: {
          book_id: string
          chapter_number: number
          created_at?: string
          highlight_color?: string
          id?: string
          updated_at?: string
          user_id: string
          verse_number: number
        }
        Update: {
          book_id?: string
          chapter_number?: number
          created_at?: string
          highlight_color?: string
          id?: string
          updated_at?: string
          user_id?: string
          verse_number?: number
        }
        Relationships: []
      }
      verse_studies_cache: {
        Row: {
          book_id: string
          chapter_number: number
          commentary: string
          created_at: string
          cross_references: string[] | null
          id: string
          key_words: Json | null
          source: string | null
          updated_at: string
          verse_number: number
          verse_text: string
        }
        Insert: {
          book_id: string
          chapter_number: number
          commentary: string
          created_at?: string
          cross_references?: string[] | null
          id?: string
          key_words?: Json | null
          source?: string | null
          updated_at?: string
          verse_number: number
          verse_text: string
        }
        Update: {
          book_id?: string
          chapter_number?: number
          commentary?: string
          created_at?: string
          cross_references?: string[] | null
          id?: string
          key_words?: Json | null
          source?: string | null
          updated_at?: string
          verse_number?: number
          verse_text?: string
        }
        Relationships: []
      }
      whatsapp_reminders_sent: {
        Row: {
          id: string
          message_index: number
          sent_at: string
          sent_date: string
          user_id: string
        }
        Insert: {
          id?: string
          message_index: number
          sent_at?: string
          sent_date?: string
          user_id: string
        }
        Update: {
          id?: string
          message_index?: number
          sent_at?: string
          sent_date?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_add_authorized_email: {
        Args: { plan?: string; target_email: string }
        Returns: boolean
      }
      admin_deactivate_inactive_users: { Args: never; Returns: number }
      admin_get_all_users: {
        Args: never
        Returns: {
          active_days: number
          avatar_url: string
          cpf: string
          created_at: string
          email: string
          full_name: string
          inactive_days: number
          last_sign_in_at: string
          phone: string
          plan_status: string
          plan_type: string
          referral_source: string
          total_points: number
          user_id: string
          whatsapp_phone: string
        }[]
      }
      admin_get_login_history: {
        Args: { days_back?: number }
        Returns: {
          login_count: number
          login_date: string
        }[]
      }
      admin_get_metrics: {
        Args: never
        Returns: {
          active_users: number
          avg_daily_logins: number
          embaixador_plans: number
          gold_plans: number
          gratuito_users: number
          premium_plans: number
          start_plans: number
          total_chapters_read: number
          total_devotionals_completed: number
          total_logins_today: number
          total_logins_week: number
          total_quiz_attempts: number
          total_users: number
        }[]
      }
      admin_get_metrics_history: {
        Args: { days_back?: number }
        Returns: {
          active_users: number
          snapshot_date: string
          total_chapters_read: number
          total_devotionals_completed: number
          total_quiz_attempts: number
          total_users: number
        }[]
      }
      admin_get_referral_metrics: {
        Args: never
        Returns: {
          referral_source: string
          user_count: number
        }[]
      }
      admin_get_revenue_history: {
        Args: { days_back?: number }
        Returns: {
          daily_revenue: number
          sale_count: number
          sale_date: string
        }[]
      }
      admin_get_revenue_metrics: {
        Args: { days_back?: number }
        Returns: {
          avg_ticket: number
          boleto_count: number
          boleto_revenue: number
          card_count: number
          card_revenue: number
          other_count: number
          other_revenue: number
          pix_count: number
          pix_revenue: number
          total_commission: number
          total_revenue: number
        }[]
      }
      admin_get_user_all_time_stats: {
        Args: { target_user_id: string }
        Returns: {
          achievement_points: number
          active_days: number
          chapters_read: number
          devotional_points: number
          quiz_points: number
          total_points: number
        }[]
      }
      admin_save_metrics_snapshot: { Args: never; Returns: undefined }
      admin_update_user_plan: {
        Args: {
          new_plan_type: string
          new_status: string
          target_email: string
        }
        Returns: boolean
      }
      check_email_authorized: {
        Args: { email_input: string }
        Returns: boolean
      }
      get_all_monthly_champions: {
        Args: never
        Returns: {
          avatar_url: string
          chapters_read: number
          devotional_points: number
          full_name: string
          month_year: string
          quiz_points: number
          rank: number
          total_points: number
          user_id: string
        }[]
      }
      get_previous_month_champions: {
        Args: never
        Returns: {
          avatar_url: string
          full_name: string
          month_year: string
          rank: number
          total_points: number
          user_id: string
        }[]
      }
      get_user_plan_type: { Args: { email_input: string }; Returns: string }
      get_user_rankings: {
        Args: never
        Returns: {
          active_days: number
          avatar_url: string
          chapters_read: number
          devotional_points: number
          full_name: string
          quiz_points: number
          rank: number
          total_points: number
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_current_user_admin: { Args: never; Returns: boolean }
      run_daily_deactivation: { Args: never; Returns: undefined }
      save_monthly_ranking_and_reset: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
