import { Product, CategoryMeta } from '../types';

export const CATEGORIES_METADATA: CategoryMeta[] = [
  {
    "id": "electronics_audio",
    "name": "Consumer Electronics & Audio",
    "shortName": "Electronics",
    "icon": "Headphones",
    "bannerImage": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    "subcategories": [
      "Headphones",
      "Speakers",
      "Gaming Audio",
      "Keyboards",
      "Webcams"
    ]
  },
  {
    "id": "smart_lighting",
    "name": "Smart Home & Architectural Lighting",
    "shortName": "Lighting",
    "icon": "Lamp",
    "bannerImage": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
    "subcategories": [
      "Table Lamps",
      "Ambient Lights",
      "Cabinet LEDs",
      "Floor Lamps",
      "Night Lights"
    ]
  },
  {
    "id": "fashion_watches",
    "name": "Timepieces & Horology",
    "shortName": "Watches",
    "icon": "Watch",
    "bannerImage": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    "subcategories": [
      "Mechanical Watches",
      "Smartwatches",
      "Quartz Dress",
      "Watch Straps",
      "Chronographs"
    ]
  },
  {
    "id": "furniture_living",
    "name": "Furniture & Interior Living",
    "shortName": "Furniture",
    "icon": "Armchair",
    "bannerImage": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
    "subcategories": [
      "Lounge Chairs",
      "Coffee Tables",
      "Desk Chairs",
      "Shelving",
      "Armchairs"
    ]
  },
  {
    "id": "kitchen_tableware",
    "name": "Kitchen, Dining & Coffee Craft",
    "shortName": "Kitchen",
    "icon": "Coffee",
    "bannerImage": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    "subcategories": [
      "Pour-Over & Kettles",
      "Ceramic Tableware",
      "Cutlery & Knives",
      "Coffee Grinders",
      "French Press"
    ]
  },
  {
    "id": "lifestyle_gadgets",
    "name": "Everyday Carry & Lifestyle Decor",
    "shortName": "Lifestyle",
    "icon": "Sparkles",
    "bannerImage": "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1200&q=80",
    "subcategories": [
      "Desk Accessories",
      "Incense & Aromas",
      "Wireless Chargers",
      "Linen Textiles",
      "Clocks"
    ]
  }
];

export const PRODUCTS_CATALOG: Product[] = [
  {
    "id": "elec_01",
    "slug": "soundcore-spatial-anc-headphones",
    "name": "Aether Pro Hybrid ANC Wireless Headphones",
    "subtitle": "Hi-Res Lossless Audio, 45dB Active Noise Cancellation, 60H Battery",
    "category": "electronics_audio",
    "subcategory": "Headphones",
    "priceBDT": 6450,
    "originalPriceBDT": 10500,
    "discountPercent": 39,
    "rating": 4.9,
    "reviewsCount": 382,
    "ordersCount": 1840,
    "inStock": true,
    "stockCount": 45,
    "badge": "FlashSale",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Immerse yourself in concert-hall acoustics with precision 40mm bio-cellulose drivers, LDAC high-resolution decoding, and adaptive hybrid noise cancellation.",
    "keyFeatures": [
      "Industry-leading 45dB Active Noise Cancellation with transparency pass-through",
      "LDAC & Hi-Res Wireless Certification with custom equalizer mobile app",
      "Plush cloud-foam protein leather ear cushions with folding aluminum hinges",
      "Multipoint connection: seamlessly toggle between laptop and smartphone"
    ],
    "specifications": {
      "Driver Size": "40mm Dynamic Driver",
      "Frequency Response": "20Hz – 40,000Hz",
      "Bluetooth Version": "5.4 with LDAC & AAC",
      "Battery Life": "60 Hours (ANC Off) / 45 Hours (ANC On)",
      "Fast Charge": "10 mins gives 5 hours playtime",
      "Weight": "255g"
    },
    "colors": [
      {
        "name": "Matte Obsidian",
        "hex": "#18181B",
        "label": "Space Black"
      },
      {
        "name": "Oatmeal Titanium",
        "hex": "#D4D4D8",
        "label": "Silver Grey"
      },
      {
        "name": "Midnight Navy",
        "hex": "#1E293B",
        "label": "Deep Blue"
      }
    ],
    "origin": "Authorized Global Electronics Co.",
    "warranty": "12 Months Official Replacement Warranty",
    "seller": {
      "name": "Acoustics Direct Official Store",
      "rating": 4.9,
      "followers": "124K",
      "positiveFeedbackRate": "98.8%"
    },
    "reviews": [
      {
        "id": "rev_e1_1",
        "author": "Tanvir Hossain",
        "location": "Dhanmondi, Dhaka",
        "rating": 5,
        "date": "2 days ago",
        "title": "Flawless ANC performance in Dhaka traffic",
        "comment": "Received within 48 hours via express courier. ANC cuts out noisy street traffic completely while bass remains tight and punchy.",
        "verified": true,
        "helpfulCount": 28
      },
      {
        "id": "rev_e1_2",
        "author": "Nabila Karim",
        "location": "Agrabad, Chittagong",
        "rating": 5,
        "date": "1 week ago",
        "title": "Battery lasts for weeks, super comfortable",
        "comment": "I use these for 6-8 hours daily during office meetings. Ear cups are velvety soft and don’t pinch my glasses at all.",
        "verified": true,
        "helpfulCount": 19
      },
      {
        "id": "rev_e1_3",
        "author": "Shakil Ahmed",
        "location": "Uttara, Dhaka",
        "rating": 4,
        "date": "2 weeks ago",
        "title": "High quality build, LDAC works great on Android",
        "comment": "Streaming lossless FLAC sounds phenomenal. App equalizer gives full sound signature control. Highly recommend!",
        "verified": true,
        "helpfulCount": 14
      }
    ],
    "isFlashSale": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isBestDiscount": false,
    "bestSellerRank": 1,
    "claimedPercent": 82
  },
  {
    "id": "elec_02",
    "slug": "strata-monolith-spatial-speaker",
    "name": "Strata Monolith Aluminum Wireless Desktop Speaker",
    "subtitle": "Cast Aluminum Enclosure, Dual Passive Radiators, Lossless Wi-Fi & BT 5.4",
    "category": "electronics_audio",
    "subcategory": "Speakers",
    "priceBDT": 14990,
    "originalPriceBDT": 22000,
    "discountPercent": 32,
    "rating": 4.8,
    "reviewsCount": 142,
    "ordersCount": 890,
    "inStock": true,
    "stockCount": 18,
    "badge": "Featured",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Precision acoustic engineering distilled into a monolithic totem. Driven by custom dual neodymium full-range transducers and an airtight passive bass radiator.",
    "keyFeatures": [
      "60W RMS Class-D audiophile digital amplifier with DSP room calibration",
      "High-pressure die-cast aluminum body to eliminate cabinet resonance",
      "Lossless Wi-Fi, AirPlay 2, Spotify Connect, and Bluetooth 5.4 LE Audio",
      "Kvadrat acoustic wool fabric grille with touch-sensitive top rotary dial"
    ],
    "specifications": {
      "Power Output": "60W RMS (Peak 120W)",
      "Connectivity": "Wi-Fi 6, BT 5.4, 3.5mm Aux, Optical-in",
      "Frequency Range": "42Hz – 22kHz",
      "Dimensions": "24 x 18 x 11 cm",
      "Weight": "3.6 kg"
    },
    "colors": [
      {
        "name": "Anodized Black",
        "hex": "#18181B",
        "label": "Matte Charcoal"
      },
      {
        "name": "Bead-Blasted Silver",
        "hex": "#E2E8F0",
        "label": "Silver Anodized"
      }
    ],
    "origin": "Aarhus Design Lab",
    "warranty": "24 Months Brand Guarantee",
    "seller": {
      "name": "Nexus Hi-Fi Global Store",
      "rating": 4.9,
      "followers": "85K",
      "positiveFeedbackRate": "99.1%"
    },
    "reviews": [
      {
        "id": "rev_e2_1",
        "author": "Fahim Morshed",
        "location": "Gulshan 2, Dhaka",
        "rating": 5,
        "date": "3 days ago",
        "title": "Hefty aluminum body and room-filling sound",
        "comment": "This speaker is a work of industrial art. Solid milled aluminum, zero distortion at max volume, and Wi-Fi streaming is lossless.",
        "verified": true,
        "helpfulCount": 22
      },
      {
        "id": "rev_e2_2",
        "author": "Sadia Rahman",
        "location": "Zindabazar, Sylhet",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Premium packaging and fast delivery to Sylhet",
        "comment": "Arrived in double bubble-wrap within 3 days. Connects instantly with my MacBook and iPhone. Soundstage is so wide.",
        "verified": true,
        "helpfulCount": 11
      }
    ],
    "isFlashSale": false,
    "isFeatured": true,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "elec_03",
    "slug": "pulse-tws-gaming-low-latency-earbuds",
    "name": "Pulse X Pro Low-Latency Wireless Gaming Earbuds",
    "subtitle": "38ms Ultra-Low Latency, Dual ENC Mics, Cyber LED Charging Case",
    "category": "electronics_audio",
    "subcategory": "Gaming Audio",
    "priceBDT": 2850,
    "originalPriceBDT": 4500,
    "discountPercent": 37,
    "rating": 4.7,
    "reviewsCount": 520,
    "ordersCount": 3410,
    "inStock": true,
    "stockCount": 120,
    "badge": "Choice",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Engineered for competitive mobile gaming and multimedia. Features 38ms instant latency mode, custom dynamic titanium drivers, and environmental noise cancelling microphones.",
    "keyFeatures": [
      "38ms Game Mode for instant footstep and gunfire audio sync",
      "Environmental Noise Cancellation (ENC) for clear squad voice comms",
      "IPX5 water and sweat resistance for intense workouts",
      "36-hour total battery life with fast Type-C charging case"
    ],
    "specifications": {
      "Bluetooth": "5.3 Gaming Chipset",
      "Latency": "38ms Dedicated Game Mode",
      "Driver": "12mm Titanium-Plated Diaphragm",
      "Waterproof": "IPX5 Rated",
      "Battery": "6h (Earbuds) + 30h (Case)"
    },
    "colors": [
      {
        "name": "Cyber White",
        "hex": "#F8FAFC",
        "label": "Glacier White"
      },
      {
        "name": "Mecha Black",
        "hex": "#0F172A",
        "label": "Matte Gunmetal"
      }
    ],
    "origin": "Shenzhen Gaming Audio Labs",
    "warranty": "6 Months Replacement Warranty",
    "seller": {
      "name": "CyberGaming Flagship Store",
      "rating": 4.8,
      "followers": "210K",
      "positiveFeedbackRate": "97.9%"
    },
    "reviews": [
      {
        "id": "rev_e4",
        "author": "Saiful Islam",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "5 days ago",
        "title": "Perfect for PUBG mobile and Valorant",
        "comment": "Zero delay when shooting. The case LEDs look awesome. Cash on delivery was super fast.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "elec_04",
    "slug": "lumia-75-mechanical-rgb-keyboard",
    "name": "Lumia 75 Hot-Swappable Wireless Mechanical Keyboard",
    "subtitle": "Gasket-Mounted, Tri-Mode (BT/2.4G/USB-C), Pre-Lubed Linear Switches, PBT Keycaps",
    "category": "electronics_audio",
    "subcategory": "Keyboards",
    "priceBDT": 5200,
    "originalPriceBDT": 7800,
    "discountPercent": 33,
    "rating": 4.9,
    "reviewsCount": 215,
    "ordersCount": 1120,
    "inStock": true,
    "stockCount": 34,
    "badge": "SuperDeal",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Enthusiast-level acoustic typing feel with custom 5-layer sound-dampening gasket mount, factory lubricated creamy linear switches, and thick dye-sub PBT cherry profile keycaps.",
    "keyFeatures": [
      "Gasket Mount Architecture with Poron foam for deep, creamy thock",
      "Hot-swappable 3-pin & 5-pin PCB socket for easy switch customization",
      "Tri-Mode connectivity: Bluetooth 5.1, 2.4GHz Wireless, and Detachable USB-C",
      "Multi-function CNC aluminum metal volume rotary knob with South-facing RGB"
    ],
    "specifications": {
      "Layout": "75% Compact (82 Keys + Rotary Dial)",
      "Switch Type": "Pre-Lubed Yellow Linear Cream Switches",
      "Battery": "4,000 mAh Rechargeable Li-Ion",
      "Keycaps": "Double-Shot PBT Cherry Profile",
      "Compatibility": "Windows, Mac, iOS, Android"
    },
    "colors": [
      {
        "name": "Retro Cream",
        "hex": "#FEF3C7",
        "label": "Vintage White/Grey"
      },
      {
        "name": "Dark Shadow",
        "hex": "#1E293B",
        "label": "Dark Navy/Black"
      }
    ],
    "origin": "Keyforge Studio",
    "warranty": "1 Year Warranty",
    "seller": {
      "name": "Custom Keyboards Official Store",
      "rating": 4.9,
      "followers": "92K",
      "positiveFeedbackRate": "99.4%"
    },
    "reviews": [
      {
        "id": "rev_e5",
        "author": "Fahim Rahman",
        "location": "Khulna, BD",
        "rating": 5,
        "date": "1 week ago",
        "title": "Sounds like pure butter straight out of the box",
        "comment": "No rattling stabs, incredible creamy sound. Heavy build and the knob works great for Spotify volume.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": true
  },
  {
    "id": "elec_05",
    "slug": "clarity-4k-uhd-stream-webcam",
    "name": "Clarity 4K UHD Streaming Webcam with Ring Light",
    "subtitle": "Sony STARVIS Sensor, Auto Focus, Dual Stereo Microphones, Privacy Shutter",
    "category": "electronics_audio",
    "subcategory": "Webcams",
    "priceBDT": 4150,
    "originalPriceBDT": 6200,
    "discountPercent": 33,
    "rating": 4.8,
    "reviewsCount": 167,
    "ordersCount": 940,
    "inStock": true,
    "stockCount": 28,
    "badge": "Choice",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Broadcast in true 4K resolution at 60FPS. Features an integrated touch-adjustable ring light to keep your face illuminated evenly in low light studio settings.",
    "keyFeatures": [
      "Sony 4K CMOS sensor with AI intelligent face tracking auto focus",
      "3-level adjustable LED warm-to-cool ring light built into the bezel",
      "Dual noise-canceling beamforming microphones with 5-meter pickup",
      "Magnetic privacy sliding cover and 360-degree ball-head monitor clamp"
    ],
    "specifications": {
      "Resolution": "4K @ 30FPS / 1080P @ 60FPS",
      "Field of View": "90° Wide Angle",
      "Connection": "Plug and Play USB-C to USB-A",
      "Mounting": "Universal Monitor Clip & 1/4\" Tripod Thread"
    },
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#171717",
        "label": "Studio Noir"
      }
    ],
    "origin": "Visual Stream Optics",
    "warranty": "1 Year Warranty",
    "seller": {
      "name": "Streamer Tech Hub",
      "rating": 4.8,
      "followers": "45K",
      "positiveFeedbackRate": "98.2%"
    },
    "reviews": [
      {
        "id": "rev_e6",
        "author": "Mahmudul Hasan",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "3 weeks ago",
        "title": "Huge upgrade from laptop camera for client presentations",
        "comment": "The ring light works like magic during evening power cuts or dim rooms. Crisp 4K picture.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "light_01",
    "slug": "lumina-touch-brass-table-lamp",
    "name": "Lumina Fluted Brass & Travertine Table Lamp",
    "subtitle": "Stepless Rotary Touch Dimmer, Hand-Blown Frosted Opal Glass Globe",
    "category": "smart_lighting",
    "subcategory": "Table Lamps",
    "priceBDT": 3850,
    "originalPriceBDT": 5900,
    "discountPercent": 35,
    "rating": 4.9,
    "reviewsCount": 284,
    "ordersCount": 1650,
    "inStock": true,
    "stockCount": 50,
    "badge": "Featured",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "A study in balance and architectural luminescence. The Lumina table lamp pairs a solid hand-finished travertine plinth with an unlacquered brushed brass vertical stem and hand-blown frosted opal glass globe.",
    "keyFeatures": [
      "Solid honed travertine stone plinth providing heavy tip-resistant stability",
      "Unlacquered architectural brass stem that develops a mature organic patina",
      "Warm 2700K eye-comfort LED bulb included with stepless rotary dimming",
      "2.2m braided fabric cord with brass toggle switch"
    ],
    "specifications": {
      "Height": "38 cm",
      "Base Diameter": "18 cm",
      "Weight": "4.2 kg",
      "Bulb Socket": "Standard E27 (Warm White LED included)",
      "Voltage": "110V – 240V Universal"
    },
    "colors": [
      {
        "name": "Brushed Brass",
        "hex": "#D97706",
        "label": "Raw Unlacquered Brass"
      },
      {
        "name": "Oxidized Bronze",
        "hex": "#44403C",
        "label": "Dark Patinated Bronze"
      },
      {
        "name": "Satin Nickel",
        "hex": "#94A3B8",
        "label": "Brushed Nickel"
      }
    ],
    "origin": "Atelier Nord Foundry",
    "warranty": "3 Years Warranty",
    "seller": {
      "name": "Lumina Design Official",
      "rating": 4.9,
      "followers": "150K",
      "positiveFeedbackRate": "99.2%"
    },
    "reviews": [
      {
        "id": "rev_l1_1",
        "author": "Afsana Chowdhury",
        "location": "Banani, Dhaka",
        "rating": 5,
        "date": "4 days ago",
        "title": "Travertine stone base is genuinely breathtaking",
        "comment": "Substantial real Italian travertine stone with heavy brushed brass. The dimmable rotary knob has such satisfying tactile weight.",
        "verified": true,
        "helpfulCount": 34
      },
      {
        "id": "rev_l1_2",
        "author": "Mahmudul Hasan",
        "location": "Mirpur DOHS, Dhaka",
        "rating": 5,
        "date": "1 week ago",
        "title": "Warm ambient glow, no flicker",
        "comment": "Transforms my entire living room aesthetic at night. Delivered with safe foam packing without any scratches.",
        "verified": true,
        "helpfulCount": 17
      }
    ],
    "isFlashSale": false,
    "isFeatured": true,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "light_02",
    "slug": "sunset-halo-ambient-projection-lamp",
    "name": "Sunset Halo 16-Color RGB Projection Lamp with App",
    "subtitle": "Optical Glass Lens, 360° Rotatable Aluminum Neck, Music Sync Mode",
    "category": "smart_lighting",
    "subcategory": "Ambient Lights",
    "priceBDT": 1650,
    "originalPriceBDT": 2800,
    "discountPercent": 41,
    "rating": 4.8,
    "reviewsCount": 680,
    "ordersCount": 4210,
    "inStock": true,
    "stockCount": 85,
    "badge": "FlashSale",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Transform any plain wall into a dreamy golden hour sunset. Features a high-transmittance crystal lens and smart phone app control with 16 million colors.",
    "keyFeatures": [
      "Thick crystal optical lens projecting sharp, saturated color gradients",
      "Wireless Bluetooth App & RF Remote for color mixing and schedule timer",
      "USB-powered: plug into power bank, laptop, or wall charger",
      "Aluminum heat sink body with 360-degree universal joint rotation"
    ],
    "specifications": {
      "Power": "10W USB Powered (5V/2A)",
      "Height": "27 cm",
      "Controls": "Bluetooth Smart App + 24-Key Wireless Remote"
    },
    "colors": [
      {
        "name": "Sunset Golden",
        "hex": "#F59E0B",
        "label": "Golden Hour"
      },
      {
        "name": "Aurora Neon",
        "hex": "#6366F1",
        "label": "Rainbow Aurora"
      }
    ],
    "origin": "Optics Light Co.",
    "warranty": "6 Months Replacement Warranty",
    "seller": {
      "name": "Ambient Room Decor Store",
      "rating": 4.8,
      "followers": "310K",
      "positiveFeedbackRate": "97.5%"
    },
    "reviews": [
      {
        "id": "rev_l2",
        "author": "Sadia Jahan",
        "location": "Rajshahi, BD",
        "rating": 5,
        "date": "1 week ago",
        "title": "Aesthetic photos look 10x better now!",
        "comment": "Great for reels and photography backgrounds. Shipped in safe bubble wrap packaging.",
        "verified": true
      }
    ],
    "isFlashSale": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false,
    "claimedPercent": 82
  },
  {
    "id": "light_03",
    "slug": "magnetic-motion-sensor-cabinet-led",
    "name": "Ultra-Thin Magnetic Wireless PIR Sensor LED Strip (Pack of 2)",
    "subtitle": "Rechargeable Type-C, Motion Detection, Warm & Cool Dimming, Closet & Kitchen",
    "category": "smart_lighting",
    "subcategory": "Cabinet LEDs",
    "priceBDT": 1250,
    "originalPriceBDT": 1950,
    "discountPercent": 36,
    "rating": 4.7,
    "reviewsCount": 390,
    "ordersCount": 2890,
    "inStock": true,
    "stockCount": 95,
    "badge": "BestSeller",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Slender 9mm aluminum bar with built-in passive infrared motion sensor. Snaps onto included magnetic adhesive strip without any wiring or drilling.",
    "keyFeatures": [
      "PIR motion sensor automatically turns on within 3 meters and off after 20s",
      "Dual color temperature: Warm 3000K, Neutral 4000K, and Daylight 6000K",
      "Magnetic peel-and-stick installation: remove anytime to recharge",
      "Built-in 1500mAh lithium battery lasts up to 60 days on auto sensor mode"
    ],
    "specifications": {
      "Length": "30 cm per bar (2 bars included)",
      "Thickness": "9mm Ultra Slim",
      "Battery": "1,500mAh USB-C Rechargeable"
    },
    "colors": [
      {
        "name": "Anodized Silver",
        "hex": "#CBD5E1",
        "label": "Silver Trim"
      },
      {
        "name": "Matte Charcoal",
        "hex": "#1E293B",
        "label": "Dark Grey"
      }
    ],
    "origin": "Smart Home Automation Co.",
    "warranty": "6 Months Warranty",
    "seller": {
      "name": "Smart Essentials Store",
      "rating": 4.7,
      "followers": "180K",
      "positiveFeedbackRate": "98.0%"
    },
    "reviews": [
      {
        "id": "rev_l3",
        "author": "Rashedul Karim",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Very useful for wardrobes and under kitchen cabinets",
        "comment": "Magnets stick firmly. Lights up instantly when opening the closet door at night.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": true,
    "isBestDiscount": false,
    "bestSellerRank": 3
  },
  {
    "id": "light_04",
    "slug": "nordic-arc-minimalist-floor-lamp",
    "name": "Nordic Minimalist Arc Floor Lamp with Marble Plinth",
    "subtitle": "Cast Iron & White Carrara Marble, Foot Tap Switch, Warm 3000K Soft Glow",
    "category": "smart_lighting",
    "subcategory": "Floor Lamps",
    "priceBDT": 9800,
    "originalPriceBDT": 14500,
    "discountPercent": 32,
    "rating": 4.9,
    "reviewsCount": 110,
    "ordersCount": 420,
    "inStock": true,
    "stockCount": 12,
    "badge": "SuperDeal",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 4,
    "imageUrl": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "An architectural curve that gracefully cantilevers over reading chairs or sofas without requiring ceiling mounts. Grounded on an authentic 8kg solid marble disc.",
    "keyFeatures": [
      "Genuine heavy natural marble base ensuring zero tipping hazard",
      "Matte powder-coated curved iron arm with brass joint details",
      "Convenient step-on floor switch on cord",
      "Includes 12W warm non-flicker LED bulb"
    ],
    "specifications": {
      "Total Height": "165 cm",
      "Base Weight": "8.5 kg Solid Marble",
      "Reach": "50 cm Overhang"
    },
    "colors": [
      {
        "name": "Matte Black / Carrara",
        "hex": "#18181B",
        "label": "Black & White Marble"
      },
      {
        "name": "Brushed Brass / Nero",
        "hex": "#D97706",
        "label": "Brass & Black Marble"
      }
    ],
    "origin": "Stockholm Studio",
    "warranty": "2 Years Structural Warranty",
    "seller": {
      "name": "Nordic Interior Atelier",
      "rating": 4.9,
      "followers": "76K",
      "positiveFeedbackRate": "99.5%"
    },
    "reviews": [
      {
        "id": "rev_l4",
        "author": "Dr. Munir Ahmed",
        "location": "Dhaka (Gulshan), BD",
        "rating": 5,
        "date": "1 month ago",
        "title": "Elevates the entire living room atmosphere",
        "comment": "Delivered in wooden crate packaging. Solid marble base and pristine finishing.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": true
  },
  {
    "id": "light_05",
    "slug": "magnetic-levitating-moon-lamp",
    "name": "Levitating Magnetic 3D Moon Night Lamp",
    "subtitle": "Magnetic Levitation in Mid-Air, Wireless Induction Power, Touch Tri-Color",
    "category": "smart_lighting",
    "subcategory": "Night Lights",
    "priceBDT": 4500,
    "originalPriceBDT": 7200,
    "discountPercent": 38,
    "rating": 4.8,
    "reviewsCount": 195,
    "ordersCount": 880,
    "inStock": true,
    "stockCount": 22,
    "badge": "SuperDeal",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Suspended by magnetic repulsion, the 3D-printed textured moon sphere floats and silently rotates continuously in mid-air above its walnut wood base.",
    "keyFeatures": [
      "Patented magnetic levitation keeps the sphere suspended with zero contact",
      "Wireless induction power transfers electricity through air without wires",
      "Realistic NASA lunar topographic 3D-printed surface craters",
      "Touch base control toggles between Warm Yellow, Neutral White, and Lunar Cool"
    ],
    "specifications": {
      "Moon Diameter": "14 cm",
      "Base Material": "Solid Dark Walnut Finish",
      "Levitation Gap": "15mm Floating Height"
    },
    "colors": [
      {
        "name": "Walnut Moon",
        "hex": "#78350F",
        "label": "Walnut Plinth"
      },
      {
        "name": "Ash Moon",
        "hex": "#D4D4D8",
        "label": "Light Ash Plinth"
      }
    ],
    "origin": "Gravitas Science Tech",
    "warranty": "1 Year Warranty",
    "seller": {
      "name": "Futuristic Gadgets Store",
      "rating": 4.8,
      "followers": "140K",
      "positiveFeedbackRate": "98.3%"
    },
    "reviews": [
      {
        "id": "rev_l5",
        "author": "Kamrul Hasan",
        "location": "Chittagong, BD",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Everyone who visits my office is amazed by this",
        "comment": "Takes about 20 seconds to balance initially, then it spins endlessly. Mesmerizing desk companion.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "wat_01",
    "slug": "chronos-automatic-titanium-timepiece",
    "name": "Atelier Chronos Grade 5 Titanium Automatic Watch",
    "subtitle": "Sapphire Crystal, Swiss 28,800 vph Calibre, 100M Water Resistant, Horween Leather",
    "category": "fashion_watches",
    "subcategory": "Mechanical Watches",
    "priceBDT": 18500,
    "originalPriceBDT": 28000,
    "discountPercent": 34,
    "rating": 5,
    "reviewsCount": 88,
    "ordersCount": 460,
    "inStock": true,
    "stockCount": 14,
    "badge": "Featured",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "A purist mechanical timepiece encased in featherweight Grade 5 sandblasted titanium. Anti-reflective sapphire crystal reveals Bauhaus-inspired minimalist dial geometry.",
    "keyFeatures": [
      "Grade 5 Aerospace Titanium case: 40% lighter and 3x stronger than stainless steel",
      "Scratchproof double-domed sapphire crystal with 5 layers of interior anti-reflective coating",
      "High-beat automatic mechanical calibre with 42 hours power reserve",
      "Transparent exhibition sapphire display caseback with numbered batch engraving"
    ],
    "specifications": {
      "Case Diameter": "39 mm",
      "Thickness": "10.2 mm",
      "Water Resistance": "10 ATM (100 meters / 330 ft)",
      "Movement": "Automatic Calibre 28,800 bph",
      "Lug Width": "20 mm"
    },
    "colors": [
      {
        "name": "Titanium Graphite",
        "hex": "#475569",
        "label": "Bead-Blasted Titanium"
      },
      {
        "name": "DLC Noir",
        "hex": "#0F172A",
        "label": "Diamond-Like Carbon Black"
      }
    ],
    "origin": "La Chaux-de-Fonds, Switzerland",
    "warranty": "5 Years Official Movement Warranty",
    "seller": {
      "name": "Horology Masters Flagship",
      "rating": 5,
      "followers": "89K",
      "positiveFeedbackRate": "99.8%"
    },
    "reviews": [
      {
        "id": "rev_w1_1",
        "author": "Imtiaz Bashar",
        "location": "Bashundhara R/A, Dhaka",
        "rating": 5,
        "date": "5 days ago",
        "title": "Titanium case feels weightless yet indestructible",
        "comment": "Grade 5 titanium finish is gorgeous in person. Exhibition caseback lets you admire the decorated rotor. Keeping +2s/day accuracy.",
        "verified": true,
        "helpfulCount": 41
      },
      {
        "id": "rev_w1_2",
        "author": "Zubair Hossain",
        "location": "Khulna Sadar",
        "rating": 5,
        "date": "3 weeks ago",
        "title": "Authentic horology piece, verified serial number",
        "comment": "Came with stamped warranty card and extra link tool. Very comfortable bracelet with micro-adjustments.",
        "verified": true,
        "helpfulCount": 25
      }
    ],
    "isFlashSale": false,
    "isFeatured": true,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "wat_02",
    "slug": "nordic-slim-steel-mesh-dress-watch",
    "name": "Nordic Slim Line Minimalist Steel Mesh Watch",
    "subtitle": "6.8mm Ultra-Thin Profile, Milanese Stainless Steel Mesh, Japanese Miyota Movement",
    "category": "fashion_watches",
    "subcategory": "Quartz Dress",
    "priceBDT": 3450,
    "originalPriceBDT": 5500,
    "discountPercent": 37,
    "rating": 4.8,
    "reviewsCount": 310,
    "ordersCount": 2150,
    "inStock": true,
    "stockCount": 65,
    "badge": "BestSeller",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Slips effortlessly under formal shirt cuffs. Designed with clean unembellished typography, matte sunray dial, and quick-release magnetic Milanese loop strap.",
    "keyFeatures": [
      "Ultra-thin 6.8mm case profile crafted from surgical grade 316L stainless steel",
      "Japanese Citizen Miyota precision quartz calibre (accurate to ±10s/month)",
      "Interchangeable breathable Milanese steel woven mesh band",
      "Hardened mineral crystal with water resistance to 30 meters"
    ],
    "specifications": {
      "Case Diameter": "40 mm",
      "Thickness": "6.8 mm Slim",
      "Strap": "Adjustable Milanese Mesh 316L"
    },
    "colors": [
      {
        "name": "Silver Slate",
        "hex": "#CBD5E1",
        "label": "Classic Silver"
      },
      {
        "name": "Rose Gold Accent",
        "hex": "#FDA4AF",
        "label": "Rose Gold & Charcoal"
      },
      {
        "name": "All Black",
        "hex": "#18181B",
        "label": "Matte Blackout"
      }
    ],
    "origin": "Copenhagen Timepieces",
    "warranty": "2 Years Warranty",
    "seller": {
      "name": "Nordic Watch Gallery",
      "rating": 4.8,
      "followers": "165K",
      "positiveFeedbackRate": "98.5%"
    },
    "reviews": [
      {
        "id": "rev_w2",
        "author": "Farhan Shakil",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "5 days ago",
        "title": "Perfect formal watch for weddings and meetings",
        "comment": "Very thin and elegant. The magnetic clasp makes size adjustment instant.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": true,
    "isBestDiscount": false,
    "bestSellerRank": 2
  },
  {
    "id": "wat_03",
    "slug": "tactical-amoled-rugged-smartwatch",
    "name": "Apex Tactical Military AMOLED Smartwatch",
    "subtitle": "1.43\" AMOLED Display, 100+ Sports Modes, Bluetooth Calling, 5ATM Waterproof, 14-Day Battery",
    "category": "fashion_watches",
    "subcategory": "Smartwatches",
    "priceBDT": 4890,
    "originalPriceBDT": 7500,
    "discountPercent": 35,
    "rating": 4.8,
    "reviewsCount": 420,
    "ordersCount": 3100,
    "inStock": true,
    "stockCount": 70,
    "badge": "FlashSale",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Built to withstand rough terrain with an alloy armor bezel, 466x466 high-brightness AMOLED screen visible in direct sunlight, and continuous health tracking.",
    "keyFeatures": [
      "1.43-inch Always-On AMOLED screen with 1000 nits peak outdoor brightness",
      "Hi-Fi Bluetooth phone calling with microphone and loud speaker",
      "Heart rate, SpO2 blood oxygen, sleep stage tracking, and stress monitor",
      "400mAh massive battery delivers 12-14 days standard usage per charge"
    ],
    "specifications": {
      "Display": "1.43\" AMOLED 466x466 Retina",
      "Battery": "400mAh (Up to 14 Days)",
      "Waterproof": "5ATM + IP69K Dust/Shock",
      "Compatibility": "Android 6.0+ & iOS 10.0+"
    },
    "colors": [
      {
        "name": "Army Olive",
        "hex": "#3F4E38",
        "label": "Military Camo Green"
      },
      {
        "name": "Tactical Black",
        "hex": "#1C1917",
        "label": "Stealth Black"
      }
    ],
    "origin": "Apex Wearables Global",
    "warranty": "1 Year Warranty",
    "seller": {
      "name": "Smart Wearables Official Store",
      "rating": 4.8,
      "followers": "280K",
      "positiveFeedbackRate": "98.1%"
    },
    "reviews": [
      {
        "id": "rev_w3",
        "author": "Imtiaz Ahmed",
        "location": "Barisal, BD",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Screen is brilliant even in bright outdoor sunlight",
        "comment": "Calling works great while driving motorcycle. Battery easily lasts 10+ days without charging.",
        "verified": true
      }
    ],
    "isFlashSale": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false,
    "claimedPercent": 83
  },
  {
    "id": "wat_04",
    "slug": "heritage-pilot-vintage-chronograph",
    "name": "Aviator Heritage Mechanical Pilot Chronograph",
    "subtitle": "Seagull ST1901 Column-Wheel Mechanical Calibre, Curved Acrylic Crystal",
    "category": "fashion_watches",
    "subcategory": "Chronographs",
    "priceBDT": 12800,
    "originalPriceBDT": 19000,
    "discountPercent": 33,
    "rating": 4.9,
    "reviewsCount": 75,
    "ordersCount": 380,
    "inStock": true,
    "stockCount": 16,
    "badge": "TopBrand",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "A tribute to 1960s military aviation chronographs. Features the revered manual-wind column wheel movement visible through an exhibition caseback.",
    "keyFeatures": [
      "Mechanical column-wheel chronograph movement: satisfying tactile pusher clicks",
      "Warm champagne dial with blued steel hands and red chronograph second hand",
      "Includes green vintage canvas military NATO strap and leather travel pouch",
      "Swan-neck regulator for superior mechanical precision timing"
    ],
    "specifications": {
      "Diameter": "38 mm Vintage Classic",
      "Movement": "ST1901 Manual Hand-Winding Column Wheel",
      "Power Reserve": "45 Hours"
    },
    "colors": [
      {
        "name": "Champagne Dial",
        "hex": "#FEF3C7",
        "label": "Vintage Cream Dial"
      },
      {
        "name": "Panda Dial",
        "hex": "#0F172A",
        "label": "Black / White Subdials"
      }
    ],
    "origin": "Heritage Flight Chronometry",
    "warranty": "2 Years Mechanical Warranty",
    "seller": {
      "name": "Aviation Horology Store",
      "rating": 4.9,
      "followers": "52K",
      "positiveFeedbackRate": "99.3%"
    },
    "reviews": [
      {
        "id": "rev_w4",
        "author": "Rezaul Karim",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "3 weeks ago",
        "title": "The mechanical column wheel movement is pure eye candy",
        "comment": "Winding it each morning is therapeutic. Chronograph buttons click crisply.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "wat_05",
    "slug": "horween-handmade-leather-strap",
    "name": "Full-Grain Vegetable-Tanned Italian Leather Watch Strap",
    "subtitle": "Hand-Stitched Quick Release Spring Bars, Brushed Steel Buckle, 20mm & 22mm",
    "category": "fashion_watches",
    "subcategory": "Watch Straps",
    "priceBDT": 1450,
    "originalPriceBDT": 2200,
    "discountPercent": 34,
    "rating": 4.8,
    "reviewsCount": 160,
    "ordersCount": 1490,
    "inStock": true,
    "stockCount": 80,
    "badge": "SuperDeal",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Cut from premium European hides and tanned with natural tree bark extracts. Softens immediately and develops an antique caramel patina with daily wear.",
    "keyFeatures": [
      "Quick-release spring bars: swap straps in 5 seconds without scratching watch lugs",
      "Hand-waxed linen edge stitching for extreme tensile durability",
      "Brushed 316L stainless steel buckle with engraved logo"
    ],
    "specifications": {
      "Width": "20mm & 22mm Standard Options",
      "Length": "120mm / 75mm (Fits 6.2\" – 8.0\" Wrists)",
      "Thickness": "3.2mm Tapered to 2.8mm"
    },
    "colors": [
      {
        "name": "Saddle Cognac",
        "hex": "#78350F",
        "label": "Warm Caramel Tan"
      },
      {
        "name": "Dark Espresso",
        "hex": "#451A03",
        "label": "Dark Brown"
      },
      {
        "name": "Noir Black",
        "hex": "#18181B",
        "label": "Deep Charcoal"
      }
    ],
    "origin": "Tuscany Leather Artisans",
    "warranty": "1 Year Warranty",
    "seller": {
      "name": "Custom Leather Workshop",
      "rating": 4.9,
      "followers": "68K",
      "positiveFeedbackRate": "98.9%"
    },
    "reviews": [
      {
        "id": "rev_w5",
        "author": "Shakil Ahmed",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "1 week ago",
        "title": "Smells like rich genuine leather",
        "comment": "Swapped my Seiko strap with this cognac one. Totally changed the look of the watch.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": true
  },
  {
    "id": "furn_01",
    "slug": "form-sculptural-oak-lounge-chair",
    "name": "Form Architectural Lounge Chair in Solid White Oak",
    "subtitle": "FSC-Certified Oak Joinery, Scandinavian Semi-Aniline Leather, Ergonomic Contour",
    "category": "furniture_living",
    "subcategory": "Lounge Chairs",
    "priceBDT": 24500,
    "originalPriceBDT": 36000,
    "discountPercent": 32,
    "rating": 4.9,
    "reviewsCount": 75,
    "ordersCount": 280,
    "inStock": true,
    "stockCount": 8,
    "badge": "Featured",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 4,
    "imageUrl": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "An ergonomic silhouette carved from sustainably harvested solid oak. The sweeping curved backrest cradles the spine while low seat geometry encourages relaxed contemplation.",
    "keyFeatures": [
      "Constructed with traditional mortise-and-tenon joints without exposed metal screws",
      "Upholstered in full-grain semi-aniline Scandinavian leather that breathes organically",
      "Treated with non-toxic organic white wax oil highlighting natural timber grain",
      "Delivered fully assembled with white-glove inside delivery service"
    ],
    "specifications": {
      "Dimensions": "78W x 72D x 74H cm",
      "Seat Height": "38 cm",
      "Weight": "14.5 kg Solid Timber",
      "Material": "Solid European White Oak"
    },
    "colors": [
      {
        "name": "Natural Oak / Tan",
        "hex": "#78350F",
        "label": "Pale Oak & Natural Tan"
      },
      {
        "name": "Smoked Oak / Noir",
        "hex": "#1C1917",
        "label": "Dark Oak & Black Leather"
      }
    ],
    "origin": "Småland Craft Workshop",
    "warranty": "10 Years Structural Guarantee",
    "seller": {
      "name": "Atelier Nord Furniture",
      "rating": 4.9,
      "followers": "110K",
      "positiveFeedbackRate": "99.4%"
    },
    "reviews": [
      {
        "id": "rev_f1_1",
        "author": "Rezaul Karim",
        "location": "Baridhara, Dhaka",
        "rating": 5,
        "date": "1 week ago",
        "title": "Solid white oak frame and exceptional Danish wool",
        "comment": "Courier handled delivery right to my 4th floor apartment. Ergonomics are superb for reading. Truly an heirloom furniture piece.",
        "verified": true,
        "helpfulCount": 19
      },
      {
        "id": "rev_f1_2",
        "author": "Tasmia Noor",
        "location": "Nasirabad, Chittagong",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Looks straight out of Architectural Digest",
        "comment": "The grain of the white oak is gorgeous. Cushioning provides firm lower-back support. Well worth the price.",
        "verified": true,
        "helpfulCount": 15
      }
    ],
    "isFlashSale": false,
    "isFeatured": true,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "furn_02",
    "slug": "walnut-floating-nightstand-drawer",
    "name": "Nordic Walnut Wall-Mounted Floating Nightstand",
    "subtitle": "Solid American Walnut, Soft-Close Undermount Drawer, Hidden Cable Routing",
    "category": "furniture_living",
    "subcategory": "Shelving",
    "priceBDT": 3200,
    "originalPriceBDT": 4800,
    "discountPercent": 33,
    "rating": 4.8,
    "reviewsCount": 145,
    "ordersCount": 890,
    "inStock": true,
    "stockCount": 30,
    "badge": "BestSeller",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Keep your bedroom airy and easy to vacuum underneath. Slides smoothly on concealed German Blum soft-close drawer runners with a wireless charger cut-out.",
    "keyFeatures": [
      "French cleat wall bracket included: mounts securely in 10 minutes",
      "Solid dark walnut front face with rich organic end-grain detail",
      "Integrated rear slot for neat smartphone charging cable routing"
    ],
    "specifications": {
      "Size": "45W x 30D x 16H cm",
      "Max Weight Capacity": "25 kg Mounted"
    },
    "colors": [
      {
        "name": "Dark Walnut",
        "hex": "#451A03",
        "label": "American Walnut"
      },
      {
        "name": "Natural Ash",
        "hex": "#D4D4D8",
        "label": "Nordic Ash"
      }
    ],
    "origin": "Nordic Joinery Co.",
    "warranty": "3 Years Warranty",
    "seller": {
      "name": "Modern Living Concepts",
      "rating": 4.8,
      "followers": "95K",
      "positiveFeedbackRate": "98.7%"
    },
    "reviews": [
      {
        "id": "rev_f2",
        "author": "Niaz Morshed",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "1 month ago",
        "title": "Super clean look beside our low platform bed",
        "comment": "Mounting was straightforward with the provided anchor screws. Soft close drawer is silent.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": true,
    "isBestDiscount": false,
    "bestSellerRank": 6
  },
  {
    "id": "furn_03",
    "slug": "minimalist-travertine-coffee-table",
    "name": "Monolith Travertine & Oak Round Coffee Table",
    "subtitle": "Roman Honed Travertine Stone Top, Solid Turned Oak Legs, Water-Resistant Seal",
    "category": "furniture_living",
    "subcategory": "Coffee Tables",
    "priceBDT": 14500,
    "originalPriceBDT": 21000,
    "discountPercent": 31,
    "rating": 4.9,
    "reviewsCount": 82,
    "ordersCount": 340,
    "inStock": true,
    "stockCount": 10,
    "badge": "SuperDeal",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 4,
    "imageUrl": "https://images.unsplash.com/photo-1580481077195-c328ad4f420e?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1580481077195-c328ad4f420e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "The natural organic pores of Roman travertine stone paired with turned solid oak legs. Hand-sealed with matte oleophobic stone protector to prevent tea and coffee stains.",
    "keyFeatures": [
      "Authentic 20mm thick natural travertine slab with bullnose edge",
      "Sealed against liquid penetration and oil stains",
      "Solid oak tripod base with felt floor protectors"
    ],
    "specifications": {
      "Diameter": "75 cm Round",
      "Height": "42 cm Coffee Height",
      "Total Weight": "22 kg"
    },
    "colors": [
      {
        "name": "Warm Travertine",
        "hex": "#E7E5E4",
        "label": "Beige Roman Stone"
      },
      {
        "name": "Black Granite",
        "hex": "#1C1917",
        "label": "Honed Charcoal Stone"
      }
    ],
    "origin": "Italian Stone Craft",
    "warranty": "5 Years Guarantee",
    "seller": {
      "name": "Sculptural Furniture Lab",
      "rating": 4.9,
      "followers": "62K",
      "positiveFeedbackRate": "99.1%"
    },
    "reviews": [
      {
        "id": "rev_f3",
        "author": "Farhana Yasmin",
        "location": "Dhaka (Uttara), BD",
        "rating": 5,
        "date": "3 weeks ago",
        "title": "The centerpiece of our drawing room",
        "comment": "The stone feels cool to the touch and looks ultra luxurious. Very sturdy tripod base.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "furn_04",
    "slug": "ergonomic-breathable-mesh-office-chair",
    "name": "ErgoPro 3D Lumbar Breathable Mesh Office Chair",
    "subtitle": "Dynamic Adaptive Spine Support, 4D Armrests, Aluminum Base, Class-4 Gas Lift",
    "category": "furniture_living",
    "subcategory": "Desk Chairs",
    "priceBDT": 16800,
    "originalPriceBDT": 24000,
    "discountPercent": 30,
    "rating": 4.9,
    "reviewsCount": 340,
    "ordersCount": 1820,
    "inStock": true,
    "stockCount": 25,
    "badge": "FlashSale",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Designed for 10+ hours of software engineering and design work without lower back fatigue. The dynamic lumbar mechanism tracks spine movement automatically.",
    "keyFeatures": [
      "Imported Korean high-tensile breathable mesh keeps back cool in humid weather",
      "Adaptive auto-tracking 3D lumbar support cradle",
      "Heavy-duty polished aluminum five-star alloy base with silent PU caster wheels",
      "TUV certified SGS Class-4 explosion-proof gas lift cylinder"
    ],
    "specifications": {
      "Weight Capacity": "150 kg Tested",
      "Recline Angle": "90° – 135° with lock mechanism",
      "Gas Lift": "Class-4 Hydraulic"
    },
    "colors": [
      {
        "name": "Graphite Mesh",
        "hex": "#1E293B",
        "label": "Dark Charcoal"
      },
      {
        "name": "Platinum Grey",
        "hex": "#94A3B8",
        "label": "Silver Grey"
      }
    ],
    "origin": "ErgoMotion Laboratories",
    "warranty": "5 Years Comprehensive Warranty",
    "seller": {
      "name": "Ergonomic Workspace Official",
      "rating": 4.9,
      "followers": "190K",
      "positiveFeedbackRate": "99.0%"
    },
    "reviews": [
      {
        "id": "rev_f4",
        "author": "Zubair Hossain",
        "location": "Dhaka (Mirpur DOHS), BD",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Cured my lower back pain after long coding shifts",
        "comment": "Mesh breathes wonderfully. Wheels glide smoothly on tiles without scratching.",
        "verified": true
      }
    ],
    "isFlashSale": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false,
    "claimedPercent": 88
  },
  {
    "id": "furn_05",
    "slug": "scandinavian-boucle-armchair",
    "name": "Nordic Sculptural Bouclé Fabric Armchair",
    "subtitle": "Textured Cloud Bouclé, High-Density Latex Cushion, Solid Ashwood Frame",
    "category": "furniture_living",
    "subcategory": "Armchairs",
    "priceBDT": 28000,
    "originalPriceBDT": 42000,
    "discountPercent": 33,
    "rating": 4.9,
    "reviewsCount": 60,
    "ordersCount": 210,
    "inStock": true,
    "stockCount": 6,
    "badge": "SuperDeal",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 4,
    "imageUrl": "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Curved cloud-like proportions wrapped in tactile looped bouclé wool fabric. Creates an immediate cozy sanctuary in living rooms or library reading corners.",
    "keyFeatures": [
      "Super-soft textured bouclé yarn with stain-resistant coating",
      "Solid kiln-dried hardwood internal frame with zero squeaks",
      "Deep padded seat with high-resilience natural latex foam core"
    ],
    "specifications": {
      "Dimensions": "85W x 80D x 76H cm",
      "Seat Depth": "58 cm Extra Cozy",
      "Weight": "18 kg"
    },
    "colors": [
      {
        "name": "Oatmeal Bouclé",
        "hex": "#F5F5F4",
        "label": "Cream Off-White"
      },
      {
        "name": "Camel Warm",
        "hex": "#D97706",
        "label": "Warm Caramel"
      }
    ],
    "origin": "Copenhagen Upholstery Studio",
    "warranty": "5 Years Warranty",
    "seller": {
      "name": "Atelier Nord Furniture",
      "rating": 4.9,
      "followers": "110K",
      "positiveFeedbackRate": "99.4%"
    },
    "reviews": [
      {
        "id": "rev_f5",
        "author": "Tasmia Noor",
        "location": "Dhaka (Dhanmondi), BD",
        "rating": 5,
        "date": "1 month ago",
        "title": "Feels like sitting on a warm cloud",
        "comment": "Boucle fabric is so plush and high quality. Everyone compliments it when they visit.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": true
  },
  {
    "id": "kit_01",
    "slug": "precision-gooseneck-electric-kettle",
    "name": "Precision Gooseneck Variable Temp Electric Pour-Over Kettle",
    "subtitle": "1200W Rapid Boil, ±1°C Accurate Temp Control, LCD Screen, 60-Min Keep Warm, Food-Grade 304",
    "category": "kitchen_tableware",
    "subcategory": "Pour-Over & Kettles",
    "priceBDT": 5950,
    "originalPriceBDT": 8500,
    "discountPercent": 30,
    "rating": 4.9,
    "reviewsCount": 310,
    "ordersCount": 1680,
    "inStock": true,
    "stockCount": 40,
    "badge": "FlashSale",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "The definitive pour-over brewing kettle for specialty coffee and fine teas. Flawless 90-degree counterbalanced spout pours with micro-controlled flow rate.",
    "keyFeatures": [
      "Patented gooseneck spout engineered for slow, laminar 90-degree pour stream",
      "Rotary dial temperature adjustment from 40°C to 100°C with digital display",
      "1200W rapid boil: heats 800ml water to 92°C in under 3 minutes",
      "Integrated stopwatch brew timer and 60-minute automatic keep-warm mode"
    ],
    "specifications": {
      "Capacity": "800 ml (27 fl oz)",
      "Power": "1200W Rapid Heating",
      "Material": "100% Food-Grade 304 Stainless Steel (Zero Plastic Contact)"
    },
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#18181B",
        "label": "Stealth Noir"
      },
      {
        "name": "Brushed Brass Accent",
        "hex": "#D97706",
        "label": "Matte Black / Brass"
      }
    ],
    "origin": "Barista Craft Labs",
    "warranty": "1 Year Warranty",
    "seller": {
      "name": "Specialty Coffee Gear Co.",
      "rating": 4.9,
      "followers": "135K",
      "positiveFeedbackRate": "99.2%"
    },
    "reviews": [
      {
        "id": "rev_k1_1",
        "author": "Asif Imtiaz",
        "location": "Mohakhali DOHS, Dhaka",
        "rating": 5,
        "date": "3 days ago",
        "title": "Precision water stream for specialty V60 pour-overs",
        "comment": "The balanced counterweight handle makes slow steady pouring effortless. PID controller keeps water at exact 93°C.",
        "verified": true,
        "helpfulCount": 27
      },
      {
        "id": "rev_k1_2",
        "author": "Samira Anjum",
        "location": "Rajshahi City",
        "rating": 5,
        "date": "1 week ago",
        "title": "Matte black powder coat looks sleek on kitchen counter",
        "comment": "Boils rapidly and holds temperature for 60 minutes. LCD screen is clear and easy to read.",
        "verified": true,
        "helpfulCount": 16
      }
    ],
    "isFlashSale": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false,
    "claimedPercent": 72
  },
  {
    "id": "kit_02",
    "slug": "kanso-stoneware-ceramic-carafe-set",
    "name": "Kanso Hand-Thrown Stoneware Carafe with 2 Cups Set",
    "subtitle": "High-Fired Iron Clay, Food-Safe Mineral Glaze, Drip-Free Spout, 950ml",
    "category": "kitchen_tableware",
    "subcategory": "Ceramic Tableware",
    "priceBDT": 2650,
    "originalPriceBDT": 3900,
    "discountPercent": 32,
    "rating": 4.9,
    "reviewsCount": 180,
    "ordersCount": 920,
    "inStock": true,
    "stockCount": 35,
    "badge": "Featured",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Crafted on traditional potter wheels using iron-rich stoneware clay. The tactile exterior retains raw sand-washed earth texture, while interior is silky non-porous mineral glaze.",
    "keyFeatures": [
      "Hand-thrown by master potters with subtle wheel spiral marks",
      "Includes 950ml carafe and two matching double-walled tactile tumblers",
      "Dishwasher safe and microwave safe non-toxic lead-free glaze"
    ],
    "specifications": {
      "Carafe Volume": "950 ml",
      "Cup Volume": "240 ml each",
      "Material": "High-Fired Natural Stoneware Clay"
    },
    "colors": [
      {
        "name": "Basalt Charcoal",
        "hex": "#262626",
        "label": "Raw Matte Basalt"
      },
      {
        "name": "Sandstone Dune",
        "hex": "#D6D3D1",
        "label": "Mineral Dune"
      }
    ],
    "origin": "Kyoto Ceramics Workshop",
    "warranty": "Lifetime Craftsmanship Guarantee",
    "seller": {
      "name": "Artisanal Tableware Studio",
      "rating": 4.9,
      "followers": "80K",
      "positiveFeedbackRate": "99.0%"
    },
    "reviews": [
      {
        "id": "rev_k2",
        "author": "Nafisa Chowdhury",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Tactile morning coffee experience",
        "comment": "Pours cleanly without stray drops. Feels grounded and serene on our dining table.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": true,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "kit_03",
    "slug": "japanese-damascus-chef-knife-8inch",
    "name": "Shogun 67-Layer Damascus Steel 8-Inch Chef Knife",
    "subtitle": "VG-10 Super Steel Core, 60±2 HRC, Octagonal Resin & Burl Wood Handle",
    "category": "kitchen_tableware",
    "subcategory": "Cutlery & Knives",
    "priceBDT": 4400,
    "originalPriceBDT": 6800,
    "discountPercent": 35,
    "rating": 4.9,
    "reviewsCount": 240,
    "ordersCount": 1350,
    "inStock": true,
    "stockCount": 45,
    "badge": "BestSeller",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Razor-sharp cutting performance forged from 67 folded layers of Damascus steel over a VG-10 high-carbon core. Glides through meat and vegetables effortlessly.",
    "keyFeatures": [
      "Ruthlessly sharp 12-15° double-bevel edge hand-finished with traditional Honbazuke method",
      "Stunning natural Damascus wave pattern etched across the blade",
      "Ergonomic Japanese octagonal handle crafted from stabilized burl wood and sapphire resin",
      "Includes wooden magnetic saya sheath and luxury gift box"
    ],
    "specifications": {
      "Blade Length": "8 Inch (20.5 cm)",
      "Steel Hardness": "60±2 HRC Rockwell",
      "Blade Core": "VG-10 High Carbon Steel"
    },
    "colors": [
      {
        "name": "Emerald Burl",
        "hex": "#065F46",
        "label": "Emerald Resin & Wood"
      },
      {
        "name": "Sapphire Burl",
        "hex": "#1E3A8A",
        "label": "Blue Resin & Wood"
      }
    ],
    "origin": "Seki City Cutlery Masters",
    "warranty": "Lifetime Edge Warranty",
    "seller": {
      "name": "Japanese Cutlery Forge",
      "rating": 4.9,
      "followers": "175K",
      "positiveFeedbackRate": "99.5%"
    },
    "reviews": [
      {
        "id": "rev_k3",
        "author": "Chef Tanvir",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "3 weeks ago",
        "title": "Shaves through ripe tomatoes with zero pressure",
        "comment": "Incredible balance in hand. Damascus steel pattern looks authentic and striking.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": true,
    "isBestDiscount": false,
    "bestSellerRank": 4
  },
  {
    "id": "kit_04",
    "slug": "conical-burr-electric-coffee-grinder",
    "name": "Apex Precision Stainless Steel Conical Burr Coffee Grinder",
    "subtitle": "35 Stepless Grind Settings (Espresso to French Press), Low RPM Antistatic, 250g Hopper",
    "category": "kitchen_tableware",
    "subcategory": "Coffee Grinders",
    "priceBDT": 6800,
    "originalPriceBDT": 9900,
    "discountPercent": 31,
    "rating": 4.8,
    "reviewsCount": 165,
    "ordersCount": 780,
    "inStock": true,
    "stockCount": 22,
    "badge": "SuperDeal",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 3,
    "imageUrl": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Achieve uniform particle size without heating your coffee beans. Low-speed gear reduction 40mm stainless steel conical burrs minimize static chaff and preserve aromatic oils.",
    "keyFeatures": [
      "40mm high-hardness alloy steel conical burr set for uniform grind distribution",
      "35 precise grind size settings: dial in fine espresso down to coarse cold brew",
      "Antistatic powder chamber technology: zero messy coffee grounds flyaway",
      "Digital quantity timer dial (from 2 to 12 cups grinding dosage)"
    ],
    "specifications": {
      "Motor": "165W Low RPM DC Motor",
      "Hopper Capacity": "250g Bean Container",
      "Burr Size": "40mm Conical Stainless Steel"
    },
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#18181B",
        "label": "Dark Slate"
      },
      {
        "name": "Silver Steel",
        "hex": "#E2E8F0",
        "label": "Brushed Aluminum"
      }
    ],
    "origin": "Zurich Coffee Engineering",
    "warranty": "1 Year Full Warranty",
    "seller": {
      "name": "Specialty Coffee Gear Co.",
      "rating": 4.9,
      "followers": "135K",
      "positiveFeedbackRate": "99.2%"
    },
    "reviews": [
      {
        "id": "rev_k4",
        "author": "Mahir Faisal",
        "location": "Chittagong, BD",
        "rating": 5,
        "date": "1 month ago",
        "title": "Very quiet and grinds espresso fine without clumping",
        "comment": "Finally getting rich crema on my home espresso machine. Easy to disassemble and brush clean.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": true
  },
  {
    "id": "kit_05",
    "slug": "double-walled-borosilicate-french-press",
    "name": "Nordic Double-Wall Insulated Borosilicate Glass French Press (800ml)",
    "subtitle": "Thermal Heat Retention, 4-Level Micro Mesh Filter, Solid Walnut Wooden Plunger Lid",
    "category": "kitchen_tableware",
    "subcategory": "French Press",
    "priceBDT": 2150,
    "originalPriceBDT": 3200,
    "discountPercent": 33,
    "rating": 4.8,
    "reviewsCount": 190,
    "ordersCount": 1100,
    "inStock": true,
    "stockCount": 50,
    "badge": "Choice",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Double-wall vacuum glass keeps brewed coffee steaming hot for over 60 minutes while exterior stays cool to touch. 4-stage stainless mesh filters out all fine sediment.",
    "keyFeatures": [
      "Thermal shock-resistant high borosilicate glass (can withstand -20°C to 150°C)",
      "4-stage micro-filtration filter stops coffee mud and grit completely",
      "Solid dark walnut wood knob and handle for organic tactile grip"
    ],
    "specifications": {
      "Volume": "800 ml (4 Cups)",
      "Glass Type": "Lead-Free Lab Grade Borosilicate"
    },
    "colors": [
      {
        "name": "Walnut Amber",
        "hex": "#78350F",
        "label": "Walnut & Clear Glass"
      }
    ],
    "origin": "Copenhagen Coffee Works",
    "warranty": "1 Year Warranty",
    "seller": {
      "name": "Brewing Essentials Hub",
      "rating": 4.8,
      "followers": "72K",
      "positiveFeedbackRate": "98.4%"
    },
    "reviews": [
      {
        "id": "rev_k5",
        "author": "Imran Latif",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Zero grounds in the cup, coffee stays hot throughout breakfast",
        "comment": "Double walled glass is very sturdy and thick. Looks beautiful on the breakfast table.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "life_01",
    "slug": "vesper-monolithic-nero-marble-incense-altar",
    "name": "Vesper Monolithic Spanish Nero Marble Incense Altar",
    "subtitle": "Honed Nero Marquina Marble, Solid Brass Sphere Holder, Includes 30 Hinoki Incense Sticks",
    "category": "lifestyle_gadgets",
    "subcategory": "Incense & Aromas",
    "priceBDT": 2450,
    "originalPriceBDT": 3600,
    "discountPercent": 32,
    "rating": 4.8,
    "reviewsCount": 220,
    "ordersCount": 1420,
    "inStock": true,
    "stockCount": 42,
    "badge": "Featured",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "A sensory architectural centerpiece designed for daily mindfulness rituals. Solid 2.4kg Spanish marble catches falling ash cleanly across its polished rectangular plane.",
    "keyFeatures": [
      "Solid honed Nero Marquina marble with authentic calcite white veins",
      "Removable solid brass balancing sphere holding incense at optimal 45° angle",
      "Underside protective cork padding protects table surfaces from scratches",
      "Includes complimentary tin of 30 natural Japanese Hinoki cypress incense sticks"
    ],
    "specifications": {
      "Dimensions": "26 cm Length x 7 cm Width x 4.5 cm Height",
      "Weight": "2.4 kg Solid Stone",
      "Material": "Spanish Marble & Architectural Brass"
    },
    "colors": [
      {
        "name": "Nero Black Marble",
        "hex": "#1C1917",
        "label": "Black Calcite Marble"
      },
      {
        "name": "Carrara White",
        "hex": "#E7E5E4",
        "label": "White Grey Marble"
      }
    ],
    "origin": "Bilbao Stone Artisans",
    "warranty": "Lifetime Guarantee",
    "seller": {
      "name": "Zen Rituals Global Store",
      "rating": 4.9,
      "followers": "88K",
      "positiveFeedbackRate": "99.1%"
    },
    "reviews": [
      {
        "id": "rev_lf1_1",
        "author": "Tahsin Zaman",
        "location": "Lalmatia, Dhaka",
        "rating": 5,
        "date": "6 days ago",
        "title": "Real Nero Marquina marble with crisp white veins",
        "comment": "Heavy solid stone with brass insert. Catches all ash neatly and looks like a minimalist sculpture on my credenza.",
        "verified": true,
        "helpfulCount": 30
      }
    ],
    "isFlashSale": false,
    "isFeatured": true,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "life_02",
    "slug": "tempo-magnetic-column-pendulum-clock",
    "name": "Tempo Minimalist Architectural Column Desk Clock",
    "subtitle": "Silent German Quartz Movement, Oscillating Brass Pendulum, Matte Anodized Aluminum",
    "category": "lifestyle_gadgets",
    "subcategory": "Clocks",
    "priceBDT": 3900,
    "originalPriceBDT": 5800,
    "discountPercent": 33,
    "rating": 4.8,
    "reviewsCount": 130,
    "ordersCount": 650,
    "inStock": true,
    "stockCount": 20,
    "badge": "BestSeller",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "An architectural reinterpretation of pendulum clocks for modern desks. The slow, silent hypnotic sweep of the brass pendulum bob visible through a precision anti-reflective mineral glass portal.",
    "keyFeatures": [
      "Completely silent German sweep quartz movement: zero annoying tick-tock noise",
      "Solid extruded architectural aluminum column with chamfered edges",
      "Hypnotic continuous pendulum oscillation creates a calming visual rhythm",
      "Runs for 18 months on 1 standard AA alkaline battery"
    ],
    "specifications": {
      "Dimensions": "36 cm Height x 12 cm Width x 8 cm Depth",
      "Weight": "2.8 kg",
      "Movement": "Silent Sweep Quartz Movement"
    },
    "colors": [
      {
        "name": "Matte Graphite",
        "hex": "#262626",
        "label": "Dark Charcoal"
      },
      {
        "name": "Champagne Bronze",
        "hex": "#78350F",
        "label": "Warm Bronze"
      }
    ],
    "origin": "Black Forest Horology",
    "warranty": "3 Years Movement Guarantee",
    "seller": {
      "name": "Architectural Objects Store",
      "rating": 4.8,
      "followers": "64K",
      "positiveFeedbackRate": "98.6%"
    },
    "reviews": [
      {
        "id": "rev_lf2",
        "author": "Shahriar Kabir",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Completely silent on my study desk",
        "comment": "The pendulum movement is mesmerizing to watch when taking study breaks.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": true,
    "isBestDiscount": false,
    "bestSellerRank": 5
  },
  {
    "id": "life_03",
    "slug": "nordic-waffle-pure-belgian-flax-linen-blanket",
    "name": "Nordic Washed Waffle 100% Belgian Flax Linen Blanket",
    "subtitle": "Pre-Washed Volcanic Stone Tumble, Breathable All-Season Honeycomb Weave, 200x150cm",
    "category": "lifestyle_gadgets",
    "subcategory": "Linen Textiles",
    "priceBDT": 3600,
    "originalPriceBDT": 5200,
    "discountPercent": 31,
    "rating": 4.9,
    "reviewsCount": 260,
    "ordersCount": 1720,
    "inStock": true,
    "stockCount": 50,
    "badge": "FlashSale",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Woven with a three-dimensional waffle weave that traps gentle insulation in winter and breathes effortlessly in warm humid summers. Pre-washed with volcanic stones for instant softness.",
    "keyFeatures": [
      "100% certified European flax linen: naturally hypoallergenic and antibacterial",
      "3D honeycomb waffle texture that gets softer with every home wash",
      "OEKO-TEX Standard 100 certified free from harmful chemical dyes",
      "Generous 200 x 150 cm size perfect for sofa throw or full bed cover"
    ],
    "specifications": {
      "Size": "200 cm x 150 cm Large",
      "Weight": "1.4 kg Heavy Waffle",
      "Fabric": "100% Belgian Stone-Washed Linen"
    },
    "colors": [
      {
        "name": "Oatmeal Natural",
        "hex": "#A8A29E",
        "label": "Unbleached Flax"
      },
      {
        "name": "Charcoal Shadow",
        "hex": "#292524",
        "label": "Mineral Slate"
      }
    ],
    "origin": "Kortrijk Textile Weavers",
    "warranty": "Lifetime Linen Guarantee",
    "seller": {
      "name": "Nordic Home Linens",
      "rating": 4.9,
      "followers": "105K",
      "positiveFeedbackRate": "99.3%"
    },
    "reviews": [
      {
        "id": "rev_lf3",
        "author": "Mehnaz Parveen",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "3 weeks ago",
        "title": "Best AC blanket ever",
        "comment": "Does not trap heat like synthetic fleece blankets. Breathable and luxurious texture.",
        "verified": true
      }
    ],
    "isFlashSale": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false,
    "claimedPercent": 84
  },
  {
    "id": "life_04",
    "slug": "magsafe-3in1-aluminum-fast-charging-dock",
    "name": "MagFlow 3-in-1 Foldable Aluminum Fast Wireless Charging Stand",
    "subtitle": "15W MagSafe Fast Charge for iPhone, Apple Watch Fast Charger, AirPods Tray",
    "category": "lifestyle_gadgets",
    "subcategory": "Wireless Chargers",
    "priceBDT": 3850,
    "originalPriceBDT": 5500,
    "discountPercent": 30,
    "rating": 4.8,
    "reviewsCount": 380,
    "ordersCount": 2450,
    "inStock": true,
    "stockCount": 60,
    "badge": "Choice",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Eliminate nightstand cable tangles. Solid CNC aerospace aluminum foldable dock fast charges your iPhone (15W), Apple Watch, and wireless earbuds simultaneously on one cord.",
    "keyFeatures": [
      "Powerful N52 neodymium magnetic ring snaps phone firmly in portrait or landscape",
      "Supports iOS 17 StandBy smart clock bedside mode",
      "Foldable flat travel design: slips into backpack pockets effortlessly",
      "Intelligent thermal management chip prevents device overheating"
    ],
    "specifications": {
      "Input": "Type-C PD 30W Recommended",
      "Output": "Phone 15W + Watch 5W + Earbuds 5W",
      "Material": "Aviation CNC Aluminum Alloy"
    },
    "colors": [
      {
        "name": "Space Grey",
        "hex": "#334155",
        "label": "Dark Metal"
      },
      {
        "name": "Silver Lunar",
        "hex": "#CBD5E1",
        "label": "Anodized Silver"
      }
    ],
    "origin": "Apex Power Electronics",
    "warranty": "18 Months Warranty",
    "seller": {
      "name": "Apple Accessories Hub",
      "rating": 4.8,
      "followers": "230K",
      "positiveFeedbackRate": "98.8%"
    },
    "reviews": [
      {
        "id": "rev_lf4",
        "author": "Tanvir Hasan",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "1 week ago",
        "title": "Charges iPhone 15 Pro, Watch, and AirPods on one clean cable",
        "comment": "Strong magnets hold the phone securely in horizontal standby clock mode on nightstand.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": false
  },
  {
    "id": "life_05",
    "slug": "edc-titanium-bolt-action-multi-pen",
    "name": "Aero Titanium Bolt-Action EDC Multi-Tool Pen with Stylus",
    "subtitle": "Grade 5 Solid Titanium, Fidget Bolt-Action Mechanism, Tungsten Glass Breaker Tip, Schmidt Refill",
    "category": "lifestyle_gadgets",
    "subcategory": "Desk Accessories",
    "priceBDT": 1850,
    "originalPriceBDT": 2700,
    "discountPercent": 31,
    "rating": 4.9,
    "reviewsCount": 290,
    "ordersCount": 1980,
    "inStock": true,
    "stockCount": 75,
    "badge": "SuperDeal",
    "isChoice": true,
    "freeShipping": true,
    "estimatedDeliveryDays": 2,
    "imageUrl": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80",
    "secondaryImageUrl": "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
    "images": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80"
    ],
    "description": "Machined from a solid billet of Grade 5 titanium. Features a super-addictive bolt-action retraction mechanism, tungsten carbide emergency glass breaker tip, and ultra-smooth German Schmidt ink.",
    "keyFeatures": [
      "Precision CNC machined Grade 5 titanium body that will never rust or corrode",
      "Satisfying rifle bolt-action mechanism for one-handed fidgeting and deployment",
      "Compatible with universal Parker G2 style ink cartridges worldwide",
      "Emergency tungsten steel tip capable of shattering vehicle glass in crisis"
    ],
    "specifications": {
      "Weight": "42 g Lightweight Titanium",
      "Length": "13.8 cm",
      "Refill": "German Schmidt EasyFlow 9000 Included"
    },
    "colors": [
      {
        "name": "Raw Stonewash",
        "hex": "#64748B",
        "label": "Stonewashed Titanium"
      },
      {
        "name": "DLC Midnight",
        "hex": "#0F172A",
        "label": "Blackout DLC"
      }
    ],
    "origin": "Tactical Precision Tools",
    "warranty": "Lifetime Warranty",
    "seller": {
      "name": "EDC Gear Official Store",
      "rating": 4.9,
      "followers": "160K",
      "positiveFeedbackRate": "99.2%"
    },
    "reviews": [
      {
        "id": "rev_lf5",
        "author": "Jawad Al Mamun",
        "location": "Dhaka, BD",
        "rating": 5,
        "date": "2 weeks ago",
        "title": "Very satisfying bolt action click and balanced weight",
        "comment": "Writes super smoothly on official documents. Pocket clip is solid and does not bend.",
        "verified": true
      }
    ],
    "isFlashSale": false,
    "isFeatured": false,
    "isBestSeller": false,
    "isBestDiscount": true
  }
];
