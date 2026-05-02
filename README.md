# Mirrorly Landing

Mirrorly tanıtım sayfası — **bağımsız** Vite + React + Tailwind projesi.

App (`../mirrorly-app-main/`) ile **hiçbir ortak kod yok**. Kendi bağımlılıkları, kendi build, kendi Vercel project'i. App'in mevcut Vercel deploy'unu hiçbir şekilde etkilemez.

## Yerel Çalıştırma

```bash
cd landing
npm install      # bir kerelik, ~30 sn
npm run dev      # http://localhost:5174
```

App'in dev sunucusu (port 5173) ile **çakışmaz** — ikisi aynı anda açılabilir.

## Build

```bash
npm run build    # dist/ klasörü oluşturur
npm run preview  # build'i lokal test eder
```

## Vercel Deploy (yeni project, ayrı)

1. Vercel'de **yeni bir project** oluştur (mevcut mirrorly-app-main project'ine dokunma)
2. Repo'da **Root Directory:** `landing/` seç
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. Domain bağla: ileride `mirrorly.com.tr` veya geçici `mirrorly-landing.vercel.app`

## Logo Varyantları

`public/brand/` klasörüne 3 dosya gerekiyor:

| Dosya | Boyut | Kullanım |
|---|---|---|
| `logo-primary.png` | en az 800×800 | Hero, büyük yerler |
| `favicon.png` | 256×256 | Tarayıcı sekmesi (square) |
| `og-image.png` | 1200×630 | WhatsApp/IG/Twitter paylaşım preview |

Veli tek logo dosyasını yükledikten sonra varyantları otomatik üretilir.

## Marka Kararları

Tüm marka kararları için bkz: `../operations/brand/brand-guide.md`
Landing yapım brief'i: `../operations/brand/sites/landing-v1.md`
