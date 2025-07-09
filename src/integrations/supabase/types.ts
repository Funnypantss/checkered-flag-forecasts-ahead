export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      circuits: {
        Row: {
          alt: number | null
          circuit_id: string
          country: string | null
          created_at: string | null
          id: number
          lat: number | null
          lng: number | null
          location: string | null
          name: string
          url: string | null
        }
        Insert: {
          alt?: number | null
          circuit_id: string
          country?: string | null
          created_at?: string | null
          id?: number
          lat?: number | null
          lng?: number | null
          location?: string | null
          name: string
          url?: string | null
        }
        Update: {
          alt?: number | null
          circuit_id?: string
          country?: string | null
          created_at?: string | null
          id?: number
          lat?: number | null
          lng?: number | null
          location?: string | null
          name?: string
          url?: string | null
        }
        Relationships: []
      }
      constructor_standings: {
        Row: {
          constructor_id: string | null
          created_at: string | null
          id: number
          points: number | null
          position: number | null
          position_text: string | null
          race_id: string | null
          wins: number | null
        }
        Insert: {
          constructor_id?: string | null
          created_at?: string | null
          id?: number
          points?: number | null
          position?: number | null
          position_text?: string | null
          race_id?: string | null
          wins?: number | null
        }
        Update: {
          constructor_id?: string | null
          created_at?: string | null
          id?: number
          points?: number | null
          position?: number | null
          position_text?: string | null
          race_id?: string | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "constructor_standings_constructor_id_fkey"
            columns: ["constructor_id"]
            isOneToOne: false
            referencedRelation: "constructors"
            referencedColumns: ["constructor_id"]
          },
          {
            foreignKeyName: "constructor_standings_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["race_id"]
          },
        ]
      }
      constructors: {
        Row: {
          constructor_id: string
          created_at: string | null
          id: number
          name: string
          nationality: string | null
          url: string | null
        }
        Insert: {
          constructor_id: string
          created_at?: string | null
          id?: number
          name: string
          nationality?: string | null
          url?: string | null
        }
        Update: {
          constructor_id?: string
          created_at?: string | null
          id?: number
          name?: string
          nationality?: string | null
          url?: string | null
        }
        Relationships: []
      }
      driver_standings: {
        Row: {
          created_at: string | null
          driver_id: string | null
          id: number
          points: number | null
          position: number | null
          position_text: string | null
          race_id: string | null
          wins: number | null
        }
        Insert: {
          created_at?: string | null
          driver_id?: string | null
          id?: number
          points?: number | null
          position?: number | null
          position_text?: string | null
          race_id?: string | null
          wins?: number | null
        }
        Update: {
          created_at?: string | null
          driver_id?: string | null
          id?: number
          points?: number | null
          position?: number | null
          position_text?: string | null
          race_id?: string | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_standings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "driver_standings_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["race_id"]
          },
        ]
      }
      drivers: {
        Row: {
          code: string | null
          created_at: string | null
          date_of_birth: string | null
          driver_id: string
          driver_number: number | null
          family_name: string | null
          given_name: string | null
          id: number
          nationality: string | null
          url: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          driver_id: string
          driver_number?: number | null
          family_name?: string | null
          given_name?: string | null
          id?: number
          nationality?: string | null
          url?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          driver_id?: string
          driver_number?: number | null
          family_name?: string | null
          given_name?: string | null
          id?: number
          nationality?: string | null
          url?: string | null
        }
        Relationships: []
      }
      lap_times: {
        Row: {
          created_at: string | null
          driver_id: string | null
          id: number
          lap: number | null
          milliseconds: number | null
          position: number | null
          race_id: string | null
          time_text: string | null
        }
        Insert: {
          created_at?: string | null
          driver_id?: string | null
          id?: number
          lap?: number | null
          milliseconds?: number | null
          position?: number | null
          race_id?: string | null
          time_text?: string | null
        }
        Update: {
          created_at?: string | null
          driver_id?: string | null
          id?: number
          lap?: number | null
          milliseconds?: number | null
          position?: number | null
          race_id?: string | null
          time_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lap_times_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "lap_times_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["race_id"]
          },
        ]
      }
      qualifying_results: {
        Row: {
          constructor_id: string | null
          created_at: string | null
          driver_id: string | null
          id: number
          position: number | null
          q1_time: string | null
          q2_time: string | null
          q3_time: string | null
          race_id: string | null
        }
        Insert: {
          constructor_id?: string | null
          created_at?: string | null
          driver_id?: string | null
          id?: number
          position?: number | null
          q1_time?: string | null
          q2_time?: string | null
          q3_time?: string | null
          race_id?: string | null
        }
        Update: {
          constructor_id?: string | null
          created_at?: string | null
          driver_id?: string | null
          id?: number
          position?: number | null
          q1_time?: string | null
          q2_time?: string | null
          q3_time?: string | null
          race_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qualifying_results_constructor_id_fkey"
            columns: ["constructor_id"]
            isOneToOne: false
            referencedRelation: "constructors"
            referencedColumns: ["constructor_id"]
          },
          {
            foreignKeyName: "qualifying_results_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "qualifying_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["race_id"]
          },
        ]
      }
      race_results: {
        Row: {
          constructor_id: string | null
          created_at: string | null
          driver_id: string | null
          fastest_lap: number | null
          fastest_lap_rank: number | null
          fastest_lap_speed: number | null
          fastest_lap_time: string | null
          id: number
          laps: number | null
          milliseconds: number | null
          points: number | null
          position: number | null
          position_order: number | null
          position_text: string | null
          race_id: string | null
          status: string | null
          status_id: number | null
          time_text: string | null
        }
        Insert: {
          constructor_id?: string | null
          created_at?: string | null
          driver_id?: string | null
          fastest_lap?: number | null
          fastest_lap_rank?: number | null
          fastest_lap_speed?: number | null
          fastest_lap_time?: string | null
          id?: number
          laps?: number | null
          milliseconds?: number | null
          points?: number | null
          position?: number | null
          position_order?: number | null
          position_text?: string | null
          race_id?: string | null
          status?: string | null
          status_id?: number | null
          time_text?: string | null
        }
        Update: {
          constructor_id?: string | null
          created_at?: string | null
          driver_id?: string | null
          fastest_lap?: number | null
          fastest_lap_rank?: number | null
          fastest_lap_speed?: number | null
          fastest_lap_time?: string | null
          id?: number
          laps?: number | null
          milliseconds?: number | null
          points?: number | null
          position?: number | null
          position_order?: number | null
          position_text?: string | null
          race_id?: string | null
          status?: string | null
          status_id?: number | null
          time_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "race_results_constructor_id_fkey"
            columns: ["constructor_id"]
            isOneToOne: false
            referencedRelation: "constructors"
            referencedColumns: ["constructor_id"]
          },
          {
            foreignKeyName: "race_results_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "race_results_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["race_id"]
          },
        ]
      }
      races: {
        Row: {
          circuit_id: string | null
          created_at: string | null
          date: string | null
          fp1_date: string | null
          fp1_time: string | null
          fp2_date: string | null
          fp2_time: string | null
          fp3_date: string | null
          fp3_time: string | null
          id: number
          qualifying_date: string | null
          qualifying_time: string | null
          race_id: string
          race_name: string
          round: number
          season: number | null
          sprint_date: string | null
          sprint_time: string | null
          time: string | null
          url: string | null
        }
        Insert: {
          circuit_id?: string | null
          created_at?: string | null
          date?: string | null
          fp1_date?: string | null
          fp1_time?: string | null
          fp2_date?: string | null
          fp2_time?: string | null
          fp3_date?: string | null
          fp3_time?: string | null
          id?: number
          qualifying_date?: string | null
          qualifying_time?: string | null
          race_id: string
          race_name: string
          round: number
          season?: number | null
          sprint_date?: string | null
          sprint_time?: string | null
          time?: string | null
          url?: string | null
        }
        Update: {
          circuit_id?: string | null
          created_at?: string | null
          date?: string | null
          fp1_date?: string | null
          fp1_time?: string | null
          fp2_date?: string | null
          fp2_time?: string | null
          fp3_date?: string | null
          fp3_time?: string | null
          id?: number
          qualifying_date?: string | null
          qualifying_time?: string | null
          race_id?: string
          race_name?: string
          round?: number
          season?: number | null
          sprint_date?: string | null
          sprint_time?: string | null
          time?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "races_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuits"
            referencedColumns: ["circuit_id"]
          },
          {
            foreignKeyName: "races_season_fkey"
            columns: ["season"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["year"]
          },
        ]
      }
      seasons: {
        Row: {
          created_at: string | null
          id: number
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          year: number
        }
        Update: {
          created_at?: string | null
          id?: number
          year?: number
        }
        Relationships: []
      }
      weather_data: {
        Row: {
          air_temp: number | null
          created_at: string | null
          humidity: number | null
          id: number
          pressure: number | null
          race_id: string | null
          rainfall: boolean | null
          session_type: string | null
          track_temp: number | null
          wind_direction: number | null
          wind_speed: number | null
        }
        Insert: {
          air_temp?: number | null
          created_at?: string | null
          humidity?: number | null
          id?: number
          pressure?: number | null
          race_id?: string | null
          rainfall?: boolean | null
          session_type?: string | null
          track_temp?: number | null
          wind_direction?: number | null
          wind_speed?: number | null
        }
        Update: {
          air_temp?: number | null
          created_at?: string | null
          humidity?: number | null
          id?: number
          pressure?: number | null
          race_id?: string | null
          rainfall?: boolean | null
          session_type?: string | null
          track_temp?: number | null
          wind_direction?: number | null
          wind_speed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "weather_data_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["race_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
