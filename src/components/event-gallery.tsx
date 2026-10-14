import { useState, useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, X, ArrowUpRight, Instagram } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { photographs, instagram } from '@/lib/event-content';
export function EventGallery({ preview = false }: { preview?: boolean }) {
 const [category, setCategory] = useState('All');
 const [selected, setSelected] = useState<number | null>(null);
 const swipeStart = useRef<number | null>(null);
 const filtered = photographs.filter(p => category === 'All' || p.category === category);
 const active = selected === null ? undefined : filtered[selected];
 const move = (direction: number) => setSelected(value => value === null ? null : (value + direction + filtered.length) % filtered.length);
 useEffect(() => {
  if (selected === null) return;
  const onKey = (e: KeyboardEvent) => { if(e.key === 'ArrowRight') setSelected(v => v === null ? null : (v+1)%filtered.length); if(e.key === 'ArrowLeft') setSelected(v => v === null ? null : (v-1+filtered.length)%filtered.length); };
  window.addEventListener('keydown',onKey); return () => window.removeEventListener('keydown',onKey);
 },[selected, filtered.length]);
 return <section className="section page-width"><div className="section-heading"><div><div className="eyebrow">A glimpse of the possibilities</div><h2 className="section-title">Moments worth imagining.</h2><p className="section-description">Indian-style celebration inspiration. These sample images are not photographs of our venue or past events.</p></div>{preview && <Button variant="editorial" asChild className="text-xs mb-2"><Link to="/gallery">Explore the gallery <ArrowUpRight/></Link></Button>}</div>{!preview && <div className="gallery-filters" role="group" aria-label="Filter photographs">{['All','Weddings','Engagements','Birthdays','Décor'].map(cat => <Button key={cat} size="sm" variant={category===cat ? 'default' : 'ghost'} aria-pressed={category===cat} onClick={()=>{setCategory(cat);setSelected(null);}}>{cat}</Button>)}</div>}<div className="gallery-grid">{(preview ? filtered.slice(0,3) : filtered).map((photo,i) => <Button variant="ghost" className="gallery-tile" onClick={()=>setSelected(i)} key={photo.title} aria-label={`View ${photo.title}`}><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy"/><span className="photo-title">{photo.title}</span></Button>)}</div>{!preview && <div className="mt-10 flex flex-col sm:flex-row justify-between gap-5 items-start sm:items-center"><p className="section-description text-xs">For real celebrations and the latest from Anantha.</p><Button variant="outline" asChild><a href={instagram} target="_blank" rel="noopener noreferrer"><Instagram/> View more on Instagram <ArrowUpRight/></a></Button></div>}
 <Dialog.Root open={selected !== null} onOpenChange={open => {if(!open) setSelected(null);}}><Dialog.Portal><Dialog.Overlay className="lightbox-overlay"/><Dialog.Content className="lightbox" aria-describedby="lightbox-description" onTouchStart={e=>{swipeStart.current=e.touches[0]?.clientX ?? null;}} onTouchEnd={e=>{const end=e.changedTouches[0]?.clientX; if(swipeStart.current !== null && end !== undefined && Math.abs(end-swipeStart.current)>50)move(end<swipeStart.current?1:-1);swipeStart.current=null;}}><div className="lightbox-top"><Dialog.Title className="lightbox-title">{active?.title}</Dialog.Title><Dialog.Close asChild><Button size="icon" variant="lightbox" aria-label="Close photograph"><X/></Button></Dialog.Close></div><Dialog.Description id="lightbox-description" className="sr-only">Illustrative celebration inspiration. Not an actual Anantha event photograph.</Dialog.Description>{active && <img src={active.src} alt={active.alt} width={active.width} height={active.height}/>}<div className="lightbox-bottom"><Button size="icon" variant="lightbox" aria-label="Previous photograph" onClick={()=>move(-1)}><ArrowLeft/></Button><span>{selected === null ? '' : selected+1} / {filtered.length} · Inspiration</span><Button size="icon" variant="lightbox" aria-label="Next photograph" onClick={()=>move(1)}><ArrowRight/></Button></div></Dialog.Content></Dialog.Portal></Dialog.Root>
 </section>;
}
