import { useState } from 'react';
import { Search, ShoppingCart, Plus, Languages, X, Trash2, AlertCircle, MapPin, ShoppingBag } from 'lucide-react';

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
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuData: MenuItem[] = [
  // --- خواردنە خێرا نوێیەکان (Fast Food) ---
  {
    id: 'f1',
    nameEn: 'Classic Beef Burger',
    nameAr: 'برجر لحم كلاسيك',
    nameKu: 'بێرگەری گۆشتی کلاسیک',
    descriptionEn: 'Juicy beef with cheddar and special sauce',
    descriptionAr: 'لحم بقري مع جبنة شيدر وصلصة خاصة',
    descriptionKu: 'گۆشتی مانگا بە پەنیری چێدەر و سۆسی تایبەت',
    price: 8,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    category: 'fastfood'
  },
  {
    id: 'f2',
    nameEn: 'Crispy Chicken Burger',
    nameAr: 'برجر دجاج مقرمش',
    nameKu: 'بێرگەری مریشکی کریسپی',
    descriptionEn: 'Fried chicken breast with lettuce and mayo',
    descriptionAr: 'صدر دجاج مقلي مع خس ومايونيز',
    descriptionKu: 'سنگی مریشکی سوورکراوە بە کاهوو و مایۆنیز',
    price: 7,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&q=80',
    category: 'fastfood'
  },
  {
    id: 'f3',
    nameEn: 'Pepperoni Pizza',
    nameAr: 'بيتزا بيبروني',
    nameKu: 'پیتزای پیپەرۆنی',
    descriptionEn: 'Italian crust with mozzarella and pepperoni',
    descriptionAr: 'عجينة إيطالية مع موزاريلا وبيبروني',
    descriptionKu: 'هەویری ئیتالی بە مۆزارێلا و پیپەرۆنی',
    price: 12,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
    category: 'fastfood'
  },
  {
    id: 'f4',
    nameEn: 'Loaded Fries',
    nameAr: 'بطاطس محملة',
    nameKu: 'فینگری پڕکراو',
    descriptionEn: 'Fries with melted cheese and jalapenos',
    descriptionAr: 'بطاطس مقلية مع جبنة وخضار',
    descriptionKu: 'پەتاتەی سوورکراوە بە پەنیری تواوە و هالاپینۆ',
    price: 5,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&q=80',
    category: 'fastfood'
  },
  // --- خواردنە کۆنەکان ---
  {
    id: '1',
    nameEn: 'Wagyu Burger',
    nameAr: 'برجر واغيو',
    nameKu: 'بێرگەری واگیو',
    descriptionEn: 'Premium wagyu beef',
    descriptionAr: 'لحم واغيو فاخر',
    descriptionKu: 'گۆشتی واگیوی نایاب',
    price: 48,
    image: 'https://images.unsplash.com/photo-1583065756216-334ab22b5a6c?w=800&q=80',
    category: 'mains'
  },
  {
    id: '2',
    nameEn: 'Ribeye Steak',
    nameAr: 'ستيك ريب آي',
    nameKu: 'ستیكی ڕیب ئای',
    descriptionEn: 'Prime dry-aged ribeye',
    descriptionAr: 'ستيك لحم عالي الجودة',
    descriptionKu: 'ستیکی نایابی کوالیتی بەرز',
    price: 68,
    image: 'https://images.unsplash.com/photo-1676300184021-96fa00e1a987?w=800&q=80',
    category: 'mains'
  }
];

const categories = [
  { id: 'all', nameEn: 'All', nameAr: 'الكل', nameKu: 'هەمووی' },
  { id: 'fastfood', nameEn: 'Fast Food', nameAr: 'وجبات سريعة', nameKu: 'فێست فوود' },
  { id: 'mains', nameEn: 'Mains', nameAr: 'الأطباق الرئيسية', nameKu: 'سەرەکی' },
  { id: 'starters', nameEn: 'Starters', nameAr: 'المقبلات', nameKu: 'پێشخواردن' }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<'en' | 'ar' | 'ku'>('ku'); // واکراوە بە کوردی وەک دیفۆڵت
  const [cartOpen, setCartOpen] = useState(false);

  const restaurantWhatsApp = "9647503358550"; 
  const googleMapsUrl = "https://maps.app.goo.gl/YourLinkHere"; // لێرە لینکی گووگڵ ماپەکە دابنێ
  
  const isRTL = language === 'ar' || language === 'ku';

  const t = (en: string, ar: string, ku: string) => {
    if (language === 'ar') return ar;
    if (language === 'ku') return ku;
    return en;
  };

  const getItemName = (item: MenuItem) => t(item.nameEn, item.nameAr, item.nameKu);
  const getItemDesc = (item: MenuItem) => t(item.descriptionEn, item.descriptionAr, item.descriptionKu);

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
    let message = t("*New Order*\n\n", "*طلب جديد*\n\n", "*داواکاری نوێ*\n\n");
    cart.forEach((item, index) => {
      message += `${index + 1}. ${getItemName(item)} (${item.quantity}x) - $${item.price * item.quantity}\n`;
    });
    message += `\n--------------------------\n`;
    message += t(`*Total: $${totalPrice}*`, `*المجموع: $${totalPrice}*`, `*کۆی گشتی: $${totalPrice}*`);
    window.open(`https://wa.me/${restaurantWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white" dir={isRTL ? 'rtl' : 'ltr'} style={{fontFamily: 'sans-serif'}}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <a href={googleMapsUrl} target="_blank" className="p-2 bg-[#d4af37]/10 rounded-full text-[#d4af37]">
            <MapPin className="w-5 h-5" />
          </a>
          
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold tracking-tighter text-[#d4af37]">ROYAL DINE</h1>
          </div>

          <button onClick={() => setLanguage(language === 'ku' ? 'ar' : language === 'ar' ? 'en' : 'ku')} className="text-xs font-bold bg-white/5 px-3 py-1 rounded-md border border-white/10">
            {language.toUpperCase()}
          </button>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-16 z-40 bg-[#050505]/95 overflow-x-auto scrollbar-hide border-b border-white/5">
        <div className="max-w-md mx-auto flex gap-2 px-4 py-3">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-5 py-2 rounded-xl whitespace-nowrap text-xs font-bold transition-all ${selectedCategory === cat.id ? 'bg-[#d4af37] text-black scale-105' : 'bg-white/5 text-gray-400'}`}>
              {t(cat.nameEn, cat.nameAr, cat.nameKu)}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid (2 Column) */}
      <main className="max-w-md mx-auto px-3 py-4 pb-32">
        <div className="grid grid-cols-2 gap-3">
          {menuData.filter(i => selectedCategory === 'all' || i.category === selectedCategory).map(item => (
            <div key={item.id} className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 flex flex-col">
              <div className="relative">
                <img src={item.image} className="w-full h-32 object-cover" alt="" />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-[#d4af37]">
                  ${item.price}
                </div>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-bold mb-1 line-clamp-1">{getItemName(item)}</h3>
                <p className="text-[10px] text-gray-500 mb-3 line-clamp-2 leading-tight">{getItemDesc(item)}</p>
                
                <button 
                  onClick={() => addToCart(item)} 
                  className="mt-auto w-full bg-[#d4af37] text-black py-2 rounded-xl flex items-center justify-center gap-1 text-xs font-bold active:scale-95 transition-transform"
                >
                  <Plus className="w-3 h-3" /> {t('Add', 'إضافة', 'زیادکردن')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Button */}
      <button onClick={() => setCartOpen(true)} className="fixed bottom-6 right-6 bg-[#d4af37] text-black p-4 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] z-50 active:scale-90 transition-all">
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && <span className="absolute -top-3 -right-3 bg-white text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
        </div>
      </button>

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-end justify-center animate-in fade-in duration-300">
          <div className="w-full max-w-md h-[85vh] bg-[#0a0a0a] rounded-t-[40px] flex flex-col border-t border-[#d4af37]/20">
            <div className="p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#d4af37]">{t('My Cart', 'سلة الطلبات', 'سەبەتەکەم')}</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30">
                  <ShoppingBag className="w-20 h-20 mb-4" />
                  <p>{t('Your cart is empty', 'السلة فارغة', 'سەبەتەکە بەتاڵە')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-2xl">
                      <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                      <div className="flex-1">
                        <h4 className="text-xs font-bold">{getItemName(item)}</h4>
                        <p className="text-[#d4af37] text-[10px]">${item.price} x {item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500/50 p-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 bg-[#0f0f0f] rounded-t-[40px] border-t border-white/5">
              <div className="flex justify-between mb-6 text-xl font-bold">
                <span>{t('Total:', 'المجموع:', 'کۆی گشتی:')}</span>
                <span className="text-[#d4af37]">${totalPrice}</span>
              </div>
              <button 
                onClick={handleWhatsAppOrder} 
                disabled={cart.length === 0}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${cart.length === 0 ? 'bg-gray-800 text-gray-500' : 'bg-green-600 text-white active:scale-95 shadow-xl shadow-green-900/20'}`}
              >
                {t('Confirm Order via WhatsApp', 'تأكيد الطلب عبر واتساب', 'ناردنی داواکاری بۆ واتسئەپ')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
