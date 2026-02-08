import fetch from 'node-fetch'

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' })
    return
  }

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
}
