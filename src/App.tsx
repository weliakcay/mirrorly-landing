import MarketingLanding from './components/MarketingLanding';
import { trackEvent, trackCustom } from './lib/pixel';
import i18n from './i18n';

// App'in canli URL'i - landing'den buraya yonlendiriyoruz.
// Mevcut Vercel project (mirrorly-app-main) DEGISMEDI.
const APP_URL = 'https://mirrorly-app.vercel.app';
const DEMO_GARMENT_ID = 'g1';
const DEMO_MERCHANT_ID = 'demo-merchant';

// Landing'de seçili dili app'e taşı (localStorage origin-başına ayrı; köprü = ?lang=)
const withLang = (url: string) => {
  const lng = (i18n.language || 'tr').split('-')[0];
  return `${url}${url.includes('?') ? '&' : '?'}lang=${lng}`;
};

function App() {
  // "Butiğimi Kur" CTA — en kritik conversion (Lead event)
  const handleMerchantSignup = () => {
    trackEvent('Lead', {
      content_name: 'Mağaza Kayıt CTA',
      content_category: 'merchant_signup',
    });
    window.open(withLang(APP_URL), '_blank', 'noopener,noreferrer');
  };

  // "Demoyu Dene" CTA — top-of-funnel etkileşim (custom event)
  const handleCustomerDemo = () => {
    trackCustom('DemoTry', {
      content_name: 'Demoyu Dene CTA',
      content_category: 'customer_demo',
    });
    window.open(
      withLang(`${APP_URL}/?id=${DEMO_GARMENT_ID}&m=${DEMO_MERCHANT_ID}`),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <MarketingLanding
      onMerchantSignup={handleMerchantSignup}
      onCustomerDemo={handleCustomerDemo}
    />
  );
}

export default App;
