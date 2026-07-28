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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activation_codes: {
        Row: {
          code_name: string
          code_value: string
          id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          code_name: string
          code_value?: string
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          code_name?: string
          code_value?: string
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      app_config: {
        Row: {
          config_key: string
          config_value: Json | null
          id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          config_key: string
          config_value?: Json | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          config_key?: string
          config_value?: Json | null
          id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      app_updates: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          title: string
          update_url: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          title?: string
          update_url: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          title?: string
          update_url?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          admin_response: string | null
          created_at: string
          game_mode: string
          id: string
          image_url: string | null
          message: string | null
          responded_at: string | null
          responded_by: string | null
          status: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          game_mode: string
          id?: string
          image_url?: string | null
          message?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          game_mode?: string
          id?: string
          image_url?: string | null
          message?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      football_cache: {
        Row: {
          cache_key: string
          created_at: string
          data: Json
          expires_at: string
          id: string
        }
        Insert: {
          cache_key: string
          created_at?: string
          data: Json
          expires_at: string
          id?: string
        }
        Update: {
          cache_key?: string
          created_at?: string
          data?: Json
          expires_at?: string
          id?: string
        }
        Relationships: []
      }
      game_access: {
        Row: {
          expires_at: string | null
          game_mode: string
          granted_at: string
          granted_by: string | null
          id: string
          is_active: boolean
          payment_proof_url: string | null
          user_id: string
        }
        Insert: {
          expires_at?: string | null
          game_mode: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          payment_proof_url?: string | null
          user_id: string
        }
        Update: {
          expires_at?: string | null
          game_mode?: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          payment_proof_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      game_usage: {
        Row: {
          game_mode: string | null
          game_name: string
          id: string
          used_at: string
          user_id: string
        }
        Insert: {
          game_mode?: string | null
          game_name: string
          id?: string
          used_at?: string
          user_id: string
        }
        Update: {
          game_mode?: string | null
          game_name?: string
          id?: string
          used_at?: string
          user_id?: string
        }
        Relationships: []
      }
      gen_store_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          price_coins: number
          stock: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          price_coins?: number
          stock?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          price_coins?: number
          stock?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      live_fixtures: {
        Row: {
          away_score: number | null
          away_team: string | null
          data: Json | null
          fixture_id: number
          home_score: number | null
          home_team: string | null
          id: string
          league_id: number | null
          league_name: string | null
          minute: number | null
          starts_at: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          away_score?: number | null
          away_team?: string | null
          data?: Json | null
          fixture_id: number
          home_score?: number | null
          home_team?: string | null
          id?: string
          league_id?: number | null
          league_name?: string | null
          minute?: number | null
          starts_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          away_score?: number | null
          away_team?: string | null
          data?: Json | null
          fixture_id?: number
          home_score?: number | null
          home_team?: string | null
          id?: string
          league_id?: number | null
          league_name?: string | null
          minute?: number | null
          starts_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      login_history: {
        Row: {
          created_at: string
          event_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_global: boolean
          is_read: boolean
          message: string
          target_user_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_global?: boolean
          is_read?: boolean
          message: string
          target_user_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_global?: boolean
          is_read?: boolean
          message?: string
          target_user_id?: string | null
          title?: string
        }
        Relationships: []
      }
      online_users: {
        Row: {
          id: string
          is_online: boolean
          last_ping: string
          user_id: string
        }
        Insert: {
          id?: string
          is_online?: boolean
          last_ping?: string
          user_id: string
        }
        Update: {
          id?: string
          is_online?: boolean
          last_ping?: string
          user_id?: string
        }
        Relationships: []
      }
      password_reset_requests: {
        Row: {
          created_at: string
          id: string
          resolved_at: string | null
          resolved_by: string | null
          status: string
          user_identifier: string
        }
        Insert: {
          created_at?: string
          id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          user_identifier: string
        }
        Update: {
          created_at?: string
          id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          user_identifier?: string
        }
        Relationships: []
      }
      predictions: {
        Row: {
          created_at: string
          id: string
          input_coefficient: number
          input_time: string
          mode: string
          results: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          input_coefficient: number
          input_time: string
          mode: string
          results?: Json
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          input_coefficient?: number
          input_time?: string
          mode?: string
          results?: Json
          user_id?: string
        }
        Relationships: []
      }
      premium_bonuses: {
        Row: {
          amount: number
          bonus_type: string
          claimed_at: string | null
          created_at: string
          expires_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          amount?: number
          bonus_type: string
          claimed_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          bonus_type?: string
          claimed_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          device_id: string | null
          device_info: string | null
          email: string
          id: string
          is_validated: boolean
          last_seen_at: string | null
          location: string | null
          login_count: number
          name: string
          phone: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          device_id?: string | null
          device_info?: string | null
          email: string
          id?: string
          is_validated?: boolean
          last_seen_at?: string | null
          location?: string | null
          login_count?: number
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          device_id?: string | null
          device_info?: string | null
          email?: string
          id?: string
          is_validated?: boolean
          last_seen_at?: string | null
          location?: string | null
          login_count?: number
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      protected_admins: {
        Row: {
          created_at: string
          email: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      reward_requests: {
        Row: {
          admin_response: string | null
          created_at: string
          id: string
          requested_days: number
          requested_game: string
          resolved_at: string | null
          resolved_by: string | null
          status: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          id?: string
          requested_days?: number
          requested_game: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          id?: string
          requested_days?: number
          requested_game?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      user_coins: {
        Row: {
          coins: number
          id: string
          total_earned: number
          total_spent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          coins?: number
          id?: string
          total_earned?: number
          total_spent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          coins?: number
          id?: string
          total_earned?: number
          total_spent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_points: {
        Row: {
          id: string
          points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
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
