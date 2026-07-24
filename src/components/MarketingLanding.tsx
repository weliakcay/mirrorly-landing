import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  Plus,
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

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


// ─── HERO SLIDER ────────────────────────────────────────────────
// CodePen (Swiper) hero'sunun Mirrorly uyarlaması: 3 tam-ekran slayt,
// otomatik dönme + crossfade + yavaş ken-burns (parallax hissi) + sola
// hizalı serif başlık. Koyu-navy tema yerine sıcak krem/altın marka dili.
const HERO_SLIDES = [
  {
    image: '/brand/generated/hero.jpg',
    eyebrow: 'Scan. Style. Try on.',
    line1: 'Etiketi okut.',
    line2: 'Üstünde gör.',
    text: 'Müşteriniz kabine girmeden, kıyafeti kendi üstünde telefonunda görür.',
  },
  {
    image: '/brand/generated/slide2.jpg',
    eyebrow: 'Kabin kuyruğu yok',
    line1: 'Deneme,',
    line2: 'saniyeler içinde.',
    text: 'Etiketteki QR’ı okutur, fotoğrafını çeker; kıyafet anında üzerinde belirir.',
  },
  {
    image: '/brand/generated/slide3.jpg',
    eyebrow: 'Tam self-servis',
    line1: '5 dakikada',
    line2: 'butiğinizi kurun.',
    text: 'Kendiniz kaydolur, ürünlerinizi yükler; her ürüne özel QR otomatik oluşur.',
  },
];

const HeroSlider = ({
  onMerchantSignup,
  onCustomerDemo,
}: {
  onMerchantSignup: () => void;
  onCustomerDemo: () => void;
}) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(id);
  }, [paused, active]);

  const slide = HERO_SLIDES[active];

  return (
    <section
      className="relative min-h-[100vh] w-full overflow-hidden -mt-[73px] pt-[73px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Arka plan slaytları — crossfade + yavaş zoom */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== active}
        >
          <img
            src={s.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover object-right transition-transform ease-out ${
              i === active ? 'scale-110 duration-[8000ms]' : 'scale-100 duration-0'
            }`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Overlay — sol taraf okunaklı kalsın (marka: krem, koyu değil) */}
          <div className="absolute inset-0 bg-gradient-to-r from-mirrorly-cream/95 via-mirrorly-cream/70 to-mirrorly-cream/10 md:from-mirrorly-cream/92 md:via-mirrorly-cream/45 md:to-transparent" />
        </div>
      ))}

      {/* İçerik — aktif slayt her değişimde yeniden animasyonla girer */}
      <div className="relative z-10 min-h-[calc(100vh-73px)] flex items-center px-5 sm:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div key={active} className="max-w-2xl py-16 sm:py-24 animate-fade-in">
            <p className="text-xs uppercase tracking-[0.35em] text-mirrorly-gold font-semibold mb-6">
              {t(slide.eyebrow)}
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-mirrorly-black leading-[1.02] tracking-tight mb-8">
              {t(slide.line1)}
              <br />
              <span className="italic text-mirrorly-stone">{t(slide.line2)}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-mirrorly-stone leading-relaxed mb-10 max-w-xl">
              {t(slide.text)}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onMerchantSignup}
                className="group inline-flex items-center justify-center gap-2 bg-mirrorly-black text-mirrorly-cream px-7 py-4 rounded-full font-medium text-base shadow-2xl hover:shadow-mirrorly-gold/30 hover:bg-mirrorly-stone transition-all"
              >
                {t('Butiğimi Kur')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onCustomerDemo}
                className="inline-flex items-center justify-center gap-2 bg-mirrorly-gold/15 backdrop-blur-sm border border-mirrorly-gold/50 hover:bg-mirrorly-gold/25 hover:border-mirrorly-gold text-mirrorly-black px-7 py-4 rounded-full font-medium text-base transition-all"
              >
                <Scan className="w-4 h-4" />
                {t('Demoyu Dene')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination — alt-sol, altın aktif çubuk */}
      <div className="absolute bottom-8 inset-x-0 z-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-2.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={t(`Slayt ${i + 1}`)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-9 bg-mirrorly-gold' : 'w-4 bg-mirrorly-black/25 hover:bg-mirrorly-black/45'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Alt kenar — narrow gold accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-mirrorly-gold/60 to-transparent" />
    </section>
  );
};

// ─── KİM İÇİN — ACCORDION ───────────────────────────────────────
// CodePen "accordion slider" mekaniğinin Mirrorly uyarlaması: masaüstünde
// 3 yatay panel (grid fr ile genişler), grayscale yerine sıcak sepya/desatüre
// + krem/siyah overlay (marka dili korunur); dikey etiket aktifte yatay
// eyebrow'a döner, ghost rakam dolu altına döner, içerik stagger'la girer.
// Otomatik döngü kullanıcı etkileşince kalıcı durur. Mobilde dikey kart yığını.
// Copy: tasarım paneli sentezi + [[00-beyin/urun-gercekleri]].
type Audience = {
  key: string;
  image: string;
  icon: typeof Store;
  brandLabel: string;
  number: string;
  title: string;
  subtitle: string;
  specs: { label: string; value: string }[];
  badges: string[];
  cta: 'merchant' | 'demo';
};

const AUDIENCES: Audience[] = [
  {
    key: 'boutique',
    image: '/brand/generated/who-boutique.jpg',
    icon: Store,
    brandLabel: 'Mağaza',
    number: '01',
    title: 'Kabin sırasını sıfırla',
    subtitle: 'Rafta beğenir, etiketi okutur, kabine girmeden üstünde görür.',
    specs: [
      { label: 'Akış', value: 'Etiketi okut, saniyeler içinde üstünde gör' },
      { label: 'Kanal', value: 'Vitrin, raf, prova alanı' },
      { label: 'Kurulum', value: 'Ürün başına otomatik QR' },
      { label: 'Sonuç', value: 'Kabin sırası yerine seçici deneme' },
    ],
    badges: ['Kabin sırası biter', 'Daha çok ürün denenir', 'Ayrılan müşteri kaybolmaz'],
    cta: 'merchant',
  },
  {
    key: 'online',
    image: '/brand/generated/who-online.jpg',
    icon: Globe,
    brandLabel: 'Online',
    number: '02',
    title: 'Trendyol, kendi siten, Instagram — fark etmez',
    subtitle: 'Görsele bir QR ekle, "üstümde nasıl durur?" sorusuna sepette cevap ver.',
    specs: [
      { label: 'Akış', value: "Görseldeki QR'ı okut, üstünde gör" },
      { label: 'Kanal', value: 'Trendyol, web sitesi, sosyal medya' },
      { label: 'Kurulum', value: 'Görsele ya da açıklamaya QR damgası' },
      { label: 'Sonuç', value: 'Sepet terki ve iade sohbeti azalır' },
    ],
    badges: ['Karar sepette netleşir', 'İade sohbeti azalır', 'Tek QR, her kanalda'],
    cta: 'merchant',
  },
  {
    key: 'customer',
    image: '/brand/generated/who-customer.jpg',
    icon: Users,
    brandLabel: 'Müşteri',
    number: '03',
    title: 'Beğen, okut, üstünde gör',
    subtitle: 'Mağazada ya da ekranda gördüğün kıyafeti kendi fotoğrafınla anında dene.',
    specs: [
      { label: 'Akış', value: 'Okut, fotoğraf çek ya da galeriden yükle, üstünde gör' },
      { label: 'Kanal', value: 'Mağazada ya da ekranda, nerede görürsen' },
      { label: 'Kurulum', value: 'Kayıt yok, uygulama indirme yok' },
      { label: 'Sonuç', value: 'Kendi bedeninde anında görsel, kabinde sıra yok' },
    ],
    badges: ['Kabinde sıra yok', 'Kendi fotoğrafınla dene', 'Beğendiğini sakla'],
    cta: 'demo',
  },
];

const AudienceContent = ({
  a,
  onMerchantSignup,
  onCustomerDemo,
}: {
  a: Audience;
  onMerchantSignup: () => void;
  onCustomerDemo: () => void;
}) => {
  const { t } = useTranslation();
  const Icon = a.icon;
  const fx = (d: number) => ({ animationDelay: `${d}s`, animationFillMode: 'both' as const });
  return (
    <div className="max-w-md">
      <div className="animate-fade-in flex items-center gap-2 mb-3" style={fx(0.04)}>
        <Icon className="w-4 h-4 text-mirrorly-gold" strokeWidth={1.75} />
        <span className="text-[11px] uppercase tracking-[0.3em] text-mirrorly-gold font-semibold">{t(a.brandLabel)}</span>
      </div>
      <h3 className="animate-fade-in font-serif text-3xl sm:text-4xl leading-[1.08] mb-2" style={fx(0.12)}>
        {t(a.title)}
      </h3>
      <p className="animate-fade-in italic text-mirrorly-cream/85 text-base sm:text-lg mb-5" style={fx(0.2)}>
        {t(a.subtitle)}
      </p>
      <dl className="space-y-1.5 mb-5 border-t border-mirrorly-cream/15 pt-4">
        {a.specs.map((s, k) => (
          <div key={s.label} className="animate-fade-in flex gap-3 text-sm" style={fx(0.3 + k * 0.07)}>
            <dt className="text-mirrorly-gold/90 w-16 shrink-0">{t(s.label)}</dt>
            <dd className="text-mirrorly-cream/90">{t(s.value)}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2 mb-6">
        {a.badges.map((b, k) => (
          <span
            key={b}
            className="animate-fade-in text-xs bg-mirrorly-cream/10 border border-mirrorly-cream/15 rounded-full px-3 py-1"
            style={fx(0.58 + k * 0.06)}
          >
            {t(b)}
          </span>
        ))}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          a.cta === 'merchant' ? onMerchantSignup() : onCustomerDemo();
        }}
        className="animate-fade-in group/cta inline-flex items-center gap-2 bg-mirrorly-gold text-mirrorly-black px-5 py-2.5 rounded-full text-sm font-medium shadow-lg hover:bg-mirrorly-gold/90 transition-colors"
        style={fx(0.74)}
      >
        {a.cta === 'merchant' ? t('Butiğimi Kur') : t('Demoyu Dene')}
        <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

const AudienceAccordion = ({
  onMerchantSignup,
  onCustomerDemo,
}: {
  onMerchantSignup: () => void;
  onCustomerDemo: () => void;
}) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(m.matches);
    const h = (e: MediaQueryListEvent) => setReduce(e.matches);
    m.addEventListener('change', h);
    return () => m.removeEventListener('change', h);
  }, []);

  useEffect(() => {
    if (locked || reduce) return;
    const id = setInterval(() => setActive((x) => (x + 1) % AUDIENCES.length), 6000);
    return () => clearInterval(id);
  }, [locked, reduce]);

  const select = (i: number) => {
    setActive(i);
    setLocked(true);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      select((active + 1) % AUDIENCES.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      select((active - 1 + AUDIENCES.length) % AUDIENCES.length);
    }
  };

  const cols = AUDIENCES.map((_, i) => (i === active ? '3fr' : '1fr')).join(' ');

  return (
    <>
      {/* MASAÜSTÜ — yatay accordion */}
      <div
        role="tablist"
        aria-label={t('Kim için')}
        onKeyDown={onKey}
        onMouseLeave={() => setLocked(true)}
        className="hidden lg:grid h-[600px] rounded-3xl overflow-hidden border border-mirrorly-paper shadow-xl transition-[grid-template-columns] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ gridTemplateColumns: cols }}
      >
        {AUDIENCES.map((a, i) => {
          const on = i === active;
          return (
            <div
              key={a.key}
              role="tab"
              aria-selected={on}
              aria-label={t(a.title)}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onMouseEnter={() => setLocked(true)}
              className={`group relative overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mirrorly-gold ${
                on ? 'ring-1 ring-inset ring-mirrorly-gold/40' : ''
              } ${i > 0 ? 'border-l border-mirrorly-black/10' : ''}`}
            >
              {/* Arka plan görseli — sıcak sepya/desatüre → aktifte tam renk */}
              <img
                src={a.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all ease-out motion-reduce:transition-none ${
                  on
                    ? 'scale-105 [filter:none] duration-700'
                    : 'duration-500 [filter:saturate(0.4)_sepia(0.14)_brightness(0.9)_contrast(0.96)] group-hover:scale-[1.02] group-hover:[filter:saturate(0.6)_sepia(0.08)_brightness(0.95)]'
                }`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                }}
              />
              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-mirrorly-black/85 via-mirrorly-black/30 to-transparent ${
                  on ? 'opacity-90' : 'opacity-100'
                }`}
              />

              {/* Sıra no — pasif: dolgusuz altın kontur / aktif: dolu altın, büyük */}
              <span
                aria-hidden="true"
                className={`absolute top-5 left-6 font-serif italic leading-none transition-all duration-500 ${
                  on ? 'text-6xl sm:text-7xl opacity-100 scale-105' : 'text-2xl opacity-50'
                }`}
                style={
                  on
                    ? { color: '#C9A961' }
                    : { color: 'transparent', WebkitTextStroke: '1px rgba(201,169,97,0.55)' }
                }
              >
                {a.number}
              </span>

              {/* Pasif: dikey marka etiketi ortada */}
              {!on && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="[writing-mode:vertical-rl] rotate-180 font-serif uppercase tracking-[0.28em] text-mirrorly-cream/80 text-sm">
                    {t(a.brandLabel)}
                  </span>
                </div>
              )}

              {/* Pasif: alt + ipucu */}
              {!on && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-mirrorly-gold/60 flex items-center justify-center text-mirrorly-gold group-hover:bg-mirrorly-gold/15 transition-colors">
                  <Plus className="w-4 h-4" strokeWidth={1.75} />
                </div>
              )}

              {/* Aktif: içerik (her açılışta stagger yeniden oynar) */}
              {on && (
                <div key={active} className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9 text-mirrorly-cream">
                  <AudienceContent a={a} onMerchantSignup={onMerchantSignup} onCustomerDemo={onCustomerDemo} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MOBİL/TABLET — görsel banner + koyu zeminde okunaklı içerik (accordion terk edilir) */}
      <div className="lg:hidden space-y-6">
        {AUDIENCES.map((a) => (
          <div
            key={a.key}
            className="rounded-3xl overflow-hidden border border-mirrorly-paper shadow-sm bg-mirrorly-black"
          >
            <div className="relative aspect-[16/10]">
              <img
                src={a.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mirrorly-black via-mirrorly-black/20 to-transparent" />
              <span
                aria-hidden="true"
                className="absolute top-4 left-5 font-serif italic text-5xl leading-none"
                style={{ color: '#C9A961', opacity: 0.92 }}
              >
                {a.number}
              </span>
            </div>
            <div className="p-6 text-mirrorly-cream">
              <AudienceContent a={a} onMerchantSignup={onMerchantSignup} onCustomerDemo={onCustomerDemo} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};


// ─── MAIN COMPONENT ─────────────────────────────────────────────

const MarketingLanding = ({ onMerchantSignup, onCustomerDemo }: MarketingLandingProps) => {
  const { t } = useTranslation();
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
          <a href="/" className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-10 h-10 p-1.5 rounded-xl bg-white border border-mirrorly-paper shadow-sm">
              <img
                src="/brand/logo-icon.png"
                alt={t('Mirrorly')}
                className="h-full w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </span>
            <span className="font-serif text-2xl tracking-tight text-mirrorly-black lowercase">{t('mirrorly')}</span>
          </a>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={onMerchantSignup}
              className="text-sm font-medium text-mirrorly-stone hover:text-mirrorly-black transition-colors px-4 py-2 rounded-full border border-mirrorly-paper hover:border-mirrorly-gold/60 bg-white/40"
            >
              {t('Mağaza Girişi')}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO — SLIDER (CodePen Swiper uyarlaması, sıcak butik) ── */}
      <HeroSlider onMerchantSignup={onMerchantSignup} onCustomerDemo={onCustomerDemo} />

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
            {t("Müşterin vitrini gördü, içeri girmedi. Kabin sırasını bekledi, çıkıp gitti. Online'dan aldı, üstüne uymadı, geri yolladı.")}
            <br />
            <span className="block mt-6 text-mirrorly-cream/70 text-2xl sm:text-3xl md:text-4xl italic">
              {t('Üç farklı sahne — tek bir soru:')}
            </span>
            <span className="block mt-3 text-mirrorly-gold">{t(`"Bende nasıl durur?"`)}</span>
          </p>
        </div>
      </section>

      {/* ─── ÇÖZÜM / 4 ADIM ─────────────────────────────── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">
              {t('Etiketin İkinci Hayatı')}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-mirrorly-black tracking-tight">
              {t('4 adımda kur.')}
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
                  <h3 className="font-serif text-xl text-mirrorly-black mb-2">{t(step.title)}</h3>
                  <p className="text-sm text-mirrorly-stone leading-relaxed">{t(step.desc)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── GÖRSEL AKIŞ — GERÇEK KANIT ─────────────────── */}
      <section className="pb-4 sm:pb-8 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { src: '/brand/generated/step-scan.jpg', n: '01', t: 'Etiketi okut', d: 'Kıyafetteki QR’ı telefonla okut.' },
              { src: '/brand/generated/step-photo.jpg', n: '02', t: 'Kendini çek', d: 'Tek fotoğraf çek ya da galeriden yükle.' },
              { src: '/brand/generated/proof-rail.jpg', n: '03', t: 'Üstünde gör', d: 'Saniyeler içinde kendi üstünde.' },
            ].map((it) => (
              <figure key={it.n} className="group relative overflow-hidden rounded-3xl border border-mirrorly-paper aspect-[3/4] bg-gradient-to-br from-mirrorly-paper via-mirrorly-cream to-mirrorly-gold/25">
                <img
                  src={it.src}
                  alt={t(it.t)}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mirrorly-black/70 via-mirrorly-black/10 to-transparent" />
                <figcaption className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-mirrorly-cream">
                  <p className="font-serif text-mirrorly-gold text-sm mb-1">{it.n}</p>
                  <p className="font-serif text-xl sm:text-2xl leading-tight">{t(it.t)}</p>
                  <p className="text-sm text-mirrorly-cream/80 mt-1">{t(it.d)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KİM İÇİN? — ACCORDION ───────────────────────── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 bg-mirrorly-paper/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">{t('Kim için?')}</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-mirrorly-black tracking-tight">
              {t('Üç ayrı dünya, tek etiket.')}
            </h2>
          </div>

          <AudienceAccordion onMerchantSignup={onMerchantSignup} onCustomerDemo={onCustomerDemo} />
        </div>
      </section>

      {/* ─── BUTİK SAHİBİ / SELF-SERVİS ─────────────────── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-mirrorly-paper aspect-[3/2] order-last lg:order-first">
            <img src="/brand/generated/owner.jpg" alt={t('Butik sahibi panelden QR etiketlerini yönetiyor')} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">{t('Butik sahibiysen')}</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-mirrorly-black tracking-tight mb-5 leading-tight">
              {t('Kurulumu sen yaparsın.')}<br /><span className="italic text-mirrorly-stone">{t('5 dakikada.')}</span>
            </h2>
            <p className="text-base sm:text-lg text-mirrorly-stone leading-relaxed mb-8 max-w-lg">
              {t('Kendi kaydolursun, ürün görsellerini yüklersin, her ürüne benzersiz QR otomatik oluşur. Panelden yazdır, kıyafete as. Kimseyi beklemezsin.')}
            </p>
            <ul className="space-y-3 text-mirrorly-stone mb-9 max-w-lg">
              <li className="flex gap-3"><span className="text-mirrorly-gold font-serif">·</span> {t('Ürün başına otomatik, benzersiz QR')}</li>
              <li className="flex gap-3"><span className="text-mirrorly-gold font-serif">·</span> {t('Panelden istatistik ve kredi yönetimi')}</li>
              <li className="flex gap-3"><span className="text-mirrorly-gold font-serif">·</span> {t('Kurulum ekibi beklemek yok — anında canlı')}</li>
            </ul>
            <button
              onClick={onMerchantSignup}
              className="group inline-flex items-center justify-center gap-2 bg-mirrorly-black text-mirrorly-cream px-7 py-4 rounded-full font-medium text-base shadow-xl hover:bg-mirrorly-stone transition-all"
            >
              {t('Butiğimi Kur')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── DEMO ───────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
        <MirrorRipple />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">{t('İlk denemen')}</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-mirrorly-black tracking-tight mb-5">
            {t('Önce sen dene.')}
          </h2>
          <p className="text-base sm:text-lg text-mirrorly-stone leading-relaxed mb-10 max-w-xl mx-auto">
            {t("Demo butiğimizde 5 kıyafet hazır bekliyor. QR'ı telefonunla okut, kendi fotoğrafını yükle, sonucu gör. 30 saniye.")}
          </p>
          <button
            onClick={onCustomerDemo}
            className="group inline-flex items-center justify-center gap-2 bg-mirrorly-gold text-mirrorly-black px-8 py-4 rounded-full font-medium text-base animate-soft-pulse hover:bg-mirrorly-gold/90 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            {t('Demoyu Aç')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* ─── SOSYAL KANIT (PLACEHOLDER) ──────────────────── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 bg-mirrorly-paper/30 border-y border-mirrorly-paper">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">{t('Yakında')}</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-mirrorly-black tracking-tight mb-8">
            {t('İlk butik vakaları geliyor.')}
          </h2>
          <EmptyHangtagRow />
          <p className="text-base text-mirrorly-stone leading-relaxed mb-8 max-w-xl mx-auto">
            {t('İlk pilot butiklerimizle çalışıyoruz. İlk vaka çalışmaları (kabin trafiği, iade düşüşü, satışa dönüşüm) burada yayınlanacak.')} <span className="text-mirrorly-black font-medium">{t('Sıradaki sen olabilirsin.')}</span>
          </p>
          <a
            href="mailto:weliakcay@gmail.com?subject=Mirrorly%20Bekleme%20Listesi"
            className="inline-flex items-center justify-center gap-2 bg-white border border-mirrorly-paper hover:border-mirrorly-gold/70 text-mirrorly-black px-7 py-3 rounded-full font-medium text-sm transition-all"
          >
            <Mail className="w-4 h-4" />
            {t('Bekleme Listesine Katıl')}
          </a>
        </div>
      </section>

      {/* ─── SSS ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 grain-overlay">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-mirrorly-gold font-medium mb-4">
              {t('Sıkça Sorulanlar')}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-mirrorly-black tracking-tight">
              {t('Aklında soru var?')}
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
                    <span className="font-serif text-lg text-mirrorly-black">{t(item.q)}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-mirrorly-gold flex-shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.75}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-mirrorly-stone leading-relaxed text-[15px]">{t(item.a)}</div>
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
            {t('Butiğin için 2 dakika.')}
            <br />
            {t('Müşterin için saniyeler.')}
          </h2>
          <p className="text-base sm:text-lg text-mirrorly-cream/70 leading-relaxed mb-10 max-w-xl mx-auto">
            {t("Mirrorly'yi bugün kur, ilk QR'ını bu hafta yapıştır.")}
          </p>
          <button
            onClick={onMerchantSignup}
            className="group inline-flex items-center justify-center gap-2 bg-mirrorly-gold text-mirrorly-black px-9 py-5 rounded-full font-medium text-lg shadow-2xl hover:bg-mirrorly-cream transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            {t('Butiğimi Şimdi Kur')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <div className="mt-6">
            <button
              onClick={onCustomerDemo}
              className="text-sm text-mirrorly-cream/60 hover:text-mirrorly-gold transition-colors underline-offset-4 hover:underline"
            >
              {t('Önce demoyu görmek istiyorum →')}
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────── */}
      <footer className="bg-mirrorly-cream border-t border-mirrorly-paper px-5 sm:px-8 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-xl text-mirrorly-black lowercase mb-1">{t('mirrorly')}</p>
            <p className="text-xs uppercase tracking-[0.25em] text-mirrorly-stone/60">
              {t('Scan. Style. Try on.')}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-mirrorly-stone">
            <a href="mailto:weliakcay@gmail.com" className="flex items-center gap-1.5 hover:text-mirrorly-black transition-colors">
              <Mail className="w-4 h-4" /> {t('Mail')}
            </a>
            <a
              href="https://www.instagram.com/mirrorly.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-mirrorly-black transition-colors"
            >
              <Instagram className="w-4 h-4" /> {t('Instagram')}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-mirrorly-stone/60">
            <span>{t('© {{year}} Mirrorly', { year: new Date().getFullYear() })}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketingLanding;
