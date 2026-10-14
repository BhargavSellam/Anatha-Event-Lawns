import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/event-content';
import { PageHeading, CelebrationCTA } from '@/components/venue-sections';
import { EventGallery } from '@/components/event-gallery';
export const Route = createFileRoute('/gallery')({ head:()=>pageHead('Celebration Gallery','Discover Indian-style wedding, engagement, birthday, and décor inspiration for your event at Anantha Event Lawns.'), component:Gallery });
function Gallery(){return <main><PageHeading eyebrow="The celebration collection" title="A little inspiration. Endless possibilities." description="Explore the colours, traditions, and details that make a celebration feel extraordinary. Original Anantha event photographs are coming soon."/><EventGallery/><CelebrationCTA/></main>;}
