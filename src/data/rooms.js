export const ROOMS_DATA = [
  {
    id: 'room-1',
    title: 'The Celestial Presidential Penthouse',
    category: 'Presidential Suite',
    destination: 'The Obsidian Tower, Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    price: 850,
    originalPrice: 1050,
    rating: 4.98,
    reviewsCount: 142,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2.5,
    sizeSqFt: 1940,
    bedType: '2 Emperor King Beds',
    image: '/images/presidential_suite.jpg',
    badge: 'Signature Suite',
    featured: true,
    description:
      'Perched on the highest floors of Tokyo with breathtaking wraparound views of Mount Fuji and the illuminated skyline. Features custom Italian marble bathrooms, a private cedarwood Finnish sauna, 24/7 dedicated butler service, and private access to the Grand Observatory lounge.',
    highlights: [
      'Floor-to-Ceiling 360° Skyline Views',
      'Private Finnish Cedar Sauna & Jacuzzi',
      '24/7 Dedicated Butler & Concierge',
      'Complimentary Vintage Cellar Tasting',
      'Private High-Speed Elevator Access'
    ],
    amenities: ['wifi', 'pool', 'spa', 'ac', 'breakfast', 'tv', 'jacuzzi', 'skyline_view', 'butler', 'gym', 'bar', 'room_service'],
    reviews: [
      {
        id: 'rev-1',
        name: 'Alexander Wright',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        date: 'October 2026',
        rating: 5.0,
        comment: 'Unbelievable skyline views and world-class butler service. Watching the Tokyo sunset from the private sauna was an unforgettable experience.'
      },
      {
        id: 'rev-2',
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        date: 'September 2026',
        rating: 5.0,
        comment: 'Pure luxury from the moment we arrived. The attention to detail in the bedroom acoustics and linen quality gave us the best sleep ever.'
      }
    ]
  },
  {
    id: 'room-2',
    title: 'Azure Horizon Overwater Villa',
    category: 'Oceanfront Villa',
    destination: 'Grand Azure Resort, Maldives',
    city: 'Maldives',
    country: 'Maldives',
    price: 1200,
    originalPrice: 1450,
    rating: 4.99,
    reviewsCount: 215,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 2,
    sizeSqFt: 2370,
    bedType: '1 Ultra King Bed + Ocean Daybed',
    image: '/images/ocean_villa.jpg',
    badge: 'Guest Favorite',
    featured: true,
    description:
      'Suspended over turquoise coral lagoons with glass floor viewports and direct catamaran stairs into the ocean. Indulge in an infinity plunge pool, open-air teak terrace, outdoor rainfall showers, and complimentary private seaplane transfers.',
    highlights: [
      'Direct Coral Reef Lagoon Access',
      'Private Overwater Infinity Plunge Pool',
      'Glass-Floor Underwater Observation Deck',
      'Complimentary Sunset Champagne Cruise',
      'Floating Breakfast in Bed Option'
    ],
    amenities: ['wifi', 'pool', 'spa', 'ac', 'breakfast', 'tv', 'ocean_view', 'room_service', 'bar'],
    reviews: [
      {
        id: 'rev-3',
        name: 'Sophia Chen',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        date: 'October 2026',
        rating: 5.0,
        comment: 'Snorkeling straight off our villa deck into crystal clear water with sea turtles was magical. The private plunge pool at twilight is paradise.'
      },
      {
        id: 'rev-4',
        name: 'Marcus Sterling',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        date: 'August 2026',
        rating: 5.0,
        comment: 'The epitome of Maldivian hospitality. The floating champagne breakfast was a standout memory of our honeymoon.'
      }
    ]
  },
  {
    id: 'room-3',
    title: 'Cliffside Sanctuary & Hydro-Terrace',
    category: 'Royal Cliff Suite',
    destination: 'Riviera Haven, Amalfi Coast',
    city: 'Amalfi Coast',
    country: 'Italy',
    price: 980,
    originalPrice: 1180,
    rating: 4.96,
    reviewsCount: 98,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1.5,
    sizeSqFt: 1500,
    bedType: '1 Handcrafted Italian King Bed',
    image: '/images/royal_cliff.jpg',
    badge: 'Romantic Getaway',
    featured: true,
    description:
      'Carved directly into the limestone cliffs of Positano overlooking the shimmering Mediterranean Sea. Boasts a hand-chiseled heated hydrotherapy jacuzzi, private citrus orchard pergola, antique terracotta floors, and sommelier wine pairings at sunset.',
    highlights: [
      'Heated Limestone Cliff Jacuzzi',
      'Spectacular Mediterranean Sea Panoramas',
      'Private Sunset Dining Pergola',
      'Artisanal Italian Linen & Bvlgari Toiletries',
      'Daily Curated Wine & Antipasto Delivery'
    ],
    amenities: ['wifi', 'spa', 'ac', 'breakfast', 'tv', 'jacuzzi', 'ocean_view', 'room_service'],
    reviews: [
      {
        id: 'rev-5',
        name: 'Isabella Moretti',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        date: 'October 2026',
        rating: 5.0,
        comment: 'Sitting in the cliffside warm jacuzzi with prosecco looking out over the boats at sunset is something out of a dream.'
      }
    ]
  },
  {
    id: 'room-4',
    title: 'Metropolitan Executive Loft',
    category: 'Executive Penthouse',
    destination: 'Manhattan Reserve, New York',
    city: 'New York',
    country: 'United States',
    price: 620,
    originalPrice: 750,
    rating: 4.92,
    reviewsCount: 176,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqFt: 1180,
    bedType: '1 California King Bed',
    image: '/images/executive_penthouse.jpg',
    badge: 'Business & Leisure',
    featured: false,
    description:
      'An architectural masterwork in Manhattan featuring dark walnut acoustics, motorized blackout drapes, Bang & Olufsen sound architecture, and an executive workspace equipped for high-stakes dealmakers and luxury connoisseurs.',
    highlights: [
      'Acoustic Triple-Glazed Soundproofing',
      'Bang & Olufsen Immersive Audio',
      'Ergonomic Designer Work Studio with Dual 4K Displays',
      'En-Suite Espresso & Barista Bar',
      'Complimentary Tesla Model S Chauffeur'
    ],
    amenities: ['wifi', 'ac', 'tv', 'skyline_view', 'gym', 'bar', 'room_service'],
    reviews: [
      {
        id: 'rev-6',
        name: 'David Vance',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
        date: 'September 2026',
        rating: 4.9,
        comment: 'Best executive hotel in NYC. Silent room despite being right in midtown. The work setup was perfection.'
      }
    ]
  },
  {
    id: 'room-5',
    title: 'Zen Botanical Garden Sanctuary',
    category: 'Garden Bungalow',
    destination: 'Lumina Sanctuary, Bali Ubud',
    city: 'Bali',
    country: 'Indonesia',
    price: 450,
    originalPrice: 550,
    rating: 4.95,
    reviewsCount: 310,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqFt: 1450,
    bedType: '1 Teak Four-Poster King Bed',
    image: '/images/garden_bungalow.jpg',
    badge: 'Eco Wellness',
    featured: false,
    description:
      'Immerse in holistic tranquility nestled amongst lush tropical foliage, lily ponds, and bubbling volcanic stone fountains. Features open-air garden rain showers, handcrafted teak architecture, daily yoga masterclasses, and an organic Ayurvedic farm-to-table breakfast.',
    highlights: [
      'Private Tropical Flora Courtyard & Fountain',
      'Open-Air Slate Stone Rain Shower',
      'Daily Private Sound Bath & Morning Yoga',
      'Organic Ayurvedic Breakfast Buffet',
      'Herbal Tea & Cold Pressed Juice Sommelier'
    ],
    amenities: ['wifi', 'spa', 'ac', 'breakfast', 'room_service'],
    reviews: [
      {
        id: 'rev-7',
        name: 'Claire Moreau',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
        date: 'October 2026',
        rating: 5.0,
        comment: 'Pure peace. The sound of water fountain and morning birds while doing yoga in the pavilion recharged my soul.'
      }
    ]
  },
  {
    id: 'room-6',
    title: 'Alpine Serenity Deluxe King',
    category: 'Deluxe King',
    destination: 'St. Moritz Crest, Swiss Alps',
    city: 'Swiss Alps',
    country: 'Switzerland',
    price: 540,
    originalPrice: 650,
    rating: 4.94,
    reviewsCount: 128,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqFt: 1020,
    bedType: '1 Plush European King Bed',
    image: '/images/deluxe_king.jpg',
    badge: 'Mountain View',
    featured: false,
    description:
      'Surrounded by soaring snow-capped peaks and fragrant pine forests. Features a private wood-burning stone fireplace, heated oak flooring, cashmere blankets, an en-suite thermal tub, and direct ski-in/ski-out valet storage.',
    highlights: [
      'Balcony with Panoramic Alpine Ridge Views',
      'Wood-Burning Natural Stone Fireplace',
      'Thermal Deep Soaking Tub with Mountain View',
      'Ski-in / Ski-out Valet Service & Heated Boot Room',
      'Artisan Hot Chocolate & Mulled Wine Bar'
    ],
    amenities: ['wifi', 'spa', 'ac', 'breakfast', 'tv', 'jacuzzi', 'room_service'],
    reviews: [
      {
        id: 'rev-8',
        name: 'Lars Lindqvist',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
        date: 'September 2026',
        rating: 5.0,
        comment: 'The fireplace and mountain scenery are unmatched. Coming back from the slopes to warm glühwein was heavenly.'
      }
    ]
  }
];

export const CATEGORIES = [
  'All Rooms',
  'Presidential Suite',
  'Oceanfront Villa',
  'Royal Cliff Suite',
  'Executive Penthouse',
  'Garden Bungalow',
  'Deluxe King'
];

export const DESTINATIONS = [
  'All Destinations',
  'Tokyo',
  'Maldives',
  'Amalfi Coast',
  'New York',
  'Bali',
  'Swiss Alps'
];

export const AMENITY_DEFINITIONS = [
  { key: 'wifi', label: 'Ultra High-Speed Wi-Fi' },
  { key: 'pool', label: 'Infinity Pool' },
  { key: 'spa', label: 'Spa & Wellness' },
  { key: 'jacuzzi', label: 'Private Heated Jacuzzi' },
  { key: 'ocean_view', label: 'Ocean View' },
  { key: 'skyline_view', label: 'Skyline View' },
  { key: 'breakfast', label: 'Breakfast Included' },
  { key: 'ac', label: 'Climate Control' },
  { key: 'tv', label: '85" 4K Smart OLED' },
  { key: 'butler', label: '24/7 Personal Butler' },
  { key: 'gym', label: 'Private Fitness Studio' },
  { key: 'bar', label: 'In-Room Mixology Bar' },
  { key: 'room_service', label: '24-Hour In-Room Dining' }
];

export const LUXURY_ADDONS = [
  {
    id: 'airport_chauffeur',
    title: 'Luxury Mercedes Maybach Chauffeur Transfer',
    description: 'Private airport meet & greet with luggage handling and chilled refreshments',
    price: 85,
    type: 'flat'
  },
  {
    id: 'champagne_breakfast',
    title: 'Gourmet Dom Pérignon Breakfast Buffet',
    description: 'Farm-fresh organic gourmet breakfast delivered to your room or seaside pergola',
    price: 45,
    type: 'per_day'
  },
  {
    id: 'spa_package',
    title: 'Signature Couples Aromatherapy & Hot Stone Spa (90 min)',
    description: 'Holistic full-body rejuvenation with natural essential oils & herbal steam bath',
    price: 180,
    type: 'flat'
  },
  {
    id: 'late_checkout',
    title: 'Guaranteed Late Check-Out (Until 4:00 PM)',
    description: 'Enjoy your final day unhurried with relaxed packing and pool lounge privileges',
    price: 60,
    type: 'flat'
  }
];
