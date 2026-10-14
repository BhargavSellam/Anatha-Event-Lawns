import { z } from 'zod';
export const enquirySchema = z.object({
 full_name: z.string().trim().min(2, 'Please enter your full name.').max(100),
 phone: z.string().trim().regex(/^\+?[\d\s()-]{8,20}$/, 'Please enter a valid phone number.'),
 email: z.string().trim().email('Please enter a valid email address.').max(254).transform(v => v.toLowerCase()),
 event_type: z.enum(['Wedding', 'Engagement', 'Birthday', 'Other celebration', 'Venue visit']),
 event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose an event date.').refine(v => { const d = new Date(`${v}T12:00:00Z`); return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10) === v; }, 'Please choose a valid date.'),
 guest_count: z.coerce.number().int().min(1, 'Please enter your estimated guest count.').max(100000),
 budget: z.string().trim().max(100).default(''),
 message: z.string().trim().max(2000).default(''),
 website: z.string().max(200).default(''),
});
export type Enquiry = z.infer<typeof enquirySchema>;
