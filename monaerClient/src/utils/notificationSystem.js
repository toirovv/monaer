import React, { createContext, useContext, useState, useEffect } from 'react'

// Notification context
const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Add notification
  const addNotification = (notification) => {
    const id = Date.now()
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    }
    
    setNotifications(prev => [newNotification, ...prev])
    setUnreadCount(prev => prev + 1)
    
    // Send to Telegram bot
    sendToTelegramBot(newNotification)
  }

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  // Send to Telegram bot
  const sendToTelegramBot = async (notification) => {
    const botToken = 'YOUR_BOT_TOKEN' // Replace with actual bot token
    const chatId = 'YOUR_CHAT_ID' // Replace with actual chat ID
    
    const message = `
🔔 <b>NEW ORDER</b> 🔔
📋 <b>Order Details:</b> 📋
� <b>Customer:</b> ${notification.customer}
📞 <b>Phone:</b> ${notification.phone}
🛍 <b>Products:</b> ${notification.items?.map(item => `• ${item.name} (${item.quantity}x${item.price.toLocaleString()} so'm)`).join('\n') || 'No items'}
💰 <b>Total Amount:</b> ${notification.totalAmount?.toLocaleString()} so'm
📍 <b>Address:</b> ${notification.address}
💳 <b>Payment Method:</b> ${notification.paymentMethod}
🚚 <b>Delivery Type:</b> ${notification.deliveryType}
📅 <b>Order Date:</b> ${notification.date}
🆔 <b>Order ID:</b> ${notification.id}
    `
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      })
      
      if (!response.ok) {
        console.error('Failed to send Telegram notification')
      }
    } catch (error) {
      console.error('Telegram notification error:', error)
    }
  }

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    clearNotifications
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export { NotificationContext, NotificationProvider, useNotification }
