# Monaer Registration System Setup

## Backend Server Setup

### 1. Install Backend Dependencies
```bash
# Install backend server dependencies
npm install express cors dotenv node-fetch

# Or for development with auto-restart
npm install -g nodemon
```

### 2. Configure Environment Variables
The `.env` file is already created with your Telegram credentials:
```
TELEGRAM_BOT_TOKEN=8532460020:AAFaC4WcQj51vigfsfU8Vx5lmkNPA0TJivI
TELEGRAM_CHAT_ID=676232736
```

### 3. Start Backend Server
```bash
# Production mode
node server.js

# Development mode (with auto-restart)
nodemon server.js
```

The server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Start Frontend Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Testing the Registration Flow

1. **Start Backend Server**: Run `node server.js` in one terminal
2. **Start Frontend**: Run `npm run dev` in another terminal  
3. **Open Browser**: Navigate to `http://localhost:5173/register`
4. **Fill Form**: 
   - Ism familiya (min 3 ta belgi)
   - Telefon raqam (faqat 90, 93, 98, 99 bilan boshlanishi kerak)
   - Parol (6 ta belgi)
   - Parolni tasdiqlash
   - Shartlar bilan rozilik

## Features Implemented

### ✅ Frontend Validation
- Ism familiya: minimum 3 ta belgi
- Telefon raqam: avtomatik formatlash `(99) 123 45 67`
- Faqat 90, 93, 98, 99 operator kodlari
- Parol: 6 ta belgi
- Parol tasdiqlash
- Shartlar bilan rozilik

### ✅ Security Features
- Backend API orqali Telegram integratsiyasi
- CORS konfiguratsiyasi
- Environment variables orqali xavfsiz token saqlash
- Frontend to'g'ridan-to'g'ri Telegram API ga kira olmaydi

### ✅ User Experience
- Parol ko'rsatish/berkitish tugmalari
- Real-time validatsiya
- Muvaffaqiyat ekrani
- Avtomatik redirect (1.5 soniyadan keyin)
- Error handling va user-friendly xabarlar

### ✅ Data Storage
- localStorage ga foydalanuvchi ma'lumotlari saqlanadi
- Telegram botga xabar yuboriladi
- Vaqt stampi qo'shiladi

## API Endpoints

### POST /api/send-message
```json
{
  "fullName": "John Doe",
  "phone": "(99) 123 45 67"
}
```

Response:
```json
{
  "success": true,
  "message": "Xabar muvaffaqiyatli yuborildi"
}
```

### GET /api/health
Health check endpoint to verify server is running.

## Security Notes

⚠️ **Important**: 
- Telegram bot token va chat ID `.env` faylida saqlanadi
- Frontend to'g'ridan-to'g'ri Telegram API ga murojaat qilmaydi  
- Barcha so'rovlar backend orqali o'tadi
- CORS faqat ruxsat etilgan domenlarga ochiq

## Troubleshooting

### Backend ishga tushmaydi
- Port 5000 band bo'lishi mumkin, boshqa port sinab ko'ring
- Node.js o'rnatilganligini tekshiring

### Telegram xatolik
- Bot token va chat ID to'g'ri ekanligini tekshiring
- Botga xabar yuborish uchun admin huquqi borligini tekshiring

### Frontend backendga ulana olmaydi
- Backend ishlayotganiga ishonch hosil qiling
- CORS konfiguratsiyasini tekshiring
- Port raqamlari to'g'ri ekanligini tekshiring
