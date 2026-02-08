import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

console.log('Bot Token:', BOT_TOKEN ? 'Set' : 'Not set')
console.log('Chat ID:', CHAT_ID ? 'Set' : 'Not set')

// Test bot info
async function testBot() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`)
    const data = await response.json()
    console.log('Bot Info:', data)
    
    if (data.ok) {
      console.log(`Bot username: @${data.result.username}`)
    }
  } catch (error) {
    console.error('Bot test error:', error)
  }
}

// Test sending message
async function testMessage() {
  try {
    const message = '🧪 Test message from Monaer registration system'
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      }
    )
    
    const data = await response.json()
    console.log('Message test result:', data)
  } catch (error) {
    console.error('Message test error:', error)
  }
}

// Get chat updates to find correct chat ID
async function getUpdates() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`)
    const data = await response.json()
    console.log('Bot updates:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Updates error:', error)
  }
}

async function runTests() {
  await testBot()
  await getUpdates()
  await testMessage()
}

runTests()
