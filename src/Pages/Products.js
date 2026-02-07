export const products = [
  {
    id: 1,
    name: 'Monaer M1 Tormoz Kalodkasi',
    oldPrice: 550000,
    price: 450000,
    discount: 18,
    available: true,
    rating: 4.5,
    description: 'Yuqori sifatli Monaer M1 tormoz kalodkalari barcha turdagi avtomobillar uchun mos keladi. Uzun xizmat muddati va ishonchlilik kafolatlanadi.',
    image: 'https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg',
    category: 'brakes',
    compatibility: ['Toyota', 'Honda', 'Nissan', 'Mitsubishi', 'Hyundai', 'Kia'],
    specifications: {
      material: 'Keramik kompozit',
      thickness: '12mm',
      width: '50mm',
      temperature: '400°C gacha',
      warranty: '2 yil'
    }
  },
  {
    id: 2,
    name: 'Novanta FZ Disk',
    oldPrice: 1500000,
    price: 1200000,
    discount: 20,
    available: true,
    rating: 4.8,
    description: 'Novanta FZ yuqori sifatli avtomobil disklari. Sport va kundalik haydash uchun ideal. Zamonaviy dizayn va mustahkam material.',
    image: 'https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg',
    category: 'wheels',
    compatibility: ['BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Porsche'],
    specifications: {
      diameter: '17 dyuym',
      width: '7.5J',
      material: 'Alyuminiy qotishma',
      bolt_pattern: '5x120',
      color: 'Qora bronza'
    }
  },
  {
    id: 3,
    name: 'POST Tormoz Sistemi',
    oldPrice: 980000,
    price: 780000,
    discount: 20,
    available: false,
    rating: 4.3,
    description: 'POST tormoz sistemasi to\'liq komplekt. Oson o\'rnatish va yuqori samaradorlik. Barcha turdagi avtomobillar uchun mos.',
    image: 'https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg',
    category: 'brakes',
    compatibility: ['Lada', 'UAZ', 'GAZ', 'ZAZ'],
    specifications: {
      type: 'Disk tormoz',
      piston_count: '4',
      caliper_material: 'Chugun',
      pad_material: 'Organik',
      warranty: '1 yil'
    }
  },
  {
    id: 4,
    name: 'Premium Tormoz Kalodkasi',
    oldPrice: 650000,
    price: 520000,
    discount: 20,
    available: true,
    rating: 4.6,
    description: 'Premium klass tormoz kalodkalari. Yuqori haroratga chidamli va uzoq xizmat muddati. Xavfsiz haydash kafolati.',
    image: 'https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg',
    category: 'brakes',
    compatibility: ['Lexus', 'Infiniti', 'Acura', 'Cadillac', 'Lincoln'],
    specifications: {
      material: 'Sintetik kompozit',
      thickness: '14mm',
      width: '55mm',
      temperature: '500°C gacha',
      warranty: '3 yil'
    }
  },
  {
    id: 5,
    name: 'Sport Disk 17"',
    oldPrice: 1800000,
    price: 1500000,
    discount: 17,
    available: true,
    rating: 4.7,
    description: '17 dyuymli sport disklar. Yengil va mustahkam qotishma. Avtomobilga sport va zamonaviy ko\'rinish beradi.',
    image: 'https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg',
    category: 'wheels',
    compatibility: ['Ford', 'Chevrolet', 'Dodge', 'Jeep', 'Mazda'],
    specifications: {
      diameter: '17 dyuym',
      width: '8J',
      material: 'Magniy qotishma',
      bolt_pattern: '5x114.3',
      finish: 'Matt qora'
    }
  },
  {
    id: 6,
    name: 'Universal Tormoz Kalodkasi',
    oldPrice: 480000,
    price: 380000,
    discount: 21,
    available: true,
    rating: 4.2,
    description: 'Universal tormoz kalodkalari. Ko\'plab avtomobil modellariga mos. Sifat va narxning yaxshi muvozanati.',
    image: 'https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg',
    category: 'brakes',
    compatibility: ['Opel', 'Renault', 'Peugeot', 'Citroen', 'Fiat'],
    specifications: {
      material: 'Yarim metallik',
      thickness: '11mm',
      width: '48mm',
      temperature: '350°C gacha',
      warranty: '18 oy'
    }
  },
  {
    id: 7,
    name: 'Professional Disk Set',
    oldPrice: 2200000,
    price: 1750000,
    discount: 20,
    available: true,
    rating: 4.9,
    description: 'Professional disk to\'plami. 4 donadan iborat to\'liq komplekt. Yuqori sifat va kafolatlangan ishlashi.',
    image: 'https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg',
    category: 'wheels',
    compatibility: ['Tesla', 'Rivian', 'Lucid', 'Polestar'],
    specifications: {
      diameter: '18 dyuym',
      width: '8.5J',
      material: 'Karbon fiber',
      bolt_pattern: '5x130',
      weight: '9.5kg (har bir disk)'
    }
  },
  {
    id: 8,
    name: 'Heavy Duty Tormoz',
    oldPrice: 850000,
    price: 680000,
    discount: 20,
    available: false,
    rating: 4.1,
    description: 'Heavy Duty tormoz kalodkalari. Og\'ir yuklar va qiyin sharoitlar uchun. Maksimal ishonchlilik va xavfsizlik.',
    image: 'https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg',
    category: 'brakes',
    compatibility: ['Isuzu', 'Hino', 'Mitsubishi Fuso', 'UD Trucks'],
    specifications: {
      material: 'To\'liq metallik',
      thickness: '16mm',
      width: '60mm',
      temperature: '600°C gacha',
      warranty: '2 yil'
    }
  },
  {
    id: 9,
    name: 'Toyota Camry 2015-2022 Motor Yog\'i',
    oldPrice: 350000,
    price: 280000,
    discount: 20,
    available: true,
    rating: 4.7,
    description: 'Toyota Camry uchun yuqori sifatli sintetik motor yog\'i. Uzoq xizmat muddati va motor himoyasi.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'vehicles',
    carModel: 'Toyota Camry',
    carYears: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    compatibility: ['Toyota Camry'],
    specifications: {
      type: 'Sintetik',
      viscosity: '5W-30',
      volume: '5L',
      certification: 'API SN',
      warranty: '2 yil'
    }
  },
  {
    id: 10,
    name: 'BMW E90/E92/E93 2005-2013 Tormoz Kalodkalari',
    oldPrice: 750000,
    price: 600000,
    discount: 20,
    available: true,
    rating: 4.8,
    description: 'BMW 3 Series E90/E92/E93 uchun original tormoz kalodkalari. Maksimal tormoz samaradorligi.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'vehicles',
    carModel: 'BMW 3 Series',
    carYears: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013'],
    compatibility: ['BMW 3 Series'],
    specifications: {
      material: 'Keramik kompozit',
      thickness: '13mm',
      width: '52mm',
      temperature: '450°C gacha',
      warranty: '3 yil'
    }
  },
  {
    id: 11,
    name: 'Mercedes-Benz W204 C-Class 2007-2014 Filtrlar',
    oldPrice: 450000,
    price: 360000,
    discount: 20,
    available: true,
    rating: 4.6,
    description: 'Mercedes C-Class W204 uchun to\'liq filtrlar to\'plami. Havoni va moylarni tozalash.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'vehicles',
    carModel: 'Mercedes C-Class',
    carYears: ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
    compatibility: ['Mercedes C-Class'],
    specifications: {
      includes: 'Havo filtri, moy filtri, yoqilgi filtri, salon filtri',
      material: 'Yuqori sifatli materiallar',
      warranty: '2 yil'
    }
  },
  {
    id: 12,
    name: 'Nissan Qashqai J11 2013-2020 Amortizatorlar',
    oldPrice: 1200000,
    price: 960000,
    discount: 20,
    available: true,
    rating: 4.5,
    description: 'Nissan Qashqai J11 uchun old va orqa amortizatorlar. Qulaylik va xavfsizlik.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'vehicles',
    carModel: 'Nissan Qashqai',
    carYears: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    compatibility: ['Nissan Qashqai'],
    specifications: {
      type: 'Gaz amortizator',
      position: 'Old va orqa',
      warranty: '2 yil',
      brand: 'KYB'
    }
  },
  {
    id: 13,
    name: 'Hyundai Solaris 2010-2017 Tormoz Disklari',
    oldPrice: 800000,
    price: 640000,
    discount: 20,
    available: true,
    rating: 4.4,
    description: 'Hyundai Solaris uchun old tormoz disklari. Ishonchli va uzoq xizmat muddati.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'vehicles',
    carModel: 'Hyundai Solaris',
    carYears: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
    compatibility: ['Hyundai Solaris'],
    specifications: {
      diameter: '280mm',
      thickness: '12mm',
      material: 'Chugun',
      surface: 'Ventilyatsiyali',
      warranty: '2 yil'
    }
  },
  {
    id: 14,
    name: 'Kia Rio 2011-2017 Yakit Pompasi',
    oldPrice: 650000,
    price: 520000,
    discount: 20,
    available: true,
    rating: 4.7,
    description: 'Kia Rio uchun yuqori bosimli yakit pompasi. Ishonchli va samarali.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'vehicles',
    carModel: 'Kia Rio',
    carYears: ['2011', '2012', '2013', '2014', '2015', '2016', '2017'],
    compatibility: ['Kia Rio'],
    specifications: {
      pressure: '3.5 bar',
      flow_rate: '120 L/h',
      material: 'Aluminium',
      warranty: '2 yil'
    }
  },
  {
    id: 15,
    name: 'Volkswagen Polo 2010-2020 Svechi',
    oldPrice: 180000,
    price: 144000,
    discount: 20,
    available: true,
    rating: 4.3,
    description: 'Volkswagen Polo uchun iridli svechalar. Yoqilgini tejash va yuqori samaradorlik.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'vehicles',
    carModel: 'Volkswagen Polo',
    carYears: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    compatibility: ['Volkswagen Polo'],
    specifications: {
      type: 'Iridium',
      gap: '0.8mm',
      heat_range: '6',
      warranty: '1 yil'
    }
  }
]
