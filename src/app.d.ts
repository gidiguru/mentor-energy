import type { Session, SupabaseClient, User } from '@supabase/supabase-js'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
      session: Session | null
      user: User | null
    }
    interface PageData {
      session: Session | null
    }
  }

  // Add this block for custom events
  namespace svelteHTML {
    interface HTMLAttributes<T> {
      'on:clickOutside'?: (event: CustomEvent) => void;
    }
  }
}

export {}