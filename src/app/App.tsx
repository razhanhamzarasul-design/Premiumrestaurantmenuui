import { useState, useEffect } from 'react';
import { 
  ShoppingCart, Plus, Languages, X, Trash2, 
  AlertCircle, MapPin, ShoppingBag, Instagram, 
  Facebook, Clock, Flame, Star, ChevronRight, Phone
} from 'lucide-react';

interface MenuItem {
  id: string;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionKu: string;
  price: number;
  image: string;
  category: string;
  isSpicy?: boolean;
  isPopular?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuData: MenuItem[] = [
  // --- FAST FOOD (10 Items) ---
  { id: 'f1', nameEn: 'Classic Beef Burger', nameAr: 'برجر لحم كلاسيك', nameKu: 'بێرگەری گۆشتی کلاسیک', descriptionEn: 'Juicy beef with cheddar and special sauce', descriptionAr: 'لحم بقري مع جبنة شيدر وصلصة خاصة', descriptionKu: 'گۆشتی مانگا بە پەنیری چێدەر و سۆسی تایبەت', price: 8.5, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', category: 'fastfood', isPopular: true },
  { id: 'f2', nameEn: 'Fire Chicken Burger', nameAr: 'برجر دجاج حار', nameKu: 'بێرگەری مریشکی توون', descriptionEn: 'Spicy crispy chicken with jalapenos', descriptionAr: 'دجاج مقرمش حار مع هلابينو', descriptionKu: 'مریشکی کریسپی توون لەگەڵ هالاپینۆ', price: 7.25, image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&q=80', category: 'fastfood', isSpicy: true },
  { id: 'f3', nameEn: 'Pepperoni Pizza', nameAr: 'بيتزا بيبروني', nameKu: 'پیتزای پیپەرۆنی', descriptionEn: 'Italian crust with mozzarella and pepperoni', descriptionAr: 'عجينة إيطالية مع موزاريلا وبيبروني', descriptionKu: 'هەویری ئیتالی بە مۆزارێلا و پیپەرۆنی', price: 12, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80', category: 'fastfood', isPopular: true },
  { id: 'f4', nameEn: 'Double Cheese Burger', nameAr: 'دبل تشيز برجر', nameKu: 'دبڵ چیز بێرگەر', descriptionEn: 'Two beef patties with extra melted cheese', descriptionAr: 'شريحتان من اللحم مع جبنة إضافية', descriptionKu: 'دوو پارچە گۆشت بە پەنیری زیادەوە', price: 10.5, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80', category: 'fastfood' },
  { id: 'f5', nameEn: 'Margherita Pizza', nameAr: 'بيتزا مارغريتا', nameKu: 'پیتزای مارگریتا', descriptionEn: 'Tomato sauce and fresh mozzarella', descriptionAr: 'صلصة طماطم وموزاريلا طازجة', descriptionKu: 'سۆسی تەماتە و مۆزارێلای فرێش', price: 10, image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?w=600&q=80', category: 'fastfood' },
  { id: 'f6', nameEn: 'BBQ Chicken Pizza', nameAr: 'بيتزا دجاج باربيكيو', nameKu: 'پیتزای مریشکی باربیکیو', descriptionEn: 'Grilled chicken with BBQ sauce', descriptionAr: 'دجاج مشوي مع صلصة باربيكيو', descriptionKu: 'مریشکی برژاو بە سۆسی باربیکیو', price: 13.5, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', category: 'fastfood' },
  { id: 'f7', nameEn: 'Zinger Wrap', nameAr: 'رول زنجر', nameKu: 'زینگەر ڕاپ', descriptionEn: 'Crispy chicken strips in tortilla', descriptionAr: 'قطع دجاج مقرمشة مع خبز التورتيلا', descriptionKu: 'پارچە مریشکی کریسپی بە نانی تۆرتیلا', price: 6.5, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80', category: 'fastfood', isSpicy: true },
  { id: 'f8', nameEn: 'Cheese Fries', nameAr: 'بطاطس بالجبنة', nameKu: 'فینگر بە پەنیر', descriptionEn: 'Fries with warm cheddar cheese', descriptionAr: 'بطاطس مقلية مع جبنة شيدر', descriptionKu: 'پەتاتەی سوورکراوە بە پەنیری چێدەر', price: 5, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&q=80', category: 'fastfood' },
  { id: 'f9', nameEn: 'Chicken Nuggets', nameAr: 'ناجتس دجاج', nameKu: 'ناگێتی مریشک', descriptionEn: 'Crispy chicken nuggets with dip', descriptionAr: 'قطع دجاج الناجتس المقرمشة', descriptionKu: 'مریشکی ناگێتی کریسپی', price: 4.5, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80', category: 'fastfood' },
  { id: 'f10', nameEn: 'Onion Rings', nameAr: 'حلقات البصل', nameKu: 'ئەڵقەی پیاز', descriptionEn: 'Crispy golden fried onion rings', descriptionAr: 'حلقات بصل مقلية ذهبية', descriptionKu: 'ئەڵقەی پیازی سوورکراوە', price: 4, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80', category: 'fastfood' },

  // --- MAINS (8 Items) ---
  { id: 'm1', nameEn: 'Prime Ribeye Steak', nameAr: 'ستيك ريب آي فاخر', nameKu: 'ستیكی ڕیب ئای نایاب', descriptionEn: '300g grilled ribeye with mushroom sauce', descriptionAr: '300 جرام ستيك ريب آي مع صلصة فطر', descriptionKu: '٣٠٠ گرام ستیکی ڕیب ئای بە سۆسی قارچک', price: 45, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80', category: 'mains', isPopular: true },
  { id: 'm2', nameEn: 'Grilled Salmon', nameAr: 'سلمون مشوي', nameKu: 'سەلەمۆنی برژاو', descriptionEn: 'Fresh salmon with lemon butter', descriptionAr: 'سلمون طازج مع زبدة الليمون', descriptionKu: 'سەلەمۆنی فرێش بە کەرەی لیمۆ', price: 32, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', category: 'mains' },
  { id: 'm3', nameEn: 'Chicken Fettuccine', nameAr: 'فيتوتشيني دجاج', nameKu: 'فیتۆچینی مریشک', descriptionEn: 'Creamy pasta with grilled chicken', descriptionAr: 'باستا كريمية مع دجاج مشوي', descriptionKu: 'پاستای کرێمی بە مریشکی برژاو', price: 18, image: 'https://images.unsplash.com/photo-1645112481338-3562e0394b34?w=600&q=80', category: 'mains' },
  { id: 'm4', nameEn: 'Lamb Chops', nameAr: 'ريش غنم مشوية', nameKu: 'پەراسووی برژاوی بەرخ', descriptionEn: 'Grilled lamb chops with herbs', descriptionAr: 'ريش غنم مشوية مع الأعشاب', descriptionKu: 'پەراسووی برژاوی بەرخ بە گژوگیا', price: 38, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', category: 'mains' },
  { id: 'm5', nameEn: 'Beef Lasagna', nameAr: 'لازانيا لحم', nameKu: 'لازانیای گۆشت', descriptionEn: 'Layered pasta with bolognese', descriptionAr: 'طبقات باستا مع بولونيز', descriptionKu: 'چین چین پاستا بە گۆشت', price: 16, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80', category: 'mains' },
  { id: 'm6', nameEn: 'Mix Grill Platter', nameAr: 'مشاوي مشكلة', nameKu: 'خواردنی برژاوی تێکەڵ', descriptionEn: 'Kebab, Shish Tawook, and Tikka', descriptionAr: 'كباب، شيش طاووق، وتكة', descriptionKu: 'کەباب، شیش تاووق، و تیکە', price: 25, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', category: 'mains', isPopular: true },
  { id: 'm7', nameEn: 'Shrimp Risotto', nameAr: 'ريزوتو الروبيان', nameKu: 'ریزۆتۆی مەیگوو', descriptionEn: 'Italian rice with fresh shrimp', descriptionAr: 'أرز إيطالي مع الروبيان', descriptionKu: 'برنجی ئیتالی بە مەیگوو', price: 28, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db0a?w=600&q=80', category: 'mains' },
  { id: 'm8', nameEn: 'Beef Tagliatelle', nameAr: 'تاغلياتيلي لحم', nameKu: 'تاگلیاتیلی گۆشت', descriptionEn: 'Pasta with beef strips and cream', descriptionAr: 'باستا مع قطع اللحم والكريمة', descriptionKu: 'پاستا بە پارچە گۆشت و کرێم', price: 19, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', category: 'mains' },

  // --- STARTERS (6 Items) ---
  { id: 's1', nameEn: 'Caesar Salad', nameAr: 'سلطة سيزر', nameKu: 'زەڵاتەی سیزەر', descriptionEn: 'Lettuce, croutons, and parmesan', descriptionAr: 'خس، خبز محمص وجبن بارميزان', descriptionKu: 'کاهوو، نانی سوورکراوە و پەنیر', price: 9, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80', category: 'starters' },
  { id: 's2', nameEn: 'Greek Salad', nameAr: 'سلطة يونانية', nameKu: 'زەڵاتەی یۆنانی', descriptionEn: 'Cucumber, tomato, and feta', descriptionAr: 'خيار، طماطم، وجبنة فيتا', descriptionKu: 'خەیار، تەماتە، و پەنیری فێتا', price: 8.5, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', category: 'starters' },
  { id: 's3', nameEn: 'Hummus', nameAr: 'حمص', nameKu: 'حومس', descriptionEn: 'Creamy chickpea dip', descriptionAr: 'حمص بطحينة فاخر', descriptionKu: 'حومسی کرێمی نایاب', price: 6, image: 'https://images.unsplash.com/photo-1577906046421-3214bbc5409d?w=600&q=80', category: 'starters' },
  { id: 's4', nameEn: 'Lentil Soup', nameAr: 'شوربة عدس', nameKu: 'شۆربای نیسک', descriptionEn: 'Warm traditional soup', descriptionAr: 'شوربة عدس دافئة', descriptionKu: 'شۆربای نیسکی گەرم', price: 5, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80', category: 'starters' },
  { id: 's5', nameEn: 'Dynamite Shrimp', nameAr: 'دايناميت روبيان', nameKu: 'دایینامایت مەیگوو', descriptionEn: 'Fried shrimp with spicy sauce', descriptionAr: 'روبيان مقلي مع صلصة حارة', descriptionKu: 'مەیگووی سوورکراوە بە سۆسی توون', price: 14, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', category: 'starters', isSpicy: true },
  { id: 's6', nameEn: 'Gourmet Mezze', nameAr: 'مقبلات مشكلة', nameKu: 'پێشخواردنی تێکەڵ', descriptionEn: 'Mix of Middle Eastern appetizers', descriptionAr: 'تشكيلة مقبلات متنوعة', descriptionKu: 'پێشخواردنی تێکەڵی ڕۆژهەڵاتی', price: 28, image: 'https://images.unsplash.com/photo-1763376385238-ba0211a17505?w=600&q=80', category: 'starters' },

  // --- DESSERTS (5 Items) ---
  { id: 'd1', nameEn: 'Tiramisu', nameAr: 'تيراميسو', nameKu: 'تیرامیسوو', descriptionEn: 'Italian coffee dessert', descriptionAr: 'حلوى إيطالية بالقهوة', descriptionKu: 'شیرینی ئیتالی بە قاوە', price: 9, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80', category: 'desserts' },
  { id: 'd2', nameEn: 'Kunafa', nameAr: 'كنافة', nameKu: 'کناقە', descriptionEn: 'Warm cheese kunafa', descriptionAr: 'كنافة دافئة بالقشطة', descriptionKu: 'کناقەی گەرمی بە قەیماخ', price: 7, image: 'https://images.unsplash.com/photo-1512414776115-6421375d045d?w=600&q=80', category: 'desserts', isPopular: true },
  { id: 'd3', nameEn: 'Opera Cake', nameAr: 'كيك الأوبرا', nameKu: 'کێکی ئۆپێرا', descriptionEn: 'Chocolate and coffee layers', descriptionAr: 'كيك شوكولاتة وقهوة', descriptionKu: 'کێکی شوکلاتە و قاوە', price: 22, image: 'https://images.unsplash.com/photo-1652232658129-61170b992377?w=600&q=80', category: 'desserts' },
  { id: 'd4', nameEn: 'Strawberry Pavlova', nameAr: 'بافلوفا الفراولة', nameKu: 'پاڤlۆڤای شلیک', descriptionEn: 'Meringue with fresh strawberries', descriptionAr: 'مرينغ بالفراولة الطازجة', descriptionKu: 'مێرینگی شلیک', price: 18, image: 'https://images.unsplash.com/photo-1757961048258-00c5ece18c15?w=600&q=80', category: 'desserts' },
  { id: 'd5', nameEn: 'Chocolate Brownie', nameAr: 'براوني شوكولاتة', nameKu: 'براونی شوکلاتە', descriptionEn: 'Served with vanilla ice cream', descriptionAr: 'يقدم مع آيس كريم فانيليا', descriptionKu: 'لەگەڵ ئایسکرێمی ڤانێلا', price: 8, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80', category: 'desserts' },

  // --- DRINKS (4 Items) ---
  { id: 'dr1', nameEn: 'Fresh Orange', nameAr: 'عصير برتقال', nameKu: 'شەربەتی پرتەقاڵ', descriptionEn: '100% fresh juice', descriptionAr: 'عصير برتقال طبيعي', descriptionKu: 'شەربەتی سروشتی', price: 5, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=80', category: 'drinks' },
  { id: 'dr2', nameEn: 'Matcha Mojito', nameAr: 'موهيتو ماتشا', nameKu: 'مۆخیتۆی ماچا', descriptionEn: 'Matcha and mint', descriptionAr: 'ماتشا ونعناع', descriptionKu: 'ماچا و نەعنا', price: 14, image: 'https://images.unsplash.com/photo-1668431456502-a96f8619fd66?w=600&q=80', category: 'drinks' },
  { id: 'dr3', nameEn: 'Iced Latte', nameAr: 'ايس لاتي', nameKu: 'ئایسد لاتی', descriptionEn: 'Espresso with cold milk', descriptionAr: 'اسبريسو مع حليب بارد', descriptionKu: 'ئیسپریسۆ و شیری سارد', price: 6.5, image: 'https://images.unsplash.com/photo-1551046710-3352ff978413?w=600&q=80', category: 'drinks' },
  { id: 'dr4', nameEn: 'Turkish Coffee', nameAr: 'قهوة تركية', nameKu: 'قاوەی تورکی', descriptionEn: 'Traditional coffee', descriptionAr: 'قهوة تركية أصلية', descriptionKu: 'قاوەی ئەسڵی تورکی', price: 3.5, image: 'https://images.unsplash.com/photo-1544787210-28272550d512?w=600&q=80', category: 'drinks' }
];

const categories = [
  { id: 'all', en: 'All', ar: 'الكل', ku: 'هەمووی' },
  { id: 'fastfood', en: 'Fast Food', ar: 'وجبات سريعة', ku: 'فێست فوود' },
  { id: 'mains', en: 'Mains', ar: 'سەرەکی', ku: 'سەرەکی' },
  { id: 'starters', en: 'Starters', ar: 'مقبلات', ku: 'پێشخواردن' },
  { id: 'desserts', en: 'Desserts', ar: 'حلويات', ku: 'شیرینی' },
  { id: 'drinks', en: 'Drinks', ar: 'مشروبات', ku: 'خواردنەوە' }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<'en' | 'ar' | 'ku'>('ku');
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRTL = language === 'ar' || language === 'ku';
  const t = (en: string, ar: string, ku: string) => language === 'ar' ? ar : language === 'ku' ? ku : en;

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-[#050505] text-white selection:bg-[#d4af37] selection:text-black scroll-smooth`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 h-16 transition-colors duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4af37]/20' : 'bg-[#050505]'}`}>
        <div className="max-w-md mx-auto px-6 h-full flex items-center justify-between">
          <a href="https://maps.google.com" target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-[#d4af37]/20 transition-colors">
            <MapPin className="w-5 h-5 text-[#d4af37]" />
          </a>
          <div className="text-center">
            <h1 className="text-lg font-black tracking-widest text-[#d4af37]">ROYAL DINE</h1>
            <div className="text-[8px] text-gray-500 uppercase tracking-widest leading-none">{t('Luxury Dining', 'تجربة فاخرة', 'ئەزموونێکی شاهانە')}</div>
          </div>
          <button onClick={() => setLanguage(l => l === 'ku' ? 'ar' : l === 'ar' ? 'en' : 'ku')} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold">
            {language.toUpperCase()}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-md mx-auto px-6 pt-6">
        <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-6 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <h2 className="text-xl font-bold mb-1 relative z-10">{t('Exclusive Menu', 'قائمة حصرية', 'مێنویەکی ناوازە')}</h2>
          <p className="text-xs text-gray-500 relative z-10 leading-relaxed">{t('The finest flavors served with passion.', 'أرقى النكهات تقدم بكل شغف.', 'باشترین تامەکان بە خۆشەویستییەوە پێشکەش دەکرێن.')}</p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
        </div>
      </section>

      {/* Categories */}
      <div className="sticky top-16 z-40 bg-[#050505]/90 backdrop-blur-sm">
        <div className="max-w-md mx-auto flex gap-3 px-6 py-5 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-xs font-bold transition-all ${selectedCategory === cat.id ? 'bg-[#d4af37] text-black shadow-lg scale-105' : 'bg-white/5 text-gray-500'}`}>
              {t(cat.en, cat.ar, cat.ku)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Menu - Fixed Aspect Ratios */}
      <main className="max-w-md mx-auto px-4 py-2 pb-32">
        <div className="grid grid-cols-2 gap-4">
          {menuData.filter(i => selectedCategory === 'all' || i.category === selectedCategory).map(item => (
            <div key={item.id} className="bg-[#0f0f0f] rounded-[2rem] overflow-hidden border border-white/5 flex flex-col group active:scale-95 transition-transform duration-150 shadow-lg">
              {/* Image Container - NACHAR KIRAWA BO DWAJA (Square) */}
              <div className="relative aspect-square w-full overflow-hidden">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt="" 
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.isPopular && <div className="bg-black/60 p-2 rounded-full backdrop-blur-sm"><Star className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" /></div>}
                  {item.isSpicy && <div className="bg-red-500/20 p-2 rounded-full backdrop-blur-sm"><Flame className="w-4 h-4 text-red-500 fill-red-500" /></div>}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded-xl text-[11px] font-black text-[#d4af37] shadow-xl border border-white/5">${item.price.toFixed(2)}</div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-[13px] font-bold mb-1 line-clamp-1 h-5">{t(item.nameEn, item.nameAr, item.nameKu)}</h3>
                <p className="text-[10px] text-gray-500 mb-4 line-clamp-2 leading-tight h-7">{t(item.descriptionEn, item.descriptionAr, item.descriptionKu)}</p>
                
                {/* Button with Larger Icon */}
                <button 
                  onClick={() => addToCart(item)} 
                  className="mt-auto w-full bg-white/5 hover:bg-[#d4af37] text-[#d4af37] hover:text-black py-2.5 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold transition-all active:bg-white active:scale-90"
                >
                  <Plus className="w-5 h-5" /> {t('Add', 'إضافة', 'زیادکردن')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto px-8 py-12 bg-[#0a0a0a] border-t border-white/5 rounded-t-[3rem] text-center space-y-8">
        <div className="space-y-3">
          <h4 className="text-[#d4af37] font-bold text-sm tracking-widest uppercase">{t('Working Hours', 'ساعات العمل', 'کاتەکانی کارکردن')}</h4>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs tracking-tight"><Clock className="w-4 h-4 text-[#d4af37]" /> 12:00 PM - 02:00 AM</div>
        </div>
        <div className="flex gap-4 justify-center">
          <a href="#" className="p-3.5 bg-white/5 rounded-2xl hover:text-[#d4af37] transition-colors"><Instagram className="w-6 h-6" /></a>
          <a href="#" className="p-3.5 bg-white/5 rounded-2xl hover:text-[#d4af37] transition-colors"><Facebook className="w-6 h-6" /></a>
          <a href="tel:9647503358550" className="p-3.5 bg-white/5 rounded-2xl hover:text-[#d4af37] transition-colors"><Phone className="w-6 h-6" /></a>
        </div>
        <div className="text-[9px] text-gray-600 uppercase tracking-[0.2em] pt-4">© 2026 ROYAL DINE. {t('Developed with Passion', 'تم التطوير بشغف', 'بە خۆشەویستییەوە گەشەی پێدراوە')}</div>
      </footer>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setCartOpen(true)} 
        className={`fixed bottom-8 right-8 p-5 rounded-full shadow-[0_15px_40px_rgba(212,175,55,0.3)] z-50 active:scale-75 transition-all duration-300 ${totalItems > 0 ? 'bg-[#d4af37] text-black' : 'bg-white/10 text-gray-400'}`}
      >
        <div className="relative">
          <ShoppingCart className="w-7 h-7" />
          {totalItems > 0 && <span className="absolute -top-4 -right-4 bg-white text-black text-[11px] w-6 h-6 rounded-full flex items-center justify-center font-black animate-bounce border-2 border-black">{totalItems}</span>}
        </div>
      </button>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-end justify-center animate-in fade-in duration-300">
          <div className="w-full max-w-md h-[88vh] bg-[#050505] rounded-t-[3rem] flex flex-col border-t border-[#d4af37]/20 shadow-2xl overflow-hidden">
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <h2 className="text-2xl font-black text-[#d4af37] tracking-tighter uppercase">{t('My Selection', 'اختياراتي', 'هەڵبژاردەکانم')}</h2>
              <button onClick={() => setCartOpen(false)} className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center space-y-4">
                  <ShoppingBag className="w-24 h-24" />
                  <p className="text-xl font-bold uppercase tracking-widest">{t('Empty List', 'القائمة فارغة', 'سەبەتەکەت بەتاڵە')}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-5 items-center bg-white/5 p-4 rounded-[1.8rem] border border-white/5 animate-in slide-in-from-bottom duration-300">
                      <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                      <div className="flex-1">
                        <h4 className="text-[14px] font-bold">{t(item.nameEn, item.nameAr, item.nameKu)}</h4>
                        <p className="text-[#d4af37] font-black text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-tight">Quantity: {item.quantity}</div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500/30 hover:text-red-500 p-2.5 transition-colors active:scale-75"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-8 bg-[#0a0a0a] rounded-t-[3rem] border-t border-white/10 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between text-2xl font-black uppercase tracking-tighter">
                <span>{t('Total:', 'المجموع:', 'کۆی گشتی:')}</span>
                <span className="text-[#d4af37]">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => { if(cart.length > 0) window.open(`https://wa.me/9647503358550?text=${encodeURIComponent(t('*Order Request*\n', '*طلب جديد*\n', '*داواکاری نوێ*\n') + cart.map(i => `- ${t(i.nameEn, i.nameAr, i.nameKu)} (${i.quantity}x)`).join('\n') + `\n\n*Total: $${totalPrice.toFixed(2)}*`)}`, '_blank')}} 
                disabled={cart.length === 0} 
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${cart.length === 0 ? 'bg-gray-800 text-gray-600' : 'bg-green-600 text-white active:scale-95 shadow-[0_10px_30px_rgba(22,163,74,0.3)] hover:bg-green-500'}`}
              >
                {t('Confirm via WhatsApp', 'تأكيد عبر واتساب', 'ناردن بۆ واتسئەپ')} <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
