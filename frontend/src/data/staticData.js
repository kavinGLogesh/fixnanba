export const DISTRICTS = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Erode', 'Tiruppur', 'Vellore', 'Thoothukudi', 'Tirunelveli',
  'Thanjavur', 'Dindigul', 'Kanchipuram', 'Cuddalore', 'Villupuram',
  'Nagapattinam', 'Pudukkottai', 'Ramanathapuram', 'Virudhunagar',
  'Sivaganga', 'Namakkal', 'Karur', 'Perambalur', 'Ariyalur',
  'Krishnagiri', 'Dharmapuri', 'Nilgiris', 'Tiruvannamalai',
  'Kallakurichi', 'Ranipet', 'Tirupattur', 'Chengalpattu', 'Tenkasi'
];

export const CATEGORIES = [
  { id: 'electrical', icon: '⚡', color: '#FACC15', bgColor: '#FFF9C4' },
  { id: 'plumbing', icon: '🔧', color: '#3B82F6', bgColor: '#DBEAFE' },
  { id: 'appliance', icon: '🔌', color: '#8B5CF6', bgColor: '#EDE9FE' },
  { id: 'carpentry', icon: '🪚', color: '#78716C', bgColor: '#F5F5F4' },
  { id: 'cctv', icon: '📡', color: '#06B6D4', bgColor: '#CFFAFE' },
  { id: 'painting', icon: '🎨', color: '#F97316', bgColor: '#FFEDD5' },
  { id: 'pest', icon: '🐛', color: '#22C55E', bgColor: '#DCFCE7' },
];

export const DIAGNOSIS_DATA = {
  electrical: {
    problems: [
      {
        id: 'burning_smell',
        label_en: 'Burning smell from switch/socket',
        label_ta: 'சுவிட்ச்/சாக்கெட்டில் எரியும் வாசனை',
        danger: 'critical',
        safety_en: ['Turn off main power immediately', 'Do not touch the switch', 'Keep children away', 'Call electrician before restoring power'],
        safety_ta: ['உடனே மெயின் பவரை அணைக்கவும்', 'சுவிட்சை தொடாதீர்கள்', 'குழந்தைகளை விலக்கி வையுங்கள்', 'மின்சாரம் மீட்டெடுக்கும் முன் மின்வாரியை அழைக்கவும்'],
        cost_min: 500, cost_max: 3000,
      },
      {
        id: 'power_trip',
        label_en: 'Frequent power trip / breaker tripping',
        label_ta: 'அடிக்கடி பவர் டிரிப் / பிரேக்கர் விழுகிறது',
        danger: 'high',
        safety_en: ['Unplug all heavy appliances', 'Do not reset breaker repeatedly', 'Check for overload'],
        safety_ta: ['அனைத்து கனமான கருவிகளையும் அவிழ்த்து விடுங்கள்', 'பிரேக்கரை மீண்டும் மீண்டும் ரீசெட் செய்யாதீர்கள்', 'ஓவர்லோட் இருக்கிறதா என சரிபாருங்கள்'],
        cost_min: 300, cost_max: 2000,
      },
      {
        id: 'no_power',
        label_en: 'No power in rooms / partial outage',
        label_ta: 'அறைகளில் மின்சாரம் இல்லை / பகுதி மின்தடை',
        danger: 'medium',
        safety_en: ['Check if neighbors have power', 'Call TNEB helpline', 'Do not use candles near curtains'],
        safety_ta: ['அண்டை வீட்டினருக்கு மின்சாரம் உள்ளதா என சரிபாருங்கள்', 'TNEB ஹெல்ப்லைனை அழைக்கவும்', 'திரைச்சீலை அருகே மெழுகுவத்தி பயன்படுத்தாதீர்கள்'],
        cost_min: 200, cost_max: 1500,
      },
      {
        id: 'sparks',
        label_en: 'Sparks from wires or switches',
        label_ta: 'கம்பிகள் அல்லது சுவிட்சிலிருந்து தீப்பொறி',
        danger: 'critical',
        safety_en: ['Cut main power NOW', 'Evacuate the area', 'Call fire department if fire starts', 'Do NOT use water on electrical fire'],
        safety_ta: ['இப்போதே மெயின் பவரை துண்டிக்கவும்', 'பகுதியை காலி செய்யுங்கள்', 'நெருப்பு பிடித்தால் தீயணைப்பு துறையை அழைக்கவும்', 'மின் தீயில் தண்ணீர் பயன்படுத்தாதீர்கள்'],
        cost_min: 1000, cost_max: 8000,
      },
    ],
  },
  plumbing: {
    problems: [
      {
        id: 'pipe_burst',
        label_en: 'Pipe burst / major water leak',
        label_ta: 'குழாய் வெடிப்பு / பெரிய தண்ணீர் கசிவு',
        danger: 'critical',
        safety_en: ['Shut off main water valve immediately', 'Move valuables away from water', 'Do not use electrical devices in flooded area'],
        safety_ta: ['உடனே மெயின் வாட்டர் வால்வை மூடுங்கள்', 'மதிப்புமிக்க பொருட்களை தண்ணீரிலிருந்து விலக்கி வையுங்கள்', 'வெள்ளம் தழுவிய பகுதியில் மின் சாதனங்களை பயன்படுத்தாதீர்கள்'],
        cost_min: 800, cost_max: 5000,
      },
      {
        id: 'blockage',
        label_en: 'Drain / toilet blockage',
        label_ta: 'வடிகால் / கழிவறை அடைப்பு',
        danger: 'low',
        safety_en: ['Do not use chemical drain cleaners excessively', 'Avoid flushing wipes or solids'],
        safety_ta: ['அதிகமாக ரசாயன வடிகால் சுத்தப்படுத்திகளை பயன்படுத்தாதீர்கள்', 'துடைக்கும் துணி அல்லது திடப்பொருட்களை ஃப்ளஷ் செய்யாதீர்கள்'],
        cost_min: 300, cost_max: 2000,
      },
      {
        id: 'tap_leak',
        label_en: 'Leaking tap or faucet',
        label_ta: 'குழாய் அல்லது நளாவிலிருந்து கசிவு',
        danger: 'low',
        safety_en: ['Turn off individual tap valve', 'Place a bucket to collect water', 'Avoid wastage'],
        safety_ta: ['தனி குழாய் வால்வை அணைக்கவும்', 'தண்ணீர் சேகரிக்க வாளியை வையுங்கள்', 'வீண்விரயத்தை தவிர்க்கவும்'],
        cost_min: 150, cost_max: 800,
      },
    ],
  },
  appliance: {
    problems: [
      {
        id: 'ac_not_cooling',
        label_en: 'AC not cooling',
        label_ta: 'ஏசி குளிர்விக்கவில்லை',
        danger: 'low',
        safety_en: ['Check thermostat settings', 'Clean or replace air filter', 'Ensure outdoor unit is not blocked'],
        safety_ta: ['தெர்மோஸ்டாட் அமைப்புகளை சரிபாருங்கள்', 'ஏர் ஃபில்டரை சுத்தம் செய்யுங்கள் அல்லது மாற்றுங்கள்', 'வெளிப்புற யூனிட் தடைபடாமல் உள்ளதா என சரிபாருங்கள்'],
        cost_min: 500, cost_max: 4000,
      },
      {
        id: 'fridge_not_cooling',
        label_en: 'Refrigerator not cooling',
        label_ta: 'குளிர்சாதனப் பெட்டி குளிர்விக்கவில்லை',
        danger: 'medium',
        safety_en: ['Move perishable food to another fridge or cooler', 'Check if compressor is running', 'Do not unplug and replug repeatedly'],
        safety_ta: ['கெட்டுப்போகும் உணவை வேறு குளிர்சாதனம் அல்லது குளிர் பெட்டியில் வையுங்கள்', 'கம்ப்ரஸர் இயங்குகிறதா என சரிபாருங்கள்', 'மீண்டும் மீண்டும் பிளக் போடாதீர்கள்'],
        cost_min: 700, cost_max: 5000,
      },
    ],
  },
  carpentry: {
    problems: [
      {
        id: 'door_broken',
        label_en: 'Door lock or hinge broken',
        label_ta: 'கதவு பூட்டு அல்லது கீல் உடைந்துள்ளது',
        danger: 'medium',
        safety_en: ['Secure the entry with a temporary barricade', 'Do not force the door open repeatedly'],
        safety_ta: ['தற்காலிக தடையுடன் நுழைவுவாயிலை பாதுகாக்கவும்', 'கதவை மீண்டும் மீண்டும் தள்ளாதீர்கள்'],
        cost_min: 300, cost_max: 2500,
      },
    ],
  },
  cctv: {
    problems: [
      {
        id: 'no_internet',
        label_en: 'No internet / WiFi not working',
        label_ta: 'இணையம் இல்லை / வைஃபை வேலை செய்யவில்லை',
        danger: 'low',
        safety_en: ['Restart router by unplugging for 30 seconds', 'Check if ISP has outage in your area', 'Check all cable connections'],
        safety_ta: ['ரூட்டரை 30 விநாடிகள் அவிழ்த்து மறுதொடக்கம் செய்யுங்கள்', 'உங்கள் பகுதியில் ISP தடை உள்ளதா என சரிபாருங்கள்', 'அனைத்து கேபிள் இணைப்புகளையும் சரிபாருங்கள்'],
        cost_min: 200, cost_max: 1500,
      },
    ],
  },
  painting: {
    problems: [
      {
        id: 'damp_wall',
        label_en: 'Damp / wet wall patches',
        label_ta: 'ஈரமான / நனைந்த சுவர் திட்டுகள்',
        danger: 'medium',
        safety_en: ['Identify source of moisture (roof leak or pipe leak)', 'Keep the area dry', 'Avoid using wall sockets in affected area'],
        safety_ta: ['ஈரப்பதத்தின் மூலத்தை கண்டறியுங்கள் (கூரை கசிவு அல்லது குழாய் கசிவு)', 'பகுதியை வறண்டதாக வையுங்கள்', 'பாதிக்கப்பட்ட பகுதியில் சுவர் சாக்கெட்டுகளை பயன்படுத்தாதீர்கள்'],
        cost_min: 1000, cost_max: 8000,
      },
    ],
  },
  pest: {
    problems: [
      {
        id: 'cockroaches',
        label_en: 'Cockroach infestation',
        label_ta: 'கரப்பான் பூச்சி தாக்குதல்',
        danger: 'low',
        safety_en: ['Seal all food containers tightly', 'Do not use excessive DIY sprays (health hazard)', 'Clean kitchen drains regularly'],
        safety_ta: ['அனைத்து உணவு கொள்கலன்களையும் இறுக்கமாக மூடுங்கள்', 'அதிகமான DIY ஸ்ப்ரேக்களை பயன்படுத்தாதீர்கள் (உடல்நல அபாயம்)', 'சமையலறை வடிகால்களை தொடர்ந்து சுத்தம் செய்யுங்கள்'],
        cost_min: 800, cost_max: 3000,
      },
    ],
  },
};

export const DANGER_COLORS = {
  critical: '#FF4D4D',
  high: '#FF7A00',
  medium: '#FACC15',
  low: '#22C55E',
};

export const SAMPLE_TECHNICIANS = [
  {
    _id: '1', name: 'Rajesh Kumar', shop_name: 'Rajesh Electricals',
    district: 'Chennai', category: 'electrical', phone: '+919876543210',
    email: 'rajesh@example.com', rating: 4.8, verified: true,
    availability: true, distance: 1.2, reviews_count: 142,
    address: 'Anna Nagar, Chennai', image: null,
  },
  {
    _id: '2', name: 'Murugan S', shop_name: 'Murugan Plumbing Works',
    district: 'Coimbatore', category: 'plumbing', phone: '+919876543211',
    email: 'murugan@example.com', rating: 4.6, verified: true,
    availability: true, distance: 2.5, reviews_count: 89,
    address: 'RS Puram, Coimbatore', image: null,
  },
  {
    _id: '3', name: 'Selvam AC Services', shop_name: 'Cool Tech Services',
    district: 'Madurai', category: 'appliance', phone: '+919876543212',
    email: 'selvam@example.com', rating: 4.9, verified: true,
    availability: false, distance: 3.1, reviews_count: 205,
    address: 'KK Nagar, Madurai', image: null,
  },
  {
    _id: '4', name: 'Karthik Raj', shop_name: 'Karthik Carpentry',
    district: 'Chennai', category: 'carpentry', phone: '+919876543213',
    email: 'karthik@example.com', rating: 4.5, verified: true,
    availability: true, distance: 0.8, reviews_count: 67,
    address: 'Velachery, Chennai', image: null,
  },
  {
    _id: '5', name: 'Suresh Networks', shop_name: 'Suresh CCTV & Net',
    district: 'Erode', category: 'cctv', phone: '+919876543214',
    email: 'suresh@example.com', rating: 4.7, verified: true,
    availability: true, distance: 1.9, reviews_count: 113,
    address: 'Erode Main Road', image: null,
  },
  {
    _id: '6', name: 'Priya Painters', shop_name: 'Priya Wall Solutions',
    district: 'Salem', category: 'painting', phone: '+919876543215',
    email: 'priya@example.com', rating: 4.4, verified: false,
    availability: true, distance: 4.2, reviews_count: 45,
    address: 'Salem Junction', image: null,
  },
  {
    _id: '7', name: 'Anand Pest Control', shop_name: 'SafeHome Pest Solutions',
    district: 'Coimbatore', category: 'pest', phone: '+919876543216',
    email: 'anand@example.com', rating: 4.8, verified: true,
    availability: true, distance: 2.1, reviews_count: 178,
    address: 'Gandhipuram, Coimbatore', image: null,
  },
  {
    _id: '8', name: 'Senthil Kumar', shop_name: 'Senthil Electricals',
    district: 'Tiruchirappalli', category: 'electrical', phone: '+919876543217',
    email: 'senthil@example.com', rating: 4.3, verified: true,
    availability: false, distance: 3.7, reviews_count: 92,
    address: 'Thillai Nagar, Trichy', image: null,
  },
];

export const SAMPLE_REVIEWS = [
  {
    _id: '1', name: 'Lakshmi D', district: 'Chennai',
    text_en: 'The electrician arrived within 45 minutes! Fixed our short circuit and even gave safety advice. Highly recommended.',
    text_ta: 'மின்வாரி 45 நிமிடத்தில் வந்தார்! எங்கள் குறுகிய சுற்றை சரிசெய்து பாதுகாப்பு ஆலோசனையும் கொடுத்தார். மிகவும் பரிந்துரைக்கிறேன்.',
    rating: 5, category: 'electrical',
  },
  {
    _id: '2', name: 'Vijay R', district: 'Coimbatore',
    text_en: 'Pipe burst at midnight, found a plumber through FixNanba in minutes. Life saver! The verified badge really builds trust.',
    text_ta: 'நள்ளிரவில் குழாய் வெடித்தது, FixNanba மூலம் நிமிடங்களில் குழாய்வாரியை கண்டறிந்தோம். உண்மையிலேயே உதவியது!',
    rating: 5, category: 'plumbing',
  },
  {
    _id: '3', name: 'Meena S', district: 'Madurai',
    text_en: 'AC stopped working during peak summer. FixNanba connected me with a technician who fixed it same day. Excellent service.',
    text_ta: 'கோடையில் ஏசி நின்றுவிட்டது. FixNanba அன்றே சரிசெய்த தொழில்நுட்பரை இணைத்தது. சிறப்பான சேவை.',
    rating: 4, category: 'appliance',
  },
];
