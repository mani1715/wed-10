/**
 * PHASE 34: MASTER THEMES SYSTEM
 * Premium theme definitions for ₹10k-15k weddings
 * 
 * Each theme has:
 * - Locked layout structure
 * - Locked typography pairing
 * - Controlled color customization
 * - Animation level (none/subtle/festive)
 * - Glassmorphism support
 * - Plan gating (FREE/SILVER/GOLD/PLATINUM)
 */

export const MASTER_THEMES = {
  royal_heritage: {
    id: 'royal_heritage',
    name: 'Royal Heritage',
    description: 'Crimson and gold majesty with regal elegance',
    category: 'traditional',
    layoutType: 'classic',
    typography: {
      heading: '"Playfair Display", serif',
      body: '"Lora", serif',
      accent: '"Cinzel", serif'
    },
    colors: {
      primary: '#8B0000',
      accent: '#FFD700',
      background: '#FFF8E7',
      backgroundVariant: '#F5E6D3',
      text: '#2C1810',
      textLight: '#6B4423'
    },
    defaultAnimationLevel: 'subtle',
    glassmorphismSupport: true,
    planRequired: 'FREE',
    previewImage: '/themes/royal_heritage.jpg',
    order: 1
  },

  temple_gold: {
    id: 'temple_gold',
    name: 'Temple Gold',
    description: 'Sacred gold with temple-inspired grandeur',
    category: 'traditional',
    layoutType: 'classic',
    typography: {
      heading: '"Cinzel", serif',
      body: '"Crimson Text", serif',
      accent: '"Cormorant Garamond", serif'
    },
    colors: {
      primary: '#DAA520',
      accent: '#8B4513',
      background: '#FFFAF0',
      backgroundVariant: '#FFF8DC',
      text: '#3E2723',
      textLight: '#5D4037'
    },
    defaultAnimationLevel: 'festive',
    glassmorphismSupport: true,
    planRequired: 'FREE',
    previewImage: '/themes/temple_gold.jpg',
    order: 2
  },

  peacock_dream: {
    id: 'peacock_dream',
    name: 'Peacock Dream',
    description: 'Vibrant teal and emerald with peacock elegance',
    category: 'vibrant',
    layoutType: 'modern',
    typography: {
      heading: '"Libre Baskerville", serif',
      body: '"Source Serif Pro", serif',
      accent: '"Playfair Display", serif'
    },
    colors: {
      primary: '#008B8B',
      accent: '#50C878',
      background: '#F0FFF0',
      backgroundVariant: '#E0F2F1',
      text: '#004D40',
      textLight: '#00796B'
    },
    defaultAnimationLevel: 'festive',
    glassmorphismSupport: true,
    planRequired: 'SILVER',
    previewImage: '/themes/peacock_dream.jpg',
    order: 3
  },

  modern_lotus: {
    id: 'modern_lotus',
    name: 'Modern Lotus',
    description: 'Contemporary rose with lotus-inspired softness',
    category: 'romantic',
    layoutType: 'modern',
    typography: {
      heading: '"Poppins", sans-serif',
      body: '"Inter", sans-serif',
      accent: '"Montserrat", sans-serif'
    },
    colors: {
      primary: '#FF1493',
      accent: '#FFB6C1',
      background: '#FFF0F5',
      backgroundVariant: '#FFE4E1',
      text: '#4A154B',
      textLight: '#7B1FA2'
    },
    defaultAnimationLevel: 'subtle',
    glassmorphismSupport: true,
    planRequired: 'SILVER',
    previewImage: '/themes/modern_lotus.jpg',
    order: 4
  },

  modern_pastel: {
    id: 'modern_pastel',
    name: 'Modern Pastel',
    description: 'Soft rose, sage, and sand minimalism',
    category: 'modern',
    layoutType: 'minimalist',
    typography: {
      heading: '"Jost", sans-serif',
      body: '"Karla", sans-serif',
      accent: '"DM Sans", sans-serif'
    },
    colors: {
      primary: '#D4A5A5',
      accent: '#9CAF88',
      background: '#FAF9F6',
      backgroundVariant: '#F5F5DC',
      text: '#3E3E3E',
      textLight: '#717171'
    },
    defaultAnimationLevel: 'subtle',
    glassmorphismSupport: true,
    planRequired: 'GOLD',
    previewImage: '/themes/modern_pastel.jpg',
    order: 5
  },

  midnight_sangeet: {
    id: 'midnight_sangeet',
    name: 'Midnight Sangeet',
    description: 'Deep indigo, silver, and black sophistication',
    category: 'luxury',
    layoutType: 'modern',
    typography: {
      heading: '"Bodoni Moda", serif',
      body: '"Roboto", sans-serif',
      accent: '"Oswald", sans-serif'
    },
    colors: {
      primary: '#191970',
      accent: '#C0C0C0',
      background: '#0A0A0A',
      backgroundVariant: '#1C1C1C',
      text: '#FFFFFF',
      textLight: '#B0B0B0'
    },
    defaultAnimationLevel: 'festive',
    glassmorphismSupport: true,
    planRequired: 'GOLD',
    previewImage: '/themes/midnight_sangeet.jpg',
    order: 6
  },

  ivory_elegance: {
    id: 'ivory_elegance',
    name: 'Ivory Elegance',
    description: 'Timeless ivory with champagne accents',
    category: 'elegant',
    layoutType: 'classic',
    typography: {
      heading: '"Cormorant", serif',
      body: '"Lato", sans-serif',
      accent: '"EB Garamond", serif'
    },
    colors: {
      primary: '#FFFFF0',
      accent: '#F7E7CE',
      background: '#FAFAFA',
      backgroundVariant: '#F5F5F5',
      text: '#2F2F2F',
      textLight: '#5A5A5A'
    },
    defaultAnimationLevel: 'none',
    glassmorphismSupport: true,
    planRequired: 'PLATINUM',
    previewImage: '/themes/ivory_elegance.jpg',
    order: 7
  },

  dark_royal: {
    id: 'dark_royal',
    name: 'Dark Royal',
    description: 'Luxurious dark purple with gold highlights',
    category: 'luxury',
    layoutType: 'modern',
    typography: {
      heading: '"Yeseva One", serif',
      body: '"Nunito Sans", sans-serif',
      accent: '"Raleway", sans-serif'
    },
    colors: {
      primary: '#4B0082',
      accent: '#FFD700',
      background: '#1A0033',
      backgroundVariant: '#2D004D',
      text: '#F5F5F5',
      textLight: '#CCCCCC'
    },
    defaultAnimationLevel: 'festive',
    glassmorphismSupport: true,
    planRequired: 'PLATINUM',
    previewImage: '/themes/dark_royal.jpg',
    order: 8
  }
};

// Helper functions
export const getThemeById = (themeId) => {
  return MASTER_THEMES[themeId] || MASTER_THEMES.royal_heritage;
};

export const getAllThemes = () => {
  return Object.values(MASTER_THEMES).sort((a, b) => a.order - b.order);
};

export const getThemesByCategory = (category) => {
  return getAllThemes().filter(theme => theme.category === category);
};

export const getThemesByPlan = (planType) => {
  const planHierarchy = {
    FREE: ['FREE'],
    SILVER: ['FREE', 'SILVER'],
    GOLD: ['FREE', 'SILVER', 'GOLD'],
    PLATINUM: ['FREE', 'SILVER', 'GOLD', 'PLATINUM']
  };
  
  const allowedPlans = planHierarchy[planType] || ['FREE'];
  return getAllThemes().filter(theme => allowedPlans.includes(theme.planRequired));
};

export const canUseTheme = (themeId, userPlan) => {
  const theme = getThemeById(themeId);
  const accessibleThemes = getThemesByPlan(userPlan);
  return accessibleThemes.some(t => t.id === themeId);
};

export const getCategoryLabel = (category) => {
  const labels = {
    traditional: 'Traditional',
    romantic: 'Romantic',
    vibrant: 'Vibrant',
    modern: 'Modern',
    elegant: 'Elegant',
    luxury: 'Luxury'
  };
  return labels[category] || category;
};

export const getPlanLabel = (plan) => {
  const labels = {
    FREE: 'Free',
    SILVER: 'Silver',
    GOLD: 'Gold',
    PLATINUM: 'Platinum'
  };
  return labels[plan] || plan;
};

// Animation variants for Framer Motion
export const getAnimationVariants = (level) => {
  if (level === 'none') {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 }
    };
  }
  
  if (level === 'subtle') {
    return {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
      }
    };
  }
  
  // Festive animations
  return {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };
};
