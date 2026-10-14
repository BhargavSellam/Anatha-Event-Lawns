import { createServerFn } from '@tanstack/react-start';
import { enquirySchema } from './enquiry-schema';
export const sendEnquiry = createServerFn({ method: 'POST' })
 .inputValidator((input: unknown) => enquirySchema.parse(input))
 .handler(async ({ data }) => {
  if (data.website) return { success: false, error: 'Your enquiry could not be sent. Please try again.', receipt: '' };
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) return { success: false, error: 'Enquiries are temporarily unavailable. Please try again later.', receipt: '' };
  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => {
   const headers = new Headers(init?.headers);
   if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
   headers.set('apikey', key);
   return fetch(input, { ...init, headers });
  } } });
  const id = crypto.randomUUID();
  const { website: _website, ...values } = data;
  const { error } = await client.from('event_enquiries').insert({ ...values, id });
  if (error) return { success: false, error: 'We couldn’t receive your enquiry. Please try again later; repeated enquiries may be limited.', receipt: '' };
  return { success: true, error: '', receipt: id };
 });
