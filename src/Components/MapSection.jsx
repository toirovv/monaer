import React from 'react'

const MapSection = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mt-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Bizning manzil
            </h2>

            <div className="w-full overflow-hidden rounded-lg">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps?q=Toshkent,Biznes%20Market&output=embed"
                    className="w-full h-[180px] sm:h-[250px] md:h-[300px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    )
}

export default MapSection