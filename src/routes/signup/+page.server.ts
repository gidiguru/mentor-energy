import type { Actions, RequestEvent, SignupActionData } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

interface BaseSignupData {
 discipline: string;
 qualification: string;
 role: string;
}

interface EmailSignupData extends BaseSignupData {
 email: string;
 password: string;
 firstName: string;
 lastName: string;
}

interface LinkedInSignupData extends BaseSignupData {
 accessToken: string; 
}

function validateEmailSignup(formData: FormData): EmailSignupData {
 const fields = {
   email: formData.get('email')?.toString().trim(),
   password: formData.get('password')?.toString(),
   firstName: formData.get('firstName')?.toString().trim(), 
   lastName: formData.get('lastName')?.toString().trim(),
   discipline: formData.get('discipline')?.toString().trim(),
   qualification: formData.get('qualification')?.toString().trim(),
   role: formData.get('role')?.toString().trim()
 };

 const requiredFields = ['email', 'password', 'firstName', 'lastName', 'discipline', 'qualification', 'role'] as const;
 const missing = requiredFields.find(field => !fields[field]);

 if (missing) {
   throw new Error(`Missing required field: ${missing}`);
 }

 return fields as EmailSignupData;
}

function validateLinkedInSignup(formData: FormData): BaseSignupData {
 const fields = {
   discipline: formData.get('discipline')?.toString().trim(),
   qualification: formData.get('qualification')?.toString().trim(),
   role: formData.get('role')?.toString().trim()
 };

 const requiredFields = ['discipline', 'qualification', 'role'] as const;
 const missing = requiredFields.find(field => !fields[field]);

 if (missing) {
   throw new Error(`Missing required field: ${missing}`);
 }

 return fields as BaseSignupData;
}

export const actions: Actions = {
 signup: async (event: RequestEvent) => {
   const { request, locals } = event;
   console.log('Signup started');
   
   try {
     const formData = await request.formData();
     console.log('Form data:', Object.fromEntries(formData));
     
     const userData = validateEmailSignup(formData);
     console.log('Validated user data:', userData);

     // Check existing user
     const { data: existingUser, error: checkError } = await locals.supabase
       .from('users')
       .select('email')
       .eq('email', userData.email)
       .single();

     console.log('Existing user check:', { existingUser, checkError });

     if (existingUser?.email) {
       return fail(400, {
         error: true,
         message: 'An account with this email already exists',
         email: existingUser.email,
         existingUser: true
         
       });
       
     }

     console.log('Attempting signup with Supabase');

// Create auth user with detailed logging
const { data: authData, error: signUpError } = await locals.supabase.auth.signUp({
  email: userData.email,
  password: userData.password,
  options: {
    data: {
      first_name: userData.firstName,
      last_name: userData.lastName
    }
  }
});

console.log('Auth signup response:', {
  hasAuthData: !!authData,
  user: authData?.user,
  userId: authData?.user?.id,
  error: signUpError
});

if (!authData?.user?.id) {
  console.error('Auth user ID not found', { authData });
  return fail(500, {
    error: true,
    message: 'Failed to create user account'
  });
}

     
     if (signUpError) {
       console.error('Supabase auth error:', signUpError);
       if (signUpError instanceof AuthApiError) {
         return fail(400, {
           error: true,
           message: signUpError.message
         });
       }
       return fail(500, {
         error: true,
         message: 'An error occurred during signup'
       });
     }

// Create user profile with detailed logging
console.log('Creating user profile with auth_id:', authData.user.id);

const { data: profileData, error: profileError } = await locals.supabase
 .from('users') 
 .update({
   email: userData.email,
   first_name: userData.firstName,
   last_name: userData.lastName,
   discipline: userData.discipline, 
   qualification: userData.qualification,
   role: userData.role
 })
 .eq('id', authData.user.id)
 .select()
 .single();

console.log('Profile creation result:', {
  profileData,
  profileError
});

     if (profileError) {
       console.error('Profile creation error:', profileError);
       return fail(500, {
         error: true,
         message: 'Failed to create user profile'
       });
     }
     

     console.log('Signup completed successfully');
     return {
      success: true,
      requiresEmailConfirmation: true,
      email: userData.email
    };

   } catch (error) {
     console.error('Signup error:', error);
     console.log('Form data:', FormData); 
     return fail(500, {
       error: true,
       message: error instanceof Error ? error.message : 'Unknown error occurred'
     });
   }
 }
};

export const load = async ({ locals, url }) => {
 console.log('[Auth Page] Load started');
 
 const { session, user } = await locals.safeGetSession();
 console.log('[Auth Page] Session check:', {
   hasSession: !!session,
   hasUser: !!user
 });

 // If user exists but hasn't confirmed, force email confirmation
 if (session && user) {
   const { data: confirmationData, error } = await locals.supabase
     .from('users')
     .select('signup_completed')
     .eq('email', user.email)
     .single();

   if (error || !confirmationData?.signup_completed) {
     return {
       session,
       message: 'Please confirm your email to complete signup.',
       requiresEmailConfirmation: true,
       email: user.email
     };
   }
 }

 return { 
   session,
   confirmationStatus: url.searchParams.get('emailConfirmed')
 };
};