export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  
  const existingItem = cart.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1
    })
  }
  
  localStorage.setItem('cart', JSON.stringify(cart))
  
  // Trigger cart update event
  window.dispatchEvent(new Event('cartUpdated'))
  
  return cart
}

export const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  return cart.reduce((total, item) => total + item.quantity, 0)
}

export const getCartTotal = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const updatedCart = cart.filter(item => item.id !== productId)
  localStorage.setItem('cart', JSON.stringify(updatedCart))
  window.dispatchEvent(new Event('cartUpdated'))
  return updatedCart
}

export const updateCartItemQuantity = (productId, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const updatedCart = cart.map(item => {
    if (item.id === productId) {
      return { ...item, quantity: Math.max(1, quantity) }
    }
    return item
  })
  localStorage.setItem('cart', JSON.stringify(updatedCart))
  window.dispatchEvent(new Event('cartUpdated'))
  return updatedCart
}

export const clearCart = () => {
  localStorage.removeItem('cart')
  window.dispatchEvent(new Event('cartUpdated'))
}
