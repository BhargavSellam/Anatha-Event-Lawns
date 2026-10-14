import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/event-content';
import { PageHeading, AboutSection, Journey, CelebrationCTA } from '@/components/venue-sections';
export const Route = createFileRoute('/about')({ head:()=>pageHead('Our Story','Get to know Anantha Event Lawns | By Jampana, bringing weddings, engagements, and family celebrations together in Vizag.'), component:About });
function About(){return <main><PageHeading eyebrow="Our story" title="Celebrations with heart." description="Anantha Event Lawns | By Jampana. A place for new beginnings, togetherness, and life’s most meaningful moments."/><AboutSection full/><Journey/><CelebrationCTA/></main>;}
