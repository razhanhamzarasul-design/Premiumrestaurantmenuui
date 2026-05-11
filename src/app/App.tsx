import { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, Plus, Languages, X, Trash2, 
  AlertCircle, MapPin, ShoppingBag, Instagram, 
  Facebook, Clock, Flame, Star, ChevronRight
} from 'lucide-react';

// --- پێکهاتەی خواردنەکان بە زیادکردنی نیشانەی تایبەت ---
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
  {
    id: 'f1',
    nameEn: 'Classic Beef Burger',
    nameAr: 'برجر لحم كلاسيك',
    nameKu: 'بێرگەری گۆشتی کلاسیک',
    descriptionEn: 'Juicy beef with cheddar and special sauce',
    descriptionAr: 'لحم بقري مع جبنة شيدر وصلصة خاصة',
    descriptionKu: 'گۆشتی مانگا بە پەنیری چێدەر و سۆسی تایبەت',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    category: 'fastfood',
    isPopular: true
  },
  {
    id: 'f2',
    nameEn: 'Fire Chicken Burger',
    nameAr: 'برجر دجاج حار',
    nameKu: 'بێرگەری مریشکی توون',
    descriptionEn: 'Spicy crispy chicken with jalapenos',
    descriptionAr: 'دجاج مقرمش حار مع هلابينو',
    descriptionKu: 'مریشکی کریسپی توون لەگەڵ هالاپینۆ',
    price: 7.25,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&q=80',
    category: 'fastfood',
    isSpicy: true
  },
  {
    id: 'f3',
    nameEn: 'Pepperoni Pizza',
    nameAr: 'بيتزا بيبروني',
    nameKu: 'پیتزای پیپەرۆنی',
    descriptionEn: 'Italian crust with mozzarella and pepperoni',
    descriptionAr: 'عجينة إيطالية مع موزاريلا وبيبروني',
    descriptionKu: 'هەویری ئیتالی بە مۆزارێلا و پیپەرۆنی',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
    category: 'fastfood',
    isPopular: true
  },
  {
    id: '1',
    nameEn: 'Gourmet Mezze Platter',
    nameAr: 'طبق المقبلات الفاخرة',
    nameKu: 'قاپی پێشخواردنی شاهانە',
    descriptionEn: 'Artfully arranged selection of Mediterranean appetizers',
    descriptionAr: 'تشكيلة منسقة من المقبلات المتوسطية',
    descriptionKu: 'هەڵبژاردەیەکی ناوازە لە پێشخواردنەکان',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1763376385238-ba0211a17505?w=800&q=80',
    category: 'starters'
  },
  {
    id: '7',
    nameEn: 'Strawberry Pavlova',
    nameAr: 'بافلوفا الفراولة',
    nameKu: 'پاڤلۆڤای شلیک',
    descriptionEn: 'Light meringue with fresh strawberries',
    descriptionAr: 'مرينغ خفيف مع فراولة طازجة',
    descriptionKu: 'مێرینگی سووک بە شلیکی فرێش',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1757961048258-00c5ece18c15?w=800&q=80',
    category: 'desserts'
  },
  {
    id: '9',
    nameEn: 'Matcha Mojito',
    nameAr: 'موهيتو الماتشا',
    nameKu: 'مۆخیتۆی ماچا',
    descriptionEn: 'Refreshing blend of matcha and mint',
    descriptionAr: 'مزيج منعش من الماتشا والنعناع',
    descriptionKu: 'تێکەڵەیەکی فرێش لە ماچا و نەعنا',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1668431456502-a96f8619fd66?w=800&q=80',
    category: 'drinks'
  }
];

const categories = [
  { id: 'all', nameEn: 'All', nameAr: 'الكل', nameKu: 'هەمووی' },
  { id: 'fastfood', nameEn: 'Fast Food', nameAr: 'وجبات سريعة', nameKu: 'فێست فوود' },
  { id: 'starters', nameEn: 'Starters', nameAr: 'المقبلات', nameKu: 'پێشخواردن' },
  { id: 'desserts', nameEn: 'Desserts', nameAr: 'الحلويات', nameKu: 'شیرینی' },
  { id: 'drinks', nameEn: 'Drinks', nameAr: 'المشروبات', nameKu: 'خواردنەوەکان' }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<'en' | 'ar' | 'ku'>('ku');
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- زانیارییە جێگیرەکان (لێرە دەستکارییان بکە) ---
  const restaurantWhatsApp = "9647503358550"; 
  const googleMapsUrl = "https://maps.google.com";
  const instagramUser = "royaldine";
  const facebookUser = "royaldine.official";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRTL = language === 'ar' || language === 'ku';

  const t = (en: string, ar: string, ku: string) => {
    if (language === 'ar') return ar;
    if (language === 'ku') return ku;
    return en;
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    let message = t("*New Order Request*\n\n", "*طلب جديد*\n\n", "*داواکاری نوێ*\n\n");
    cart.forEach((item, index) => {
      const name = t(item.nameEn, item.nameAr, item.nameKu);
      message += `${index + 1}. ${name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n--------------------------\n`;
    message += t(`*Total: $${totalPrice.toFixed(2)}*`, `*المجموع: $${totalPrice.toFixed(2)}*`, `*کۆی گشتی: $${totalPrice.toFixed(2)}*`);
    window.open(`https://wa.me/${restaurantWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#d4af37] selection:text-black" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#d4af37]/20 py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-md mx-auto px-6 flex items-center justify-between">
          <a href={googleMapsUrl} target="_blank" className="p-2.5 bg-white/5 rounded-full hover:bg-[#d4af37]/20 transition-colors">
            <MapPin className="w-5 h-5 text-[#d4af37]" />
          </a>
          
          <div className="text-center">
            <h1 className="text-xl font-black tracking-widest text-[#d4af37] font-serif">ROYAL DINE</h1>
            <div className="text-[9px] text-gray-500 tracking-[0.3em] uppercase">{t('Premium Experience', 'تجربة فاخرة', 'ئەزموونێکی شاهانە')}</div>
          </div>

          <button 
            onClick={() => setLanguage(language === 'ku' ? 'ar' : language === 'ar' ? 'en' : 'ku')}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold"
          >
            {language.toUpperCase()}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-md mx-auto px-6 pt-6 pb-2">
        <div className="bg-gradient-to-tr from-[#111] to-[#1a1a1a] p-6 rounded-[2rem] border border-white/5 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">{t('Welcome to Royal Dine', 'مرحباً بكم في رويال داين', 'بەخێربێن بۆ ڕۆیاڵ داین')}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('Experience the art of fine dining and fast food in one place.', 'اختبر فن الطعام الفاخر والوجبات السريعة في مكان واحد.', 'چێژ لە هونەری خواردنی نایاب و خێرا ببینە لە یەک شوێندا.')}
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Categories Scroll */}
      <div className="sticky top-16 z-40 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-md mx-auto flex gap-3 px-6 py-5 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2.5 rounded-2xl whitespace-nowrap text-xs font-bold transition-all duration-300 ${
                selectedCategory === cat.id 
                ? 'bg-[#d4af37] text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)]' 
                : 'bg-white/5 text-gray-400 border border-white/5'
              }`}
            >
              {t(cat.nameEn, cat.nameAr, cat.nameKu)}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-md mx-auto px-4 py-2 pb-32">
        <div className="grid grid-cols-2 gap-4">
          {menuData.filter(i => selectedCategory === 'all' || i.category === selectedCategory).map(item => (
            <div key={item.id} className="group bg-[#0f0f0f] rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500 flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.isPopular && (
                    <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-full text-[#d4af37]">
                      <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
                    </div>
                  )}
                  {item.isSpicy && (
                    <div className="bg-red-500/20 backdrop-blur-md p-1.5 rounded-full text-red-500">
                      <Flame className="w-3.5 h-3.5 fill-red-500" />
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-black text-[#d4af37]">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-[13px] font-bold mb-1 line-clamp-1 group-hover:text-[#d4af37] transition-colors">
                  {t(item.nameEn, item.nameAr, item.nameKu)}
                </h3>
                <p className="text-[10px] text-gray-500 mb-4 line-clamp-2 leading-tight h-6">
                  {t(item.descriptionEn, item.descriptionAr, item.descriptionKu)}
                </p>
                
                <button 
                  onClick={() => addToCart(item)} 
                  className="mt-auto w-full bg-white/5 hover:bg-[#d4af37] text-[#d4af37] hover:text-black py-2.5 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold transition-all active:scale-90"
                >
                  <Plus className="w-3 h-3" /> {t('Add', 'إضافة', 'زیادکردن')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Professional Footer */}
      <footer className="max-w-md mx-auto px-8 py-12 bg-[#0a0a0a] border-t border-white/5 rounded-t-[3rem]">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-2">
            <h4 className="text-[#d4af37] font-serif font-bold text-lg uppercase tracking-widest">{t('Working Hours', 'ساعات العمل', 'کاژێرەکانی کارکردن')}</h4>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>12:00 PM - 12:00 AM</span>
            </div>
          </div>

          <div className="flex gap-4">
            <a href={`https://instagram.com/${instagramUser}`} className="p-3 bg-white/5 rounded-2xl hover:text-[#d4af37] transition-colors"><Instagram /></a>
            <a href={`https://facebook.com/${facebookUser}`} className="p-3 bg-white/5 rounded-2xl hover:text-[#d4af37] transition-colors"><Facebook /></a>
          </div>

          <div className="text-[10px] text-gray-600 tracking-widest">
            © 2026 ROYAL DINE. {t('Developed with Passion', 'تم التطوير بشغف', 'بە خۆشەویستییەوە گەشەی پێدراوە')}
          </div>
        </div>
      </footer>

      {/* Floating UI */}
      <button 
        onClick={() => setCartOpen(true)} 
        className={`fixed bottom-8 right-8 p-5 rounded-full shadow-[0_20px_50px_rgba(212,175,55,0.3)] z-50 active:scale-75 transition-all duration-500 ${totalItems > 0 ? 'bg-[#d4af37] text-black' : 'bg-white/10 text-white'}`}
      >
        <div className="relative">
          <ShoppingCart className="w-7 h-7" />
          {totalItems > 0 && (
            <span className="absolute -top-4 -right-4 bg-white text-black text-[11px] w-6 h-6 rounded-full flex items-center justify-center font-black animate-bounce">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-end justify-center">
          <div className="w-full max-w-md h-[90vh] bg-[#050505] rounded-t-[3rem] flex flex-col border-t border-[#d4af37]/30 shadow-[0_-20px_80px_rgba(0,0,0,0.8)]">
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <div>
                <h2 className="text-2xl font-black text-[#d4af37]">{t('My Selection', 'اختياراتي', 'هەڵبژاردەکانم')}</h2>
                <p className="text-xs text-gray-500 mt-1">{totalItems} {t('Items selected', 'أصناف مختارة', 'خواردن هەڵبژێردراوە')}</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-3 bg-white/5 rounded-full hover:rotate-90 transition-transform"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                  <ShoppingBag className="w-24 h-24" />
                  <p className="text-xl font-bold">{t('Start adding flavors!', 'ابدأ بإضافة النكهات!', 'دەستبکە بە زیادکردنی ت تامەکان!')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-5 items-center bg-white/5 p-4 rounded-[1.5rem] border border-white/5 animate-in slide-in-from-bottom duration-300">
                      <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                      <div className="flex-1">
                        <h4 className="text-[13px] font-bold">{t(item.nameEn, item.nameAr, item.nameKu)}</h4>
                        <p className="text-[#d4af37] font-black text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-500 uppercase tracking-tighter">
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500/30 hover:text-red-500 p-2 transition-colors"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 bg-[#0a0a0a] rounded-t-[3rem] border-t border-white/5 shadow-2xl">
              <div className="flex justify-between mb-8">
                <span className="text-gray-400 font-bold">{t('Subtotal:', 'المجموع الفرعي:', 'کۆی گشتی:')}</span>
                <span className="text-2xl font-black text-[#d4af37]">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleWhatsAppOrder} 
                disabled={cart.length === 0}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                  cart.length === 0 
                  ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-2xl shadow-green-900/40 active:scale-95'
                }`}
              >
                {t('Confirm Order', 'تأكيد الطلب', 'تەواوکردنی داواکاری')}
                <ChevronRight className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
