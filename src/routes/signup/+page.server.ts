import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    
    const discipline = formData.get('discipline');
    const qualification = formData.get('qualification');
    const role = formData.get('role');
    const email = formData.get('email');
    const education = formData.get('education');
    const workHistory = formData.get('workHistory');

    // Validate required fields
    if (!discipline || !qualification || !role || !email) {
      return fail(400, {
        error: 'All fields are required'
      });
    }

    try {
      // Create user record
      const user = await prisma.user.create({
        data: {
          email: email.toString(),
          role: role.toString(),
          profile: {
            create: {
              discipline: discipline.toString(),
              qualification: qualification.toString(),
              education: education?.toString() || '',
              workHistory: workHistory?.toString() || ''
            }
          }
        }
      });

      // Return success with user data
      return {
        success: true,
        user
      };
    } catch (error) {
      console.error('Signup error:', error);
      return fail(500, {
        error: 'Failed to create account'
      });
    }
  }
} satisfies Actions;