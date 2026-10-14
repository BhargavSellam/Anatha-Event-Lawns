import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { pageHead } from '@/lib/event-content';
import { PageHeading, EventCards, Journey, FAQs } from '@/components/venue-sections';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/events')({ head:()=>pageHead('Events & Services','Explore weddings, engagements, birthdays, and event enquiries at Anantha Event Lawns in Vizag.'), component:Events });
function Events(){return <main><PageHeading eyebrow="Occasions, beautifully celebrated" title="For every chapter of life." description="A promise. A milestone. A reason to bring everyone together. Let’s plan a celebration that feels like you."/><section className="section page-width"><EventCards/><div className="mt-14 pt-9 border-t border-border grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-6 items-center"><div><h2 className="font-display text-3xl mb-3">Something else to celebrate?</h2><p className="section-description">Tell us about your occasion. Other celebrations and additional services are subject to confirmation.</p></div><Button variant="outline" asChild><Link to="/contact" search={{event:'Other celebration'}}>Share your plans <ArrowUpRight/></Link></Button></div></section><Journey/><FAQs/></main>;}
