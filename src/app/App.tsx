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
    message += t(`*Total Amount: $${totalPrice}*`,
