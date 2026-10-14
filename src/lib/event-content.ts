import wedding from '@/assets/wedding-lawn.jpg';
import engagement from '@/assets/engagement.jpg';
import birthday from '@/assets/birthday.jpg';
import decor from '@/assets/decor.jpg';
export const instagram = 'https://www.instagram.com/ananthaeventlawns/';
export const business = { name: 'Anantha Event Lawns', byline: 'By Jampana', city: 'Vizag, Andhra Pradesh', phone: '+91 XXXXX XXXXX', email: 'hello@your-domain.example', whatsapp: '' };
export const events = [
 { name: 'Weddings', type: 'Wedding', image: wedding, description: 'The beginning of forever, surrounded by the people you love.' },
 { name: 'Engagements', type: 'Engagement', image: engagement, description: 'A beautiful first chapter in your story together.' },
 { name: 'Birthdays', type: 'Birthday', image: birthday, description: 'Another year. A little more joy. A celebration to remember.' },
];
export const photographs = [
 { src: wedding, category: 'Weddings', alt: 'Wedding inspiration: an illuminated floral mandap and seating on a garden lawn', title: 'An evening to remember', width: 1920, height: 1088 },
 { src: decor, category: 'Décor', alt: 'Décor inspiration: jasmine garlands and traditional brass lamps', title: 'Beauty in every detail', width: 1024, height: 1280 },
 { src: engagement, category: 'Engagements', alt: 'Engagement inspiration: blush floral arch and ivory seating', title: 'The sweetest beginning', width: 1024, height: 1024 },
 { src: birthday, category: 'Birthdays', alt: 'Birthday inspiration: balloons, roses, and a garden cake table', title: 'A little more joy', width: 1024, height: 1024 },
];
export function pageHead(title: string, description: string) {
 return { meta: [{ title: `${title} | Anantha Event Lawns` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Anantha Event Lawns` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
