CREATE TABLE public.event_enquiries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 8 AND 20),
 email text NOT NULL CHECK (char_length(email) <= 254),
 event_type text NOT NULL CHECK (event_type IN ('Wedding','Engagement','Birthday','Other celebration','Venue visit')),
 event_date date NOT NULL,
 guest_count integer NOT NULL CHECK (guest_count BETWEEN 1 AND 100000),
 budget text NOT NULL DEFAULT '' CHECK (char_length(budget) <= 100),
 message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 2000),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.event_enquiries TO anon;
GRANT ALL ON public.event_enquiries TO service_role;
ALTER TABLE public.event_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may send enquiries only" ON public.event_enquiries FOR INSERT TO anon WITH CHECK (true);
CREATE INDEX event_enquiries_email_created ON public.event_enquiries (email, created_at);
CREATE FUNCTION public.limit_event_enquiries() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(lower(NEW.email), 0));
 IF (SELECT count(*) FROM public.event_enquiries WHERE lower(email) = lower(NEW.email) AND created_at > now() - interval '1 hour') >= 3 THEN
 RAISE EXCEPTION 'Please wait before sending another enquiry';
 END IF;
 NEW.created_at := now();
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.limit_event_enquiries() FROM PUBLIC;
CREATE TRIGGER limit_event_enquiries BEFORE INSERT ON public.event_enquiries FOR EACH ROW EXECUTE FUNCTION public.limit_event_enquiries();