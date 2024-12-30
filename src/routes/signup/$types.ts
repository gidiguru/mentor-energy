import type { RequestEvent as SvelteKitRequestEvent } from '@sveltejs/kit';
import type { SupabaseClient, Session, User } from '@supabase/supabase-js';

export interface SignupActionData {
  success?: boolean;
  error?: boolean;
  message?: string;
  email?: string;
  existingUser?: boolean;
  requiresEmailConfirmation?: boolean;
  unconfirmed?: boolean;
}

export type RequestEvent = SvelteKitRequestEvent & {
  locals: {
    supabase: SupabaseClient;
    safeGetSession: () => Promise<{
      session: Session | null;
      user: User | null;
    }>;
  };
};

export type Actions = {
  signup?: (event: RequestEvent) => Promise<SignupActionData | unknown>;
  linkedinSignup?: (event: RequestEvent) => Promise<SignupActionData | unknown>;
  signin?: (event: RequestEvent) => Promise<SignupActionData | unknown>;
};

export type { Session, User };