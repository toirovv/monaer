import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Telegram API endpoint
app.post('/api/send-message', async (req, res) => {
  try {
    const { fullName, phone } = req.body

    // Validate required fields
    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Ism va telefon raqam kiritilishi shart'
      })
    }

    // Get Telegram credentials from environment variables
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Telegram credentials not configured')
      return res.status(500).json({
        success: false,
        message: 'Server konfiguratsiyasida xatolik'
      })
    }

    // Format message
    const message = `
🆕 Yangi foydalanuvchi ro'yxatdan o'tdi!

👤 Ism: ${fullName}
📱 Telefon: ${phone}
⏰ Vaqt: ${new Date().toLocaleString('uz-UZ', {
      timeZone: 'Asia/Tashkent'
    })}
    `.trim()

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      }
    )

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error('Telegram API error:', errorData)
      return res.status(500).json({
        success: false,
        message: 'Telegram botga xabar yuborishda xatolik'
      })
    }

    res.json({
      success: true,
      message: 'Xabar muvaffaqiyatli yuborildi'
    })

  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({
      success: false,
      message: 'Serverda xatolik yuz berdi'
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
