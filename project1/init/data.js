const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage...",
    image: {
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "trending"
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city...",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "iconic-city"
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin...",
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "mountains"
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany...",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "iconic-city"
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops...",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "camping"
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach...",
    image: {
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "trending"
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking...",
    image: {
      url: "https://trailsidestructures.com/app/uploads/2025/06/Lake-cabin.jpeg",
      filename: "listingimage"
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "mountains"
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living...",
    image: {
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "iconic-city"
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep...",
    image: {
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "mountains"
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild...",
    image: {
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "farms"
  },
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history...",
    image: {
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "iconic-city"
  },
  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself...",
    image: {
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "trending"
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description: "Escape to the picturesque Cotswolds...",
    image: {
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "farms"
  },
  {
    title: "Historic Brownstone in Boston",
    description: "Step back in time...",
    image: {
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 2200,
    location: "Boston",
    country: "United States",
    category: "iconic-city"
  },
  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax on the sandy shores...",
    image: {
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1800,
    location: "Bali",
    country:
    "Indonesia",
    category: "trending"
  },
  {
    title: "Mountain View Cabin in Banff",
    description: "Enjoy breathtaking mountain views...",
    image: {
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
    category: "mountains"
  },
  {
    title: "Art Deco Apartment in Miami",
    description: "Step into the glamour...",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1600,
    location: "Miami",
    country: "United States",
    category: "iconic-city"
  },
  {
    title: "Tropical Villa in Phuket",
    description: "Escape to a tropical paradise...",
    image: {
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    category: "pools"
  },
  {
    title: "Historic Castle in Scotland",
    description: "Live like royalty...",
    image: {
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "castles"
  },
  {
    title: "Desert Oasis in Dubai",
    description: "Experience luxury in the desert...",
    image: {
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "pools"
  },
  {
    title: "Rustic Log Cabin in Montana",
    description: "Unplug and unwind...",
    image: {
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1100,
    location: "Montana",
    country: "United States",
    category: "mountains"
  },
  {
    title: "Beachfront Villa in Greece",
    description: "Enjoy the crystal-clear waters...",
    image: {
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    category: "trending"
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description: "Stay in an eco-friendly treehouse...",
    image: {
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "camping"
  },
  {
    title: "Historic Cottage in Charleston",
    description: "Experience historic Charleston...",
    image: {
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
    category: "iconic-city"
  },
  {
    title: "Modern Apartment in Tokyo",
    description: "Explore vibrant Tokyo...",
    image: {
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    category: "iconic-city"
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description: "Spend your days by the lake...",
    image: {
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    category: "mountains"
  },
  {
    title: "Luxury Villa in the Maldives",
    description: "Indulge in luxury...",
    image: {
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    category: "pools"
  },
  {
    title: "Ski Chalet in Aspen",
    description: "Hit the slopes in style...",
    image: {
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 4000,
    location: "Aspen",
    country: "United States",
    category: "mountains"
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description: "Escape to a secluded beach house...",
    image: {
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
      filename: "listingimage"
    },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "trending"
  }
];

module.exports = sampleListings;
