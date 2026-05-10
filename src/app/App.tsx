import { useState } from 'react';
import { Search, ShoppingCart, Plus, Languages, X, Trash2 } from 'lucide-react';

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
  {
    id: '1',
    nameEn: 'Gourmet Mezze Platter',
    nameAr: 'طبق المقبلات الفاخرة',
    nameKu: 'قاپی پێشخواردنی شاهانە',
    descriptionEn: 'Artfully arranged selection of Mediterranean appetizers',
    descriptionAr: 'تشكيلة منسقة من المقبلات المتوسطية',
    descriptionKu: 'هەڵبژاردەیەکی ناوازە لە پێشخواردنەکانی دەریای ناوەڕاست',
    price: 28,
    image: 'https://images.unsplash.com/photo-1763376385238-ba0211a17505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'starters'
  },
  {
    id: '2',
    nameEn: 'Truffle Cheese Balls',
    nameAr: 'كرات الجبن بالكمأة',
    nameKu: 'تۆپەی پەنیری تڕەفڵ',
    descriptionEn: 'Golden fried cheese with black truffle and herbs',
    descriptionAr: 'جبن مقلي ذهبي مع الكمأة السوداء والأعشاب',
    descriptionKu: 'پەنیری سورەوەکراوی ئاڵتوونی بە تڕەفڵی ڕەش و گژوگیا',
    price: 24,
    image: 'https://images.unsplash.com/photo-1772795598475-ac6071eb789b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'starters'
  },
  {
    id: '3',
    nameEn: 'Burrata Salad',
    nameAr: 'سلطة البوراتا',
    nameKu: 'زەڵاتەی بۆراتا',
    descriptionEn: 'Fresh burrata with heirloom tomatoes and basil',
    descriptionAr: 'بوراتا طازجة مع الطماطم والريحان',
    descriptionKu: 'پەنیری بۆراتای فرێش بە تەماتە و ڕێحانە',
    price: 22,
    image: 'https://images.unsplash.com/photo-1664988935525-e7e0e5e375e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'starters'
  },
  {
    id: '4',
    nameEn: 'Wagyu Beef Burger',
    nameAr: 'برجر لحم الواغيو',
    nameKu: 'بێرگەری گۆشتی واگیو',
    descriptionEn: 'Premium wagyu patty with truffle aioli and aged cheddar',
    descriptionAr: 'لحم واغيو فاخر مع صوص الكمأة والجبن العتيق',
    descriptionKu: 'پارچە گۆشتی واگیوی نایاب بە سۆسی تڕەفڵ و پەنیری چێدەر',
    price: 48,
    image: 'https://images.unsplash.com/photo-1583065756216-334ab22b5a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'mains'
  },
  {
    id: '5',
    nameEn: 'Pan-Seared Salmon',
    nameAr: 'سلمون محمر',
    nameKu: 'سەلەمۆنی برژاو',
    descriptionEn: 'Wild-caught salmon with seasonal vegetables and lemon butter',
    descriptionAr: 'سلمون طازج مع خضار موسمية وزبدة الليمون',
    descriptionKu: 'سەلەمۆنی فرێش لەگەڵ سەوزەی وەرزي و کەرەی لیمۆ',
    price: 52,
    image: 'https://images.unsplash.com/photo-1676300185165-3f543c1fcb72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'mains'
  },
  {
    id: '6',
    nameEn: 'Ribeye Steak',
    nameAr: 'ستيك ريب آي',
    nameKu: 'ستیكی ڕیب ئای',
    descriptionEn: 'Prime dry-aged ribeye with roasted garlic and herb butter',
    descriptionAr: 'ستيك لحم عالي الجودة مع ثوم محمص وزبدة الأعشاب',
    descriptionKu: 'ستیکی نایاب بە سیر و کەرەی گژوگیا',
    price: 68,
    image: 'https://images.unsplash.com/photo-1676300184021-96fa00e1a987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'mains'
  },
  {
    id: '7',
    nameEn: 'Strawberry Pavlova',
    nameAr: 'بافلوفا الفراولة',
    nameKu: 'پاڤلۆڤای شلیک',
    descriptionEn: 'Light meringue with fresh strawberries and cream',
    descriptionAr: 'مرينغ خفيف مع فراولة طازجة وكريمة',
    descriptionKu: 'مێرینگی سووک بە شلیکی فرێش و کرێم',
    price: 18,
    image: 'https://images.unsplash.com/photo-1757961048258-00c5ece18c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'desserts'
  },
  {
    id: '8',
    nameEn: 'Chocolate Opera Cake',
    nameAr: 'كيك الأوبرا بالشوكولاتة',
    nameKu: 'کێکی ئۆپێرای شوکلاتە',
    descriptionEn: 'Layered chocolate sponge with coffee buttercream',
    descriptionAr: 'طبقات من الشوكولاتة مع كريمة القهوة',
    descriptionKu: 'کێکی شوکلاتەی چین چین بە کرێمی قاوە',
    price: 22,
    image: 'https://images.unsplash.com/photo-1652232658129-61170b992377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'desserts'
  },
  {
    id: '9',
    nameEn: 'Matcha Mojito',
    nameAr: 'موهيتو الماتشا',
    nameKu: 'مۆخیتۆی ماچا',
    descriptionEn: 'Refreshing blend of matcha, mint, and lime',
    descriptionAr: 'مزيج منعش من الماتشا والنعناع والليمون',
    descriptionKu: 'تێکەڵەیەکی فرێش لە ماچا، نەعنا، و لیمۆ',
    price: 14,
    image: 'https://images.unsplash.com/photo-1668431456502-a96f8619fd66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'drinks'
  },
  {
    id: '10',
    nameEn: 'Rose Sunset',
    nameAr: 'غروب الورد',
    nameKu: 'خۆرئاوابوونی گوڵەباخ',
    descriptionEn: 'Pink grapefruit with rose water and sparkling wine',
    descriptionAr: 'جريب فروت وردي مع ماء الورد والنبيذ الفوار',
    descriptionKu: 'گرەیپ فروتی پەمەیی بە ئاوی گوڵەباخ',
    price: 16,
    image: 'https://images.unsplash.com/photo-1761315631350-bef87d35bda0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'drinks'
  }
];

const categories = [
  { id: 'all', nameEn: 'All', nameAr: 'الكل', nameKu: 'هەمووی' },
  { id: 'starters', nameEn: 'Starters', nameAr: 'المقبلات', nameKu: 'پێشخواردن' },
  { id: 'mains', nameEn: 'Main Course', nameAr: 'الطبق الرئيسي', nameKu: 'سەرەکی' },
  { id: 'desserts', nameEn: 'Desserts', nameAr: 'الحلويات', nameKu: 'شیرینی' },
  { id: 'drinks', nameEn: 'Drinks', nameAr: 'المشروبات', nameKu: 'خواردنەوەکان' }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  // لێرەدا زمانەکەمان کردووە بە 3 جۆر
  const [language, setLanguage] = useState<'en' | 'ar' | 'ku'>('en');
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // ژمارەی واتسئەپەکەت کە خۆت داونات
  const restaurantWhatsApp = "9647503358550"; 

  // بۆ عەرەبی و کوردی وێبسایتەکە دەبێتە ڕاست بۆ چەپ
  const isRTL = language === 'ar' || language === 'ku';

  // گۆڕینی زمانەکان بە دوگمەکە (ئینگلیزی -> عەرەبی -> کوردی)
  const toggleLanguage = () => {
    if (language === 'en') setLanguage('ar');
    else if (language === 'ar') setLanguage('ku');
    else setLanguage('en');
  };

  // فەرمانی وەرگێڕانی زیرەک بۆ وشەکانی ناو وێبسایتەکە
  const t = (en: string, ar: string, ku: string) => {
    if (language === 'ar') return ar;
    if (language === 'ku') return ku;
    return en;
  };

  const getItemName = (item: MenuItem) => t(item.nameEn, item.nameAr, item.nameKu);
  const getItemDesc = (item: MenuItem) => t(item.descriptionEn, item.descriptionAr, item.descriptionKu);
  const getCatName = (cat: any) => t(cat.nameEn, cat.nameAr, cat.nameKu);

  const filteredMenu = selectedCategory === 'all'
    ? menuData
    : menuData.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ڕێکخستنی نامەی واتسئەپەکە بەپێی ئەو زمانەی کڕیار هەڵیبژاردووە
  const handleWhatsAppOrder = () => {
    let message = t("*New Order Request*\n\n", "*طلب جديد*\n\n", "*داواکاری نوێ*\n\n");
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${getItemName(item)} (${item.quantity}x) - $${item.price * item.quantity}\n`;
    });

    message += `\n--------------------------\n`;
    message += t(`*Total Amount: $${totalPrice}*`, `*المجموع: $${totalPrice}*`, `*کۆی گشتی: $${totalPrice}*`);
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${restaurantWhatsApp}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#d4af37]/10">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-[#d4af37]/10 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-[#d4af37]" />
          </button>

          <div className="flex flex-col items-center">
            <h1 className="text-xl tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="text-[#d4af37]">ROYAL</span> DINE
            </h1>
            <div className="text-[10px] text-gray-500 tracking-widest">
              {t('FINE DINING', 'مطعم فاخر', 'خواردنی شاهانە')}
            </div>
          </div>

          <button
            onClick={toggleLanguage}
            className="p-2 hover:bg-[#d4af37]/10 rounded-lg transition-colors flex items-center gap-1"
          >
            <Languages className="w-5 h-5 text-[#d4af37]" />
            <span className="text-xs text-[#d4af37] font-bold">
              {language.toUpperCase()}
            </span>
          </button>
        </div>

        {searchOpen && (
          <div className="px-4 pb-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder={t('Search menu...', 'البحث في القائمة...', 'گەڕان بۆ خواردن...')}
              className="w-full bg-[#1a1a1a] border border-[#d4af37]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-colors"
            />
          </div>
        )}
      </header>

      <div className="sticky top-16 z-40 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#d4af37]/10">
        <div className="max-w-md mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4 py-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-6 py-2.5 rounded-full whitespace-nowrap text-sm transition-all
                  ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f4bf47] text-black shadow-lg shadow-[#d4af37]/20'
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#d4af37]/20'
                  }
                `}
              >
                {getCatName(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        <div className="space-y-4">
          {filteredMenu.map(item => (
            <div
              key={item.id}
              className="group bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg mb-1">{getItemName(item)}</h3>
                <p className="text-sm text-gray-400 mb-4">{getItemDesc(item)}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-[#d4af37]">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-2 bg-[#d4af37] text-black px-5 py-2 rounded-full font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    {t('Add', 'إضافة', 'زیادکردن')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {totalItems > 0 && (
        <button 
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 bg-[#d4af37] text-black p-4 rounded-full shadow-2xl z-50"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-black text-[#d4af37] text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm">
          <div className="max-w-md mx-auto h-full bg-[#0a0a0a] flex flex-col">
            <div className="p-4 border-b border-[#d4af37]/20 flex items-center justify-between">
              <h2 className="text-xl text-[#d4af37] font-serif">{t('Order Cart', 'سلة الطلبات', 'سەبەتەی داواکاری')}</h2>
              <button onClick={() => setCartOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded-xl">
                  <img src={item.image} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{getItemName(item)}</h4>
                    <p className="text-[#d4af37]">${item.price} x {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-[#d4af37]/20 bg-[#1a1a1a]">
              <div className="flex justify-between mb-4 text-xl">
                <span>{t('Total:', 'المجموع:', 'کۆی گشتی:')}</span>
                <span className="text-[#d4af37]">${totalPrice}</span>
              </div>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-colors"
              >
                {t('Send to WhatsApp', 'إرسال إلى واتساب', 'ناردن بۆ واتسئەپ')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
