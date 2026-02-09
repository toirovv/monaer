import React, { useEffect, useRef, useState } from 'react'

const UkraineMap = ({ onLocationSelect, onClose }) => {
  const mapRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const loadUkraineMap = () => {
      // OpenStreetMap va Leaflet dan foydalanamiz
      if (window.L) {
        initMap()
        return
      }

      // Leaflet CSS va JS yuklash
      const leafletCSS = document.createElement('link')
      leafletCSS.rel = 'stylesheet'
      leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(leafletCSS)

      const leafletJS = document.createElement('script')
      leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      leafletJS.async = true
      leafletJS.onload = () => {
        initMap()
      }
      leafletJS.onerror = () => {
        console.error('Leaflet failed to load')
        setLoading(false)
      }
      document.body.appendChild(leafletJS)
    }

    loadUkraineMap()

    return () => {
      if (window.L && mapRef.current) {
        mapRef.current._leafletInstance?.remove()
      }
    }
  }, [])

  const initMap = () => {
    if (!mapRef.current || !window.L) return

    // Ukraina markazi (Kiyev)
    const map = window.L.map(mapRef.current, {
      center: [50.4501, 30.5234], // Kiyev koordinatalari
      zoom: 10,
      zoomControl: true
    })

    // OpenStreetMap tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map)

    // Click event
    map.on('click', (e) => {
      const coords = e.latlng
      placeMarker(coords)
      getAddressFromCoords(coords)
    })

    // Map instance ni saqlash
    mapRef.current._leafletInstance = map
    setLoading(false)
  }

  const placeMarker = (coords) => {
    const map = mapRef.current._leafletInstance
    if (!map) return

    // Old marker ni o'chirish
    if (mapRef.current._marker) {
      map.removeLayer(mapRef.current._marker)
    }

    const marker = window.L.marker(coords).addTo(map)
    mapRef.current._marker = marker
  }

  const getAddressFromCoords = async (coords) => {
    try {
      // Nominatim reverse geocoding API
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&zoom=18&addressdetails=1`)
      const data = await response.json()
      
      if (data && data.display_name) {
        const address = `${data.display_name}, ${data.address?.country || ''}`
        onLocationSelect({
          id: Date.now().toString(),
          address: address,
          coordinates: [coords.lat, coords.lng]
        })
      }
    } catch (error) {
      console.error('Address error:', error)
      onLocationSelect({
        id: Date.now().toString(),
        address: `Manzil: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`,
        coordinates: [coords.lat, coords.lng]
      })
    }
  }

  const handleSearch = async (query) => {
    if (!query || query.length < 3) {
      setSearchResults([])
      return
    }
    
    try {
      // Nominatim geocoding API
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`)
      const data = await response.json()
      
      if (data && data.length > 0) {
        const results = data.map(item => ({
          name: item.display_name,
          address: `${item.display_name}, ${item.address?.country || ''}`,
          coordinates: [item.lat, item.lon]
        }))
        setSearchResults(results)
      }
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Brauzeringiz geolokatsiyani qollab-quvvatlamaydi')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude]
        const map = mapRef.current._leafletInstance
        if (map) {
          map.setView(coords, 15)
          placeMarker(coords)
          getAddressFromCoords({ lat: coords[0], lng: coords[1] })
        }
      },
      (error) => {
        console.error('Geolocation error:', error)
        alert('Lokatsiyani aniqlashda xatolik yuz berdi')
      }
    )
  }

  const selectSearchResult = (result) => {
    const map = mapRef.current._leafletInstance
    if (map) {
      map.setView(result.coordinates, 15)
      placeMarker({ lat: result.coordinates[0], lng: result.coordinates[1] })
      onLocationSelect({
        id: Date.now().toString(),
        address: result.address,
        coordinates: result.coordinates
      })
      setSearchResults([])
      setSearchQuery('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white">
          <h3 className="text-xl font-semibold">🇺🇦 Ukraina xaritasi</h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="w-full lg:w-80 p-4 border-b lg:border-b-0 lg:border-r bg-gray-50">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🔍 Qidiruv</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      handleSearch(e.target.value)
                    }}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Manzilni qidiring..."
                  />
                </div>
              </div>

              <button
                onClick={handleUseCurrentLocation}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                📍 Joriy lokatsiyam
              </button>

              {searchResults.length > 0 && (
                <div className="max-h-60 overflow-y-auto">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Qidiruv natijalari:</h4>
                  <div className="space-y-2">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => selectSearchResult(result)}
                        className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-medium text-sm">{result.name}</div>
                        <div className="text-xs text-gray-500">{result.address}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 relative">
            {loading && (
              <div className="absolute inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">🇺🇦 Xarita yuklanmoqda...</p>
                </div>
              </div>
            )}
            
            <div 
              ref={mapRef} 
              className="w-full h-full min-h-[400px]" 
              style={{ height: '500px' }}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <p className="text-sm text-gray-600 text-center">
            🇺🇦 Xaritadan manzilni tanlash uchun biror joyga bosing yoki qidiruvdan foydalaning
          </p>
        </div>
      </div>
    </div>
  )
}

export default UkraineMap
