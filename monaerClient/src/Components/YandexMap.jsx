import React, { useEffect, useRef, useState } from 'react'

const YandexMap = ({ onLocationSelect, onClose }) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const loadYandexMap = () => {
      if (window.ymaps) {
        initMap()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_YANDEX_API_KEY&lang=ru_RU'
      script.async = true
      script.onload = () => {
        window.ymaps.ready(initMap)
      }
      script.onerror = () => {
        console.error('Yandex Maps API failed to load')
        setLoading(false)
      }
      document.body.appendChild(script)
    }

    loadYandexMap()

    return () => {
      if (map) {
        map.destroy()
      }
    }
  }, [])

  const initMap = () => {
    if (!mapRef.current) return

    const ymap = new window.ymaps.Map(mapRef.current, {
      center: [41.311151, 69.279737], // Tashkent coordinates
      zoom: 12,
      controls: ['zoomControl', 'searchControl', 'typeSelector', 'fullscreenControl']
    })

    ymap.events.add('click', (e) => {
      const coords = e.get('coords')
      placeMarker(coords)
      getAddressFromCoords(coords)
    })

    setMap(ymap)
    setLoading(false)
  }

  const placeMarker = (coords) => {
    if (!map) return

    if (marker) {
      map.geoObjects.remove(marker)
    }

    const placemark = new window.ymaps.Placemark(coords, {}, {
      preset: 'islands#redDotIcon'
    })

    map.geoObjects.add(placemark)
    setMarker(placemark)
  }

  const getAddressFromCoords = async (coords) => {
    try {
      const result = await window.ymaps.geocode(coords)
      const firstGeoObject = result.geoObjects.get(0)
      const address = firstGeoObject ? firstGeoObject.getAddressLine() : 'Manzil topilmadi'
      
      onLocationSelect({
        id: Date.now().toString(),
        address: address,
        coordinates: coords
      })
    } catch (error) {
      console.error('Address error:', error)
    }
  }

  const handleSearch = async (query) => {
    if (!query || !window.ymaps) return
    
    try {
      const results = await window.ymaps.search(query)
      const addresses = results.geoObjects.toArray().map(obj => ({
        name: obj.properties.get('name'),
        address: obj.properties.get('description') || obj.getAddressLine(),
        coordinates: obj.geometry.getCoordinates()
      }))
      setSearchResults(addresses)
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
        if (map) {
          map.setCenter(coords, 15)
          placeMarker(coords)
          getAddressFromCoords(coords)
        }
      },
      (error) => {
        console.error('Geolocation error:', error)
        alert('Lokatsiyani aniqlashda xatolik yuz berdi')
      }
    )
  }

  const selectSearchResult = (result) => {
    if (map) {
      map.setCenter(result.coordinates, 15)
      placeMarker(result.coordinates)
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
          <h3 className="text-xl font-semibold">Manzilni xaritadan tanlang</h3>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Qidiruv</label>
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
                Joriy lokatsiyam
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
                  <p className="text-gray-600">Xarita yuklanmoqda...</p>
                </div>
              </div>
            )}
            
            <div ref={mapRef} className="w-full h-full min-h-[400px]" />
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <p className="text-sm text-gray-600 text-center">
            Xaritadan manzilni tanlash uchun biror joyga bosing yoki qidiruvdan foydalaning
          </p>
        </div>
      </div>
    </div>
  )
}

export default YandexMap
