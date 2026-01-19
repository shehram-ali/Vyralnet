/**
 * App route constants
 * Centralized route paths for type-safe navigation
 */

export const ROUTES = {
  // Root routes
  SPLASH: '/' as const,

  // Onboarding routes
  ONBOARDING: {
    INDEX: '/(onboarding)' as const,
    SIGNUP_OPTIONS: '/(onboarding)/signup-options' as const,
    COMMON_SIGNUP: '/(onboarding)/common-signup' as const,
    INFLUENCER_ONBOARDING: '/(onboarding)/influencer-onboarding' as const,
    BRAND_ONBOARDING: '/(onboarding)/brand-onboarding' as const,
  },

  // Auth routes
  AUTH: {
    LOGIN: '/(auth)/login' as const,
    SIGNUP: '/(auth)/signup' as const,
  },

  // Tab routes
  TABS: {
    ROOT: '/(tabs)' as const,
    HOME: '/(tabs)/home' as const,
  },

  // Home sub-routes
  HOME: {
    INDEX: '/(tabs)/home' as const,
    NOTIFICATIONS: '/(tabs)/home/notifications' as const,
  },

  // Feature routes (shared)
  FEATURES: {
    CHALLENGES: '/(features)/challenges' as const,
    LEADERBOARD: '/(features)/leaderboard' as const,
    REPORTS: '/(features)/reports' as const,
    TRANSACTIONS: '/(features)/transactions' as const,
    EDIT_PROFILE: '/(features)/edit-profile' as const,
    PUBLIC_PROFILE: '/(features)/public-profile' as const,
    EDIT_PACKAGES: '/(features)/edit-packages' as const,
    NOTIFICATIONS: '/(features)/notifications' as const,
    CHANGE_PASSWORD: '/(features)/change-password' as const,
    PAYMENT_METHODS: '/(features)/payment-methods' as const,
    ADD_PAYMENT_METHOD: '/(features)/add-payment-method' as const,
    HELP_SUPPORT: '/(features)/help-support' as const,
    DELETE_ACCOUNT: '/(features)/delete-account' as const,
    MEMBERSHIP: '/(features)/membership' as const,
  },

  // Brand-specific feature routes
  BRAND: {
    SEARCH_TALENTS: '/(features)/(brand)/search-talents' as const,
    FIND_INFLUENCER: '/(features)/(brand)/find-influencer' as const,
    MY_NETWORK: '/(features)/(brand)/my-network' as const,
    CONTRACTS: '/(features)/(brand)/contracts' as const,
    FAVORITE_INFLUENCERS: '/(features)/(brand)/favorite-influencers' as const,
    INFLUENCER_PROFILE: '/(features)/(brand)/influencer-profile' as const,
    JOB_OFFER: '/(features)/(brand)/job-offer' as const,
    JOB_DETAILS: '/(features)/(brand)/job-details' as const,
    CHAT: '/(features)/(brand)/chat' as const,
    NEW_CHALLENGE: '/(features)/(brand)/new-challenge' as const,
  },

  // Influencer-specific feature routes
  INFLUENCER: {
    JOB_INVITATION: '/(features)/(influencer)/job-invitation' as const,
    MY_JOBS: '/(features)/(influencer)/my-jobs' as const,
  },

  // Other routes
  NOT_FOUND: '/+not-found' as const,
} as const;

/**
 * Helper to get route path
 * Usage: getRoute('AUTH', 'LOGIN') => '/(auth)/login'
 */
export const getRoute = (
  group: keyof typeof ROUTES,
  route?: string
): string => {
  if (route && typeof ROUTES[group] === 'object') {
    return (ROUTES[group] as any)[route];
  }
  return ROUTES[group] as string;
};
