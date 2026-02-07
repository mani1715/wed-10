"""
Theme System Constants for Backend Validation

This file contains theme configuration constants used for validation
in backend models and API endpoints. It must stay synchronized with
the frontend theme system (themeSystem.js).

Version: 1.0.0
Last Updated: 2025
"""

# All available theme IDs
THEME_IDS = [
    'royal_red',
    'temple_gold',
    'divine_yellow',
    'sacred_orange',
    'lotus_pink',
    'peacock_blue',
    'emerald_green',
    'classic_ivory'
]

# Default theme
DEFAULT_THEME = 'royal_red'

# Theme categories for organization
THEME_CATEGORIES = {
    'traditional': ['royal_red', 'temple_gold', 'divine_yellow', 'sacred_orange', 'classic_ivory'],
    'romantic': ['lotus_pink'],
    'vibrant': ['peacock_blue', 'emerald_green']
}

# Theme features mapping
THEME_FEATURES = {
    'royal_red': {
        'hasLord': True,
        'hasGantalu': True,
        'hasFire': True
    },
    'temple_gold': {
        'hasLord': True,
        'hasGantalu': True,
        'hasFire': True
    },
    'divine_yellow': {
        'hasLord': True,
        'hasGantalu': True,
        'hasFire': True
    },
    'sacred_orange': {
        'hasLord': True,
        'hasGantalu': True,
        'hasFire': True
    },
    'lotus_pink': {
        'hasLord': True,
        'hasGantalu': True,
        'hasFire': True
    },
    'peacock_blue': {
        'hasLord': True,
        'hasGantalu': True,
        'hasFire': True
    },
    'emerald_green': {
        'hasLord': True,
        'hasGantalu': True,
        'hasFire': True
    },
    'classic_ivory': {
        'hasLord': True,
        'hasGantalu': True,
        'hasFire': True
    }
}


def is_valid_theme(theme_id: str) -> bool:
    """
    Check if a theme ID is valid
    
    Args:
        theme_id: The theme identifier to validate
        
    Returns:
        bool: True if theme ID exists in THEME_IDS
    """
    return theme_id in THEME_IDS


def get_default_theme() -> str:
    """
    Get the default theme ID
    
    Returns:
        str: Default theme identifier
    """
    return DEFAULT_THEME


def get_theme_features(theme_id: str) -> dict:
    """
    Get feature flags for a theme
    
    Args:
        theme_id: The theme identifier
        
    Returns:
        dict: Dictionary with hasLord, hasGantalu, hasFire flags
    """
    return THEME_FEATURES.get(theme_id, {
        'hasLord': False,
        'hasGantalu': False,
        'hasFire': False
    })


def theme_supports_lord(theme_id: str) -> bool:
    """
    Check if theme supports lord backgrounds
    
    Args:
        theme_id: The theme identifier
        
    Returns:
        bool: True if theme supports lord backgrounds
    """
    features = get_theme_features(theme_id)
    return features.get('hasLord', False)


def theme_supports_gantalu(theme_id: str) -> bool:
    """
    Check if theme supports gantalu (temple bells)
    
    Args:
        theme_id: The theme identifier
        
    Returns:
        bool: True if theme supports gantalu
    """
    features = get_theme_features(theme_id)
    return features.get('hasGantalu', False)


def theme_supports_fire(theme_id: str) -> bool:
    """
    Check if theme supports fire/lamp elements
    
    Args:
        theme_id: The theme identifier
        
    Returns:
        bool: True if theme supports fire elements
    """
    features = get_theme_features(theme_id)
    return features.get('hasFire', False)


def get_traditional_themes() -> list:
    """
    Get list of traditional theme IDs
    
    Returns:
        list: Theme IDs with religious/traditional features
    """
    return [theme_id for theme_id in THEME_IDS 
            if theme_supports_lord(theme_id) and 
            (theme_supports_gantalu(theme_id) or theme_supports_fire(theme_id))]


def get_modern_themes() -> list:
    """
    Get list of modern theme IDs
    
    Returns:
        list: Theme IDs without religious elements
    """
    return [theme_id for theme_id in THEME_IDS 
            if not theme_supports_lord(theme_id) and 
            not theme_supports_gantalu(theme_id) and 
            not theme_supports_fire(theme_id)]


def get_themes_by_category(category: str) -> list:
    """
    Get theme IDs by category
    
    Args:
        category: Category name (traditional, modern, romantic, luxury)
        
    Returns:
        list: List of theme IDs in the category
    """
    return THEME_CATEGORIES.get(category, [])
