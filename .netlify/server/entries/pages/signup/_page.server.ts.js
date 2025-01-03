import { f as fail } from "../../../chunks/index.js";
import { AuthApiError } from "@supabase/supabase-js";
function validateEmailSignup(formData) {
  const fields = {
    email: formData.get("email")?.toString().trim() || "",
    password: formData.get("password")?.toString() || "",
    firstName: formData.get("firstName")?.toString().trim() || "",
    lastName: formData.get("lastName")?.toString().trim() || "",
    discipline: formData.get("discipline")?.toString().trim() || "",
    qualification: formData.get("qualification")?.toString().trim() || "",
    role: formData.get("role")?.toString().trim() || "",
    profile_picture: formData.get("profile_picture")?.toString().trim() || ""
  };
  const requiredFields = ["email", "password", "firstName", "lastName", "discipline", "qualification", "role"];
  const missing = requiredFields.find((field) => !fields[field]);
  if (missing) {
    throw new Error(`Missing required field: ${missing}`);
  }
  const password = fields.password;
  const errors = [];
  if (password.length < 8) {
    errors.push("at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("one number");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("one special character");
  }
  if (errors.length > 0) {
    throw new Error(`Password must include: ${errors.join(", ")}`);
  }
  return fields;
}
const actions = {
  signup: async (event) => {
    const { request, locals } = event;
    console.log("Signup started");
    try {
      const formData = await request.formData();
      console.log("Form data:", Object.fromEntries(formData));
      const userData = validateEmailSignup(formData);
      console.log("Validated user data:", userData);
      const { data: existingUser, error: checkError } = await locals.supabase.from("users").select("email").eq("email", userData.email).single();
      console.log("Existing user check:", { existingUser, checkError });
      if (existingUser?.email) {
        return fail(400, {
          error: true,
          message: "An account with this email already exists",
          email: existingUser.email,
          existingUser: true
        });
      }
      console.log("Attempting signup with Supabase");
      const { data: authData, error: signUpError } = await locals.supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            profile_picture: userData.profile_picture
          }
        }
      });
      console.log("Auth signup response:", {
        hasAuthData: !!authData,
        user: authData?.user,
        userId: authData?.user?.id,
        error: signUpError
      });
      if (!authData?.user?.id) {
        console.error("Auth user ID not found", { authData });
        return fail(500, {
          error: true,
          message: "Failed to create user account"
        });
      }
      if (signUpError) {
        console.error("Supabase auth error:", signUpError);
        if (signUpError instanceof AuthApiError) {
          return fail(400, {
            error: true,
            message: signUpError.message
          });
        }
        return fail(500, {
          error: true,
          message: "An error occurred during signup"
        });
      }
      console.log("Creating user profile with auth_id:", authData.user.id);
      const { data: profileData, error: profileError } = await locals.supabase.from("users").update({
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        discipline: userData.discipline,
        qualification: userData.qualification,
        role: userData.role
      }).eq("id", authData.user.id).select().single();
      console.log("Profile creation result:", {
        profileData,
        profileError
      });
      if (profileError) {
        console.error("Profile creation error:", profileError);
        return fail(500, {
          error: true,
          message: "Failed to create user profile"
        });
      }
      console.log("Signup completed successfully");
      return {
        success: true,
        requiresEmailConfirmation: true,
        email: userData.email
      };
    } catch (error) {
      console.error("Signup error:", error);
      console.log("Form data:", FormData);
      return fail(500, {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  }
};
const load = async ({ locals, url }) => {
  console.log("[Auth Page] Load started");
  const { session, user } = await locals.safeGetSession();
  console.log("[Auth Page] Session check:", {
    hasSession: !!session,
    hasUser: !!user
  });
  if (session && user) {
    const { data: confirmationData, error } = await locals.supabase.from("users").select("signup_completed").eq("email", user.email).single();
    if (error || !confirmationData?.signup_completed) {
      return {
        session,
        message: "Please confirm your email to complete signup.",
        requiresEmailConfirmation: true,
        email: user.email
      };
    }
  }
  return {
    session,
    confirmationStatus: url.searchParams.get("emailConfirmed")
  };
};
export {
  actions,
  load
};
