import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone, Download, Globe, Menu, X, Star, Quote, ArrowRight, ArrowUpCircle, Code, CheckCircle, ExternalLink, Send, Sun, Moon } from 'lucide-react';  // Added ArrowUpCircle, Sun, Moon

const translations = {
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', testimonials: 'Testimonials', contact: 'Contact' },
    hero: { name: 'Mahdy Gribkov', title: 'Full Stack Developer', bio: 'A results-driven and multilingual Full Stack Developer with a strong passion for crafting elegant, high-performance web applications. I specialize in leveraging modern JavaScript frameworks and back-end technologies to build scalable, user-centric solutions. My approach blends technical expertise with creative problem-solving, aiming to bridge the gap between innovative ideas and tangible, impactful products.', cta: 'Explore My Work' },
    about: { title: 'About Me', greeting: "Hello! I'm Mahdy.", bio_p1: 'As a Full Stack Developer, I thrive on the challenge of bringing complex digital experiences to life. My journey in tech is fueled by a relentless curiosity and a commitment to continuous learning. I possess strong front-end skills in HTML, CSS, JavaScript, TypeScript, and frameworks like React, complemented by robust back-end proficiency in Node.js and database management with MongoDB.', bio_p2: 'My multilingual abilities (English, Arabic, Russian, Hebrew) enhance my collaboration in diverse, global teams. I am adept at translating business requirements into technical specifications and delivering projects that not only meet but exceed expectations. My work approach is rooted in agile methodologies, emphasizing clean code, thorough testing, and open communication.', motivation: "My motivation stems from the desire to create meaningful technology that solves real-world problems and provides exceptional user experiences. I'm always excited to tackle new challenges and contribute to innovative projects.", soft_skills_title: 'Key Strengths', soft_skills: ['Problem Solving', 'Adaptability', 'Team Collaboration', 'Effective Communication', 'Attention to Detail', 'Customer Service Focus'] },
    projects: { title: 'Featured Projects', subtitle: 'A selection of my recent work. More on GitHub.', viewCode: 'View Code', liveDemo: 'Live Demo' },
    skills: { title: 'Technical Skills', subtitle: 'My core competencies and technologies I excel in.' },
    trust: { title: 'Technologies & Platforms I Trust' },
    testimonials: { 
      title: 'What Collaborators Say', 
      angel_rattner: {
        quote: 'I’ve known Mahdy for quite some time, and if I had to sum him up in one phrase, it would be “a true jack of all trades.” He’s someone who picks things up quickly, connects the dots across different areas, and always finds a way to add value — whether it’s with his frontend development skills, sharp business instincts, or natural ease with people. He has a real talent for customer service, always knowing how to communicate clearly and make people feel heard. At the same time, he sees beyond the immediate task and thinks strategically, often spotting opportunities others might miss. Smart, versatile, and people-oriented. He’s someone you want in your corner.',
        author: 'Angel Rattner',
        role: 'Software Developer',
        context: 'Angel managed Mahdy directly'
      }
    },
    cta: { title: "Let's Connect", subtitle: "Interested in working together or discussing how my skills can benefit your team? I'm always open to new opportunities and challenges.", button: 'Reach Out to Me' },  // Changed CTA button text
    contact: { title: 'Get In Touch', subtitle: 'Have a question, a project idea, or just want to connect? Feel free to reach out!', form: { name: 'Full Name', email: 'Email Address', message: 'Your Message', submit: 'Send Message', success: "Message sent successfully! I'll get back to you soon.", error: 'Failed to send message. Please try again or use a direct contact method.' }, direct_title: 'Direct Contact Channels', resume_title: 'My Resume', resume_cta: 'Download CV' },
    footer: { copyright: '© 2024 Mahdy Gribkov. Crafted with passion and code.' },
    notFound: { title: '404 - Page Not Found', message: "Oops! The page you're looking for doesn't seem to exist.", goHome: 'Go to Homepage' },
    themeToggle: { light: 'Light Mode', dark: 'Dark Mode' }
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'نبذة عني', projects: 'المشاريع', skills: 'المهارات', testimonials: 'التوصيات', contact: 'اتصل بي' },
    hero: { name: 'مهدي جريبكوف', title: 'مطور ويب متكامل', bio: 'مطور ويب متكامل متعدد اللغات، أسعى لتحقيق النتائج بشغف كبير لإنشاء تطبيقات ويب أنيقة وعالية الأداء. متخصص في استخدام أطر عمل JavaScript الحديثة وتقنيات الواجهة الخلفية لبناء حلول قابلة للتطوير وموجهة نحو المستخدم. منهجي يجمع بين الخبرة التقنية وحل المشكلات الإبداعي، بهدف سد الفجوة بين الأفكار المبتكرة والمنتجات الملموسة والمؤثرة.', cta: 'استكشف أعمالي' },
    about: { title: 'نبذة عني', greeting: 'مرحباً! أنا مهدي.', bio_p1: 'كمطور ويب متكامل، أزدهر في مواجهة تحدي تحويل التجارب الرقمية المعقدة إلى واقع. رحلتي في مجال التكنولوجيا تغذيها فضول لا يكل والتزام بالتعلم المستمر. أمتلك مهارات قوية في تطوير الواجهة الأمامية باستخدام HTML، CSS، JavaScript، TypeScript، وأطر عمل مثل React، بالإضافة إلى كفاءة قوية في الواجهة الخلفية باستخدام Node.js وإدارة قواعد البيانات مثل MongoDB.', bio_p2: 'قدراتي متعددة اللغات (الإنجليزية، العربية، الروسية، العبرية) تعزز تعاوني في فرق عالمية متنوعة. أنا بارع في ترجمة متطلبات العمل إلى مواصفات تقنية وتقديم مشاريع لا تلبي التوقعات فحسب، بل تتجاوزها. يعتمد نهج عملي على المنهجيات الرشيقة، مع التركيز على الكود النظيف، الاختبارات الشاملة، والتواصل المفتوح.', motivation: 'ينبع حماسي من الرغبة في إنشاء تكنولوجيا ذات معنى تحل مشاكل العالم الحقيقي وتقدم تجارب مستخدم استثنائية. أنا دائمًا متحمس لمواجهة تحديات جديدة والمساهمة في مشاريع مبتكرة.', soft_skills_title: 'نقاط القوة الرئيسية', soft_skills: ['حل المشكلات', 'القدرة على التكيف', 'التعاون الجماعي', 'التواصل الفعال', 'الاهتمام بالتفاصيل', 'التركيز على خدمة العملاء'] },
    testimonials: {
      title: 'ماذا يقول المتعاونون',
      angel_rattner: {
        quote: 'أعرف مهدي منذ فترة طويلة، وإذا كان علي أن ألخصه في عبارة واحدة، فستكون شخص متعدد المواهب حقًا. إنه شخص يلتقط الأشياء بسرعة، ويربط النقاط عبر مجالات مختلفة، ويجد دائمًا طريقة لإضافة قيمة - سواء كان ذلك بمهاراته في تطوير الواجهة الأمامية، أو بحدسه التجاري الحاد، أو بسهولة تعامله الطبيعية مع الناس. لديه موهبة حقيقية في خدمة العملاء، ويعرف دائمًا كيف يتواصل بوضوح ويجعل الناس يشعرون بأنهم مسموعون. في الوقت نفسه، يرى ما هو أبعد من المهمة المباشرة ويفكر بشكل استراتيجي، وغالبًا ما يكتشف الفرص التي قد يفوتها الآخرون. ذكي، متعدد الاستخدامات، وموجه نحو الناس. إنه شخص تريده في فريقك.',
        author: 'انجل راتنر',
        role: 'مطور برمجيات',
        context: 'أدار انجل مهدي مباشرة'
      }
    },
    cta: { title: 'لنتواصل', subtitle: 'هل أنت مهتم بالعمل معًا أو بمناقشة كيف يمكن لمهاراتي أن تفيد فريقك؟ أنا دائمًا منفتح على الفرص والتحديات الجديدة.', button: 'تواصل معي' },
    footer: { copyright: '© 2024 مهدي جريبكوف. صُنع بشغف وكود.' },
    notFound: { title: '404 - الصفحة غير موجودة', message: 'عفوًا! يبدو أن الصفحة التي تبحث عنها غير موجودة.', goHome: 'اذهب إلى الصفحة الرئيسية' },
    themeToggle: { light: 'الوضع الفاتح', dark: 'الوضع الداكن' }
  },
  ru: {
    nav: { home: 'Главная', about: 'Обо мне', projects: 'Проекты', skills: 'Навыки', testimonials: 'Отзывы', contact: 'Контакты' },
    hero: { name: 'Махди Грибков', title: 'Full Stack Разработчик', bio: 'Результатоориентированный и многоязычный Full Stack разработчик со страстью к созданию элегантных, высокопроизводительных веб-приложений. Специализируюсь на использовании современных JavaScript фреймворков и бэкенд-технологий для создания масштабируемых, ориентированных на пользователя решений. Мой подход сочетает техническую экспертизу с творческим решением проблем, стремясь преодолеть разрыв между инновационными идеями и ощутимыми, эффективными продуктами.', cta: 'Мои работы' },
    about: { title: 'Обо мне', greeting: 'Привет! Я Махди.', bio_p1: 'Как Full Stack разработчик, я успешно справляюсь с задачей воплощения сложных цифровых проектов. Мой путь в технологиях подпитывается неутомимым любопытством и стремлением к постоянному обучению. Обладаю сильными навыками фронтенд-разработки (HTML, CSS, JavaScript, TypeScript, React) и бэкенд-разработки (Node.js, MongoDB).', bio_p2: 'Мои многоязычные способности (английский, арабский, русский, иврит) способствуют эффективному сотрудничеству в разнообразных международных командах. Умею переводить бизнес-требования в технические спецификации и реализовывать проекты, превосходящие ожидания. Мой подход к работе основан на гибких методологиях, с акцентом на чистый код, тщательное тестирование и открытое общение.', motivation: 'Моя мотивация — создавать значимые технологии, решающие реальные проблемы и обеспечивающие исключительный пользовательский опыт. Всегда рад новым вызовам и вкладу в инновационные проекты.', soft_skills_title: 'Ключевые качества', soft_skills: ['Решение проблем', 'Адаптивность', 'Командная работа', 'Эффективная коммуникация', 'Внимание к деталям', 'Клиентоориентированность'] },
    testimonials: {
      title: 'Что говорят коллеги',
      angel_rattner: {
        quote: 'Я знаю Махди довольно давно, и если бы мне пришлось охарактеризовать его одной фразой, это было бы «настоящий мастер на все руки». Он быстро всё схватывает, связывает воедино разные области и всегда находит способ принести пользу — будь то его навыки фронтенд-разработки, острое деловое чутье или естественная легкость в общении с людьми. У него настоящий талант к обслуживанию клиентов, он всегда знает, как четко общаться и дать людям почувствовать себя услышанными. В то же время он видит дальше непосредственной задачи и мыслит стратегически, часто замечая возможности, которые другие могли бы упустить. Умный, разносторонний и ориентированный на людей. Это тот, кого вы хотите видеть в своей команде.',
        author: 'Анхель Раттнер',
        role: 'Разработчик программного обеспечения',
        context: 'Анхель непосредственно руководил Махди'
      }
    },
    cta: { title: 'Давайте на связи', subtitle: 'Заинтересованы в совместной работе или обсуждении того, как мои навыки могут принести пользу вашей команде? Я всегда открыт для новых возможностей и вызовов.', button: 'Свяжитесь со мной' },
    footer: { copyright: '© 2024 Махди Грибков. Создано с душой и кодом.' },
    notFound: { title: '404 - Страница не найдена', message: 'Ой! Кажется, страница, которую вы ищете, не существует.', goHome: 'На главную' },
    themeToggle: { light: 'Светлая тема', dark: 'Темная тема' }
  },
  he: {
    nav: { home: 'בית', about: 'אודות', projects: 'פרויקטים', skills: 'מיומנויות', testimonials: 'המלצות', contact: 'צור קשר' },
    hero: { name: 'מהדי גריבקוב', title: 'מפתח Full Stack', bio: 'מפתח Full Stack רב-לשוני מונחה תוצאות עם תשוקה עזה ליצירת יישומי אינטרנט אלגנטיים ובעלי ביצועים גבוהים. אני מתמחה במינוף מסגרות JavaScript מודרניות וטכנולוגיות צד-שרת לבניית פתרונות מדרגיים וממוקדי משתמש. הגישה שלי משלבת מומחיות טכנית עם פתרון בעיות יצירתי, במטרה לגשר על הפער בין רעיונות חדשניים למוצרים מוחשיים ומשפיעים.', cta: 'צפה בעבודותיי' },
    about: { title: 'קצת עליי', greeting: 'שלום! אני מהדי.', bio_p1: 'כמפתח Full Stack, אני נהנה מהאתגר של הפיכת חוויות דיגיטליות מורכבות למציאות. המסע שלי בטכנולוגיה מונע מסקרנות בלתי נלאית ומחויבות ללמידה מתמדת. אני בעל כישורי צד-לקוח חזקים ב-HTML, CSS, JavaScript, TypeScript ומסגרות כמו React, המשולבים עם יכולות צד-שרת מוצקות ב-Node.js וניהול מסדי נתונים עם MongoDB.', bio_p2: 'היכולות הרב-לשוניות שלי (אנגלית, ערבית, רוסית, עברית) משפרות את שיתוף הפעולה שלי בצוותים גלובליים מגוונים. אני מיומן בתרגום דרישות עסקיות למפרטים טכניים ובאספקת פרויקטים שלא רק עומדים בציפיות אלא אף עולים עליהן. גישת העבודה שלי מבוססת על מתודולוגיות אג\'יליות, עם דגש על קוד נקי, בדיקות יסודיות ותקשורת פתוחה.', motivation: 'המוטיבציה שלי נובעת מהרצון ליצור טכנולוגיה משמעותית הפותרת בעיות אמיתיות ומספקת חוויות משתמש יוצאות דופן. אני תמיד נרגש להתמודד עם אתגרים חדשים ולתרום לפרויקטים חדשניים.', soft_skills_title: 'חוזקות עיקריות', soft_skills: ['פתרון בעיות', 'יכולת הסתגלות', 'עבודת צוות', 'תקשורת אפקטיבית', 'שימת לב לפרטים', 'תודעת שירות'] },
    testimonials: {
      title: 'מה אומרים שותפים לדרך',
      angel_rattner: {
        quote: 'אני מכיר את מהדי כבר די הרבה זמן, ואם הייתי צריך לסכם אותו במשפט אחד, זה היה ג\'ק אמיתי של כל המקצועות. הוא מישהו שקולט דברים מהר, מחבר את הנקודות בין תחומים שונים, ותמיד מוצא דרך להוסיף ערך - בין אם זה עם כישורי פיתוח הפרונטאנד שלו, החוש העסקי החד שלו, או הקלות הטבעית שלו עם אנשים. יש לו כישרון אמיתי לשירות לקוחות, תמיד יודע איך לתקשר בבהירות ולגרום לאנשים להרגיש שמקשיבים להם. במקביל, הוא רואה מעבר למשימה המיידית וחושב אסטרטגית, לעתים קרובות מזהה הזדמנויות שאחרים עשויים לפספס. חכם, רב-גוני, ומכוון אנשים. הוא מישהו שאתה רוצה בצד שלך.',
        author: 'אנג\'ל רטנר',
        role: 'מפתח תוכנה',
        context: 'אנג\'ל ניהל את מהדי ישירות'
      }
    },
    cta: { title: 'בואו נתחבר', subtitle: 'מעוניינים לעבוד יחד או לדון כיצד הכישורים שלי יכולים להועיל לצוות שלכם? אני תמיד פתוח להזדמנויות ואתגרים חדשים.', button: 'פנה אליי' },
    footer: { copyright: '© 2024 מהדי גריבקוב. נוצר בתשוקה ובקוד.' },
    notFound: { title: '404 - הדף לא נמצא', message: 'אופס! נראה שהדף שאתה מחפש אינו קיים.', goHome: 'חזור לדף הבית' },
    themeToggle: { light: 'מצב בהיר', dark: 'מצב כהה' }
  }
};

const initialProjects = [
  { id: 'ecommerce-platform', name: 'E-Commerce Platform', description_en: 'A comprehensive full-stack e-commerce solution...', description_ar: 'حل تجارة إلكترونية متكامل...', description_ru: 'Комплексное full-stack решение...', description_he: 'פתרון מסחר אלקטרוני...', tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'], github: 'https://github.com/Mahdy-gribkov/ecommerce-platform', demo: '#project-ecommerce-demo' },
  { id: 'task-management-app', name: 'Task Management App', description_en: 'A collaborative task management application...', description_ar: 'تطبيق إدارة مهام تعاوني...', description_ru: 'Совместное приложение для...', description_he: 'יישום ניהול משימות שיתופי...', tech: ['TypeScript', 'React', 'Tailwind CSS'], github: 'https://github.com/Mahdy-gribkov/task-manager', demo: '#project-taskmanager-demo' },
  { id: 'weather-dashboard', name: 'Weather Dashboard', description_en: 'A responsive weather dashboard providing current weather...', description_ar: 'لوحة تحكم للطقس سريعة الاستجابة...', description_ru: 'Отзывчивая панель погоды...', description_he: 'לוח מחוונים למזג אוויר...', tech: ['JavaScript', 'React', 'OpenWeatherMap API', 'CSS Grid', 'Axios'], github: 'https://github.com/Mahdy-gribkov/weather-app', demo: '#project-weatherapp-demo' }
];

const skills = [
  'HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 
  'Node.js', 'MongoDB', 'Git & GitHub', 'Docker',
  'Tailwind CSS', 'REST APIs', 'CI/CD'
];

const trustedTech = [
  { name: 'React', icon: <Code size={28} /> }, { name: 'Node.js', icon: <Code size={28} /> },
  { name: 'MongoDB', icon: <Code size={28} /> }, { name: 'GitHub', icon: <Github size={28} /> },
  { name: 'Docker', icon: <Code size={28} /> }, { name: 'Tailwind CSS', icon: <Code size={28} /> }
];

const Helmet = ({ children }) => {
  useEffect(() => {
    const head = document.head;
    const elements = [];
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        const { type, props } = child;
        const element = document.createElement(type);
        for (const propName in props) {
          if (props.hasOwnProperty(propName) && propName !== 'children') {
            element.setAttribute(propName, props[propName]);
          }
        }
        if (props.children) {
          element.textContent = props.children;
        }
        head.appendChild(element);
        elements.push(element);
      }
    });
    return () => {
      elements.forEach(el => head.removeChild(el));
    };
  }, [children]);
  return null;
};


export default function Portfolio() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: false, message: '' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [theme, setTheme] = useState('light');  // Changed from 'dark' to 'light'

  const t = translations[currentLang];
  const isRTL = currentLang === 'ar' || currentLang === 'he';

  const sectionRefs = { home: useRef(null), about: useRef(null), projects: useRef(null), skills: useRef(null), testimonials: useRef(null), contact: useRef(null) };

  useEffect(() => {  // Scroll & Back-to-Top Logic
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
      // Active section highlighting logic
      let current = 'home';
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        const section = ref.current;
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - window.innerHeight / 2.5) {  // Adjusted offset
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();  // Call on mount to set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  // Empty dependency array, sectionRefs don't change

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false, message: '' });
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    if (Math.random() > 0.1) { 
      console.log('Form submitted successfully', formData);
      setFormStatus({ submitting: false, success: true, error: false, message: t.contact.form.success });
      setFormData({ name: '', email: '', message: '' });
    } else {
      console.error('Form submission failed');
      setFormStatus({ submitting: false, success: false, error: true, message: t.contact.form.error });
    }
    setTimeout(() => setFormStatus({ submitting: false, success: false, error: false, message: '' }), 6000);
  };
  
  const resumePath = '/static-assets/Mahdy_Gribkov_CV.pdf'; // Path to CV assumed to be in public/assets

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {  // Apply theme class to body
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div 
      className={`min-h-screen ${isRTL ? (currentLang === 'ar' ? 'font-arabic' : 'font-hebrew') : 'ltr font-sans'} transition-colors duration-300`} 
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={currentLang}
    >
      <Helmet>
        <title>Mahdy Gribkov - Full Stack Developer</title>
        <meta name="description" content={translations.en.hero.bio} />
        <meta name="keywords" content="Mahdy Gribkov, Full Stack Developer, Web Developer, React, Node.js, JavaScript, TypeScript, Portfolio, Arabic, Russian, Hebrew" />
        <meta property="og:title" content="Mahdy Gribkov - Full Stack Developer" />
        <meta property="og:description" content={translations.en.hero.bio} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-actual-domain.com" /> {/* Placeholder URL */}
        <meta property="og:image" content="https://your-actual-domain.com/og-image.png" /> {/* Placeholder URL */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_AR" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="he_IL" />
        <link rel="canonical" href="https://your-actual-domain.com" /> {/* Placeholder URL */}
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="manifest" href="manifest.webmanifest" />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap'); /* Arabic */
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap'); /* Hebrew */
        
        :root { /* Default Dark Theme Variables */
          --bg-primary: #0a192f; --bg-secondary: #172a45; --text-primary: #ccd6f6; --text-secondary: #8892b0;
          --text-headings: #e6f1ff; --accent-primary: #64ffda; --accent-secondary: #79c0ff; --border-color: rgba(100, 255, 218, 0.1);
          --card-bg: var(--bg-secondary); --card-border: #233554; --input-bg: var(--bg-secondary); --input-border: #233554;
        }
        .theme-light { /* Light Theme Variables */
          --bg-primary: #f8f9fa; --bg-secondary: #ffffff; --text-primary: #212529; --text-secondary: #495057;
          --text-headings: #0a192f; --accent-primary: #007bff; --accent-secondary: #17a2b8; --border-color: #dee2e6;
          --card-bg: #ffffff; --card-border: #e9ecef; --input-bg: #ffffff; --input-border: #ced4da;
        }
        
        body { font-family: 'Inter', sans-serif; background-color: var(--bg-primary); color: var(--text-secondary); line-height: 1.6; transition: background-color 0.3s, color 0.3s; }
        .font-arabic { font-family: 'Cairo', sans-serif; } .font-hebrew { font-family: 'Rubik', sans-serif; }
        
        html { scroll-behavior: smooth; }
        
        .nav-sticky { backdrop-filter: blur(10px); background: color-mix(in srgb, var(--bg-primary) 85%, transparent); border-bottom: 1px solid var(--border-color); }
        .gradient-text { background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        
        .section-title { position: relative; padding-bottom: 0.75rem; margin-bottom: 2.5rem; display: inline-block; color: var(--text-headings); }
        .section-title::after { content: ''; position: absolute; bottom: 0; width: 70px; height: 4px; background-color: var(--accent-primary); border-radius: 2px; }
        .section-title.rtl-title::after { right: 0; } .section-title.ltr-title::after { left: 0; }
        .text-center .section-title::after { left: 50%; transform: translateX(-50%); }
        
        .skill-tag { transition: all 0.2s ease-in-out; border: 1px solid var(--accent-primary); color: var(--accent-primary); background-color: color-mix(in srgb, var(--accent-primary) 10%, transparent); }
        .skill-tag:hover { background-color: color-mix(in srgb, var(--accent-primary) 20%, transparent); box-shadow: 0 0 15px color-mix(in srgb, var(--accent-primary) 20%, transparent); transform: translateY(-3px); }
        
        .project-card { background-color: var(--card-bg); border: 1px solid var(--card-border); transition: all 0.3s ease-out; color: var(--text-primary); box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .theme-dark .project-card { box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .project-card:hover { transform: translateY(-8px); box-shadow: 0 15px 35px -15px rgba(2,12,27,0.3); }
        .theme-light .project-card:hover { box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .project-card h3 { color: var(--text-headings); } .project-card p { color: var(--text-secondary); }
        .project-card .tech-badge { background-color: color-mix(in srgb, var(--accent-primary) 15%, transparent); color: var(--accent-primary); }
        
        .btn-primary { background-color: transparent; border: 1px solid var(--accent-primary); color: var(--accent-primary); transition: all 0.2s ease-in-out; }
        .btn-primary:hover { background-color: color-mix(in srgb, var(--accent-primary) 10%, transparent); }
        .btn-secondary { background-color: var(--accent-primary); color: var(--bg-primary); } /* High contrast for secondary */
        .theme-dark .btn-secondary { color: var(--bg-primary); }
        .theme-light .btn-secondary { color: #fff; }
        .btn-secondary:hover { filter: brightness(1.1); }

        .testimonial-card { background-color: var(--card-bg); border-${isRTL ? 'right' : 'left'}: 4px solid var(--accent-primary); box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
        .theme-dark .testimonial-card { box-shadow: 0 2px 10px rgba(0,0,0,0.15); }
        .testimonial-card p { color: var(--text-secondary); } .testimonial-card .author-name { color: var(--text-headings); }
        
        /* Contact Form Field Colors */
        input, textarea { background-color: var(--input-bg); border: 1px solid var(--input-border); color: #ffffff; border-radius: 0.375rem; }
        input:focus, textarea:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-primary) 25%, transparent); outline: none; }
        /* Using a custom class for labels for explicit white color */
        .contact-label { color: #ffffff; }

        .nav-link.active { color: var(--accent-primary); font-weight: 600; }
        .nav-link { color: var(--text-primary); } .nav-link:hover { color: var(--accent-primary); }

        .back-to-top {
          position: fixed; bottom: 2rem; ${isRTL ? 'left: 2rem;' : 'right: 2rem;'} z-index: 100;
          background-color: var(--accent-primary); color: var(--bg-primary);
          border-radius: 50%; padding: 0.75rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: opacity 0.3s, transform 0.3s; opacity: 0; transform: translateY(100%);
        }
        .back-to-top.visible { opacity: 1; transform: translateY(0); }
        .back-to-top:hover { filter: brightness(1.1); transform: translateY(-2px) scale(1.05); }

        .theme-toggle-button {
            background-color: var(--card-bg); border: 1px solid var(--card-border); color: var(--text-secondary);
            padding: 0.5rem; border-radius: 0.375rem; display: flex; align-items: center;
        }
        .theme-toggle-button:hover { color: var(--accent-primary); border-color: var(--accent-primary); }

        @media print {
          body { background-color: white; color: black; font-family: 'Times New Roman', serif; }
          .no-print, .nav-sticky, footer, .back-to-top, .theme-toggle-button { display: none !important; }
          .print-section { page-break-inside: avoid; color: black !important; background-color: white !important; }
          .gradient-text { color: black !important; background: none; -webkit-text-fill-color: black; }
          #home.print-section, #about.print-section, #contact.print-section { display: block; }
          .project-card, .testimonial-card { background-color: #f9f9f9 !important; border: 1px solid #ddd !important; color: black !important; }
          .project-card h3, .testimonial-card .author-name { color: black !important; }
          .project-card p, .testimonial-card p { color: #333 !important; }
          .section-title::after { background-color: black !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 nav-sticky" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home');}} className="text-2xl font-bold text-[var(--accent-primary)] hover:opacity-80 transition-opacity duration-300">MG.</a>
            
            <div className="hidden md:flex items-center space-x-4"> {/* Reduced space slightly */}
              {Object.entries(t.nav).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeSection === key ? 'active' : ''}`}
                  aria-current={activeSection === key ? 'page' : undefined}
                >
                  {label}
                </button>
              ))}
              <div className={`flex items-center space-x-1 bg-transparent p-0.5 rounded-md`}>
                {['en', 'ar', 'ru', 'he'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCurrentLang(lang)}
                    className={`px-2 py-0.5 rounded text-xs font-semibold transition-all duration-200 ${
                      currentLang === lang 
                         ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] scale-110 ring-1 ring-[var(--accent-primary)]' 
                         : 'text-[var(--text-primary)] hover:text-[var(--accent-primary)]'
                    }`}
                    aria-label={`Switch to ${lang.toUpperCase()}`}
                    lang={lang}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <button onClick={toggleTheme} className="theme-toggle-button" aria-label={theme === 'dark' ? t.themeToggle.light : t.themeToggle.dark}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <div className="md:hidden flex items-center">
                <button onClick={toggleTheme} className="theme-toggle-button mr-2" aria-label={theme === 'dark' ? t.themeToggle.light : t.themeToggle.dark}>
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-[var(--text-primary)] hover:text-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]" aria-label="Toggle menu" aria-expanded={isMenuOpen}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (  /* Mobile Menu */
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-primary)] shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Object.entries(t.nav).map(([key, label]) => (
                <button key={key} onClick={() => scrollToSection(key)} className={`block w-full text-${isRTL ? 'right' : 'left'} px-3 py-2.5 rounded-md text-base font-medium ${activeSection === key ? 'text-[var(--accent-primary)] bg-[color-mix(in_srgb,_var(--accent-primary)_10%,_transparent)]' : 'text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:bg-[color-mix(in_srgb,_var(--accent-primary)_5%,_transparent)]'}`}>
                  {label}
                </button>
              ))}
              <div className={`flex space-x-2 px-3 py-3 justify-center border-t border-[var(--border-color)] mt-2 pt-3`}>
                {['en', 'ar', 'ru', 'he'].map((lang) => (
                  <button key={lang} onClick={() => { setCurrentLang(lang); setIsMenuOpen(false); }} className={`px-3.5 py-1.5 rounded text-sm font-medium ${currentLang === lang ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'}`}>
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {/* Hero Section */}
        <section ref={sectionRefs.home} id="home" className="pt-24 md:pt-32 pb-16 min-h-[calc(100vh-4rem)] flex items-center print-section" data-section="hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-${isRTL ? 'right' : 'left'} fade-in-up`}>
              <div className="mb-8">
                <div className={`inline-block w-24 h-24 md:w-32 md:h-32 p-1 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full shadow-lg`}>
                    {/* Placeholder for photo, replace with img tag and path */}
                    <img src="/static-assets/profile.jpg" alt="Mahdy Gribkov" className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <p className="text-lg text-[var(--accent-primary)] mb-3 font-mono">Hi, my name is</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--text-headings)] mb-4">
                {t.hero.name}.
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-secondary)] mb-6">
                {t.hero.title}.
              </h2>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-xl mb-10 leading-relaxed">
                {t.hero.bio}
              </p>
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary inline-flex items-center px-8 py-3 rounded-md text-lg font-medium group"
              >
                {t.hero.cta}
                <ArrowRight className={`${isRTL ? 'mr-2 -scale-x-100 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} transition-transform duration-200`} size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={sectionRefs.about} id="about" className="py-20 bg-[var(--bg-secondary)] print-section" data-section="about">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`section-title text-3xl md:text-4xl font-bold ${isRTL ? 'rtl-title text-right' : 'ltr-title text-left'}`}>
              {t.about.title}
            </h2>
            <div className={`space-y-6 text-[var(--text-secondary)] text-lg leading-relaxed text-${isRTL ? 'right' : 'left'}`}>
              <p><span className="font-semibold text-[var(--text-primary)]">{t.about.greeting}</span> {t.about.bio_p1}</p>
              <p>{t.about.bio_p2}</p>
              <p className={`italic text-[var(--text-primary)] border-${isRTL ? 'r' : 'l'}-4 border-[var(--accent-primary)] p${isRTL ? 'r' : 'l'}-4 bg-[color-mix(in_srgb,_var(--accent-primary)_5%,_transparent)] rounded-sm`}>{t.about.motivation}</p>
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-headings)] mt-10 mb-4">{t.about.soft_skills_title}</h3>
                <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[var(--text-secondary)]`}>
                  {t.about.soft_skills.map(skill => <li key={skill} className="flex items-center"><CheckCircle size={18} className={`text-[var(--accent-primary)] ${isRTL ? 'ml-2' : 'mr-2'} flex-shrink-0`} /> {skill}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={sectionRefs.projects} id="projects" className="py-20 bg-[var(--bg-primary)]" data-section="projects">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-${isRTL ? 'right' : 'left'} mb-16`}>
              <h2 className={`section-title text-3xl md:text-4xl font-bold ${isRTL ? 'rtl-title' : 'ltr-title'}`}>
                {t.projects.title}
              </h2>
              <p className="text-[var(--text-secondary)] mt-2 max-w-2xl">{t.projects.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialProjects.map((project) => (
                <div key={project.id} className="project-card rounded-lg p-6 flex flex-col h-full" data-project={project.name}>
                  <div className="flex justify-between items-center mb-4">
                    <Code size={36} className="text-[var(--accent-primary)]" />
                    <div className="flex space-x-3">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label={`GitHub for ${project.name}`}>
                        <Github size={22} />
                      </a>
                      {project.demo && project.demo !== '#' && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label={`Live demo of ${project.name}`}>
                          <ExternalLink size={22} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-sm grow mb-4">{project[`description_${currentLang}`] || project.description_en}</p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[var(--border-color)]">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-badge px-2.5 py-0.5 rounded-full text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={sectionRefs.skills} id="skills" className="py-20 bg-[var(--bg-secondary)]" data-section="skills">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-${isRTL ? 'right' : 'left'} mb-12`}>
                <h2 className={`section-title text-3xl md:text-4xl font-bold ${isRTL ? 'rtl-title' : 'ltr-title'}`}>
                  {t.skills.title}
                </h2>
                <p className="text-[var(--text-secondary)] mt-2">{t.skills.subtitle}</p>
            </div>
            <div className={`flex flex-wrap ${isRTL ? 'justify-end' : 'justify-start'} gap-3`}>
              {skills.map((skill) => (  /* Using updated skills list */
                <span key={skill} className="skill-tag px-4 py-2 rounded-md text-sm font-medium shadow-sm" data-skill={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-[var(--bg-primary)] no-print" data-section="trust">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-8">{t.trust.title}</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
              {trustedTech.map((tech) => (
                <div key={tech.name} className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors cursor-default group">
                  {React.cloneElement(tech.icon, {className: `opacity-70 group-hover:opacity-100 transition-opacity text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]`})}
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={sectionRefs.testimonials} id="testimonials" className="py-20 bg-[var(--bg-secondary)]" data-section="testimonials">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-${isRTL ? 'right' : 'left'} mb-12`}>
              <h2 className={`section-title text-3xl md:text-4xl font-bold ${isRTL ? 'rtl-title' : 'ltr-title'}`}>
                {t.testimonials.title}
              </h2>
            </div>
            <div className="space-y-10">
              {/* Displaying only Angel Rattner's testimonial */}
              {t.testimonials.angel_rattner && (
                <div className={`testimonial-card p-6 md:p-8 rounded-lg shadow-lg ${isRTL ? 'text-right' : 'text-left'}`} data-testimonial="angel-rattner">
                  <Quote className={`text-[var(--accent-primary)] mb-4 ${isRTL ? 'transform scale-x-[-1] float-right ml-2' : 'float-left mr-2'}`} size={28} />
                  <p className="text-lg italic mb-6 clear-both">{t.testimonials.angel_rattner.quote}</p>
                  <div className={`flex items-center ${isRTL ? 'justify-end' : ''}`}>
                    <div className={`w-12 h-12 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'} flex-shrink-0`}>
                      <span className="font-bold text-[var(--bg-primary)]">
                        {t.testimonials.angel_rattner.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="author-name font-semibold">{t.testimonials.angel_rattner.author}</div>
                      <div className="text-sm text-[var(--text-secondary)]">{t.testimonials.angel_rattner.role}</div>
                      <div className="text-xs text-[var(--text-secondary)] italic mt-0.5">({t.testimonials.angel_rattner.context})</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[var(--bg-primary)] text-center no-print" data-section="cta">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-headings)] mb-4">{t.cta.title}</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-xl mx-auto">{t.cta.subtitle}</p>
            <button  /* Changed from a to button to scroll to contact */
              onClick={() => scrollToSection('contact')}
              className="btn-primary inline-flex items-center px-10 py-4 rounded-md text-lg font-medium group"
            >
              <Mail className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={20} />  {/* Changed icon to Mail */}
              {t.cta.button}
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={sectionRefs.contact} id="contact" className="py-20 bg-[var(--bg-secondary)] print-section" data-section="contact">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-${isRTL ? 'right' : 'left'} mb-12`}>
              <h2 className={`section-title text-3xl md:text-4xl font-bold ${isRTL ? 'rtl-title' : 'ltr-title'}`}>{t.contact.title}</h2>
              <p className="text-[var(--text-secondary)] mt-2">{t.contact.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium contact-label mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>{t.contact.form.name}</label> {/* Using custom contact-label class */}
                  <input type="text" id="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2.5" />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium contact-label mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>{t.contact.form.email}</label> {/* Using custom contact-label class */}
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2.5" />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium contact-label mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>{t.contact.form.message}</label> {/* Using custom contact-label class */}
                  <textarea id="message" rows={4} value={formData.message} onChange={handleInputChange} required className="w-full px-4 py-2.5"></textarea>
                </div>
                <button type="submit" disabled={formStatus.submitting} className="btn-primary w-full py-3 rounded-md font-semibold flex items-center justify-center group disabled:opacity-60 disabled:cursor-not-allowed">
                  {formStatus.submitting ? 'Sending...' : t.contact.form.submit}
                  {!formStatus.submitting && <Send className={`${isRTL ? 'mr-2 -scale-x-100' : 'ml-2'} group-hover:translate-x-1 transition-transform duration-200`} size={18} />}
                </button>
                {formStatus.message && (
                  <p className={`mt-3 text-sm text-center ${formStatus.success ? 'text-green-400' : 'text-red-400'}`}>
                    {formStatus.message}
                  </p>
                )}
              </form>
              <div className={`space-y-8 ${isRTL ? 'text-right md:text-right' : 'text-left md:text-left'}`}>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text-headings)] mb-4">{t.contact.direct_title}</h3>
                  <div className="space-y-3">
                    <a href="mailto:mahdy34552@gmail.com" className="flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group"> {/* Email updated */}
                      <Mail className={`${isRTL ? 'ml-3' : 'mr-3'} text-[var(--accent-primary)] group-hover:scale-110 transition-transform`} size={20} />  mahdy34552@gmail.com
                    </a>
                    <a href="https://wa.me/972532322318" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group"> {/* Phone number already correct */}
                      <Phone className={`${isRTL ? 'ml-3' : 'mr-3'} text-[var(--accent-primary)] group-hover:scale-110 transition-transform`} size={20} />  WhatsApp
                    </a>
                    <a href="https://www.linkedin.com/in/mahdy-gribkov-ba2707368" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group">
                      <Linkedin className={`${isRTL ? 'ml-3' : 'mr-3'} text-[var(--accent-primary)] group-hover:scale-110 transition-transform`} size={20} />  LinkedIn
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text-headings)] mb-3">{t.contact.resume_title}</h3>
                  <a href={resumePath} download="Mahdy_Gribkov_CV.pdf" className="btn-primary inline-flex items-center px-6 py-2.5 rounded-md font-medium group">
                    <Download className={`${isRTL ? 'ml-2' : 'mr-2'} group-hover:animate-bounce`} size={18} />  {t.contact.resume_cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--bg-primary)] py-10 text-center border-t border-[var(--border-color)]" role="contentinfo" data-section="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 mb-6">
            {/* Footer social icons with updated email/phone */}
            <a href="mailto:mahdy34552@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label="Email"><Mail size={22} /></a> {/* Email updated */}
            <a href="https://github.com/Mahdy-gribkov" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label="GitHub"><Github size={22} /></a>
            <a href="https://www.linkedin.com/in/mahdy-gribkov-ba2707368" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label="LinkedIn"><Linkedin size={22} /></a>
            <a href="https://wa.me/972532322318" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" aria-label="WhatsApp"><Phone size={22} /></a> {/* Phone number already correct */}
          </div>
          <p className="text-sm text-[var(--text-secondary)] font-mono tracking-wide">{t.footer.copyright}</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top no-print ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <ArrowUpCircle size={24} />
      </button>
    </div>
  );
}