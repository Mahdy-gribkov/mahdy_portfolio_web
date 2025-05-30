import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone, Download, Globe, Menu, X, Star, Quote, ArrowRight, ArrowUpCircle, Code, CheckCircle, ExternalLink, Send, Sun, Moon } from 'lucide-react';

const translations = {
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', testimonials: 'Testimonials', contact: 'Contact' },
    hero: { name: 'Mahdy Gribkov', title: 'Full Stack Developer', bio: 'A results-driven and multilingual Full Stack Developer with a strong passion for crafting elegant, high-performance web applications. I specialize in leveraging modern JavaScript frameworks and back-end technologies to build scalable, user-centric solutions. My approach blends technical expertise with creative problem-solving, aiming to bridge the gap between innovative ideas and tangible, impactful products.', cta: 'Explore My Work' },
    about: { title: 'About Me', greeting: "Hello! I'm Mahdy.", bio_p1: "As a Full Stack Developer, I thrive on the challenge of bringing complex digital experiences to life. My journey in tech is fueled by a relentless curiosity and a commitment to continuous learning. I possess strong front-end skills in HTML, CSS, JavaScript, TypeScript, and frameworks like React, complemented by robust back-end proficiency in Node.js and database management with MongoDB.", bio_p2: "My multilingual abilities (English, Arabic, Russian, Hebrew) enhance my collaboration in diverse, global teams, allowing me to bridge communication gaps and foster more inclusive development environments. I'm always eager to take on new challenges and contribute to projects that push the boundaries of technology.", download_cv: 'Download CV' },
    skills: { title: 'Skills', categories: { frontend: 'Frontend', backend: 'Backend', databases: 'Databases', tools: 'Tools', languages: 'Languages' },
      frontend_list: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
      backend_list: ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication (JWT)', 'WebSockets'],
      databases_list: ['MongoDB', 'SQL (PostgreSQL, MySQL)', 'Mongoose'],
      tools_list: ['Git', 'GitHub', 'VS Code', 'Webpack', 'Figma (Basic)', 'ESLint', 'NPM/Yarn'],
      languages_list: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Bash']
    },
    projects: { title: 'My Projects', view_project: 'View Project', view_code: 'View Code' },
    testimonials: { title: 'Testimonials', cta: 'Leave a Testimonial' },
    contact: { title: 'Contact Me', description: 'Have a question or want to work together? Feel free to reach out!', name_label: 'Your Name', email_label: 'Your Email', message_label: 'Your Message', send_message: 'Send Message', success: 'Message sent successfully!', error: 'Failed to send message. Please try again later.', email_info: 'Email us directly at', phone_info: 'Call us at' },
    footer: { copyright: `© ${new Date().getFullYear()} Mahdy Gribkov. All rights reserved.` }
  },
  ru: {
    nav: { home: 'Главная', about: 'Обо мне', projects: 'Проекты', skills: 'Навыки', testimonials: 'Отзывы', contact: 'Контакты' },
    hero: { name: 'Махди Грибков', title: 'Full Stack Разработчик', bio: 'Целеустремленный и многоязычный Full Stack разработчик с сильной страстью к созданию элегантных, высокопроизводительных веб-приложений. Я специализируюсь на использовании современных JavaScript фреймворков и бэкэнд-технологий для создания масштабируемых, ориентированных на пользователя решений. Мой подход сочетает техническую экспертизу с творческим решением проблем, направленный на преодоление разрыва между инновационными идеями и ощутимыми, значимыми продуктами.', cta: 'Посмотреть мои работы' },
    about: { title: 'Обо мне', greeting: "Привет! Я Махди.", bio_p1: "Как Full Stack разработчик, я преуспеваю в решении задач по воплощению сложных цифровых проектов в жизнь. Мой путь в сфере технологий подпитывается неутомимым любопытством и приверженностью непрерывному обучению. Я обладаю сильными навыками во фронтенде: HTML, CSS, JavaScript, TypeScript, и фреймворками, такими как React, что дополняется глубокими знаниями бэкэнда в Node.js и управлении базами данных с MongoDB.", bio_p2: "Мои многоязычные способности (английский, арабский, русский, иврит) улучшают мое сотрудничество в разнообразных, глобальных командах, позволяя мне преодолевать коммуникационные барьеры и способствовать созданию более инклюзивных сред разработки. Я всегда готов браться за новые задачи и участвовать в проектах, которые расширяют границы технологий.", download_cv: 'Скачать резюме' },
    skills: { title: 'Навыки', categories: { frontend: 'Фронтенд', backend: 'Бэкэнд', databases: 'Базы данных', tools: 'Инструменты', languages: 'Языки' },
      frontend_list: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
      backend_list: ['Node.js', 'Express.js', 'RESTful APIs', 'Аутентификация (JWT)', 'WebSockets'],
      databases_list: ['MongoDB', 'SQL (PostgreSQL, MySQL)', 'Mongoose'],
      tools_list: ['Git', 'GitHub', 'VS Code', 'Webpack', 'Figma (Базовый)', 'ESLint', 'NPM/Yarn'],
      languages_list: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Bash']
    },
    projects: { title: 'Мои проекты', view_project: 'Посмотреть проект', view_code: 'Посмотреть код' },
    testimonials: { title: 'Отзывы', cta: 'Оставить отзыв' },
    contact: { title: 'Свяжитесь со мной', description: 'Есть вопрос или хотите сотрудничать? Не стесняйтесь обращаться!', name_label: 'Ваше имя', email_label: 'Ваш email', message_label: 'Ваше сообщение', send_message: 'Отправить сообщение', success: 'Сообщение успешно отправлено!', error: 'Не удалось отправить сообщение. Пожалуйста, попробуйте позже.', email_info: 'Напишите нам напрямую на', phone_info: 'Позвоните нам по номеру' },
    footer: { copyright: `© ${new Date().getFullYear()} Махди Грибков. Все права защищены.` }
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'عني', projects: 'المشاريع', skills: 'المهارات', testimonials: 'الشهادات', contact: 'اتصل بي' },
    hero: { name: 'مهدي غريبكوف', title: 'مطور Full Stack', bio: 'مطور Full Stack طموح ومتعدد اللغات وشغوف ببناء تطبيقات ويب أنيقة وعالية الأداء. أنا متخصص في الاستفادة من أطر عمل JavaScript الحديثة وتقنيات الواجهة الخلفية لبناء حلول قابلة للتطوير وموجهة نحو المستخدم. يمزج نهجي بين الخبرة التقنية وحل المشكلات الإبداعي، بهدف سد الفجوة بين الأفكار المبتكرة والمنتجات الملموسة والمؤثرة.', cta: 'استكشف أعمالي' },
    about: { title: 'عني', greeting: "مرحباً! أنا مهدي.", bio_p1: "كمطور Full Stack، أستمتع بتحدي إحياء التجارب الرقمية المعقدة. رحلتي في التكنولوجيا مدفوعة بفضول لا يتوقف والتزام بالتعلم المستمر. أمتلك مهارات قوية في الواجهة الأمامية في HTML وCSS وJavaScript وTypeScript وأطر عمل مثل React، تكملها كفاءة قوية في الواجهة الخلفية في Node.js وإدارة قواعد البيانات باستخدام MongoDB.", bio_p2: "تعزز قدراتي متعددة اللغات (الإنجليزية، العربية، الروسية، العبرية) تعاوني في الفرق المتنوعة والعالمية، مما يسمح لي بسد فجوات التواصل وتعزيز بيئات تطوير أكثر شمولاً. أنا حريص دائمًا على مواجهة تحديات جديدة والمساهمة في المشاريع التي تتجاوز حدود التكنولوجيا.", download_cv: 'تنزيل السيرة الذاتية' },
    skills: { title: 'المهارات', categories: { frontend: 'الواجهة الأمامية', backend: 'الواجهة الخلفية', databases: 'قواعد البيانات', tools: 'الأدوات', languages: 'اللغات' },
      frontend_list: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
      backend_list: ['Node.js', 'Express.js', 'RESTful APIs', 'المصادقة (JWT)', 'WebSockets'],
      databases_list: ['MongoDB', 'SQL (PostgreSQL, MySQL)', 'Mongoose'],
      tools_list: ['Git', 'GitHub', 'VS Code', 'Webpack', 'Figma (أساسي)', 'ESLint', 'NPM/Yarn'],
      languages_list: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Bash']
    },
    projects: { title: 'مشاريعي', view_project: 'عرض المشروع', view_code: 'عرض الكود' },
    testimonials: { title: 'الشهادات', cta: 'أضف شهادتك' },
    contact: { title: 'اتصل بي', description: 'هل لديك سؤال أو ترغب في العمل معًا؟ لا تتردد في التواصل!', name_label: 'اسمك', email_label: 'بريدك الإلكتروني', message_label: 'رسالتك', send_message: 'إرسال الرسالة', success: 'تم إرسال الرسالة بنجاح!', error: 'فشل إرسال الرسالة. الرجاء المحاولة مرة أخرى لاحقًا.', email_info: 'راسلنا مباشرة على', phone_info: 'اتصل بنا على' },
    footer: { copyright: `© ${new Date().getFullYear()} مهدي غريبكوف. جميع الحقوق محفوظة.` }
  },
  he: {
    nav: { home: 'בית', about: 'אודות', projects: 'פרויקטים', skills: 'כישורים', testimonials: 'המלצות', contact: 'צור קשר' },
    hero: { name: 'מהדי גריבקוב', title: 'מפתח Full Stack', bio: 'מפתח Full Stack ממוקד תוצאות ורב לשוני עם תשוקה עזה ליצירת יישומי אינטרנט אלגנטיים ובעלי ביצועים גבוהים. אני מתמחה במינוף פרימוורקי JavaScript מודרניים וטכנולוגיות צד שרת לבניית פתרונות סקלביליים וממוקדי משתמש. הגישה שלי משלבת מומחיות טכנית עם פתרון בעיות יצירתי, במטרה לגשר על הפער בין רעיונות חדשניים למוצרים מוחשיים ובעלי השפעה.', cta: 'צפה בעבודות שלי' },
    about: { title: 'אודותיי', greeting: "שלום! אני מהדי.", bio_p1: "כמפתח Full Stack, אני משגשג באתגר של הבאת חוויות דיגיטליות מורכבות לחיים. המסע שלי בטכנולוגיה מונע על ידי סקרנות בלתי פוסקת ומחויבות ללמידה מתמדת. אני בעל כישורי פרונט-אנד חזקים ב-HTML, CSS, JavaScript, TypeScript, ופרימוורקים כמו React, המשלימים על ידי מומחיות חזקה בצד השרת ב-Node.js וניהול מסדי נתונים עם MongoDB.", bio_p2: "היכולות הרב-לשוניות שלי (אנגלית, ערבית, רוסית, עברית) משפרות את שיתוף הפעולה שלי בצוותים מגוונים וגלובליים, ומאפשרות לי לגשר על פערי תקשורת ולקדם סביבות פיתוח כוללניות יותר. אני תמיד נלהב לקחת על עצמי אתגרים חדשים ולתרום לפרויקטים שפורצים את גבולות הטכנולוגיה.", download_cv: 'הורד קורות חיים' },
    skills: { title: 'כישורים', categories: { frontend: 'פרונט-אנד', backend: 'בק-אנד', databases: 'מסדי נתונים', tools: 'כלים', languages: 'שפות' },
      frontend_list: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
      backend_list: ['Node.js', 'Express.js', 'RESTful APIs', 'אימות (JWT)', 'WebSockets'],
      databases_list: ['MongoDB', 'SQL (PostgreSQL, MySQL)', 'Mongoose'],
      tools_list: ['Git', 'GitHub', 'VS Code', 'Webpack', 'Figma (בסיסי)', 'ESLint', 'NPM/Yarn'],
      languages_list: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Bash']
    },
    projects: { title: 'הפרויקטים שלי', view_project: 'צפה בפרויקט', view_code: 'צפה בקוד' },
    testimonials: { title: 'המלצות', cta: 'השאר המלצה' },
    contact: { title: 'צור קשר', description: 'יש לך שאלה או שאתה רוצה לעבוד יחד? אל תהסס לפנות!', name_label: 'השם שלך', email_label: 'האימייל שלך', message_label: 'ההודעה שלך', send_message: 'שלח הודעה', success: 'ההודעה נשלחה בהצלחה!', error: 'שליחת ההודעה נכשלה. אנא נסה שוב מאוחר יותר.', email_info: 'שלח לנו מייל ישירות לכתובת', phone_info: 'התקשר אלינו למספר' },
    footer: { copyright: `© ${new Date().getFullYear()} מהדי גריבקוב. כל הזכויות שמורות.` }
  }
};

const projectsData = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: {
      en: 'A full-stack e-commerce solution with user authentication, product management, shopping cart functionality, and secure payment integration. Built with React, Node.js, Express, and MongoDB.',
      ru: 'Полнофункциональное решение для электронной коммерции с аутентификацией пользователей, управлением товарами, корзиной покупок и безопасной интеграцией платежей. Создано с использованием React, Node.js, Express и MongoDB.',
      ar: 'حل تجارة إلكترونية متكامل مع مصادقة المستخدم، وإدارة المنتجات، ووظيفة سلة التسوق، وتكامل دفع آمن. مبني باستخدام React وNode.js وExpress وMongoDB.',
      he: 'פתרון מסחר אלקטרוני Full Stack עם אימות משתמשים, ניהול מוצרים, פונקציונליות עגלת קניות ושילוב תשלומים מאובטח. נבנה עם React, Node.js, Express ו-MongoDB.',
    },
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe'],
    imageUrl: 'https://via.placeholder.com/600x400/16213e/e0e0e0?text=E-commerce+Platform',
    projectUrl: '#',
    codeUrl: '#',
  },
  {
    id: 2,
    name: 'Real-time Chat Application',
    description: {
      en: 'A real-time chat application featuring user registration, persistent messaging, and online status indicators. Utilizes WebSockets for instant communication.',
      ru: 'Приложение для обмена сообщениями в реальном времени с регистрацией пользователей, постоянными сообщениями и индикаторами онлайн-статуса. Использует WebSockets для мгновенной связи.',
      ar: 'تطبيق دردشة في الوقت الفعلي يتميز بتسجيل المستخدمين، والرسائل المستمرة، ومؤشرات الحالة عبر الإنترنت. يستخدم WebSockets للاتصال الفوري.',
      he: 'אפליקציית צ\'אט בזמן אמת הכוללת רישום משתמשים, הודעות מתמשכות ומחווני סטטוס מקוון. משתמש ב-WebSockets לתקשורת מיידית.',
    },
    tags: ['React', 'Node.js', 'Socket.IO', 'Express', 'MongoDB'],
    imageUrl: 'https://via.placeholder.com/600x400/16213e/e0e0e0?text=Chat+Application',
    projectUrl: '#',
    codeUrl: '#',
  },
  {
    id: 3,
    name: 'Task Management System',
    description: {
      en: 'A robust task management system with features like task creation, assignment, progress tracking, and due date reminders. Designed for individual and team productivity.',
      ru: 'Надежная система управления задачами с функциями создания задач, назначения, отслеживания прогресса и напоминаний о сроках. Разработана для индивидуальной и командной продуктивности.',
      ar: 'نظام قوي لإدارة المهام يتميز بميزات مثل إنشاء المهام، وتعيينها، وتتبع التقدم، وتذكيرات بالمواعيد النهائية. مصمم للإنتاجية الفردية والجماعية.',
      he: 'מערכת לניהול משימות חזקה עם תכונות כמו יצירת משימות, הקצאה, מעקב התקדמות ותזכורות תאריך יעד. מיועדת לפרודוקטיביות אישית וצוותית.',
    },
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize'],
    imageUrl: 'https://via.placeholder.com/600x400/16213e/e0e0e0?text=Task+Manager',
    projectUrl: '#',
    codeUrl: '#',
  },
];

const testimonialsData = [
  {
    id: 1,
    name: 'Jane Doe',
    position: {
      en: 'CEO, Tech Solutions',
      ru: 'Генеральный директор, Tech Solutions',
      ar: 'الرئيس التنفيذي، حلول التكنولوجيا',
      he: 'מנכ"לית, Tech Solutions',
    },
    quote: {
      en: "Mahdy's expertise in full-stack development is truly impressive. He delivered an outstanding product on time and exceeded our expectations.",
      ru: 'Экспертиза Махди в Full Stack разработке действительно впечатляет. Он предоставил выдающийся продукт вовремя и превзошел наши ожидания.',
      ar: 'خبرة مهدي في تطوير Full Stack رائعة حقًا. لقد قدم منتجًا متميزًا في الوقت المحدد وتجاوز توقعاتنا.',
      he: 'המומחיות של מהדי בפיתוח Full Stack באמת מרשימה. הוא סיפק מוצר יוצא מן הכלל בזמן ועלה על הציפיות שלנו.',
    },
  },
  {
    id: 2,
    name: 'John Smith',
    position: {
      en: 'Project Manager, Innovate Corp',
      ru: 'Менеджер проектов, Innovate Corp',
      ar: 'مدير مشروع، Innovate Corp',
      he: 'מנהל פרויקטים, Innovate Corp',
    },
    quote: {
      en: "Working with Mahdy was a pleasure. His problem-solving skills and dedication to quality are second to none.",
      ru: 'Работать с Махди было одно удовольствие. Его навыки решения проблем и преданность качеству не имеют себе равных.',
      ar: 'كان العمل مع مهدي متعة. مهاراته في حل المشكلات وتفانيه في الجودة لا يعلى عليها.',
      he: 'העבודה עם מהדי הייתה תענוג. כישורי פתרון הבעיות שלו והמסירות לאיכות הם ללא תחרות.',
    },
  },
  {
    id: 3,
    name: 'Sarah Chen',
    position: {
      en: 'CTO, Global Innovations',
      ru: 'Технический директор, Global Innovations',
      ar: 'المدير الفني، Global Innovations',
      he: 'סמנכ"לית טכנולוגיות, Global Innovations',
    },
    quote: {
      en: "Mahdy is a highly skilled developer who consistently delivers high-quality code. His contributions were invaluable to our project's success.",
      ru: 'Махди — высококвалифицированный разработчик, который постоянно поставляет высококачественный код. Его вклад был бесценен для успеха нашего проекта.',
      ar: 'مهدي مطور ماهر للغاية يقدم باستمرار رمزًا عالي الجودة. كانت مساهماته لا تقدر بثمن لنجاح مشروعنا.',
      he: 'מהדי הוא מפתח מיומן ביותר שמספק באופן עקבי קוד באיכות גבוהה. תרומתו הייתה בעלת ערך רב להצלחת הפרויקט שלנו.',
    },
  },
];

// Helper function to get nested translation safely
const getTranslation = (obj, path, lang) => {
  if (!obj || typeof obj !== 'object') return '';
  const parts = path.split('.');
  let current = obj[lang]; // Start with the language-specific object

  for (let i = 0; i < parts.length; i++) {
    if (current && typeof current === 'object' && parts[i] in current) {
      current = current[parts[i]];
    } else {
      // Fallback to English if translation is missing for the current path part
      current = obj['en'];
      for (let j = 0; j <= i; j++) {
        if (current && typeof current === 'object' && parts[j] in current) {
          current = current[parts[j]];
        } else {
          return ''; // Return empty string if even English is missing
        }
      }
      break; // Stop looking for further parts in the current language
    }
  }
  return typeof current === 'string' ? current : ''; // Ensure it's a string before returning
};


const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('en'); // Default language is English
  const [t, setT] = useState(translations.en); // Initialize with English translations

  useEffect(() => {
    setT(translations[language]);
  }, [language]);

  useEffect(() => {
    document.body.classList.toggle('light-theme', !isDarkMode);
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setIsMenuOpen(false); // Close menu on language change
  };

  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          } else {
            entry.target.classList.remove('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the item is visible
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // For "Back to Top" button
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header/Navbar */}
      <header className="fixed w-full bg-background-primary bg-opacity-90 backdrop-blur-sm z-50 shadow-lg border-b border-border-color">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="#hero" className="text-2xl font-bold text-accent-primary">Mahdy.Dev</a>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#hero" className="nav-link">{t.nav.home}</a>
            <a href="#about" className="nav-link">{t.nav.about}</a>
            <a href="#projects" className="nav-link">{t.nav.projects}</a>
            <a href="#skills" className="nav-link">{t.nav.skills}</a>
            <a href="#testimonials" className="nav-link">{t.nav.testimonials}</a>
            <a href="#contact" className="nav-link">{t.nav.contact}</a>
            <button onClick={toggleDarkMode} className="p-2 rounded-full text-text-primary hover:text-accent-primary transition-colors duration-300" aria-label="Toggle dark mode">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative group">
              <button className="flex items-center text-text-primary hover:text-accent-primary transition-colors duration-300">
                <Globe size={20} className="mr-1" />
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-2 w-24 bg-background-secondary rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-accent-secondary">English</button>
                <button onClick={() => changeLanguage('ru')} className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-accent-secondary">Русский</button>
                <button onClick={() => changeLanguage('ar')} className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-accent-secondary">العربية</button>
                <button onClick={() => changeLanguage('he')} className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-accent-secondary">עברית</button>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleDarkMode} className="p-2 rounded-full text-text-primary hover:text-accent-primary transition-colors duration-300 mr-2" aria-label="Toggle dark mode">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleMenu} className="text-text-primary focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background-primary z-40 flex flex-col items-center justify-center space-y-6 pt-20">
          <a href="#hero" className="text-2xl text-text-primary hover:text-accent-primary transition-colors" onClick={toggleMenu}>{t.nav.home}</a>
          <a href="#about" className="text-2xl text-text-primary hover:text-accent-primary transition-colors" onClick={toggleMenu}>{t.nav.about}</a>
          <a href="#projects" className="text-2xl text-text-primary hover:text-accent-primary transition-colors" onClick={toggleMenu}>{t.nav.projects}</a>
          <a href="#skills" className="text-2xl text-text-primary hover:text-accent-primary transition-colors" onClick={toggleMenu}>{t.nav.skills}</a>
          <a href="#testimonials" className="text-2xl text-text-primary hover:text-accent-primary transition-colors" onClick={toggleMenu}>{t.nav.testimonials}</a>
          <a href="#contact" className="text-2xl text-text-primary hover:text-accent-primary transition-colors" onClick={toggleMenu}>{t.nav.contact}</a>
          <div className="flex space-x-4 mt-6">
            <button onClick={() => changeLanguage('en')} className="px-4 py-2 text-text-primary hover:text-accent-primary border border-accent-primary rounded-full">EN</button>
            <button onClick={() => changeLanguage('ru')} className="px-4 py-2 text-text-primary hover:text-accent-primary border border-accent-primary rounded-full">RU</button>
            <button onClick={() => changeLanguage('ar')} className="px-4 py-2 text-text-primary hover:text-accent-primary border border-accent-primary rounded-full">AR</button>
            <button onClick={() => changeLanguage('he')} className="px-4 py-2 text-text-primary hover:text-accent-primary border border-accent-primary rounded-full">HE</button>
          </div>
        </div>
      )}

      <main className="flex-grow pt-16"> {/* Add padding top to account for fixed header */}
        {/* Hero Section */}
        <section id="hero" ref={el => sectionsRef.current[0] = el} className="fade-in bg-cover bg-center flex items-center justify-center text-center px-4" style={{ backgroundImage: 'url("https://via.placeholder.com/1920x1080/0f3460/e0e0e0?text=Hero+Background")', minHeight: 'calc(100vh - 64px)' }}>
          <div className="bg-background-secondary bg-opacity-80 p-8 rounded-lg shadow-xl max-w-2xl transform transition-transform duration-500 hover:scale-105">
            <h1 className="text-5xl font-extrabold text-accent-primary mb-4 animate-fade-in-down">{t.hero.name}</h1>
            <p className="text-3xl font-light text-text-primary mb-6 animate-fade-in-up">{t.hero.title}</p>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed animate-fade-in">{t.hero.bio}</p>
            <a href="#projects" className="btn-primary animate-scale-in">{t.hero.cta}</a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={el => sectionsRef.current[1] = el} className="fade-in bg-background-primary py-16 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://via.placeholder.com/400x400/e94560/FFFFFF?text=Mahdy+Gribkov"
                alt="Mahdy Gribkov"
                className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-accent-primary shadow-lg transform transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-text-primary mb-6">{t.about.title}</h2>
              <p className="text-xl text-accent-primary font-semibold mb-4">{t.about.greeting}</p>
              <p className="text-lg text-text-secondary mb-4 leading-relaxed">{t.about.bio_p1}</p>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">{t.about.bio_p2}</p>
              <a href="/path/to/your/cv.pdf" download className="btn-secondary">
                <Download size={20} className="inline-block mr-2" /> {t.about.download_cv}
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={el => sectionsRef.current[2] = el} className="fade-in bg-background-secondary py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-text-primary mb-12">{t.skills.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {Object.keys(t.skills.categories).map((categoryKey) => (
                <div key={categoryKey} className="card p-6 border border-border-color transform transition-transform duration-300 hover:scale-105">
                  <h3 className="text-2xl font-semibold text-accent-primary mb-4 flex items-center justify-center">
                    <Code size={24} className="mr-2" />
                    {getTranslation(translations, `skills.categories.${categoryKey}`, language)}
                  </h3>
                  <ul className="text-left space-y-2 text-text-secondary">
                    {t.skills[`${categoryKey}_list`] && t.skills[`${categoryKey}_list`].map((skill, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle size={18} className="text-green-500 mr-2" /> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={el => sectionsRef.current[3] = el} className="fade-in bg-background-primary py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-text-primary mb-12">{t.projects.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projectsData.map((project) => (
                <div key={project.id} className="card bg-background-secondary rounded-lg overflow-hidden border border-border-color">
                  <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-text-primary mb-3">{project.name}</h3>
                    <p className="text-text-secondary mb-4 min-h-[72px]">{project.description[language] || project.description.en}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="bg-accent-secondary text-white text-xs font-mono px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-around">
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center text-sm">
                        <ExternalLink size={18} className="mr-2" /> {t.projects.view_project}
                      </a>
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center text-sm">
                        <Github size={18} className="mr-2" /> {t.projects.view_code}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" ref={el => sectionsRef.current[4] = el} className="fade-in bg-background-secondary py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-text-primary mb-12">{t.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="card bg-background-primary p-8 border border-border-color">
                  <Quote size={36} className="text-accent-primary mb-4 mx-auto" />
                  <p className="text-text-secondary italic mb-6">"{testimonial.quote[language] || testimonial.quote.en}"</p>
                  <p className="font-semibold text-text-primary text-lg">{testimonial.name}</p>
                  <p className="text-text-secondary text-sm">{testimonial.position[language] || testimonial.position.en}</p>
                </div>
              ))}
            </div>
            <a href="mailto:mahdy.gribkov.dev@gmail.com" className="btn-primary mt-12 inline-flex items-center">
              <Send size={20} className="mr-2" /> {t.testimonials.cta}
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={el => sectionsRef.current[5] = el} className="fade-in bg-background-primary py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-text-primary mb-6">{t.contact.title}</h2>
            <p className="text-lg text-text-secondary mb-10">{t.contact.description}</p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background-secondary p-8 rounded-lg shadow-lg border border-border-color">
              <div className="md:col-span-1 text-left">
                <label htmlFor="name" className="block text-text-primary text-sm font-semibold mb-2">{t.contact.name_label}</label>
                <input type="text" id="name" name="name" className="w-full p-3 rounded-md border border-border-color bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary" />
              </div>
              <div className="md:col-span-1 text-left">
                <label htmlFor="email" className="block text-text-primary text-sm font-semibold mb-2">{t.contact.email_label}</label>
                <input type="email" id="email" name="email" className="w-full p-3 rounded-md border border-border-color bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary" />
              </div>
              <div className="md:col-span-2 text-left">
                <label htmlFor="message" className="block text-text-primary text-sm font-semibold mb-2">{t.contact.message_label}</label>
                <textarea id="message" name="message" rows="5" className="w-full p-3 rounded-md border border-border-color bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"></textarea>
              </div>
              <div className="md:col-span-2 flex justify-center">
                <button type="submit" className="btn-primary inline-flex items-center">
                  <Send size={20} className="mr-2" /> {t.contact.send_message}
                </button>
              </div>
            </form>
            <div className="mt-10 text-lg text-text-secondary">
              <p className="mb-2 flex items-center justify-center">
                <Mail size={20} className="mr-2 text-accent-primary" /> {t.contact.email_info}:
                <a href="mailto:mahdy.gribkov.dev@gmail.com" className="ml-2 text-accent-primary hover:underline">mahdy.gribkov.dev@gmail.com</a>
              </p>
              <p className="flex items-center justify-center">
                <Phone size={20} className="mr-2 text-accent-primary" /> {t.contact.phone_info}:
                <a href="tel:+972532322318" className="ml-2 text-accent-primary hover:underline">+972 53 232 2318</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-secondary py-8 text-center border-t border-[var(--border-color)]" role="contentinfo" data-section="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="mailto:mahdy.gribkov.dev@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label="Email"><Mail size={22} /></a>
            <a href="https://github.com/Mahdy-gribkov" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label="GitHub"><Github size={22} /></a>
            <a href="https://www.linkedin.com/in/mahdy-gribkov-ba2707368" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label="LinkedIn"><Linkedin size={22} /></a>
            <a href="https://wa.me/972532322318" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label="WhatsApp"><Phone size={22} /></a>
          </div>
          <p className="text-sm text-[var(--text-secondary)] font-mono tracking-wide">{t.footer.copyright}</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-accent-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 transition-opacity duration-300 z-50"
          aria-label="Back to top"
        >
          <ArrowUpCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default Portfolio;