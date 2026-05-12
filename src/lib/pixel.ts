/**
 * Meta Pixel TypeScript Wrapper
 *
 * Pixel ID: 1400160342129590 (index.html'de inicialize edilir)
 * Standart event'ler: PageView, Lead, ViewContent, AddToCart, Purchase, Search,
 *   CompleteRegistration, Contact, FindLocation, SubmitApplication, Subscribe
 *
 * Custom event'ler: any string (trackCustom ile)
 *
 * Doc: https://developers.facebook.com/docs/meta-pixel/reference
 */

// Window'a fbq tipi tanımla
declare global {
  interface Window {
    fbq?: (
      command: 'init' | 'track' | 'trackCustom' | 'consent',
      ...args: unknown[]
    ) => void;
    _fbq?: unknown;
  }
}

type StandardEvent =
  | 'PageView'
  | 'Lead'
  | 'ViewContent'
  | 'AddToCart'
  | 'Purchase'
  | 'Search'
  | 'CompleteRegistration'
  | 'Contact'
  | 'FindLocation'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'AddToWishlist';

interface EventParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

/**
 * Standart Meta Pixel event'i tetikle.
 *
 * @example
 *   trackEvent('Lead', { content_name: 'Butik Kayıt', value: 0, currency: 'TRY' });
 */
export function trackEvent(event: StandardEvent, params?: EventParams): void {
  if (typeof window === 'undefined' || !window.fbq) return;

  if (params) {
    window.fbq('track', event, params);
  } else {
    window.fbq('track', event);
  }

  // Dev'de console'a logla — production'da silinmesin (ufak overhead, debug kolaylığı)
  if (import.meta.env.DEV) {
    console.log('[Pixel]', event, params || '');
  }
}

/**
 * Custom event tetikle (standart event listesinde olmayanlar için).
 *
 * @example
 *   trackCustom('DemoTry', { content_name: 'Demoyu Dene CTA' });
 */
export function trackCustom(event: string, params?: EventParams): void {
  if (typeof window === 'undefined' || !window.fbq) return;

  if (params) {
    window.fbq('trackCustom', event, params);
  } else {
    window.fbq('trackCustom', event);
  }

  if (import.meta.env.DEV) {
    console.log('[Pixel:custom]', event, params || '');
  }
}
