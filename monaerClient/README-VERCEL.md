# Vercel Deployment Guide

## Environment Variables Setup

Vercel dashboard'da quyidagi environment variables ni o'rnatishingiz kerak:

1. **Telegram Bot Token**:
   - Name: `TELEGRAM_BOT_TOKEN`
   - Value: `8532460020:AAFaC4WcQj51vigfsfU8Vx5lmkNPA0TJivI`
   - Environment: Production, Preview, Development

2. **Telegram Chat ID**:
   - Name: `TELEGRAM_CHAT_ID`
   - Value: `5165340806`
   - Environment: Production, Preview, Development

## Deployment Steps

### 1. Vercel CLI orqali deploy qilish:
```bash
# Vercel CLI o'rnatish
npm i -g vercel

# Login qilish
vercel login

# Deploy qilish
vercel

# Production ga deploy qilish
vercel --prod
```

### 2. Vercel Dashboard orqali:
1. GitHub repository ni Vercel ga ulang
2. Repository ni import qiling
3. Build Settings:
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Environment Variables ni qo'shing
5. Deploy qiling

## API Endpoints (Vercelda)

- **POST** `/api/send-message` - Telegram botga xabar yuborish
- **GET** `/api/health` - Server health check

## Local Development

Local development uchun:

1. Backend serverni ishga tushiring:
```bash
node server.js
```

2. Frontendni ishga tushiring:
```bash
npm run dev
```

## Testing

### Local Testing:
```bash
# Health check
curl http://localhost:5000/api/health

# Send message test
curl -X POST http://localhost:5000/api/send-message \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","phone":"(99) 123 45 67"}'
```

### Vercel Testing:
```bash
# Health check
curl https://your-domain.vercel.app/api/health

# Send message test
curl -X POST https://your-domain.vercel.app/api/send-message \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","phone":"(99) 123 45 67"}'
```

## Troubleshooting

### 1. Environment Variables not working:
- Vercel dashboard'da to'g'ri environment names va values ni tekshiring
- "Environment" ni hammasiga (Production, Preview, Development) o'rnatganingizga ishonch hosil qiling

### 2. CORS errors:
- Vercel API routes avtomatik CORS headers bilan keladi
- Frontend da to'g'ri API URL ishlatilayotganiga ishonch hosil qiling

### 3. Telegram API errors:
- Bot token va chat ID to'g'ri ekanligini tekshiring
- Bot admin huquqiga ega ekanligini tekshiring

### 4. Build errors:
- `package.json` da `vercel-build` skripti borligiga ishonch hosil qiling
- Barcha dependencies to'g'ri o'rnatilganligini tekshiring

## File Structure

```
monaer2/
├── api/
│   ├── send-message.js    # Telegram API endpoint
│   └── health.js          # Health check endpoint
├── src/
│   └── Pages/
│       └── Register.jsx   # Registration form
├── .env                   # Local environment variables
├── vercel.json           # Vercel configuration
├── server.js             # Local development server
└── package.json          # Dependencies and scripts
```

## Security Notes

✅ **Xavfsizlik choralari:**
- Telegram bot token environment variable da saqlanadi
- Frontend to'g'ridan-to'g'ri Telegram API ga kira olmaydi
- Barcha so'rovlar backend orqali o'tadi
- CORS konfiguratsiyasi mavjud

⚠️ **Muhim:**
- Production ga deploy qilishdan oldin environment variables ni tekshiring
- Telegram bot token hech qachon frontend kodida saqlanmasin
