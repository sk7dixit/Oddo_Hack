import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { sql } from '../config/db';

export const clerkWebhook = async (req: Request, res: Response): Promise<void> => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    res.status(500).json({ message: 'Please add WEBHOOK_SECRET from Clerk Dashboard to .env' });
    return;
  }

  // Get the headers and body
  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).json({ message: 'Error occurred -- no svix headers' });
    return;
  }

  // Get the raw body
  const payload = req.body;
  const body = payload.toString('utf8');

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    res.status(400).json({ message: 'Error occurred' });
    return;
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id: clerk_id, email_addresses, username, image_url, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;
    
    // Fallback if username is not provided:
    let displayName = username;
    if (!displayName) {
        if (first_name && last_name) {
             displayName = `${first_name} ${last_name}`;
        } else if (first_name) {
             displayName = first_name;
        } else {
             displayName = email.split('@')[0];
        }
    }

    try {
      // Upsert the user into Neon database
      await sql`
        INSERT INTO users (clerk_id, email, username, profile_image_url, updated_at)
        VALUES (${clerk_id}, ${email}, ${displayName}, ${image_url}, CURRENT_TIMESTAMP)
        ON CONFLICT (clerk_id) DO UPDATE SET
          email = EXCLUDED.email,
          username = EXCLUDED.username,
          profile_image_url = EXCLUDED.profile_image_url,
          updated_at = CURRENT_TIMESTAMP;
      `;
      console.log(`Successfully synced user ${clerk_id} to database.`);
    } catch (dbError) {
      console.error('Error syncing user to DB:', dbError);
      res.status(500).json({ message: 'Error updating database' });
      return;
    }
  } else if (eventType === 'user.deleted') {
    const { id: clerk_id } = evt.data;
    try {
      await sql`
        DELETE FROM users WHERE clerk_id = ${clerk_id};
      `;
      console.log(`Successfully deleted user ${clerk_id} from database.`);
    } catch (dbError) {
      console.error('Error deleting user from DB:', dbError);
      res.status(500).json({ message: 'Error updating database' });
      return;
    }
  }

  res.status(200).json({ success: true });
};
