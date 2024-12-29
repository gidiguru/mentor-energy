import type { Actions, RequestEvent } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

interface SignupFormData {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  discipline: string;
  qualification: string;
  role: string;
}

function validateFormData(formData: FormData): SignupFormData {
  const fields = {
    email: formData.get('email')?.toString().trim(),
    password: formData.get('password')?.toString(),
    firstName: formData.get('firstName')?.toString().trim(),
    lastName: formData.get('lastName')?.toString().trim(),
    discipline: formData.get('discipline')?.toString().trim(),
    qualification: formData.get('qualification')?.toString().trim(),
    role: formData.get('role')?.toString().trim()
  };

  const requiredFields = ['email', 'firstName', 'lastName', 'discipline', 'qualification', 'role'] as const;
  const missing = requiredFields.find(field => !fields[field]);

  if (missing) {
    throw new Error(`Missing required field: ${missing}`);
  }

  return fields as SignupFormData;
}

export const actions: Actions = {
  signup: async (event: RequestEvent) => {
    const { request, locals } = event;
    console.log('Email signup started');

    try {
      const formData = await request.formData();
      const userData = validateFormData(formData);

      if (!userData?.password) {
        return fail(400, {
          error: 'Password is required for email signup',
          ...userData
        });
      }

      const { data, error: err } = await locals.supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            discipline: userData.discipline,
            qualification: userData.qualification,
            role: userData.role,
            full_name: `${userData.firstName} ${userData.lastName}`
          }
        }
      });

      if (err) {
        if (err instanceof AuthApiError && err.status >= 400 && err.status < 500) {
          return fail(400, {
            error: 'Invalid credentials',
            email: userData.email,
            message: err.message
          });
        }
        throw err;
      }

      // Check for existing user
      if (data.user && !data.user.identities?.length) {
        throw redirect(303, '/auth');
      }

      throw redirect(303, '/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      return fail(500, {
        error: 'Server error. Please try again later.',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  },

  linkedinSignup: async (event: RequestEvent) => {
    const { request, locals } = event;
    console.log('LinkedIn signup started');

    try {
      const formData = await request.formData();
      const userData = validateFormData(formData);

      const { data, error } = await locals.supabase.auth.signInWithOAuth({
        provider: 'linkedin',
        options: {
          scopes: 'r_liteprofile r_emailaddress',
          redirectTo: `${event.url.origin}/auth/callback`,
          queryParams: {
            discipline: userData.discipline,
            qualification: userData.qualification,
            role: userData.role
          }
        }
      });

      if (error) {
        console.error('LinkedIn signup failed:', error);
        return fail(500, {
          error: 'Failed to initiate LinkedIn signup',
          message: error.message
        });
      }

      throw redirect(303, data.url);
    } catch (error) {
      console.error('LinkedIn signup error:', error);
      return fail(500, {
        error: 'Server error. Please try again later.',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }
};

export const load = async ({ locals }) => {
  const { session, user } = await locals.safeGetSession();
  
  if (session && user) {
    throw redirect(303, '/dashboard');
  }

  return { session };
};