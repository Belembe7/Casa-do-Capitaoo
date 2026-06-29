'use client';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem('cdc-session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('cdc-session', id);
  }
  return id;
}

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export async function trackPageView(page: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

  try {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    await supabase.from('page_views').insert({
      page,
      referrer: document.referrer ? new URL(document.referrer).hostname : 'direct',
      device: getDeviceType(),
      session_id: getSessionId(),
    });
  } catch {
    // silent fail
  }
}

export async function trackConversion(
  event_type: string,
  metadata?: { room_id?: string; offer_id?: string; source?: string }
) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

  try {
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    await supabase.from('conversion_events').insert({
      event_type,
      session_id: getSessionId(),
      ...metadata,
    });
  } catch {
    // silent fail
  }
}
