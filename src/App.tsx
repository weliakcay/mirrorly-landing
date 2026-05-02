import MarketingLanding from './components/MarketingLanding';

// App'in canli URL'i - landing'den buraya yonlendiriyoruz.
// Mevcut Vercel project (mirrorly-app-main) DEGISMEDI.
const APP_URL = 'https://mirrorly-app.vercel.app';
const DEMO_GARMENT_ID = 'g1';

function App() {
  const handleMerchantSignup = () => {
    window.open(APP_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCustomerDemo = () => {
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
