import MarketingLanding from './components/MarketingLanding';
import { trackEvent, trackCustom } from './lib/pixel';

// App'in canli URL'i - landing'den buraya yonlendiriyoruz.
// Mevcut Vercel project (mirrorly-app-main) DEGISMEDI.
const APP_URL = 'https://mirrorly-app.vercel.app';
const DEMO_GARMENT_ID = 'g1';

function App() {
  // "Butiğimi Kur" CTA — en kritik conversion (Lead event)
  const handleMerchantSignup = () => {
    trackEvent('Lead', {
      content_name: 'Mağaza Kayıt CTA',
      content_category: 'merchant_signup',
    });
    window.open(APP_URL, '_blank', 'noopener,noreferrer');
  };

  // "Demoyu Dene" CTA — top-of-funnel etkileşim (custom event)
  const handleCustomerDemo = () => {
    trackCustom('DemoTry', {
      content_name: 'Demoyu Dene CTA',
      content_category: 'customer_demo',
    });
    window.open(`${APP_URL}/?id=${DEMO_GARMENT_ID}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <MarketingLanding
      onMerchantSignup={handleMerchantSignup}
      onCustomerDemo={handleCustomerDemo}
    />
  );
}

export default App;
