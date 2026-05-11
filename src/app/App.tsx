import { useState, useEffect } from 'react';
import { 
  ShoppingCart, Plus, Languages, X, Trash2, 
  MapPin, ShoppingBag, Instagram, Facebook, 
  Clock, Flame, Star, ChevronRight, Phone
} from 'lucide-react';

// --- Types ---
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

// --- Full Data (30+ Items) ---
const menuData: MenuItem[] = [
  // Fast Food (10)
  { id: 'f1', nameEn: 'Classic Beef Burger', nameAr: 'برجر لحم كلاسيك', nameKu: 'بێرگەری گۆشتی کلاسیک', descriptionEn: 'Premium beef with cheddar and special royal sauce', descriptionAr: 'لحم بقري مع جبنة شيدر وصلصة ملكية خاصة', descriptionKu: 'گۆشتی مانگا بە پەنیری چێدەر و سۆسی تایبەتی ڕۆیاڵ', price: 8.5, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', category: 'fastfood', isPopular: true },
  { id: 'f2', nameEn: 'Fire Chicken Burger', nameAr: 'برجر دجاج حار', nameKu: 'بێرگەری مریشکی توون', descriptionEn: 'Spicy crispy chicken with fresh jalapenos', descriptionAr: 'دجاج مقرمش حار مع هلابينو طازج', descriptionKu: 'مریشکی کریسپی توون لەگەڵ هالاپینۆی فرێش', price: 7.25, image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&q=80', category: 'fastfood', isSpicy: true },
  { id: 'f3', nameEn: 'Pepperoni Pizza', nameAr: 'بيتزا بيبروني', nameKu: 'پیتزای پیپەرۆنی', descriptionEn: 'Italian crust with mozzarella and spicy pepperoni', descriptionAr: 'عجينة إيطالية مع موزاريلا وبيبروني حار', descriptionKu: 'هەویری ئیتالی بە مۆزارێلا و پیپەرۆنی توون', price: 12, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80', category: 'fastfood', isPopular: true },
  { id: 'f4', nameEn: 'Double Cheese Burger', nameAr: 'دبل تشيز برجر', nameKu: 'دبڵ چیز بێرگەر', descriptionEn: 'Two beef patties with extra melted cheese', descriptionAr: 'شريحتان من اللحم مع جبنة ذائبة إضافية', descriptionKu: 'دوو پارچە گۆشت بە پەنیری تواوەی زیادەوە', price: 10.5, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80', category: 'fastfood' },
  { id: 'f5', nameEn: 'Margherita Pizza', nameAr: 'بيتزا مارغريتا', nameKu: 'پیتزای مارگریتا', descriptionEn: 'Tomato sauce and fresh buffalo mozzarella', descriptionAr: 'صلصة طماطم وموزاريلا بوفالو طازجة', descriptionKu: 'سۆسی تەماتە و مۆزارێلای بوفالۆی فرێش', price: 10, image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?w=600&q=80', category: 'fastfood' },
  { id: 'f6', nameEn: 'BBQ Chicken Pizza', nameAr: 'بيتزا دجاج باربيكيو', nameKu: 'پیتزای مریشکی باربیکیو', descriptionEn: 'Grilled chicken with BBQ sauce', descriptionAr: 'دجاج مشوي مع صلصة باربيكيو', descriptionKu: 'مریشکی برژاو بە سۆسی باربیکیو', price: 13.5, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', category: 'fastfood' },
  { id: 'f7', nameEn: 'Zinger Wrap', nameAr: 'رول زنجر', nameKu: 'زینگەر ڕاپ', descriptionEn: 'Spicy chicken strips in fresh tortilla bread', descriptionAr: 'قطع دجاج مقرمشة حارة في خبز تورتيلا', descriptionKu: 'پارچە مریشکی کریسپی توون لە نانی تۆرتیلا', price: 6.5, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80', category: 'fastfood', isSpicy: true },
  { id: 'f8', nameEn: 'Cheese Fries', nameAr: 'بطاطس بالجبنة', nameKu: 'فینگر بە پەنیر', descriptionEn: 'Crispy fries with warm cheddar sauce', descriptionAr: 'بطاطس مقلية مع صلصة الجبن الدافئة', descriptionKu: 'پەتاتەی سوورکراوە بە سۆسی پەنیری گەرم', price: 5, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&q=80', category: 'fastfood' },
  { id: 'f9', nameEn: 'Chicken Nuggets', nameAr: 'ناجتس دجاج', nameKu: 'ناگێتی مریشک', descriptionEn: '8 pieces of crispy nuggets', descriptionAr: '8 قطع من الناجتس المقرمش', descriptionKu: '٨ پارچە ناگێتی کریسپی مریشک', price: 4.5, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80', category: 'fastfood' },
  { id: 'f10', nameEn: 'Onion Rings', nameAr: 'حلقات البصل', nameKu: 'ئەڵقەی پیاز', descriptionEn: 'Golden fried onion rings', descriptionAr: 'حلقات بصل مقلية ذهبية', descriptionKu: 'ئەڵقەی پیازی سوورکراوەی ئاڵتوونی', price: 4, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80', category: 'fastfood' },

  // Mains (10)
  { id: 'm1', nameEn: 'Prime Ribeye Steak', nameAr: 'ستيك ريب آي فاخر', nameKu: 'ستیكی ڕیب ئای نایاب', descriptionEn: '300g premium steak with truffle mushroom sauce', descriptionAr: '300 جرام ستيك فاخر مع صلصة الفطر والكمأة', descriptionKu: '٣٠٠ گرام ستیکی نایاب بە سۆسی قارچک و تڕەفڵ', price: 45, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80', category: 'mains', isPopular: true },
  { id: 'm2', nameEn: 'Grilled Salmon', nameAr: 'سلمون مشوي', nameKu: 'سەلەمۆنی برژاو', descriptionEn: 'Atlantic salmon with lemon dill butter', descriptionAr: 'سلمون أطلسي طازج مع زبدة الليمون', descriptionKu: 'سەلەمۆنی فرێش بە کەرەی لیمۆ و کەرەوز', price: 32, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', category: 'mains' },
  { id: 'm3', nameEn: 'Chicken Fettuccine', nameAr: 'فيتوتشيني دجاج', nameKu: 'فیتۆچینی مریشک', descriptionEn: 'Creamy pasta with grilled chicken breast', descriptionAr: 'باستا كريمية مع صدر دجاج مشوي', descriptionKu: 'پاستای کرێمی بە سنگی مریشکی برژاو', price: 18, image: 'https://images.unsplash.com/photo-1645112481338-3562e0394b34?w=600&q=80', category: 'mains' },
  { id: 'm4', nameEn: 'Lamb Chops', nameAr: 'ريش غنم مشوية', nameKu: 'پەراسووی برژاوی بەرخ', descriptionEn: 'Four pieces of tender lamb with rosemary', descriptionAr: 'أربع قطع من ريش الغنم الطرية', descriptionKu: 'چوار پارچە پەراسووی ناسکی بەرخ بە ڕۆزماری', price: 38, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', category: 'mains' },
  { id: 'm5', nameEn: 'Beef Lasagna', nameAr: 'لازانيا لحم', nameKu: 'لازانیای گۆشت', descriptionEn: 'Traditional baked lasagna with meat sauce', descriptionAr: 'لازانيا تقليدية مخبوزة مع صلصة اللحم', descriptionKu: 'لازانیای تەقلیدی برژاو بە سۆسی گۆشت', price: 16, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80', category: 'mains' },
  { id: 'm6', nameEn: 'Mix Grill Platter', nameAr: 'مشاوي مشكلة', nameKu: 'خواردنی برژاوی تێکەڵ', descriptionEn: 'Kebab, Shish Tawook, and Lamb Tikka', descriptionAr: 'كباب، شيش طاووق، وتكة لحم غنم', descriptionKu: 'کەباب، شیش تاووق، و تیکەی گۆشتی بەرخ', price: 25, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', category: 'mains', isPopular: true },
  { id: 'm7', nameEn: 'Shrimp Risotto', nameAr: 'ريزوتو الروبيان', nameKu: 'ریزۆتۆی مەیگوو', descriptionEn: 'Italian creamy rice with fresh prawns', descriptionAr: 'أرز إيطالي كريمي مع الروبيان', descriptionKu: 'برنجی کرێمی ئیتالی بە مەیگووی فرێش', price: 28, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db0a?w=600&q=80', category: 'mains' },
  { id: 'm8', nameEn: 'Grilled Sea Bass', nameAr: 'سيباس مشوي', nameKu: 'سیباسی برژاو', descriptionEn: 'Whole sea bass with herbs and garlic', descriptionAr: 'سمك سيباس كامل مع الأعشاب', descriptionKu: 'ماسی سیباسی تەواو بە گژوگیا و سیر', price: 34, image: 'https://images.unsplash.com/photo-1534604973900-c41ab4c287ba?w=600&q=80', category: 'mains' },
  { id: 'm9', nameEn: 'Beef Tagliatelle', nameAr: 'تاغلياتيلي گۆشت', nameKu: 'تاگلیاتیلی گۆشت', descriptionEn: 'Pasta with slow-cooked beef ragu', descriptionAr: 'باستا مع راغو اللحم المطهو ببطء', descriptionKu: 'پاستا بە ڕاگۆی گۆشتی برژاو', price: 21, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80', category: 'mains' },
  { id: 'm10', nameEn: 'Roasted Duck', nameAr: 'بط مشوي', nameKu: 'مراوی برژاو', descriptionEn: 'Crispy skin duck with hoisin sauce', descriptionAr: 'بط مقرمش مع صلصة هويسين', descriptionKu: 'مراوی کریسپی بە سۆسی هۆیسین', price: 42, image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=600&q=80', category: 'mains' },

  // Others (10+)
  { id: 's1', nameEn: 'Caesar Salad', nameAr: 'سلطة سيزر', nameKu: 'زەڵاتەی سیزەر', descriptionEn: 'Romaine lettuce with parmesan', descriptionAr: 'خس روماني مع جبن بارميزان', descriptionKu: 'کاهووی ڕۆمانی بە پەنیر و نانی سوورکراوە', price: 9, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80', category: 'starters' },
  { id: 's2', nameEn: 'Greek Salad', nameAr: 'سلطة يونانية', nameKu: 'زەڵاتەی یۆنانی', descriptionEn: 'Fresh cucumber, tomato, and feta', descriptionAr: 'خيار وطماطم مع جبنة فيتا', descriptionKu: 'تەماتە، خەیار، زەیتوون و پەنیری فێتا', price: 8.5, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', category: 'starters' },
  { id: 's3', nameEn: 'Dynamite Shrimp', nameAr: 'دايناميت روبيان', nameKu: 'دایینامایت مەیگوو', descriptionEn: 'Fried shrimp with spicy sauce', descriptionAr: 'روبيان مقلي مع صلصة حارة', descriptionKu: 'مەیگووی سوورکراوە بە سۆسی توون', price: 14, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', category: 'starters', isSpicy: true },
  { id: 'd1', nameEn: 'Tiramisu', nameAr: 'تيراميسو', nameKu: 'تیرامیسوو', descriptionEn: 'Authentic Italian coffee dessert', descriptionAr: 'حلوى إيطالية أصيلة بالقهوة', descriptionKu: 'شیرینی ئەسڵی ئیتالی بە تامی قاوە', price: 9, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80', category: 'desserts' },
  { id: 'd2', nameEn: 'Kunafa with Cream', nameAr: 'كنافة بالقشطة', nameKu: 'کناقە بە قەیماخ', descriptionEn: 'Warm oriental dessert with syrup', descriptionAr: 'حلوى شرقية دافئة مع القطر', descriptionKu: 'شیرینییەکی ڕۆژهەڵاتی گەرم بە شیلەوە', price: 7, image: 'https://images.unsplash.com/photo-1512414776115-6421375d045d?w=600&q=80', category: 'desserts', isPopular: true },
  { id: 'dr1', nameEn: 'Fresh Orange', nameAr: 'عصير برتقال', nameKu: 'شەربەتی پرتەقاڵ', descriptionEn: '100% natural freshly squeezed', descriptionAr: 'طبيعي 100% معصور طازجاً', descriptionKu: 'سەدا سەد سروشتی و فرێش', price: 5, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=80', category: 'drinks' },
  { id: 'dr2', nameEn: 'Matcha Mojito', nameAr: 'موهيتو ماتشا', nameKu: 'مۆخیتۆی ماچا', descriptionEn: 'Exotic blend of matcha and mint', descriptionAr: 'مزيج فريد من الماتشا والنعناع', descriptionKu: 'تێکەڵەیەکی تایبەت لە ماچا و نەعنا', price: 14, image: 'https://images.unsplash.com/photo-1668431456502-a96f8619fd66?w=600&q=80', category: 'drinks' }
];

const categories = [
  { id: 'all', en: 'All Items', ar: 'كل الأصناف', ku: 'هەموو خواردنەکان' },
  { id: 'fastfood', en: 'Fast Food', ar: 'وجبات سريعة', ku: 'فێست فوود' },
  { id: 'mains', en: 'Main Course', ar: 'الأطباق الرئيسية', ku: 'خواردنی سەرەکی' },
  { id: 'starters', en: 'Starters', ar: 'المقبلات', ku: 'پێشخواردن' },
  { id: 'desserts', en: 'Desserts', ar: 'الحلويات', ku: 'شیرینی' },
  { id: 'drinks', en: 'Drinks', ar: 'المشروبات', ku: 'خواردنەوەکان' }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<'en' | 'ar' | 'ku'>('ku');
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Splash Screen States
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    // ئەنیمەشنی نەمانی لۆگۆ بە شێوەیەکی نەرم
    const timer = setTimeout(() => {
      setFadeSplash(true); // یەکەمجار کاڵببێتەوە
      setTimeout(() => setShowSplash(false), 800); // دوای ٨٠٠ میلی چرکە بە تەواوی نەمێنێت
    }, 2000);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isRTL = language === 'ar' || language === 'ku';
  const t = (en: string, ar: string, ku: string) => language === 'ar' ? ar : language === 'ku' ? ku : en;

  const addToCart = (item: MenuItem) => {
    setIsFlying(true);
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    setTimeout(() => setIsFlying(false), 500);
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // لۆگۆی سەرەتا (Splash Screen) بە ئەنیمەشنی دەرچوونی نەرم
  if (showSplash) {
    return (
      <div className={`fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[100] transition-all duration-700 ease-out ${fadeSplash ? 'opacity-0 -translate-y-20' : 'opacity-100 translate-y-0'}`}>
        <div className="relative">
          <div className="w-24 h-24 border-4 border-[#d4af37]/20 rounded-full animate-ping absolute inset-0"></div>
          <div className="w-24 h-24 border-t-4 border-[#d4af37] rounded-full animate-spin relative z-10"></div>
        </div>
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-black text-[#d4af37] tracking-[0.4em] font-serif">ROYAL DINE</h1>
          <p className="text-gray-500 mt-2 text-[10px] tracking-[0.5em] uppercase italic">The Art of Fine Food</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#d4af37] selection:text-black font-sans animate-in fade-in duration-1000" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 h-16 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4af37]/20 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-md mx-auto px-6 h-full flex items-center justify-between">
          <button className="p-2.5 bg-white/5 rounded-full"><MapPin className="w-5 h-5 text-[#d4af37]" /></button>
          <div className="text-center">
            <h1 className="text-xl font-black tracking-widest text-[#d4af37]">ROYAL DINE</h1>
          </div>
          <button onClick={() => setLanguage(l => l === 'ku' ? 'ar' : l === 'ar' ? 'en' : 'ku')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold">
            {language.toUpperCase()}
          </button>
        </div>
      </header>

      {/* Category Scroll */}
      <div className="sticky top-16 z-40 bg-[#050505]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-md mx-auto flex gap-3 px-6 py-5 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-6 py-2.5 rounded-2xl whitespace-nowrap text-xs font-bold transition-all duration-300 ${selectedCategory === cat.id ? 'bg-[#d4af37] text-black shadow-lg scale-105' : 'bg-white/5 text-gray-500'}`}>
              {t(cat.en, cat.ar, cat.ku)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="max-w-md mx-auto px-4 py-2 pb-32">
        {categories.filter(c => selectedCategory === 'all' || c.id === selectedCategory).map(cat => {
          const items = menuData.filter(i => i.category === cat.id);
          if (items.length === 0 && selectedCategory !== 'all') return null;
          if (cat.id === 'all' && selectedCategory === 'all') return null;

          return (
            <div key={cat.id} className="mb-12">
              <div className="flex items-center gap-4 mb-8 px-2">
                <h2 className="text-sm font-black text-[#d4af37] uppercase tracking-[0.3em]">{t(cat.en, cat.ar, cat.ku)}</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#d4af37]/40 to-transparent"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {items.map(item => (
                  <div key={item.id} className="bg-[#0f0f0f] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col group active:scale-95 transition-all duration-300">
                    
                    {/* وێنەی چوارگۆشەی ڕێک بۆ هەموو خواردنەکان */}
                    <div className="relative aspect-square w-full cursor-pointer overflow-hidden" onClick={() => setSelectedItem(item)}>
                      <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {item.isPopular && <div className="bg-black/60 p-2 rounded-full backdrop-blur-sm border border-[#d4af37]/20"><Star className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" /></div>}
                        {item.isSpicy && <div className="bg-red-500/20 p-2 rounded-full backdrop-blur-sm border border-red-500/20"><Flame className="w-5 h-5 text-red-500 fill-red-500" /></div>}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded-xl text-[11px] font-black text-[#d4af37] border border-white/5 shadow-xl">${item.price.toFixed(2)}</div>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-[13px] font-bold mb-1 line-clamp-1">{t(item.nameEn, item.nameAr, item.nameKu)}</h3>
                      <button onClick={() => addToCart(item)} className="mt-auto w-full bg-white/5 hover:bg-[#d4af37] text-[#d4af37] hover:text-black py-3 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-bold transition-all active:bg-white">
                        <Plus className="w-6 h-6" /> {t('Add', 'إضافة', 'زیادکردن')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* Product Popup Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="w-full max-w-sm bg-[#0a0a0a] rounded-[3.5rem] overflow-hidden border border-[#d4af37]/20">
            <div className="relative aspect-square">
              <img src={selectedItem.image} className="w-full h-full object-cover" alt="" />
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 p-2.5 bg-black/50 rounded-full backdrop-blur-xl border border-white/10"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-5">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-black">{t(selectedItem.nameEn, selectedItem.nameAr, selectedItem.nameKu)}</h2>
                <span className="text-2xl font-black text-[#d4af37] ml-4">${selectedItem.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">{t(selectedItem.descriptionEn, selectedItem.descriptionAr, selectedItem.descriptionKu)}</p>
              <button onClick={() => { addToCart(selectedItem); setSelectedItem(null); }} className="w-full bg-[#d4af37] text-black py-5 rounded-[2rem] font-black uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-[#d4af37]/20">
                {t('Add to Order', 'إضافة للطلب', 'زیادکردن بۆ داواکاری')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      <button 
        onClick={() => setCartOpen(true)} 
        className={`fixed bottom-8 right-8 p-5 rounded-full shadow-2xl z-50 transition-all duration-500 ${isFlying ? 'scale-125 bg-white' : totalItems > 0 ? 'bg-[#d4af37] text-black shadow-[#d4af37]/30' : 'bg-white/10 text-gray-400'}`}
      >
        <div className="relative">
          <ShoppingCart className="w-8 h-8" />
          {totalItems > 0 && <span className="absolute -top-4 -right-4 bg-white text-black text-[12px] w-7 h-7 rounded-full flex items-center justify-center font-black animate-bounce border-2 border-black">{totalItems}</span>}
        </div>
      </button>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex items-end justify-center animate-in fade-in duration-500">
          <div className="w-full max-w-md h-[90vh] bg-[#050505] rounded-t-[4rem] flex flex-col border-t border-[#d4af37]/30 shadow-2xl">
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <h2 className="text-2xl font-black text-[#d4af37] uppercase tracking-tighter">{t('My Selection', 'اختياراتي', 'هەڵبژاردەکانم')}</h2>
              <button onClick={() => setCartOpen(false)} className="p-3 bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center space-y-4">
                  <ShoppingBag className="w-24 h-24" />
                  <p className="text-xl font-bold uppercase tracking-widest">{t('Empty List', 'القائمة فارغة', 'سەبەتەکەت بەتاڵە')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-5 items-center bg-white/5 p-4 rounded-[2rem] border border-white/5">
                      <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                      <div className="flex-1">
                        <h4 className="text-[14px] font-bold">{t(item.nameEn, item.nameAr, item.nameKu)}</h4>
                        <p className="text-[#d4af37] font-black text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500/30 hover:text-red-500 p-2.5 transition-colors active:scale-75"><Trash2 className="w-6 h-6" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-8 bg-[#0a0a0a] rounded-t-[4rem] border-t border-white/10 space-y-6">
              <div className="flex justify-between text-2xl font-black uppercase tracking-tighter">
                <span>{t('Total:', 'المجموع:', 'کۆی گشتی:')}</span>
                <span className="text-[#d4af37]">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => { if(cart.length > 0) window.open(`https://wa.me/9647503358550?text=${encodeURIComponent(t('*Order Request*\n', '*طلب جديد*\n', '*داواکاری نوێ*\n') + cart.map(i => `- ${t(i.nameEn, i.nameAr, i.nameKu)} (${i.quantity}x)`).join('\n') + `\n\n*Total: $${totalPrice.toFixed(2)}*`)}`, '_blank')}} 
                disabled={cart.length === 0} 
                className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase flex items-center justify-center gap-3 transition-all ${cart.length === 0 ? 'bg-gray-800 text-gray-600' : 'bg-green-600 text-white active:scale-95 shadow-xl hover:bg-green-500'}`}
              >
                {t('Confirm Order', 'تأكيد الطلب', 'ناردن بۆ واتسئەپ')} <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <footer className="max-w-md mx-auto px-8 py-16 bg-[#0a0a0a] border-t border-white/5 rounded-t-[4rem] text-center space-y-10">
        <div className="space-y-4">
          <h4 className="text-[#d4af37] font-bold text-sm tracking-widest uppercase italic">{t('Luxury Dining', 'تجربة فاخرة', 'ئەزموونێکی شاهانە')}</h4>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs tracking-tight"><Clock className="w-4 h-4 text-[#d4af37]" /> 12:00 PM - 02:00 AM</div>
        </div>
        <div className="flex gap-6 justify-center">
          <a href="#" className="p-4 bg-white/5 rounded-[1.8rem] hover:text-[#d4af37] transition-all"><Instagram className="w-7 h-7" /></a>
          <a href="#" className="p-4 bg-white/5 rounded-[1.8rem] hover:text-[#d4af37] transition-all"><Facebook className="w-7 h-7" /></a>
          <a href="tel:9647503358550" className="p-4 bg-white/5 rounded-[1.8rem] hover:text-[#d4af37] transition-all"><Phone className="w-7 h-7" /></a>
        </div>
        <div className="text-[10px] text-gray-700 uppercase tracking-[0.4em] font-medium pt-4">© 2026 ROYAL DINE Concept.</div>
      </footer>
    </div>
  );
}
