import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import { createAppTheme } from '../theme';

interface LanguageContextType {
  language: 'en' | 'he';
  setLanguage: (lang: 'en' | 'he') => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.cart': 'Cart',
    'nav.account': 'Account',
    'nav.language': 'עברית',
    
    // Hero Section
    'hero.title': 'Repeat by Oshi',
    'hero.subtitle': 'Sustainable fashion that tells your story. Every piece is crafted with love for the planet and passion for timeless style.',
    'hero.shopNow': 'Shop Now',
    'hero.learnMore': 'Learn More',
    
    // Story Section
    'storyTitle': 'Our Story',
    'storyContent': 'Born from a vision of sustainable fashion, Repeat by Oshi creates timeless pieces that honor both style and environmental responsibility. Each garment tells a story of conscious craftsmanship, ethical sourcing, and the belief that fashion can be a force for positive change.',
    
    // Sustainability
    'sustainability.title': 'Our Commitment to Sustainability',
    'sustainability.recycled.title': 'Recycled Materials',
    'sustainability.recycled.description': 'We use recycled fabrics and materials to reduce waste and environmental impact.',
    'sustainability.organic.title': 'Organic Cotton',
    'sustainability.organic.description': 'Our cotton is grown without harmful pesticides, protecting both soil and water.',
    'sustainability.carbon.title': 'Carbon Neutral',
    'sustainability.carbon.description': 'We offset our carbon footprint through verified environmental projects.',
    
    // Gallery
    'gallery.title': 'Our Collections',
    
    // Coming Soon
    'comingSoon.title': 'Coming Soon',
    'comingSoon.description': 'We\'re putting the finishing touches on our sustainable fashion collection. Be the first to know when we launch!',
    'comingSoon.newsletter.title': 'Stay Updated',
    'comingSoon.newsletter.description': 'Subscribe to our newsletter for exclusive updates and early access.',
    'comingSoon.newsletter.placeholder': 'Enter your email',
    'comingSoon.newsletter.subscribe': 'Subscribe',
    
    // Contact
    'contactTitle': 'Get in Touch',
    'contactSubtitle': 'Have questions about our sustainable fashion? We\'d love to hear from you.',
    'address': 'Address',
    'email': 'Email',
    'phone': 'Phone',
    
    // Footer
    'footer.brand.title': 'Repeat by Oshi',
    'footer.brand.description': 'Sustainable fashion for a better tomorrow.',
    'footer.links.title': 'Quick Links',
    'footer.links.home': 'Home',
    'footer.links.story': 'Our Story',
    'footer.links.sustainability': 'Sustainability',
    'footer.links.products': 'Products',
    'footer.support.title': 'Support',
    'footer.support.contact': 'Contact Us',
    'footer.support.faq': 'FAQ',
    'footer.support.shipping': 'Shipping',
    'footer.support.returns': 'Returns',
    'footer.social.title': 'Follow Us',
    
    // Products Page
    'products.title': 'Our Products',
    'products.subtitle': 'Discover our sustainable fashion collection',
    'products.comingSoon': 'Coming Soon',
    'products.description': 'Our carefully curated collection of sustainable fashion pieces will be available soon. Each item is designed with both style and environmental responsibility in mind.',
    
    // Cart Page
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDescription': 'Add some sustainable fashion pieces to your cart to get started.',
    'cart.continueShopping': 'Continue Shopping',
    
    // Account Page
    'account.title': 'My Account',
    'account.comingSoon': 'Account features coming soon',
    'account.description': 'Manage your orders, preferences, and sustainable fashion journey.',
  },
  he: {
    // Navigation
    'nav.home': 'בית',
    'nav.products': 'מוצרים',
    'nav.cart': 'עגלה',
    'nav.account': 'חשבון',
    'nav.language': 'English',
    
    // Hero Section
    'hero.title': 'ריפיט ביי אושי',
    'hero.subtitle': 'אופנה בת קיימא שמספרת את הסיפור שלך. כל פריט נוצר באהבה לכדור הארץ ותשוקה לסטייל נצחי.',
    'hero.shopNow': 'קנו עכשיו',
    'hero.learnMore': 'למדו עוד',
    
    // Story Section
    'storyTitle': 'הסיפור שלנו',
    'storyContent': 'נולד מחזון של אופנה בת קיימא, ריפיט ביי אושי יוצר פריטים נצחיים המכבדים גם סטייל וגם אחריות סביבתית. כל בגד מספר סיפור של אומנות מודעת, מיקור אתי והאמונה שאופנה יכולה להיות כוח לשינוי חיובי.',
    
    // Sustainability
    'sustainability.title': 'המחויבות שלנו לקיימות',
    'sustainability.recycled.title': 'חומרים ממוחזרים',
    'sustainability.recycled.description': 'אנו משתמשים בבדים וחומרים ממוחזרים כדי להפחית פסולת והשפעה סביבתית.',
    'sustainability.organic.title': 'כותנה אורגנית',
    'sustainability.organic.description': 'הכותנה שלנו גדלה ללא חומרי הדברה מזיקים, מגינה על הקרקע והמים.',
    'sustainability.carbon.title': 'ניטרלי פחמן',
    'sustainability.carbon.description': 'אנו מקזזים את טביעת הרגל הפחמנית שלנו באמצעות פרויקטים סביבתיים מאומתים.',
    
    // Gallery
    'gallery.title': 'הקולקציות שלנו',
    
    // Coming Soon
    'comingSoon.title': 'בקרוב',
    'comingSoon.description': 'אנחנו שמים את הגימורים האחרונים על קולקציית האופנה הבת קיימא שלנו. היו הראשונים לדעת כשנשיק!',
    'comingSoon.newsletter.title': 'הישארו מעודכנים',
    'comingSoon.newsletter.description': 'הירשמו לניוזלטר שלנו לעדכונים בלעדיים וגישה מוקדמת.',
    'comingSoon.newsletter.placeholder': 'הכניסו את האימייל שלכם',
    'comingSoon.newsletter.subscribe': 'הירשמו',
    
    // Contact
    'contactTitle': 'צרו קשר',
    'contactSubtitle': 'יש לכם שאלות על האופנה הבת קיימא שלנו? נשמח לשמוע מכם.',
    'address': 'כתובת',
    'email': 'אימייל',
    'phone': 'טלפון',
    
    // Footer
    'footer.brand.title': 'ריפיט ביי אושי',
    'footer.brand.description': 'אופנה בת קיימא למחר טוב יותר.',
    'footer.links.title': 'קישורים מהירים',
    'footer.links.home': 'בית',
    'footer.links.story': 'הסיפור שלנו',
    'footer.links.sustainability': 'קיימות',
    'footer.links.products': 'מוצרים',
    'footer.support.title': 'תמיכה',
    'footer.support.contact': 'צרו קשר',
    'footer.support.faq': 'שאלות נפוצות',
    'footer.support.shipping': 'משלוחים',
    'footer.support.returns': 'החזרות',
    'footer.social.title': 'עקבו אחרינו',
    
    // Products Page
    'products.title': 'המוצרים שלנו',
    'products.subtitle': 'גלו את קולקציית האופנה הבת קיימא שלנו',
    'products.comingSoon': 'בקרוב',
    'products.description': 'הקולקציה הנבחרת בקפידה שלנו של פריטי אופנה בת קיימא תהיה זמינה בקרוב. כל פריט מעוצב עם סטייל ואחריות סביבתית.',
    
    // Cart Page
    'cart.title': 'עגלת קניות',
    'cart.empty': 'העגלה שלכם ריקה',
    'cart.emptyDescription': 'הוסיפו כמה פריטי אופנה בת קיימא לעגלה כדי להתחיל.',
    'cart.continueShopping': 'המשיכו לקנות',
    
    // Account Page
    'account.title': 'החשבון שלי',
    'account.comingSoon': 'תכונות החשבון בקרוב',
    'account.description': 'נהלו את ההזמנות, ההעדפות והמסע של האופנה הבת קיימא שלכם.',
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  isRTL: false
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'he'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'he';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === 'he';
  const theme = createAppTheme(isRTL ? 'rtl' : 'ltr');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </LanguageContext.Provider>
  );
};