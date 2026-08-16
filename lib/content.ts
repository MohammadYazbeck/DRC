export type Locale = "en" | "ar";

export type LocalizedString = Record<Locale, string>;

export type ProductFeatureIcon =
  | "absorption"
  | "comfort"
  | "dryness"
  | "fit"
  | "protection"
  | "softness"
  | "packaging"
  | "materials";

export type ProductFeature = {
  icon: ProductFeatureIcon;
  title: LocalizedString;
  description: LocalizedString;
};

export type ProductSize = {
  label: LocalizedString;
  value: LocalizedString;
  note?: LocalizedString;
  description?: LocalizedString;
  image?: string;
};

export type ProductFaq = {
  question: LocalizedString;
  answer: LocalizedString;
};

export type InsightItem = {
  slug: string;
  image: string;
  href?: string;
  source?: LocalizedString;
  category: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  date?: LocalizedString;
};

export type ProductBrandLogo = {
  name: string;
  src: string;
};

export type Product = {
  slug: string;
  aliases?: string[];
  hidden?: boolean;
  featured?: boolean;
  title: LocalizedString;
  category: LocalizedString;
  image: string;
  cardImage?: string;
  cardImages?: string[];
  bannerImage?: string;
  bannerSize?: {
    width: number;
    height: number;
  };
  logo: string;
  logos?: ProductBrandLogo[];
  excerpt: LocalizedString;
  description: LocalizedString;
  optionsTitle?: LocalizedString;
  optionsSubtitle?: LocalizedString;
  features?: ProductFeature[];
  detailFeatures?: ProductFeature[];
  sizes?: ProductSize[];
  faqs?: ProductFaq[];
};

export const common = {
  exploreMore: {
    en: "Explore More",
    ar: "استكشف المزيد"
  },
  moreInfo: {
    en: "More Info",
    ar: "معلومات أكثر"
  },
  readMore: {
    en: "Read More",
    ar: "اقرأ المزيد"
  },
  contactUs: {
    en: "Contact Us",
    ar: "تواصل معنا"
  },
  viewProducts: {
    en: "Explore Our Products",
    ar: "استكشف منتجاتنا"
  },
  toBeConfirmed: {
    en: "To be confirmed",
    ar: "سيتم التأكيد"
  }
} satisfies Record<string, LocalizedString>;

export const contactInfo = {
  phone: {
    en: "+963 950 077 733",
    ar: "سيتم توفير الهاتف"
  },
  email: {
    en: "info@drcgroup.co",
    ar: "سيتم توفير البريد"
  }
} satisfies Record<string, LocalizedString>;

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/1GHyKaPk73/?mibextid=wwXIfr", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/new_baby_rexy", icon: "instagram" },
  { label: "WhatsApp", href: "https://wa.me/963989133533", icon: "whatsapp" }
];

export const navLinks = [
  { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
  { label: { en: "About Us", ar: "من نحن" }, href: "/about" },
  { label: { en: "Careers", ar: "الوظائف" }, href: "/careers" },
  { label: { en: "Blogs & News", ar: "المدونة والأخبار" }, href: "/blog" },
  { label: { en: "Contact Us", ar: "تواصل معنا" }, href: "/#contact" }
] satisfies Array<{ label: LocalizedString; href: string }>;

export const hero = {
  title: {
    en: "Everyday Hygiene, Made with Care",
    ar: "عناية يومية، مصنوعة باهتمام"
  },
  subtitle: {
    en: "DRC provides reliable hygiene products for babies, women, adults, and families, designed to deliver softness, comfort, effective absorption, and dependable everyday protection.",
    ar: "تقدّم DRC منتجات عناية صحية موثوقة للأطفال والنساء وكبار السن والعائلة، مصممة لتوفير النعومة والراحة والامتصاص الفعّال والحماية اليومية."
  }
} satisfies Record<string, LocalizedString>;

export const heroSlides = [
  {
    id: "rexy",
    image: {
      en: "/images/standardized/hero/hero-1.jpg",
      ar: "/images/standardized/hero/hero-1.jpg"
    },
    label: { en: "Baby care", ar: "عناية الأطفال" },
    title: { en: "Soft protection for every stage", ar: "حماية ناعمة لكل مرحلة" }
  },
  {
    id: "hq",
    image: {
      en: "/images/standardized/hero/hero-2.jpg",
      ar: "/images/standardized/hero/hero-2.jpg"
    },
    label: { en: "Women care", ar: "عناية النساء" },
    title: { en: "Comfort, dryness, and confidence", ar: "راحة وجفاف وثقة" }
  },
  {
    id: "tizkar",
    image: {
      en: "/images/standardized/hero/hero-3.jpg",
      ar: "/images/standardized/hero/hero-3.jpg"
    },
    label: { en: "Family care", ar: "عناية العائلة" },
    title: { en: "Clean routines made simpler", ar: "نظافة يومية أسهل" }
  }
] satisfies Array<{
  id: string;
  image: LocalizedString;
  label: LocalizedString;
  title: LocalizedString;
}>;

export const brandLogos: ProductBrandLogo[] = [
  { name: "Rexy", src: "/images/standardized/logos/rexy.png" },
  { name: "HQ+", src: "/images/standardized/logos/hq-plus.png" },
  { name: "Tizkar", src: "/images/standardized/logos/tizkar.png" },
  { name: "Fantash", src: "/images/standardized/logos/fantash.png" },
  { name: "Pinotex", src: "/images/standardized/logos/bino.png" },
  { name: "Avia", src: "/images/standardized/logos/avia.png" }
];

export const about = {
  eyebrow: {
    en: "DRC Group",
    ar: "مجموعة DRC"
  },
  title: {
    en: "Reliable hygienic and personal-care products for everyday life.",
    ar: "منتجات موثوقة للعناية الصحية والشخصية في الحياة اليومية."
  },
  description: {
    en: "DRC specializes in hygiene and personal-care products created to support comfort, cleanliness, and confidence throughout every stage of life. The portfolio includes baby diapers, sanitary pads, adult diapers, facial tissues, drying tissues, and baby wipes under a variety of trusted brands.",
    ar: "تتخصص DRC في منتجات العناية الصحية والشخصية المصممة لدعم الراحة والنظافة والثقة في مختلف مراحل الحياة. تضم محفظة المنتجات حفاضات الأطفال، والفوط النسائية، وحفاضات كبار السن، ومحارم الوجه، ومحارم التنشيف، والمناديل المبللة للأطفال ضمن مجموعة متنوعة من العلامات الموثوقة."
  },
  metrics: [
    { value: "6+", label: { en: "Product categories", ar: "فئات منتجات" } },
    { value: "6", label: { en: "Sub-brands", ar: "علامات فرعية" } },
    { value: "24/7", label: { en: "Everyday protection", ar: "حماية يومية" } }
  ]
};
const productFeatureSets = {
  babyPremium: [
    {
      icon: "fit",
      title: { en: "Wide elastic waist", ar: "خصر مطاطي عريض" },
      description: {
        en: "Helps the diaper stay secure while supporting easier movement.",
        ar: "يساعد الحفاض على الثبات مع دعم حركة الطفل براحة أكبر."
      }
    },
    {
      icon: "absorption",
      title: { en: "3D absorbent core", ar: "حشوة ثلاثية الامتصاص" },
      description: {
        en: "Built to absorb quickly and distribute wetness across the core.",
        ar: "مصممة للامتصاص السريع وتوزيع البلل داخل الحشوة."
      }
    },
    {
      icon: "protection",
      title: { en: "Leakage barriers", ar: "حواجز مانعة للتسريب" },
      description: {
        en: "Side guards help reduce leakage during daily and night use.",
        ar: "حواجز جانبية تساعد على تقليل التسريب أثناء الاستخدام اليومي والليلي."
      }
    }
  ],
  babyValue: [
    {
      icon: "absorption",
      title: { en: "Up to 12-hour protection", ar: "حماية حتى 12 ساعة" },
      description: {
        en: "High-absorption structure designed for dependable everyday care.",
        ar: "بنية عالية الامتصاص مصممة لعناية يومية يمكن الاعتماد عليها."
      }
    },
    {
      icon: "dryness",
      title: { en: "Fast dry layer", ar: "طبقة جفاف سريعة" },
      description: {
        en: "Helps keep the diaper surface drier after absorption.",
        ar: "تساعد على إبقاء سطح الحفاض أكثر جفافاً بعد الامتصاص."
      }
    },
    {
      icon: "protection",
      title: { en: "Deep distribution channels", ar: "قنوات توزيع عميقة" },
      description: {
        en: "Designed to move wetness through the core more evenly.",
        ar: "مصممة لتوزيع البلل داخل الحشوة بشكل أكثر توازناً."
      }
    }
  ],
  sanitaryPads: [
    {
      icon: "softness",
      title: { en: "Soft cotton-like touch", ar: "ملمس ناعم شبيه بالقطن" },
      description: {
        en: "Created for comfortable contact during everyday period care.",
        ar: "مصممة لملامسة مريحة أثناء العناية اليومية بالدورة."
      }
    },
    {
      icon: "dryness",
      title: { en: "Quick absorption", ar: "امتصاص سريع" },
      description: {
        en: "Helps support dryness, comfort, and confidence through the day.",
        ar: "يساعد على دعم الجفاف والراحة والثقة خلال اليوم."
      }
    },
    {
      icon: "packaging",
      title: { en: "Individually sealed", ar: "تغليف فردي محكم" },
      description: {
        en: "Each pad is packed separately for clean, practical handling.",
        ar: "كل فوطة مغلفة بشكل منفصل لاستخدام نظيف وعملي."
      }
    }
  ],
  hqPads: [
    {
      icon: "fit",
      title: { en: "Four thick pad options", ar: "أربعة مقاسات للفوطة السميكة" },
      description: {
        en: "Available in Goodnight, Super Plus, Super, and Normal, with side wings for a more secure fit on underwear.",
        ar: "متوفرة بالمقاسات الأربعة: ليلية، سوبر بلاس، سوبر، ونورمال، مع أجنحة جانبية لتثبيت أفضل على اللباس الداخلي."
      }
    },
    {
      icon: "softness",
      title: { en: "Cotton-like surface", ar: "سطح بنعومة القطن" },
      description: {
        en: "The skin-contact layer is soft and highly absorbent to support dryness and help protect sensitive skin.",
        ar: "سطح الفوطة الملامس للبشرة بنعومة القطن وذو قدرة عالية على الامتصاص لدعم الجفاف والحماية من الحساسية."
      }
    },
    {
      icon: "absorption",
      title: { en: "ADL fast-absorption layer", ar: "طبقة ADL سريعة الامتصاص" },
      description: {
        en: "An added ADL layer below the surface helps speed liquid absorption and reduce leakage.",
        ar: "طبقة إضافية أسفل الطبقة السطحية ADL تساعد على زيادة سرعة امتصاص السائل ومنع التسريب."
      }
    },
    {
      icon: "dryness",
      title: { en: "Deep distribution channels", ar: "أقنية توزيع عميقة" },
      description: {
        en: "Deep channels help distribute wetness properly across the pad for better leakage protection.",
        ar: "أقنية عميقة بشكل مناسب تساعد على توزع البلل والحماية من التسريب."
      }
    },
    {
      icon: "protection",
      title: { en: "Super absorbent gel", ar: "جل فائق الامتصاص" },
      description: {
        en: "Super absorbent gel locks liquid away from the skin to help deliver a fully dry feeling.",
        ar: "جل فائق الامتصاص لحجز السائل وإبعاده عن البشرة والمساعدة على الشعور بالجفاف."
      }
    },
    {
      icon: "protection",
      title: { en: "Side leakage barriers", ar: "حواجز جانبية مانعة للتسريب" },
      description: {
        en: "Non-absorbent side barriers help prevent leakage from the pad sides.",
        ar: "حواجز جانبية غير ماصة تساعد على منع التسريب من الجوانب."
      }
    },
    {
      icon: "materials",
      title: { en: "Wrapped cotton core", ar: "حشوة قطنية ملفوفة" },
      description: {
        en: "The cotton core is wrapped with an additional layer to help prevent clumping.",
        ar: "تم لف قطن الحشوة بطبقة إضافية مناسبة للمساعدة على منع تكتل القطن."
      }
    },
    {
      icon: "packaging",
      title: { en: "UV sterilized, no fragrance", ar: "تعقيم UV بدون عطور" },
      description: {
        en: "UV sterilization and fragrance-free production help support protection for sensitive skin.",
        ar: "لزيادة الحماية من الحساسية يتم تعقيم الفوطة بتقنية UV دون استخدام أي مواد عطرية."
      }
    }
  ],
  tissues: [
    {
      icon: "materials",
      title: { en: "Natural cellulose", ar: "سليلوز طبيعي" },
      description: {
        en: "Made with 100% natural cellulose for softness and cleanliness.",
        ar: "مصنوعة من السليلوز الطبيعي بنسبة 100% للنعومة والنظافة."
      }
    },
    {
      icon: "softness",
      title: { en: "Soft daily feel", ar: "نعومة للاستخدام اليومي" },
      description: {
        en: "Designed for face, home, office, and family routines.",
        ar: "مصممة للوجه والمنزل والمكتب وروتين العائلة اليومي."
      }
    },
    {
      icon: "packaging",
      title: { en: "Multiple formats", ar: "تنسيقات متعددة" },
      description: {
        en: "Available in different weights and package formats.",
        ar: "متوفرة بأوزان وتنسيقات تعبئة مختلفة."
      }
    }
  ],
  adultDiapers: [
    {
      icon: "absorption",
      title: { en: "Fast absorption", ar: "امتصاص سريع" },
      description: {
        en: "Absorbent structure helps handle daily adult-care needs.",
        ar: "بنية ماصة تساعد على تلبية احتياجات العناية اليومية للكبار."
      }
    },
    {
      icon: "protection",
      title: { en: "Reliable retention", ar: "احتجاز موثوق للسوائل" },
      description: {
        en: "Helps retain fluid and reduce unwanted leakage.",
        ar: "يساعد على احتجاز السوائل وتقليل التسريب غير المرغوب."
      }
    },
    {
      icon: "comfort",
      title: { en: "Backing options", ar: "خيارات خلفية متعددة" },
      description: {
        en: "Selected products are available with cloth-like or nylon backsheets.",
        ar: "تتوفر بعض المنتجات بخلفية قماشية أو خلفية نايلون."
      }
    }
  ]
} satisfies Record<string, ProductFeature[]>;

const productSizeGroups = {
  babyDiapers: [
    { label: { en: "NB", ar: "NB" }, value: { en: "2-5 kg", ar: "2-5 كغ" }, note: { en: "Newborn", ar: "حديث الولادة" } },
    { label: { en: "S", ar: "S" }, value: { en: "3-6 kg", ar: "3-6 كغ" }, note: { en: "Small", ar: "صغير" } },
    { label: { en: "M", ar: "M" }, value: { en: "5-9 kg", ar: "5-9 كغ" }, note: { en: "Medium", ar: "وسط" } },
    { label: { en: "L", ar: "L" }, value: { en: "9-15 kg", ar: "9-15 كغ" }, note: { en: "Large", ar: "كبير" } },
    { label: { en: "XL", ar: "XL" }, value: { en: "12-19 kg", ar: "12-19 كغ" }, note: { en: "X-Large", ar: "كبير جداً" } },
    { label: { en: "XXL", ar: "XXL" }, value: { en: "15-22 kg", ar: "15-22 كغ" }, note: { en: "XX-Large", ar: "كبير جداً 2" } }
  ],
  sanitaryPads: [
    { label: { en: "Daily", ar: "يومي" }, value: { en: "Light flow", ar: "تدفق خفيف" }, note: { en: "Soft daily comfort", ar: "راحة ناعمة للاستخدام اليومي" } },
    { label: { en: "Regular", ar: "عادي" }, value: { en: "Normal flow", ar: "تدفق عادي" }, note: { en: "Everyday protection", ar: "حماية يومية" } },
    { label: { en: "Long", ar: "طويل" }, value: { en: "Medium flow", ar: "تدفق متوسط" }, note: { en: "More coverage", ar: "تغطية أكبر" } },
    { label: { en: "Night", ar: "ليلي" }, value: { en: "Heavy flow", ar: "تدفق غزير" }, note: { en: "Extended protection", ar: "حماية ممتدة" } }
  ],
  tissues: [
    { label: { en: "Box", ar: "علبة" }, value: { en: "Facial tissues", ar: "محارم وجه" }, note: { en: "Home and office", ar: "للمنزل والمكتب" } },
    { label: { en: "Family", ar: "عائلي" }, value: { en: "Larger pack", ar: "عبوة أكبر" }, note: { en: "Daily family use", ar: "للاستخدام العائلي اليومي" } },
    { label: { en: "Drying", ar: "تنشيف" }, value: { en: "Drying tissues", ar: "محارم تنشيف" }, note: { en: "Practical care routines", ar: "لروتين عناية عملي" } }
  ],
  tizkarTissues: [
    {
      label: { en: "Facial", ar: "وجه" },
      value: { en: "Facial tissues", ar: "محارم وجه" },
      note: { en: "Soft facial tissues", ar: "محارم وجه ناعمة" },
      description: {
        en: "Soft Tizkar facial tissues made for daily home, office, and family use.",
        ar: "محارم وجه تذكار ناعمة مصممة للاستخدام اليومي في المنزل والمكتب ومع العائلة."
      },
      image: "/images/standardized/product-options/tizkar-facial.png"
    },
    {
      label: { en: "Drying", ar: "تنشيف" },
      value: { en: "Drying tissues", ar: "محارم تنشيف" },
      note: { en: "Drying tissues", ar: "محارم تنشيف" },
      description: {
        en: "Practical drying tissues for clean daily routines and different care needs.",
        ar: "محارم تنشيف عملية لروتين يومي نظيف واحتياجات عناية مختلفة."
      },
      image: "/images/standardized/product-options/tizkar-drying.png"
    }
  ],
  aviaBinoAdultDiapers: [
    {
      label: { en: "Pinotex S", ar: "بينوتكس S" },
      value: { en: "Small", ar: "صغير" },
      note: { en: "Pinotex Small", ar: "بينوتكس صغير" },
      description: {
        en: "A compact Pinotex adult diaper option made for dependable comfort and daily protection.",
        ar: "خيار صغير من بينوتكس لكبار السن مصمم للراحة الموثوقة والحماية اليومية."
      },
      image: "/images/standardized/product-options/bino-s.png"
    },
    {
      label: { en: "Pinotex L", ar: "بينوتكس L" },
      value: { en: "Large", ar: "كبير" },
      note: { en: "Pinotex Large", ar: "بينوتكس كبير" },
      description: {
        en: "A larger Pinotex format for secure coverage, practical fit, and reliable retention.",
        ar: "مقاس أكبر من بينوتكس لتغطية آمنة وملاءمة عملية واحتجاز موثوق للسوائل."
      },
      image: "/images/standardized/product-options/bino-l.png"
    },
    {
      label: { en: "Pinotex XL", ar: "بينوتكس XL" },
      value: { en: "X-Large", ar: "كبير جدا" },
      note: { en: "Pinotex X-Large", ar: "بينوتكس كبير جدا" },
      description: {
        en: "An extra-large Pinotex option for broader coverage and dependable adult-care support.",
        ar: "خيار كبير جدا من بينوتكس لتغطية أوسع ودعم موثوق للعناية بكبار السن."
      },
      image: "/images/standardized/product-options/bino-xl.png"
    },
    {
      label: { en: "Avia S", ar: "آفيا S" },
      value: { en: "Small", ar: "صغير" },
      note: { en: "Avia Small", ar: "آفيا صغير" },
      description: {
        en: "A small Avia adult diaper option built for comfort, absorption, and everyday confidence.",
        ar: "خيار صغير من آفيا لكبار السن مصمم للراحة والامتصاص والثقة اليومية."
      },
      image: "/images/standardized/product-options/avia-s.png"
    },
    {
      label: { en: "Avia L", ar: "آفيا L" },
      value: { en: "Large", ar: "كبير" },
      note: { en: "Avia Large", ar: "آفيا كبير" },
      description: {
        en: "A large Avia format made for secure protection, better coverage, and practical wear.",
        ar: "مقاس كبير من آفيا للحماية الآمنة والتغطية الأفضل والاستخدام العملي."
      },
      image: "/images/standardized/product-options/avia-l.png"
    },
    {
      label: { en: "Avia XL", ar: "آفيا XL" },
      value: { en: "X-Large", ar: "كبير جدا" },
      note: { en: "Avia X-Large", ar: "آفيا كبير جدا" },
      description: {
        en: "An extra-large Avia option for extended adult-care coverage and reliable protection.",
        ar: "خيار كبير جدا من آفيا لتغطية أوسع وحماية موثوقة ضمن العناية بكبار السن."
      },
      image: "/images/standardized/product-options/avia-xl.png"
    }
  ],
  adultDiapers: [
    { label: { en: "S", ar: "S" }, value: { en: "Small", ar: "صغير" }, note: { en: "Select by waist chart", ar: "يختار حسب جدول الخصر" } },
    { label: { en: "M", ar: "M" }, value: { en: "Medium", ar: "وسط" }, note: { en: "Select by waist chart", ar: "يختار حسب جدول الخصر" } },
    { label: { en: "L", ar: "L" }, value: { en: "Large", ar: "كبير" }, note: { en: "Select by waist chart", ar: "يختار حسب جدول الخصر" } },
    { label: { en: "XL", ar: "XL" }, value: { en: "X-Large", ar: "كبير جداً" }, note: { en: "Select by waist chart", ar: "يختار حسب جدول الخصر" } }
  ],
  hqSanitaryPads: [
    {
      label: { en: "N", ar: "N" },
      value: { en: "Normal", ar: "نورمال" },
      note: { en: "Normal", ar: "نورمال" },
      description: {
        en: "A thick everyday HQ+ sanitary pad with wings for secure fixation, comfort, and leakage protection.",
        ar: "فوطة آتش كيو السميكة للاستخدام اليومي مع أجنحة جانبية لتثبيت أفضل وراحة وحماية من التسريب."
      },
      image: "/images/standardized/product-options/hq-normal.png"
    },
    {
      label: { en: "S", ar: "S" },
      value: { en: "Super", ar: "سوبر" },
      note: { en: "Super", ar: "سوبر" },
      description: {
        en: "Designed for stronger protection with fast absorption support, side barriers, and comfortable coverage.",
        ar: "مصممة لحماية أقوى مع دعم سرعة الامتصاص وحواجز جانبية وتغطية مريحة."
      },
      image: "/images/standardized/product-options/hq-super.png"
    },
    {
      label: { en: "S+", ar: "S+" },
      value: { en: "Super Plus", ar: "سوبر بلاس" },
      note: { en: "Super Plus", ar: "سوبر بلاس" },
      description: {
        en: "A higher-protection option with super absorbent gel, deep distribution channels, and cotton-like softness.",
        ar: "خيار حماية أعلى مع جل فائق الامتصاص وأقنية توزيع عميقة وملمس ناعم شبيه بالقطن."
      },
      image: "/images/standardized/product-options/hq-super-plus.png"
    },
    {
      label: { en: "GN", ar: "GN" },
      value: { en: "Goodnight", ar: "ليلي" },
      note: { en: "Goodnight", ar: "ليلي" },
      description: {
        en: "Night protection made for longer wear, dependable dryness, and secure comfort while resting.",
        ar: "حماية ليلية مصممة للاستخدام الأطول مع جفاف موثوق وراحة آمنة أثناء الراحة."
      },
      image: "/images/standardized/product-options/hq-goodnight.png"
    }
  ],
  rexyDiapers: [
    {
      label: { en: "NB", ar: "NB" },
      value: { en: "2-5 kg", ar: "2-5 كغ" },
      note: { en: "Newborn", ar: "حديث الولادة" },
      description: {
        en: "A gentle first fit for newborn babies with soft everyday protection.",
        ar: "ملاءمة لطيفة لحديثي الولادة مع حماية يومية ناعمة."
      },
      image: "/images/standardized/product-options/rexy-nb.png"
    },
    {
      label: { en: "S", ar: "S" },
      value: { en: "3-6 kg", ar: "3-6 كغ" },
      note: { en: "Small", ar: "صغير" },
      description: {
        en: "Comfortable care for early growth and daily diaper changes.",
        ar: "عناية مريحة لمرحلة النمو المبكر والتغيير اليومي."
      },
      image: "/images/standardized/product-options/rexy-s.png"
    },
    {
      label: { en: "M", ar: "M" },
      value: { en: "5-9 kg", ar: "5-9 كغ" },
      note: { en: "Medium", ar: "وسط" },
      description: {
        en: "Balanced fit and absorption for babies becoming more active.",
        ar: "ملاءمة وامتصاص متوازن للأطفال الأكثر حركة."
      },
      image: "/images/standardized/product-options/rexy-m.png"
    },
    {
      label: { en: "L", ar: "L" },
      value: { en: "9-15 kg", ar: "9-15 كغ" },
      note: { en: "Large", ar: "كبير" },
      description: {
        en: "More coverage for growing babies during day and night routines.",
        ar: "تغطية أكبر للأطفال في روتين النهار والليل."
      },
      image: "/images/standardized/product-options/rexy-l.png"
    },
    {
      label: { en: "XL", ar: "XL" },
      value: { en: "12-19 kg", ar: "12-19 كغ" },
      note: { en: "X-Large", ar: "كبير جداً" },
      description: {
        en: "A comfortable larger fit for longer daily protection.",
        ar: "مقاس أكبر ومريح لحماية يومية أطول."
      },
      image: "/images/standardized/product-options/rexy-xl.png"
    },
    {
      label: { en: "XXL", ar: "XXL" },
      value: { en: "15-22 kg", ar: "15-22 كغ" },
      note: { en: "XX-Large", ar: "كبير جداً 2" },
      description: {
        en: "Extra coverage for bigger toddlers who need dependable comfort.",
        ar: "تغطية إضافية للأطفال الأكبر مع راحة يمكن الاعتماد عليها."
      },
      image: "/images/standardized/product-options/rexy-xxl.png"
    }
  ]
} satisfies Record<string, ProductSize[]>;

export const products: Product[] = [
  {
    slug: "baby-rexy",
    title: { en: "Baby Rexy", ar: "بيبي ريكسي" },
    category: { en: "Baby Diapers", ar: "حفاضات الأطفال" },
    image: "/images/standardized/product-cards/baby-rexy.png",
    cardImage: "/images/standardized/product-cards/baby-rexy.png",
    bannerImage: "/images/standardized/banners/baby-rexy.png",
    bannerSize: { width: 2400, height: 460 },
    logo: "/images/standardized/logos/rexy.png",
    excerpt: {
      en: "Advanced baby diapers designed for night-long comfort, high absorption, and leakage protection.",
      ar: "فوط أطفال مطوّرة لتوفير الراحة، الامتصاص العالي، والحماية من التسريب."
    },
    description: {
      en: "Baby Rexy diapers are developed with modern Japanese technology for a secure and comfortable fit. They feature a wide elastic waistband, a high-absorption three-dimensional core, wetness-distribution channels, leakage barriers, and soft materials that help keep skin dry.",
      ar: "بيبي ريكسي فوط أطفال مطوّرة بتقنية يابانية حديثة، صُممت لتوفير ثبات وراحة أكبر للطفل ومنع التسريب. تتميز بحزام خصر مطاطي عريض، وحشوة ثلاثية الأبعاد عالية الامتصاص، مع قنوات لتوزيع البلل وحواجز مانعة للتسريب."
    },
    features: productFeatureSets.babyPremium,
    sizes: productSizeGroups.rexyDiapers,
    faqs: [
      {
        question: {
          en: "How do I choose the right Baby Rexy diaper size?",
          ar: "كيف أختار مقاس بيبي ريكسي المناسب؟"
        },
        answer: {
          en: "Choose the size based on your baby's current weight range, then check that the waist and leg openings feel secure without leaving strong marks.",
          ar: "اختر المقاس حسب وزن الطفل الحالي، ثم تأكد أن الخصر وفتحات الأرجل ثابتة ومريحة دون ترك علامات قوية على البشرة."
        }
      },
      {
        question: {
          en: "When should I move to the next size?",
          ar: "متى أحتاج للانتقال إلى مقاس أكبر؟"
        },
        answer: {
          en: "Move up when the diaper feels tight, leaves noticeable marks, leaks more often, or when your baby's weight is close to the top of the current range.",
          ar: "انتقل إلى مقاس أكبر عندما يصبح الحفاض ضيقاً، أو يترك علامات واضحة، أو يحدث تسريب متكرر، أو يقترب وزن الطفل من الحد الأعلى للمقاس الحالي."
        }
      },
      {
        question: {
          en: "Which Baby Rexy sizes are available?",
          ar: "ما المقاسات المتوفرة من بيبي ريكسي؟"
        },
        answer: {
          en: "Baby Rexy is available in NB, S, M, L, XL, and XXL, covering babies from 2 kg up to 22 kg.",
          ar: "يتوفر بيبي ريكسي بمقاسات NB وS وM وL وXL وXXL، لتغطية أوزان الأطفال من 2 كغ حتى 22 كغ."
        }
      },
      {
        question: {
          en: "What helps Baby Rexy stay comfortable for daily use?",
          ar: "ما الذي يساعد بيبي ريكسي على توفير الراحة للاستخدام اليومي؟"
        },
        answer: {
          en: "The product line focuses on soft materials, a secure elastic waist, absorbent core structure, wetness distribution, and leakage barriers for dependable everyday care.",
          ar: "يركز هذا الخط على المواد الناعمة، وخصر مطاطي ثابت، وبنية ماصة، وتوزيع البلل، وحواجز مانعة للتسريب لعناية يومية يمكن الاعتماد عليها."
        }
      }
    ]
  },
  {
    slug: "hq-plus",
    title: { en: "HQ+", ar: "آتش كيو +" },
    category: { en: "Sanitary Pads", ar: "الفوط النسائية" },
    image: "/images/standardized/product-cards/hq-plus.png",
    cardImage: "/images/standardized/product-cards/hq-plus.png",
    bannerImage: "/images/standardized/banners/hq-plus.png",
    bannerSize: { width: 2400, height: 460 },
    logo: "/images/standardized/logos/hq-plus.png",
    excerpt: {
      en: "Thick sanitary pads with wings, cotton-like softness, fast absorption, and leakage protection.",
      ar: "فوط نسائية سميكة بالأجنحة، بنعومة القطن، وامتصاص سريع، وحماية من التسريب."
    },
    description: {
      en: "HQ+ thick sanitary pads are available in four options: Goodnight, Super Plus, Super, and Normal. Each pad is designed with side wings for a secure fit, a soft cotton-like surface, ADL fast-absorption support, deep distribution channels, super absorbent gel, and side leakage barriers for comfort, dryness, and confidence.",
      ar: "فوط آتش كيو السميكة متوفرة بالمقاسات الأربعة: ليلية، سوبر بلاس، سوبر، ونورمال. صممت كل فوطة بأجنحة جانبية لتثبيت أفضل، وسطح ناعم شبيه بالقطن، وطبقة ADL للمساعدة على سرعة الامتصاص، وأقنية توزيع عميقة، وجل فائق الامتصاص، وحواجز جانبية للحماية من التسريب والشعور بالراحة والجفاف والثقة."
    },
    features: productFeatureSets.sanitaryPads,
    detailFeatures: productFeatureSets.hqPads,
    sizes: productSizeGroups.hqSanitaryPads,
    faqs: [
      {
        question: {
          en: "Which HQ+ sanitary pad options are available?",
          ar: "ما الخيارات المتوفرة من فوط آتش كيو؟"
        },
        answer: {
          en: "HQ+ thick sanitary pads are available in Normal, Super, Super Plus, and Goodnight options for different daily and night protection needs.",
          ar: "تتوفر فوط آتش كيو السميكة بخيارات نورمال، سوبر، سوبر بلاس، وليلي لتناسب احتياجات الحماية اليومية والليلية المختلفة."
        }
      },
      {
        question: {
          en: "What helps HQ+ reduce leakage?",
          ar: "ما الذي يساعد آتش كيو على تقليل التسريب؟"
        },
        answer: {
          en: "HQ+ uses side wings, an ADL fast-absorption layer, deep distribution channels, super absorbent gel, and side leakage barriers to support better protection.",
          ar: "تعتمد آتش كيو على أجنحة جانبية، وطبقة ADL سريعة الامتصاص، وأقنية توزيع عميقة، وجل فائق الامتصاص، وحواجز جانبية للمساعدة على حماية أفضل."
        }
      },
      {
        question: {
          en: "Are HQ+ pads fragrance-free?",
          ar: "هل فوط آتش كيو خالية من العطور؟"
        },
        answer: {
          en: "Yes. HQ+ pads are presented as fragrance-free and UV sterilized to support comfort for sensitive skin.",
          ar: "نعم. يتم تقديم فوط آتش كيو بأنها خالية من المواد العطرية ومعقمة بتقنية UV لدعم الراحة للبشرة الحساسة."
        }
      },
      {
        question: {
          en: "How do I choose between Normal, Super, Super Plus, and Goodnight?",
          ar: "كيف أختار بين نورمال وسوبر وسوبر بلاس وليلي؟"
        },
        answer: {
          en: "Choose Normal for regular daily use, Super or Super Plus when stronger protection is preferred, and Goodnight for night use or longer wear.",
          ar: "اختاري نورمال للاستخدام اليومي العادي، وسوبر أو سوبر بلاس عند الحاجة إلى حماية أقوى، وليلي للاستخدام الليلي أو لفترة أطول."
        }
      }
    ]
  },
  {
    slug: "tizkar",
    title: { en: "Tizkar", ar: "تذكار" },
    category: { en: "Facial Tissues and Wipes", ar: "محارم ومناديل" },
    image: "/images/standardized/product-cards/tizkar.png",
    cardImage: "/images/standardized/product-cards/tizkar.png",
    bannerImage: "/images/standardized/banners/tizkar.png",
    bannerSize: { width: 2400, height: 460 },
    logo: "/images/standardized/logos/tizkar.png",
    excerpt: {
      en: "Soft facial tissues and wipes made for clean, comfortable family routines.",
      ar: "محارم ومناديل ناعمة لعناية عائلية نظيفة ومريحة."
    },
    description: {
      en: "Tizkar facial tissues are soft, high-quality products made from 100% natural cellulose for cleanliness and comfort. The range includes multiple weights and drying tissues for different everyday needs.",
      ar: "تذكار محارم وجه ناعمة وعالية الجودة، مصنوعة من السيليلوز الطبيعي بنسبة 100% لتوفير النظافة والراحة. تتوفر بعدة أوزان، إضافةً إلى محارم تنشيف عالية الجودة تلبي مختلف الاحتياجات."
    },
    features: productFeatureSets.tissues,
    sizes: productSizeGroups.tizkarTissues,
    faqs: [
      {
        question: {
          en: "Which Tizkar products are available?",
          ar: "ما منتجات تذكار المتوفرة؟"
        },
        answer: {
          en: "Tizkar includes soft facial tissues and practical drying tissues for daily home, office, and family care routines.",
          ar: "تضم تذكار محارم وجه ناعمة ومحارم تنشيف عملية للاستخدام اليومي في المنزل والمكتب وروتين العناية العائلية."
        }
      },
      {
        question: {
          en: "What are Tizkar facial tissues made from?",
          ar: "مم تصنع محارم وجه تذكار؟"
        },
        answer: {
          en: "Tizkar facial tissues are presented as high-quality tissues made from 100% natural cellulose for softness and cleanliness.",
          ar: "تقدم محارم وجه تذكار كمنتجات عالية الجودة مصنوعة من السليلوز الطبيعي بنسبة 100% لتوفير النعومة والنظافة."
        }
      },
      {
        question: {
          en: "Where can Tizkar tissues be used?",
          ar: "أين يمكن استخدام محارم تذكار؟"
        },
        answer: {
          en: "They are suitable for everyday use at home, in offices, in family spaces, and during practical cleaning or drying routines.",
          ar: "تناسب الاستخدام اليومي في المنزل والمكاتب والمساحات العائلية، إضافة إلى روتين التنظيف أو التنشيف العملي."
        }
      },
      {
        question: {
          en: "What is the difference between facial and drying tissues?",
          ar: "ما الفرق بين محارم الوجه ومحارم التنشيف؟"
        },
        answer: {
          en: "Facial tissues focus on soft everyday contact, while drying tissues are made for more practical drying and care tasks.",
          ar: "تركز محارم الوجه على النعومة للاستخدام اليومي، بينما صممت محارم التنشيف للمهام العملية الخاصة بالتنشيف والعناية."
        }
      }
    ]
  },
  {
    slug: "fantash",
    title: { en: "Fantash", ar: "فنطش" },
    category: { en: "Baby Diapers", ar: "حفاضات الأطفال" },
    image: "/images/standardized/product-cards/fantash.png",
    cardImage: "/images/standardized/product-cards/fantash.png",
    bannerImage: "/images/standardized/banners/fantash.png",
    bannerSize: { width: 2400, height: 460 },
    logo: "/images/standardized/logos/fantash.png",
    excerpt: {
      en: "Baby diapers combining practical quality, strong absorption, and accessible value.",
      ar: "فوط أطفال تجمع بين الجودة، الامتصاص القوي، والسعر المناسب."
    },
    description: {
      en: "Fantash baby diapers combine quality and value with a high-absorption core that helps protect from leakage for up to 12 hours. A fast-absorption layer keeps the surface dry, while deep channels distribute wetness across the core.",
      ar: "فنطش فوط أطفال من الأكثر انتشاراً ومبيعاً في سوريا، تجمع بين الجودة والسعر المناسب. تتميز بحشوة عالية الامتصاص توفر حماية من التسريب حتى 12 ساعة، وطبقة سريعة الامتصاص تحافظ على جفاف سطح الفوطة."
    },
    features: productFeatureSets.babyValue,
    sizes: productSizeGroups.babyDiapers,
    faqs: [
      {
        question: {
          en: "What makes Fantash suitable for everyday baby care?",
          ar: "ما الذي يجعل فنتاش مناسبا للعناية اليومية بالطفل؟"
        },
        answer: {
          en: "Fantash is designed around practical daily protection, combining a high-absorption core, dry surface support, and leakage protection for comfortable baby care.",
          ar: "تم تصميم فنتاش للحماية اليومية العملية من خلال حشوة عالية الامتصاص، ودعم لجفاف السطح، وحماية من التسريب لعناية مريحة بالطفل."
        }
      },
      {
        question: {
          en: "How long can Fantash help protect against leakage?",
          ar: "كم مدة الحماية التي يوفرها فنتاش ضد التسريب؟"
        },
        answer: {
          en: "The product line is presented with leakage protection for up to 12 hours, depending on the baby's size, fit, and usage conditions.",
          ar: "يوفر خط المنتج حماية من التسريب حتى 12 ساعة بحسب مقاس الطفل وملاءمة الحفاض وظروف الاستخدام."
        }
      },
      {
        question: {
          en: "Which Fantash diaper sizes are available?",
          ar: "ما المقاسات المتوفرة من حفاضات فنتاش؟"
        },
        answer: {
          en: "Fantash follows the baby diaper size guide from NB to XXL, covering babies from newborn stages up to larger toddler sizes.",
          ar: "يتبع فنتاش دليل مقاسات حفاضات الأطفال من NB حتى XXL، ليغطي مراحل حديثي الولادة وحتى المقاسات الأكبر للأطفال."
        }
      },
      {
        question: {
          en: "When should I change to the next size?",
          ar: "متى يجب الانتقال إلى المقاس التالي؟"
        },
        answer: {
          en: "Move to the next size when the diaper feels tight, leaves strong marks, leaks more often, or when your baby's weight approaches the top of the current range.",
          ar: "ينصح بالانتقال إلى المقاس التالي عندما يصبح الحفاض ضيقا، أو يترك علامات واضحة، أو يحدث تسريب متكرر، أو يقترب وزن الطفل من الحد الأعلى للمقاس الحالي."
        }
      }
    ]
  },
  {
    slug: "bino-avia",
    hidden: true,
    aliases: ["pinotex", "bino-tex", "avia"],
    title: { en: "Pinotex & Avia", ar: "بينوتكس وآفيا" },
    category: { en: "Adult Diapers", ar: "حفاضات كبار السن" },
    image: "/images/standardized/product-cards/bino-tex.png",
    cardImages: [
      "/images/standardized/product-cards/bino-tex.png",
      "/images/standardized/product-cards/avia.png"
    ],
    bannerImage: "/images/standardized/banners/adult-care.png",
    bannerSize: { width: 2400, height: 460 },
    logo: "/images/standardized/logos/bino.png",
    logos: [
      { name: "Pinotex", src: "/images/standardized/logos/bino.png" },
      { name: "Avia", src: "/images/standardized/logos/avia.png" }
    ],
    excerpt: {
      en: "Adult-care diapers from Pinotex and Avia, available in practical sizes for reliable daily protection.",
      ar: "حفاضات عناية لكبار السن من بينوتكس وآفيا بمقاسات عملية لحماية يومية موثوقة."
    },
    description: {
      en: "Pinotex and Avia adult diapers support comfortable daily care with fast absorption, reliable fluid retention, and leakage protection. The line includes separate Pinotex and Avia options in S, L, and XL formats.",
      ar: "تدعم حفاضات بينوتكس وآفيا العناية اليومية المريحة لكبار السن من خلال الامتصاص السريع واحتجاز السوائل والحماية من التسريب. يتضمن الخط خيارات منفصلة من بينوتكس وآفيا بمقاسات S وL وXL."
    },
    features: productFeatureSets.adultDiapers,
    sizes: productSizeGroups.aviaBinoAdultDiapers,
    faqs: [
      {
        question: {
          en: "Are Pinotex and Avia shown on one product page?",
          ar: "هل يتم عرض بينوتكس وآفيا في صفحة منتج واحدة؟"
        },
        answer: {
          en: "Yes. They are grouped together as adult-care diaper brands, with each available option shown separately by brand and size.",
          ar: "نعم. يتم عرضهما معا ضمن حفاضات العناية بكبار السن، مع توضيح كل خيار متوفر حسب العلامة والمقاس."
        }
      },
      {
        question: {
          en: "Which sizes are available?",
          ar: "ما المقاسات المتوفرة؟"
        },
        answer: {
          en: "The current product line shows Pinotex S, L, XL and Avia S, L, XL.",
          ar: "يعرض خط المنتج الحالي مقاسات بينوتكس S وL وXL، ومقاسات آفيا S وL وXL."
        }
      },
      {
        question: {
          en: "What are these products designed for?",
          ar: "لأي استخدام صممت هذه المنتجات؟"
        },
        answer: {
          en: "They are made for adult-care routines that need dependable absorption, fluid retention, and everyday comfort.",
          ar: "صممت لروتين العناية بكبار السن الذي يحتاج إلى امتصاص موثوق واحتجاز للسوائل وراحة يومية."
        }
      },
      {
        question: {
          en: "How should the right option be selected?",
          ar: "كيف يتم اختيار الخيار المناسب؟"
        },
        answer: {
          en: "Choose by the preferred brand and the size that best matches the user's fit and coverage needs.",
          ar: "يتم الاختيار حسب العلامة المفضلة والمقاس الأنسب لاحتياج المستخدم من الملاءمة والتغطية."
        }
      }
    ]
  },
  {
    slug: "pinotex",
    aliases: ["bino-tex"],
    title: { en: "Pinotex", ar: "بينوتكس" },
    category: { en: "Adult Diapers", ar: "حفاضات كبار السن" },
    image: "/images/standardized/product-cards/bino-tex.png",
    cardImage: "/images/standardized/product-cards/bino-tex.png",
    bannerImage: "/images/standardized/banners/adult-care.png",
    bannerSize: { width: 2400, height: 460 },
    logo: "/images/standardized/logos/bino.png",
    excerpt: {
      en: "Adult-care diapers available in multiple sizes and backsheet formats.",
      ar: "فوط مخصصة لكبار السن بعدة مقاسات وخيارات خلفية."
    },
    description: {
      en: "Pinotex adult diapers provide fast absorption and reliable fluid retention for comfort and protection. The line is available in S, L, and XL options from the new Pinotex collection.",
      ar: "بينوتكس فوط مخصصة لكبار السن، توفر امتصاصاً سريعاً وقدرة عالية على احتجاز السوائل لضمان الراحة والحماية. يتوفر الخط بمقاسات S وL وXL من مجموعة بينوتكس الجديدة."
    },
    features: productFeatureSets.adultDiapers,
    sizes: productSizeGroups.aviaBinoAdultDiapers.filter((size) => size.label.en.startsWith("Pinotex")),
    faqs: [
      {
        question: {
          en: "Which Pinotex options are available?",
          ar: "ما خيارات بينوتكس المتوفرة؟"
        },
        answer: {
          en: "Pinotex is shown in Small, Large, and X-Large options using the updated product images.",
          ar: "يتم عرض بينوتكس بخيارات صغير وكبير وكبير جدا باستخدام صور المنتج المحدثة."
        }
      },
      {
        question: {
          en: "Is Pinotex for adult care?",
          ar: "هل بينوتكس مخصص للعناية بكبار السن؟"
        },
        answer: {
          en: "Yes. Pinotex is an adult diaper line made for daily comfort, absorption, and fluid retention.",
          ar: "نعم. بينوتكس خط حفاضات لكبار السن مصمم للراحة اليومية والامتصاص واحتجاز السوائل."
        }
      },
      {
        question: {
          en: "How should I choose the size?",
          ar: "كيف أختار المقاس المناسب؟"
        },
        answer: {
          en: "Choose the option that best matches the user’s fit and coverage needs.",
          ar: "اختر الخيار الأنسب لاحتياج المستخدم من حيث الملاءمة والتغطية."
        }
      }
    ]
  },
  {
    slug: "avia",
    title: { en: "Avia", ar: "آفيا" },
    category: { en: "Adult Diapers", ar: "حفاضات كبار السن" },
    image: "/images/standardized/product-cards/avia.png",
    cardImage: "/images/standardized/product-cards/avia.png",
    bannerImage: "/images/standardized/banners/adult-care.png",
    bannerSize: { width: 2400, height: 460 },
    logo: "/images/standardized/logos/avia.png",
    excerpt: {
      en: "Adult diapers focused on fast absorption, reliable protection, and practical sizing.",
      ar: "فوط كبار السن للامتصاص السريع والحماية الموثوقة والمقاسات العملية."
    },
    description: {
      en: "Avia adult diapers provide fast absorption, leakage protection, and reliable fluid retention. The line is available in S, L, and XL options from the new Avia collection.",
      ar: "آفيا فوط مخصصة لكبار السن، توفر امتصاصاً سريعاً وحماية موثوقة من التسريب، مع قدرة عالية على احتجاز السوائل. يتوفر الخط بمقاسات S وL وXL من مجموعة آفيا الجديدة."
    },
    features: productFeatureSets.adultDiapers,
    sizes: productSizeGroups.aviaBinoAdultDiapers.filter((size) => size.label.en.startsWith("Avia")),
    faqs: [
      {
        question: {
          en: "Which Avia options are available?",
          ar: "ما خيارات آفيا المتوفرة؟"
        },
        answer: {
          en: "Avia is shown in Small, Large, and X-Large options using the updated product images.",
          ar: "يتم عرض آفيا بخيارات صغير وكبير وكبير جدا باستخدام صور المنتج المحدثة."
        }
      },
      {
        question: {
          en: "What is Avia designed for?",
          ar: "لأي استخدام صممت آفيا؟"
        },
        answer: {
          en: "Avia is designed for adult-care routines that need dependable absorption, leakage protection, and comfort.",
          ar: "صممت آفيا لروتين العناية بكبار السن الذي يحتاج إلى امتصاص موثوق وحماية من التسريب وراحة."
        }
      },
      {
        question: {
          en: "Does Avia use the same banner style as Pinotex?",
          ar: "هل تستخدم آفيا نفس تصميم بانر بينوتكس؟"
        },
        answer: {
          en: "Yes. Avia and Pinotex use the same shared adult-care banner while keeping separate product pages and size options.",
          ar: "نعم. تستخدم آفيا وبينوتكس نفس بانر العناية بكبار السن مع الحفاظ على صفحات وخيارات منفصلة لكل علامة."
        }
      }
    ]
  }
];

export const visibleProducts = products.filter((product) => !product.hidden);

export const featuredProductSlugs = ["baby-rexy", "hq-plus", "tizkar"];

export const diaperSizes = [
  { size: "NB", name: { en: "Newborn", ar: "حديث الولادة" }, range: "2-5", min: 2, max: 5 },
  { size: "S", name: { en: "Small", ar: "صغير" }, range: "3-6", min: 3, max: 6 },
  { size: "M", name: { en: "Medium", ar: "وسط" }, range: "5-9", min: 5, max: 9 },
  { size: "L", name: { en: "Large", ar: "كبير" }, range: "9-15", min: 9, max: 15 },
  { size: "XL", name: { en: "X-Large", ar: "كبير جداً" }, range: "12-19", min: 12, max: 19 },
  { size: "XXL", name: { en: "XX-Large", ar: "كبير جداً 2" }, range: "15-22", min: 15, max: 22 }
];

export const whyFeatures = [
  {
    icon: "droplets",
    title: { en: "Effective Absorption", ar: "امتصاص فعّال" },
    description: {
      en: "Designed to absorb liquid quickly and provide dependable protection during everyday use.",
      ar: "مصممة لامتصاص السوائل بسرعة وتوفير حماية موثوقة في الاستخدام اليومي."
    }
  },
  {
    icon: "shield",
    title: { en: "Reliable Fluid Retention", ar: "احتجاز موثوق للسوائل" },
    description: {
      en: "Selected absorbent structures help retain liquid and reduce unwanted leakage.",
      ar: "تساعد البنية الماصة المختارة على احتجاز السوائل وتقليل التسريب غير المرغوب."
    }
  },
  {
    icon: "feather",
    title: { en: "Soft Materials", ar: "مواد ناعمة" },
    description: {
      en: "Developed with comfort in mind using soft materials suitable for frequent use.",
      ar: "مطورة مع التركيز على الراحة باستخدام مواد ناعمة مناسبة للاستخدام المتكرر."
    }
  },
  {
    icon: "users",
    title: { en: "For Every Life Stage", ar: "لكل مراحل الحياة" },
    description: {
      en: "Hygiene solutions for babies, women, adults, seniors, families, and commercial users.",
      ar: "حلول عناية صحية للأطفال والنساء والبالغين وكبار السن والعائلات والاستخدام التجاري."
    }
  },
  {
    icon: "boxes",
    title: { en: "Different Sizes and Formats", ar: "مقاسات وأشكال متعددة" },
    description: {
      en: "A portfolio with different sizes, package formats, weights, and protection levels.",
      ar: "مجموعة تضم مقاسات وتنسيقات تعبئة وأوزان ومستويات حماية متنوعة."
    }
  },
  {
    icon: "badge",
    title: { en: "Quality-Focused Production", ar: "إنتاج يركز على الجودة" },
    description: {
      en: "Reliable practical products, from absorbent hygiene items to natural-cellulose tissues.",
      ar: "منتجات عملية موثوقة، من منتجات العناية الماصة إلى المحارم المصنوعة من السيليلوز الطبيعي."
    }
  }
];

export const categories = [
  {
    icon: "baby",
    logo: "/images/standardized/logos/rexy.png",
    art: "/images/categories/baby-diapers.svg",
    title: { en: "Baby Diapers", ar: "حفاضات الأطفال" }
  },
  {
    icon: "sparkles",
    logo: "/images/standardized/logos/hq-plus.png",
    art: "/images/categories/sanitary-pads.svg",
    title: { en: "Sanitary Pads", ar: "الفوط النسائية" }
  },
  {
    icon: "shield",
    logo: "/images/standardized/logos/bino.png",
    art: "/images/categories/adult-diapers.svg",
    title: { en: "Adult Diapers", ar: "حفاضات كبار السن" }
  },
  {
    icon: "leaf",
    logo: "/images/standardized/logos/tizkar.png",
    art: "/images/categories/facial-tissues.svg",
    title: { en: "Facial Tissues", ar: "محارم الوجه" }
  }
];

export const blogs = [
  {
    slug: "right-diaper-size",
    image: "https://images.pexels.com/photos/7491225/pexels-photo-7491225.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "https://www.pampers.com/en-us/baby/diapering/article/diaper-size-and-weight-chart",
    source: { en: "Pampers", ar: "Pampers" },
    category: { en: "Baby Care", ar: "عناية الأطفال" },
    title: {
      en: "Baby Diaper Size Chart Guide",
      ar: "دليل مقاسات حفاضات الأطفال حسب الوزن"
    },
    description: {
      en: "A practical guide for matching diaper size to current weight, checking fit, and spotting signs that it is time to size up.",
      ar: "دليل عملي لمطابقة مقاس الحفاض مع وزن الطفل الحالي، وفحص الملاءمة، ومعرفة علامات الانتقال إلى مقاس أكبر."
    }
  },
  {
    slug: "menstrual-pads-guide",
    image: "https://images.pexels.com/photos/7692338/pexels-photo-7692338.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "https://health.clevelandclinic.org/sanitary-pads",
    source: { en: "Cleveland Clinic", ar: "Cleveland Clinic" },
    category: { en: "Women Care", ar: "عناية النساء" },
    title: {
      en: "Menstrual Pads 101: How To Choose and Use Them",
      ar: "أساسيات الفوط الصحية: كيف تختارينها وتستخدمينها"
    },
    description: {
      en: "A clear overview of pad types, absorbency, materials, changing frequency, and comfort considerations for daily period care.",
      ar: "نظرة واضحة على أنواع الفوط، ومستوى الامتصاص، والمواد، ومواعيد التغيير، وعوامل الراحة للعناية اليومية أثناء الدورة."
    }
  },
  {
    slug: "adult-diaper-comfort",
    image: "https://images.pexels.com/photos/29372693/pexels-photo-29372693.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "https://nafc.org/adult-absorbents/",
    source: { en: "NAFC", ar: "NAFC" },
    category: { en: "Adult Care", ar: "عناية كبار السن" },
    title: {
      en: "Adult Absorbents: What To Look For",
      ar: "منتجات الامتصاص للكبار: ما الذي يجب الانتباه إليه"
    },
    description: {
      en: "A useful breakdown of form, fit, and function when choosing adult incontinence products for comfort, discretion, and daily confidence.",
      ar: "شرح مفيد لعوامل الشكل والملاءمة والوظيفة عند اختيار منتجات سلس البول للكبار من أجل الراحة والخصوصية والثقة اليومية."
    }
  }
];

export const news = [
  {
    slug: "community-hand-hygiene-guidelines",
    image: "https://images.pexels.com/photos/3872806/pexels-photo-3872806.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "https://www.who.int/news/item/15-10-2025-new-guidelines-on-community-hand-hygiene-to-help-governments-reduce-the-spread-of-infectious-diseases",
    source: { en: "WHO", ar: "WHO" },
    category: { en: "Global Hygiene Guidance", ar: "إرشادات النظافة العالمية" },
    date: { en: "15 October 2025", ar: "15 أكتوبر 2025" },
    title: {
      en: "WHO and UNICEF Release Community Hand Hygiene Guidelines",
      ar: "منظمة الصحة العالمية ويونيسف تصدران إرشادات نظافة اليدين المجتمعية"
    },
    description: {
      en: "The first global guidelines for hand hygiene in homes, schools, public spaces, and institutions focus on reducing preventable illness.",
      ar: "تركز أول إرشادات عالمية لنظافة اليدين في المنازل والمدارس والأماكن العامة والمؤسسات على تقليل الأمراض التي يمكن الوقاية منها."
    }
  },
  {
    slug: "menstrual-health-fact-sheet",
    image: "https://images.pexels.com/photos/5938424/pexels-photo-5938424.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "https://www.who.int/news-room/fact-sheets/detail/menstrual-health",
    source: { en: "WHO", ar: "WHO" },
    category: { en: "Menstrual Health", ar: "الصحة الشهرية" },
    date: { en: "18 June 2026", ar: "18 يونيو 2026" },
    title: {
      en: "WHO Updates Its Menstrual Health Fact Sheet",
      ar: "منظمة الصحة العالمية تحدث صحيفة حقائق الصحة الشهرية"
    },
    description: {
      en: "The update highlights access to menstrual materials, safe facilities, accurate information, dignity, and health support.",
      ar: "يسلط التحديث الضوء على الوصول إلى مواد الدورة الشهرية والمرافق الآمنة والمعلومات الدقيقة والكرامة والدعم الصحي."
    }
  },
  {
    slug: "wash-for-every-child",
    image: "https://images.pexels.com/photos/7492918/pexels-photo-7492918.jpeg?auto=compress&cs=tinysrgb&w=900",
    href: "https://www.unicef.org/eu/stories/water-sanitation-and-hygiene-every-child",
    source: { en: "UNICEF", ar: "UNICEF" },
    category: { en: "Children and Hygiene", ar: "الأطفال والنظافة" },
    date: { en: "15 April 2026", ar: "15 أبريل 2026" },
    title: {
      en: "Water, Sanitation and Hygiene for Every Child",
      ar: "المياه والصرف الصحي والنظافة لكل طفل"
    },
    description: {
      en: "UNICEF highlights how safe water, sanitation, and hygiene protect children’s survival, health, dignity, and learning.",
      ar: "توضح يونيسف كيف تحمي المياه الآمنة والصرف الصحي والنظافة بقاء الأطفال وصحتهم وكرامتهم وتعلمهم."
    }
  }
];

export const faqs = [
  {
    question: { en: "What types of products does DRC offer?", ar: "ما أنواع المنتجات التي تقدمها DRC؟" },
    answer: {
      en: "DRC offers baby diapers, sanitary pads, adult diapers, facial tissues, drying tissues, and baby wipes through a variety of product brands.",
      ar: "تقدم DRC حفاضات الأطفال، والفوط النسائية، وحفاضات كبار السن، ومحارم الوجه، ومحارم التنشيف، والمناديل المبللة للأطفال من خلال عدة علامات تجارية."
    }
  },
  {
    question: { en: "How do I choose the correct Baby Rexy diaper size?", ar: "كيف أختار مقاس بيبي ريكسي المناسب؟" },
    answer: {
      en: "Choose the size according to your baby's current weight and the weight range printed on the product packaging. A proper fit should feel secure without leaving strong marks.",
      ar: "اختر المقاس حسب وزن الطفل الحالي ونطاق الوزن المطبوع على العبوة. يجب أن يكون المقاس ثابتاً دون ترك علامات قوية على البشرة."
    }
  },
  {
    question: { en: "Which adult-diaper sizes are available?", ar: "ما مقاسات حفاضات كبار السن المتوفرة؟" },
    answer: {
      en: "DRC adult diapers are available in Small, Medium, Large, and X-Large. The correct size should be selected according to waist measurement and the package chart.",
      ar: "تتوفر حفاضات كبار السن بمقاسات Small وMedium وLarge وX-Large. يجب اختيار المقاس حسب قياس الخصر وجدول المقاسات على العبوة."
    }
  },
  {
    question: { en: "What types of adult-diaper backing are available?", ar: "ما أنواع خلفية حفاضات كبار السن المتوفرة؟" },
    answer: {
      en: "Selected products are available with either a cloth-like backsheet or a nylon backsheet. Availability may differ by brand and product line.",
      ar: "تتوفر بعض المنتجات بخلفية قماشية أو خلفية نايلون. قد تختلف الإتاحة حسب العلامة وخط المنتج."
    }
  },
  {
    question: { en: "Are HQ+ sanitary pads suitable for sensitive skin?", ar: "هل فوط HQ+ مناسبة للبشرة الحساسة؟" },
    answer: {
      en: "Selected HQ+ products are presented as safe for sensitive skin and include soft, cotton-like materials. Customers should follow package instructions and discontinue use if irritation occurs.",
      ar: "تُعرض بعض منتجات HQ+ على أنها آمنة للبشرة الحساسة وتضم مواد ناعمة شبيهة بالقطن. يجب اتباع تعليمات العبوة والتوقف عن الاستخدام عند حدوث تهيج."
    }
  },
  {
    question: { en: "What are DRC facial tissues made from?", ar: "ممّ تصنع محارم الوجه من DRC؟" },
    answer: {
      en: "The provided product information states that DRC facial tissues are made from 100% natural cellulose and are available in different weights and package formats.",
      ar: "تشير معلومات المنتج المتوفرة إلى أن محارم الوجه مصنوعة من السيليلوز الطبيعي بنسبة 100% ومتوفرة بأوزان وتنسيقات تعبئة مختلفة."
    }
  }
];

export const footer = {
  description: {
    en: "Reliable hygiene and personal-care products for babies, women, adults, and families.",
    ar: "منتجات موثوقة للعناية الصحية والشخصية للأطفال والنساء وكبار السن والعائلة."
  },
  quickLinksTitle: { en: "Quick Links", ar: "روابط سريعة" },
  productLinksTitle: { en: "Products", ar: "المنتجات" },
  copyright: {
    en: "All rights reserved.",
    ar: "جميع الحقوق محفوظة."
  }
};
