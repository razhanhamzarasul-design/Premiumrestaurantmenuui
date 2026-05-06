import { useState } from 'react';
import { Search, ShoppingCart, Plus, Languages } from 'lucide-react';

interface MenuItem {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
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
    descriptionEn: 'Artfully arranged selection of Mediterranean appetizers',
    descriptionAr: 'تشكيلة منسقة من المقبلات المتوسطية',
    price: 28,
    image: 'https://images.unsplash.com/photo-1763376385238-ba0211a17505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'starters'
  },
  {
    id: '2',
    nameEn: 'Truffle Cheese Balls',
    nameAr: 'كرات الجبن بالكمأة',
    descriptionEn: 'Golden fried cheese with black truffle and herbs',
    descriptionAr: 'جبن مقلي ذهبي مع الكمأة السوداء والأعشاب',
    price: 24,
    image: 'https://images.unsplash.com/photo-1772795598475-ac6071eb789b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'starters'
  },
  {
    id: '3',
    nameEn: 'Burrata Salad',
    nameAr: 'سلطة البوراتا',
    descriptionEn: 'Fresh burrata with heirloom tomatoes and basil',
    descriptionAr: 'بوراتا طازجة مع الطماطم والريحان',
    price: 22,
    image: 'https://images.unsplash.com/photo-1664988935525-e7e0e5e375e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'starters'
  },
  {
    id: '4',
    nameEn: 'Wagyu Beef Burger',
    nameAr: 'برجر لحم الواغيو',
    descriptionEn: 'Premium wagyu patty with truffle aioli and aged cheddar',
    descriptionAr: 'لحم واغيو فاخر مع صوص الكمأة والجبن العتيق',
    price: 48,
    image: 'https://images.unsplash.com/photo-1583065756216-334ab22b5a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'mains'
  },
  {
    id: '5',
    nameEn: 'Pan-Seared Salmon',
    nameAr: 'سلمون محمر',
    descriptionEn: 'Wild-caught salmon with seasonal vegetables and lemon butter',
    descriptionAr: 'سلمون طازج مع خضار موسمية وزبدة الليمون',
    price: 52,
    image: 'https://images.unsplash.com/photo-1676300185165-3f543c1fcb72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'mains'
  },
  {
    id: '6',
    nameEn: 'Ribeye Steak',
    nameAr: 'ستيك ريب آي',
    descriptionEn: 'Prime dry-aged ribeye with roasted garlic and herb butter',
    descriptionAr: 'ستيك لحم عالي الجودة مع ثوم محمص وزبدة الأعشاب',
    price: 68,
    image: 'https://images.unsplash.com/photo-1676300184021-96fa00e1a987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'mains'
  },
  {
    id: '7',
    nameEn: 'Strawberry Pavlova',
    nameAr: 'بافلوفا الفراولة',
    descriptionEn: 'Light meringue with fresh strawberries and cream',
    descriptionAr: 'مرينغ خفيف مع فراولة طازجة وكريمة',
    price: 18,
    image: 'https://images.unsplash.com/photo-1757961048258-00c5ece18c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'desserts'
  },
  {
    id: '8',
    nameEn: 'Chocolate Opera Cake',
    nameAr: 'كيك الأوبرا بالشوكولاتة',
    descriptionEn: 'Layered chocolate sponge with coffee buttercream',
    descriptionAr: 'طبقات من الشوكولاتة مع كريمة القهوة',
    price: 22,
    image: 'https://images.unsplash.com/photo-1652232658129-61170b992377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'desserts'
  },
  {
    id: '9',
    nameEn: 'Matcha Mojito',
    nameAr: 'موهيتو الماتشا',
    descriptionEn: 'Refreshing blend of matcha, mint, and lime',
    descriptionAr: 'مزيج منعش من الماتشا والنعناع والليمون',
    price: 14,
    image: 'https://images.unsplash.com/photo-1668431456502-a96f8619fd66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'drinks'
  },
  {
    id: '10',
    nameEn: 'Rose Sunset',
    nameAr: 'غروب الورد',
    descriptionEn: 'Pink grapefruit with rose water and sparkling wine',
    descriptionAr: 'جريب فروت وردي مع ماء الورد والنبيذ الفوار',
    price: 16,
    image: 'https://images.unsplash.com/photo-1761315631350-bef87d35bda0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    category: 'drinks'
  }
];

const categories = [
  { id: 'all', nameEn: 'All', nameAr: 'الكل' },
  { id: 'starters', nameEn: 'Starters', nameAr: 'المقبلات' },
  { id: 'mains', nameEn: 'Main Course', nameAr: 'الطبق الرئيسي' },
  { id: 'desserts', nameEn: 'Desserts', nameAr: 'الحلويات' },
  { id: 'drinks', nameEn: 'Drinks', nameAr: 'المشروبات' }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isRTL, setIsRTL] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Sticky Top Navigation */}
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
            <div className="text-[10px] text-gray-500 tracking-widest">FINE DINING</div>
          </div>

          <button
            onClick={() => setIsRTL(!isRTL)}
            className="p-2 hover:bg-[#d4af37]/10 rounded-lg transition-colors"
          >
            <Languages className="w-5 h-5 text-[#d4af37]" />
          </button>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="px-4 pb-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder={isRTL ? 'البحث في القائمة...' : 'Search menu...'}
              className="w-full bg-[#1a1a1a] border border-[#d4af37]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]/50 transition-colors"
            />
          </div>
        )}
      </header>

      {/* Horizontal Scrollable Categories */}
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
                {isRTL ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        <div className="space-y-4">
          {filteredMenu.map(item => (
            <div
              key={item.id}
              className="group bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#d4af37]/5"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={isRTL ? item.nameAr : item.nameEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">
                      {isRTL ? item.nameAr : item.nameEn}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {isRTL ? item.descriptionAr : item.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl text-[#d4af37]">${item.price}</span>
                    <span className="text-xs text-gray-500">USD</span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#f4bf47] text-black px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all duration-300 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">{isRTL ? 'إضافة' : 'Add'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button className="fixed bottom-6 right-6 bg-gradient-to-r from-[#d4af37] to-[#f4bf47] text-black p-4 rounded-full shadow-2xl shadow-[#d4af37]/40 hover:scale-110 transition-transform duration-300 z-50">
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-black text-[#d4af37] text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
        </button>
      )}
    </div>
  );
}