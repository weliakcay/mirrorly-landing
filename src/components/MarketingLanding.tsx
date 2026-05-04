import { useState } from 'react';
import {
  ArrowRight,
  Tag,
  Scan,
  Smartphone,
  ShoppingBag,
  Store,
  Globe,
  Users,
  ChevronDown,
  Mail,
  Instagram,
  MessageCircle,
  Upload,
  QrCode,
} from 'lucide-react';

interface MarketingLandingProps {
  onMerchantSignup: () => void;
  onCustomerDemo: () => void;
}

// ─── ABSTRACT VISUAL COMPONENTS ─────────────────────────────────

// Gold dust particle field — Problem & Final CTA için
const GoldDustField = ({ density = 30, opacity = 0.4 }: { density?: number; opacity?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
    {[...Array(density)].map((_, i) => {
      const size = Math.random() * 4 + 1;
      const top = Math.random() * 100;
      const delay = Math.random() * 12;
      const direction = i % 2 === 0 ? 'animate-drift-right' : 'animate-drift-left';
      return (
        <span
          key={i}
          className={`absolute ${direction}`}
          style={{
            top: `${top}%`,
            left: 0,
            width: `${size}px`,
            height: `${size}px`,
            background: i % 3 === 0 ? '#C9A961' : '#EBE3D2',
            animationDelay: `${delay}s`,
          }}
        />
      );
    })}
  </div>
);

// Floating particles up (Hero kart içi) — partiküller yukarı süzülür
const FloatingParticles = ({ count = 18 }: { count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(count)].map((_, i) => {
      const size = Math.random() * 6 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = 6 + Math.random() * 5;
      return (
        <span
          key={i}
          className="absolute rounded-full animate-float-up"
          style={{
            bottom: '-10px',
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: i % 4 === 0 ? '#C9A961' : '#EBE3D2',
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            opacity: 0.6,
          }}
        />
      );
    })}
  </div>
);

// Mirror ripple — Demo CTA arkası, ayna dalga halkaları
const MirrorRipple = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[0, 1.3, 2.6].map((delay, i) => (
      <div
        key={i}
        className="absolute rounded-full border border-mirrorly-gold/40 animate-ripple"
        style={{
          width: '200px',
          height: '200px',
          animationDelay: `${delay}s`,
        }}
      />
    ))}
  </div>
);

// Silk wave — Hero kartı arkasında ipek dalgalanması (SVG gradient)
const SilkWaveBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full animate-silk-wave"
    viewBox="0 0 400 500"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="silk1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EBE3D2" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#C9A961" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="silk2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F5EFE3" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#EBE3D2" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <path
      d="M0,150 Q100,100 200,180 T400,160 L400,500 L0,500 Z"
      fill="url(#silk1)"
    />
    <path
      d="M0,280 Q120,220 220,300 T400,280 L400,500 L0,500 Z"
      fill="url(#silk2)"
    />
  </svg>
);

// Hangtag SVG — 4 Adım kartları üstü, küçük etiket
const HangtagIcon = ({ variant = 1 }: { variant?: 1 | 2 | 3 | 4 }) => (
  <svg
    width="44"
    height="56"
    viewBox="0 0 44 56"
    fill="none"
    className="animate-hangtag-sway"
  >
    {/* İp */}
    <line x1="22" y1="0" x2="22" y2="6" stroke="#6B6359" strokeWidth="1" />
    {/* Etiket gövdesi */}
    <path
      d="M8 8 L36 8 L36 50 L8 50 Z"
      fill="#FAFAF7"
      stroke="#C9A961"
      strokeWidth="1.5"
    />
    {/* İp deliği */}
    <circle cx="22" cy="11" r="1.5" fill="none" stroke="#6B6359" strokeWidth="0.8" />
    {/* Variant'a göre içerik */}
    {variant === 1 && (
      // 1: yeni asılı, küçük QR pattern
      <g transform="translate(14, 22)">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 6}
              y={row * 6}
              width="4"
              height="4"
              fill={(row + col) % 2 === 0 ? '#1F1B16' : '#C9A961'}
            />
          ))
        )}
      </g>
    )}
    {variant === 2 && (
      // 2: yüklenmiş, üç çizgi (bilgi satırları)
      <g>
        <line x1="14" y1="24" x2="30" y2="24" stroke="#1F1B16" strokeWidth="1" />
        <line x1="14" y1="30" x2="30" y2="30" stroke="#1F1B16" strokeWidth="1" />
        <line x1="14" y1="36" x2="26" y2="36" stroke="#C9A961" strokeWidth="1" />
      </g>
    )}
    {variant === 3 && (
      // 3: QR çıktı — büyük QR
      <g transform="translate(13, 21)">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 4.5}
              y={row * 4.5}
              width="3"
              height="3"
              fill={
                (row === 0 && col === 0) ||
                (row === 0 && col === 3) ||
                (row === 3 && col === 0) ||
                (row + col) % 3 === 0
                  ? '#1F1B16'
                  : 'transparent'
              }
            />
          ))
        )}
      </g>
    )}
    {variant === 4 && (
      // 4: yapışmış — küçük tutkal/yapışkan etkisi
      <g>
        <rect x="14" y="24" width="16" height="16" fill="none" stroke="#C9A961" strokeWidth="1" strokeDasharray="2,2" />
        <circle cx="22" cy="32" r="3" fill="#C9A961" opacity="0.3" />
        <circle cx="22" cy="32" r="1.5" fill="#1F1B16" />
      </g>
    )}
  </svg>
);

// Empty hangtag silhouettes — Sosyal Kanıt placeholder için 5 boş etiket
const EmptyHangtagRow = () => (
  <div className="flex items-end justify-center gap-4 sm:gap-6 mb-8">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg
        key={i}
        width="48"
        height="64"
        viewBox="0 0 48 64"
        fill="none"
        className="animate-hangtag-sway"
        style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${3 + i * 0.3}s` }}
      >
        <line x1="24" y1="0" x2="24" y2="8" stroke="#C9A961" strokeWidth="1" />
        <path
          d="M10 10 L38 10 L38 56 L10 56 Z"
          fill="none"
          stroke="#C9A961"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <circle cx="24" cy="14" r="1.8" fill="none" stroke="#C9A961" strokeWidth="0.8" opacity="0.5" />
      </svg>
    ))}
  </div>
);

// Card mood patterns — 3 Kart üst banner için (her paydaşa farklı abstract)
const ReelBoutiquePattern = () => (
  <svg className="absolute inset-x-0 top-0 w-full h-32" viewBox="0 0 400 128" preserveAspectRatio="none">
    <defs>
      <linearGradient id="reelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#C9A961" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#1F1B16" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="400" height="128" fill="url(#reelGrad)" />
    {/* Brass askı çubuğu */}
    <line x1="20" y1="40" x2="380" y2="40" stroke="#C9A961" strokeWidth="2" />
    {/* Askıdaki kıyafetler — abstract trapezoidler */}
    {[60, 130, 200, 270, 340].map((x, i) => (
      <g key={i}>
        <line x1={x} y1="40" x2={x} y2="55" stroke="#C9A961" strokeWidth="1" />
        <path
          d={`M${x - 18},55 L${x + 18},55 L${x + 24},110 L${x - 24},110 Z`}
          fill="#C9A961"
          opacity={0.15 + i * 0.05}
        />
      </g>
    ))}
  </svg>
);

const OnlineSellerPattern = () => (
  <svg className="absolute inset-x-0 top-0 w-full h-32" viewBox="0 0 400 128" preserveAspectRatio="none">
    {/* Stacked layered fabric */}
    {[0, 1, 2, 3, 4].map((i) => (
      <rect
        key={i}
        x={20 + i * 4}
        y={20 + i * 12}
        width={360 - i * 8}
        height="14"
        rx="2"
        fill="#1F1B16"
        opacity={0.6 - i * 0.08}
      />
    ))}
    {/* Gold thread accent */}
    <line x1="40" y1="100" x2="200" y2="100" stroke="#1F1B16" strokeWidth="0.5" />
    <circle cx="40" cy="100" r="2" fill="#1F1B16" />
  </svg>
);

const CustomerPattern = () => (
  <svg className="absolute inset-x-0 top-0 w-full h-32" viewBox="0 0 400 128" preserveAspectRatio="none">
    <defs>
      <radialGradient id="mirrorGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EBE3D2" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#F5EFE3" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Soft mirror reflection ovals */}
    <ellipse cx="200" cy="64" rx="160" ry="40" fill="url(#mirrorGrad)" />
    <ellipse cx="200" cy="64" rx="120" ry="28" fill="url(#mirrorGrad)" />
    {/* Subtle ripple lines */}
    <ellipse cx="200" cy="64" rx="180" ry="48" fill="none" stroke="#C9A961" strokeWidth="0.5" opacity="0.4" />
    <ellipse cx="200" cy="64" rx="100" ry="22" fill="none" stroke="#C9A961" strokeWidth="0.3" opacity="0.3" />
  </svg>
);

// ─── MAIN COMPONENT ─────────────────────────────────────────────

const MarketingLanding = ({ onMerchantSignup, onCustomerDemo }: MarketingLandingProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Mağaza olarak nasıl kayıt olurum?',
      a: 'Sağ üstteki "Butiğimi Kur" butonuna bas, Google hesabınla gir, butik adı + iletişim bilgisi doldur. 2 dakikada panele giriyorsun, ilk ürününü yükleyebiliyorsun. Şahıs şirketi de Ltd de fark etmez.',
    },
    {
      q: 'Trendyol\'da satıyorum, benim için işe yarar mı?',
      a: 'Evet. Ürünü Mirrorly\'ye yükle, üretilen QR\'ı Trendyol görselinin köşesine ekle veya ürün açıklamasına link olarak koy. Müşteri okuttuğunda kendi vücudunda görüyor — Trendyol\'dan çıkmasına gerek yok, geri dönüyor satın alıyor.',
    },
    {
      q: 'Müşterilerim deneme yapmak için ne yapacak?',
      a: 'Telefonun kamerasıyla etiketteki QR\'ı okutuyor, sayfa açılıyor, kendi fotoğrafını yüklüyor, 5–10 saniyede kıyafet kendi üstünde çıkıyor. Hesap açmasına gerek yok, ilk denemesi anında.',
    },
    {
      q: 'Aylık ne kadar?',
      a: 'Şu an erken erişim aşamasındayız. İlk butiklere özel fiyat e-posta ile gönderiliyor — kayıt ol, biz seninle iletişime geçelim. Plan: ürün başına değil, butik başına aylık sabit ücret.',
    },
    {
      q: 'QR\'ı nasıl yazdırırım?',
      a: 'Panelden her ürünün QR\'ını PDF olarak indiriyorsun — A6 etiket boyutunda, kuşe kâğıda yazdır, ürünün etiketinin yanına yapıştır. İstersen mevcut fiyat etiketinin arkasına da basabilirsin.',
    },
  ];

  const steps = [
    { icon: Store, title: 'Butiğini kaydet', desc: 'Google ile gir, butik bilgilerini doldur, 2 dakikada hazır.', tagVariant: 1 as const },
    { icon: Upload, title: 'Ürünü yükle', desc: 'Kıyafetin fotoğrafını çek, sisteme yükle, fiyat ve beden gir.', tagVariant: 2 as const },
    { icon: QrCode, title: 'QR\'ı çıkar', desc: 'Her ürüne özel QR otomatik üretilir, A6 etiket olarak yazdır.', tagVariant: 3 as const },
    { icon: Tag, title: 'Etiketi yapıştır', desc: 'Mağazada ürünün üstüne, online satıştaysa görsele ekle — gerisi müşteride.', tagVariant: 4 as const },
  ];

  return (
    <div className="w-full min-h-screen bg-mirrorly-cream text-mirrorly-stone font-sans antialiased overflow-x-hidden">
      {/* ─── STICKY NAV ────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-mirrorly-cream/85 border-b border-mirrorly-paper/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/brand/logo-primary.png"
              alt="Mirrorly"
              className="h-9 w-auto"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="font-serif text-2xl tracking-tight text-mirrorly-black lowercase">mirrorly</span>
          </a>
          <button
            onClick={onMerchantSignup}
            className="text-sm font-medium text-mirrorly-stone hover:text-mirrorly-black transition-colors px-4 py-2 rounded-full border border-mirrorly-paper hover:border-mirrorly-gold/60 bg-white/40"
          >
            Mağaza Girişi
          </button>
        </div>
      </nav>

      {/* ─── HERO — FULL-BLEED SANATSAL ─────────────────── */}
      <section className="relative min-h-[100vh] w-full overflow-hidden -mt-[73px] pt-[73px]">
        {/* Background — sanatsal görsel veya fallback */}
        <div className="absolute inset-0">
          {/* Sanatsal hero görseli (Veli yükleyecek) */}
          <img
            src="/brand/hero-art.png"
            alt="Mirrorly"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Fallback — görsel gelmediyse zengin gradient + animasyon */}
          <div className="absolute inset-0 bg-gradient-to-br from-mirrorly-paper via-mirrorly-cream to-mirrorly-gold/40">
            <SilkWaveBackground />
            <FloatingParticles count={30} />
            {/* Soft radial glow */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(201,169,97,0.25), transparent 70%)',
              }}
            />
          </div>
        </div>

        {/* Overlay gradient — sol taraf okunaklı kalsın */}
        <div className="absolute inset-0 bg-gradient-to-r from-mirrorly-cream/95 via-mirrorly-cream/70 to-mirrorly-cream/10 md:from-mirrorly-cream/90 md:via-mirrorly-cream/40 md:to-transparent" />

        {/* Content */}
        <div className="relative z-10 min-h-[calc(100vh-73px)] flex items-center px-5 sm:px-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="max-w-2xl py-16 sm:py-24 animate-fade-in">
              <p className="text-xs uppercase tracking-[0.35em] text-mirrorly-gold font-semibold mb-6">
                Scan. Style. Try on.
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-mirrorly-black leading-[1.02] tracking-tight mb-8">
                Etiketi okut.
                <br />
                <span className="italic text-mirrorly-stone">Üstünde gör.</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-mirrorly-stone leading-relaxed mb-10 max-w-xl">
                Müşterin kabine girmeden, kıyafetin kendi üstünde nasıl durduğunu telefonunda görsün.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={onMerchantSignup}
                  className="group inline-flex items-center justify-center gap-2 bg-mirrorly-black text-mirrorly-cream px-7 py-4 rounded-full font-medium text-base shadow-2xl hover:shadow-mirrorly-gold/30 hover:bg-mirrorly-stone transition-all"
                >
                  Butiğimi Kur
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={onCustomerDemo}
                  className="inline-flex items-center justify-center gap-2 bg-mirrorly-gold/15 backdrop-blur-sm border border-mirrorly-gold/50 hover:bg-mirrorly-gold/25 hover:border-mirrorly-gold text-mirrorly-black px-7 py-4 rounded-full font-medium text-base transition-all"
                >
                  <Scan className="w-4 h-4" />
                  Demoyu Dene
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alt kenar — narrow gold accent line */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-mirrorly-gold/60 to-transparent" />
      </section>

      {/* ─── PROBLEM ────────────────────────────────────── */}
      <section className="relative bg-mirrorly-black text-mirrorly-cream py-20 sm:py-28 overflow-hidden">
        {/* Üst altın toz şeridi */}
        <div className="absolute top-0 inset-x-0 h-24">
          <GoldDustField density={40} opacity={0.5} />
        </div>
        {/* Alt altın toz şeridi (ters yön) */}
        <div className="absolute bottom-0 inset-x-0 h-24">
          <GoldDustField density={40} opacity={0.4} />
        </div>

        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 z-10">
          <p className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            Müşterin vitrini gördü, içeri girmedi. Kabin sırasını bekledi, çıkıp gitti. Online'dan aldı, üstüne uymadı, geri yolladı.
            <br />
            <span className="block mt-6 text-mirrorly-cream/70 text-2xl sm:text-3xl md:text-4xl italic">
              Üç farklı sahne — tek bir soru:
            </span>
            <span className="block mt-3 text-mirrorly-gold">"Bende nasıl durur?"</span>
          </p>
        </div>
      </section>

      {/* ─── ÇÖZÜM / 4 ADIM ─────────────────────────────── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">
              Etiketin İkinci Hayatı
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-mirrorly-black tracking-tight">
              4 adımda kur.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-mirrorly-paper hover:border-mirrorly-gold/50 transition-colors relative"
                >
                  {/* Sallanan hangtag — kart üstünde */}
                  <div className="absolute -top-6 right-6">
                    <HangtagIcon variant={step.tagVariant} />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-mirrorly-cream flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-mirrorly-gold" strokeWidth={1.75} />
                  </div>
                  <p className="font-serif text-3xl text-mirrorly-gold mb-2">{i + 1}</p>
                  <h3 className="font-serif text-xl text-mirrorly-black mb-2">{step.title}</h3>
                  <p className="text-sm text-mirrorly-stone leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── KİM İÇİN? — 3 KART ─────────────────────────── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 bg-mirrorly-paper/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">Kim için?</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-mirrorly-black tracking-tight">
              Üç ayrı dünya, tek etiket.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Reel Butikler */}
            <div className="bg-mirrorly-black text-mirrorly-cream rounded-3xl p-8 sm:p-10 pt-32 relative overflow-hidden">
              <ReelBoutiquePattern />
              <Store className="w-7 h-7 text-mirrorly-gold mb-6 relative z-10" strokeWidth={1.75} />
              <h3 className="font-serif text-2xl mb-1 relative z-10">Reel butikler</h3>
              <p className="italic text-mirrorly-gold/90 mb-5 text-sm relative z-10">Kabin sırasını sıfırla.</p>
              <p className="text-sm text-mirrorly-cream/80 leading-relaxed mb-6 relative z-10">
                Müşterin rafa baktığı an, telefonunu çıkarıp etiketi okutuyor. Kıyafet 5 saniyede kendi vücudunda görünüyor. Hangi bedeni alacağına karar veriyor, sıraya girmeden kasaya geliyor.
              </p>
              <ul className="space-y-2.5 text-sm text-mirrorly-cream/90 mb-6 relative z-10">
                <li className="flex gap-2"><span className="text-mirrorly-gold">·</span> Kabin doluluğu düşer, kasa hızlanır</li>
                <li className="flex gap-2"><span className="text-mirrorly-gold">·</span> Müşteri 3 yerine 8 ürün dener</li>
                <li className="flex gap-2"><span className="text-mirrorly-gold">·</span> "Sadece bakıyorum"u satışa çevir</li>
              </ul>
              <p className="text-xs text-mirrorly-cream/60 italic border-t border-mirrorly-cream/20 pt-4 relative z-10">
                Cumartesi öğleden sonra, 3 müşteri aynı anda kabini bekler. İkisi etiketi okutur, biri kabine girer.
              </p>
            </div>

            {/* Online Satıcılar */}
            <div className="bg-mirrorly-gold text-mirrorly-black rounded-3xl p-8 sm:p-10 pt-32 relative overflow-hidden">
              <OnlineSellerPattern />
              <Globe className="w-7 h-7 text-mirrorly-black mb-6 relative z-10" strokeWidth={1.75} />
              <h3 className="font-serif text-2xl mb-1 relative z-10">Online satıcılar</h3>
              <p className="italic mb-5 text-sm relative z-10">Trendyol, kendi siten, Instagram — fark etmez.</p>
              <p className="text-sm leading-relaxed mb-6 relative z-10">
                Ürün görseline veya kart açıklamasına QR ekle. Müşteri ürünü beğendiğinde "üstümde nasıl durur?" sorusuna senin sayfanda cevap bulur. Sepete eklerken karar net olur, iade düşer.
              </p>
              <ul className="space-y-2.5 text-sm mb-6 relative z-10">
                <li className="flex gap-2"><span>·</span> İade oranını düşür</li>
                <li className="flex gap-2"><span>·</span> Sepet terk azalır</li>
                <li className="flex gap-2"><span>·</span> Trendyol görseline QR damgası yeter</li>
              </ul>
              <p className="text-xs italic border-t border-mirrorly-black/20 pt-4 relative z-10">
                Müşteri Trendyol'da elbiseyi görür, fotoğraftaki QR'ı okutur, kendi üstünde görür, sipariş verir.
              </p>
            </div>

            {/* Son Kullanıcılar */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 pt-32 border border-mirrorly-paper relative overflow-hidden">
              <CustomerPattern />
              <Users className="w-7 h-7 text-mirrorly-gold mb-6 relative z-10" strokeWidth={1.75} />
              <h3 className="font-serif text-2xl text-mirrorly-black mb-1 relative z-10">Son kullanıcılar</h3>
              <p className="italic text-mirrorly-stone mb-5 text-sm relative z-10">Beğen, okut, üstünde gör.</p>
              <p className="text-sm text-mirrorly-stone leading-relaxed mb-6 relative z-10">
                Mağazada veya internette gördüğün kıyafetin etiketini telefona okut. Kendi fotoğrafından oluşturulmuş model üstünde anında gör. Beğendiğini kaydet, almadığını unut.
              </p>
              <ul className="space-y-2.5 text-sm text-mirrorly-stone mb-6 relative z-10">
                <li className="flex gap-2"><span className="text-mirrorly-gold">·</span> Kabinde sıra beklemek yok</li>
                <li className="flex gap-2"><span className="text-mirrorly-gold">·</span> Kendine yakışıp yakışmadığını tek bakışta gör</li>
                <li className="flex gap-2"><span className="text-mirrorly-gold">·</span> Denediklerini telefonunda saklan</li>
              </ul>
              <p className="text-xs text-mirrorly-stone/70 italic border-t border-mirrorly-paper pt-4 relative z-10">
                AVM'de gözüne takılan elbiseyi okutursun, üstünde görürsün, başka mağazaya bakmadan karar verirsin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DEMO ───────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
        <MirrorRipple />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">İlk denemen</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-mirrorly-black tracking-tight mb-5">
            Önce sen dene.
          </h2>
          <p className="text-base sm:text-lg text-mirrorly-stone leading-relaxed mb-10 max-w-xl mx-auto">
            Demo butiğimizde 5 kıyafet hazır bekliyor. QR'ı telefonunla okut, kendi fotoğrafını yükle, sonucu gör. 30 saniye.
          </p>
          <button
            onClick={onCustomerDemo}
            className="group inline-flex items-center justify-center gap-2 bg-mirrorly-gold text-mirrorly-black px-8 py-4 rounded-full font-medium text-base animate-soft-pulse hover:bg-mirrorly-gold/90 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            Demoyu Aç
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* ─── SOSYAL KANIT (PLACEHOLDER) ──────────────────── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 bg-mirrorly-paper/30 border-y border-mirrorly-paper">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">Yakında</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-mirrorly-black tracking-tight mb-8">
            İlk butik vakaları geliyor.
          </h2>
          <EmptyHangtagRow />
          <p className="text-base text-mirrorly-stone leading-relaxed mb-8 max-w-xl mx-auto">
            İlk pilot butiklerimizle çalışıyoruz. İlk vaka çalışmaları (kabin trafiği, iade düşüşü, satışa dönüşüm) burada yayınlanacak. <span className="text-mirrorly-black font-medium">Sıradaki sen olabilirsin.</span>
          </p>
          <a
            href="mailto:weliakcay@gmail.com?subject=Mirrorly%20Bekleme%20Listesi"
            className="inline-flex items-center justify-center gap-2 bg-white border border-mirrorly-paper hover:border-mirrorly-gold/70 text-mirrorly-black px-7 py-3 rounded-full font-medium text-sm transition-all"
          >
            <Mail className="w-4 h-4" />
            Bekleme Listesine Katıl
          </a>
        </div>
      </section>

      {/* ─── SSS ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 grain-overlay">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">
              Sıkça Sorulanlar
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-mirrorly-black tracking-tight">
              Aklında soru var?
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-white rounded-2xl border border-mirrorly-paper overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-mirrorly-cream/50 transition-colors"
                  >
                    <span className="font-serif text-lg text-mirrorly-black">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-mirrorly-gold flex-shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.75}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-mirrorly-stone leading-relaxed text-[15px]">{item.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FİNAL CTA ──────────────────────────────────── */}
      <section className="relative bg-mirrorly-black text-mirrorly-cream py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
        <GoldDustField density={50} opacity={0.3} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-6">
            Butiğin için 2 dakika.
            <br />
            Müşterin için saniyeler.
          </h2>
          <p className="text-base sm:text-lg text-mirrorly-cream/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Mirrorly'yi bugün kur, ilk QR'ını bu hafta yapıştır.
          </p>
          <button
            onClick={onMerchantSignup}
            className="group inline-flex items-center justify-center gap-2 bg-mirrorly-gold text-mirrorly-black px-9 py-5 rounded-full font-medium text-lg shadow-2xl hover:bg-mirrorly-cream transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            Butiğimi Şimdi Kur
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <div className="mt-6">
            <button
              onClick={onCustomerDemo}
              className="text-sm text-mirrorly-cream/60 hover:text-mirrorly-gold transition-colors underline-offset-4 hover:underline"
            >
              Önce demoyu görmek istiyorum →
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────── */}
      <footer className="bg-mirrorly-cream border-t border-mirrorly-paper px-5 sm:px-8 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-xl text-mirrorly-black lowercase mb-1">mirrorly</p>
            <p className="text-xs uppercase tracking-[0.25em] text-mirrorly-stone/60">
              Scan. Style. Try on.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-mirrorly-stone">
            <a href="mailto:weliakcay@gmail.com" className="flex items-center gap-1.5 hover:text-mirrorly-black transition-colors">
              <Mail className="w-4 h-4" /> Mail
            </a>
            <a
              href="https://instagram.com/mirrorlyapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-mirrorly-black transition-colors"
            >
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-mirrorly-black transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-mirrorly-stone/60">
            <a href="#" className="hover:text-mirrorly-stone">KVKK</a>
            <a href="#" className="hover:text-mirrorly-stone">Gizlilik</a>
            <a href="#" className="hover:text-mirrorly-stone">Kullanım Koşulları</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketingLanding;
