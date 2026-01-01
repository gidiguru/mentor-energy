import type { Config, Context } from "@netlify/functions";

// This scheduled function runs every hour to send session reminders
export default async (req: Request, context: Context) => {
  const baseUrl = process.env.URL || process.env.DEPLOY_URL || 'http://localhost:3000';
  const cronSecret = process.env.CRON_SECRET;

  try {
    const response = await fetch(`${baseUrl}/api/cron/session-reminders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cronSecret}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log('Session reminders result:', data);

    return new Response(JSON.stringify(data), {
      status: response.ok ? 200 : 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error running session reminders:', error);
    return new Response(JSON.stringify({ error: 'Failed to run session reminders' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Run every hour at minute 0
export const config: Config = {
  schedule: "0 * * * *",
};
