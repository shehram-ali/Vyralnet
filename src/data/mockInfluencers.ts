import { Person1, Person2, Person3 } from '../../assets/images';

export interface Package {
  id: string;
  title: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
  description: string;
}

export interface ReviewStats {
  completedJobs: number;
  inProgress: number;
  challengeWins: number;
  rating: number;
}

export interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: any;
  verified: boolean;
  location: {
    city: string;
    country: string;
  };
  stats: {
    xpScore: number;
    followers: string;
    engagementRate: string;
    tier: 'Top Pro' | 'Rising Talent' | 'Pro';
    badge: 'purple' | 'gold';
  };
  categories: string[];
  bio: string;
  gallery: string[];
  packages: Package[];
  reviewStats: ReviewStats;
  isFavorite: boolean;
  instagramHandle?: string;
}

export const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'Susan Adams',
    username: '@susanadmain1',
    avatar: Person1,
    verified: true,
    location: {
      city: 'NYC',
      country: 'United States',
    },
    stats: {
      xpScore: 460,
      followers: '47.2K',
      engagementRate: '2.5%',
      tier: 'Top Pro',
      badge: 'purple',
    },
    categories: ['Comedy', 'Lifestyle'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, mattis tellus. Sed dignissim, metus nec fringilla accumsan.',
    gallery: [
      'https://picsum.photos/400/500?random=1',
      'https://picsum.photos/400/500?random=2',
      'https://picsum.photos/400/500?random=3',
      'https://picsum.photos/400/500?random=4',
      'https://picsum.photos/400/500?random=5',
      'https://picsum.photos/400/500?random=6',
    ],
    packages: [
      {
        id: 'pkg-1',
        title: 'Instagram Story + Swipe Up',
        price: 250,
        deliveryDays: 15,
        revisions: 2,
        features: [
          "I'll share your content",
          'You ship me your Product',
          'Brand Mention',
        ],
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.',
      },
    ],
    reviewStats: {
      completedJobs: 200,
      inProgress: 30,
      challengeWins: 50,
      rating: 4.5,
    },
    isFavorite: true,
    instagramHandle: '@Susan_adams01',
  },
  {
    id: '2',
    name: 'Sara Johns',
    username: '@sarajohns121',
    avatar: Person2,
    verified: true,
    location: {
      city: 'Los Angeles',
      country: 'United States',
    },
    stats: {
      xpScore: 220,
      followers: '32.5K',
      engagementRate: '3.8%',
      tier: 'Rising Talent',
      badge: 'gold',
    },
    categories: ['Comedy', 'Lifestyle'],
    bio: 'Creative content creator focused on lifestyle and comedy. Love making people smile through my videos and connecting with my audience.',
    gallery: [
      'https://picsum.photos/400/500?random=7',
      'https://picsum.photos/400/500?random=8',
      'https://picsum.photos/400/500?random=9',
      'https://picsum.photos/400/500?random=10',
      'https://picsum.photos/400/500?random=11',
      'https://picsum.photos/400/500?random=12',
    ],
    packages: [],
    reviewStats: {
      completedJobs: 150,
      inProgress: 20,
      challengeWins: 35,
      rating: 4.2,
    },
    isFavorite: true,
    instagramHandle: '@sarajohns',
  },
  {
    id: '3',
    name: 'Maria Nick',
    username: '@maria_nick80',
    avatar: Person3,
    verified: true,
    location: {
      city: 'Miami',
      country: 'United States',
    },
    stats: {
      xpScore: 400,
      followers: '56.8K',
      engagementRate: '4.2%',
      tier: 'Top Pro',
      badge: 'purple',
    },
    categories: ['Comedy', 'Lifestyle'],
    bio: 'Lifestyle influencer passionate about fashion, travel, and creating authentic content that inspires others to live their best life.',
    gallery: [
      'https://picsum.photos/400/500?random=13',
      'https://picsum.photos/400/500?random=14',
      'https://picsum.photos/400/500?random=15',
      'https://picsum.photos/400/500?random=16',
      'https://picsum.photos/400/500?random=17',
      'https://picsum.photos/400/500?random=18',
    ],
    packages: [],
    reviewStats: {
      completedJobs: 180,
      inProgress: 25,
      challengeWins: 42,
      rating: 4.7,
    },
    isFavorite: true,
    instagramHandle: '@maria_nick',
  },
  {
    id: '4',
    name: 'Emily Carter',
    username: '@emilycarter',
    avatar: Person1,
    verified: false,
    location: {
      city: 'Chicago',
      country: 'United States',
    },
    stats: {
      xpScore: 180,
      followers: '22.1K',
      engagementRate: '2.9%',
      tier: 'Pro',
      badge: 'gold',
    },
    categories: ['Fashion', 'Beauty'],
    bio: 'Fashion enthusiast sharing daily outfit inspiration and beauty tips. Building a community of style-conscious individuals.',
    gallery: [
      'https://picsum.photos/400/500?random=19',
      'https://picsum.photos/400/500?random=20',
      'https://picsum.photos/400/500?random=21',
    ],
    packages: [],
    reviewStats: {
      completedJobs: 95,
      inProgress: 15,
      challengeWins: 18,
      rating: 4.0,
    },
    isFavorite: false,
    instagramHandle: '@emily_fashion',
  },
  {
    id: '5',
    name: 'Alex Morgan',
    username: '@alexmorgan_fit',
    avatar: Person2,
    verified: true,
    location: {
      city: 'San Francisco',
      country: 'United States',
    },
    stats: {
      xpScore: 350,
      followers: '68.3K',
      engagementRate: '5.1%',
      tier: 'Top Pro',
      badge: 'purple',
    },
    categories: ['Health & Wellness', 'Lifestyle'],
    bio: 'Fitness coach and wellness advocate. Helping people transform their lives through sustainable health practices and positive mindset.',
    gallery: [
      'https://picsum.photos/400/500?random=22',
      'https://picsum.photos/400/500?random=23',
      'https://picsum.photos/400/500?random=24',
      'https://picsum.photos/400/500?random=25',
      'https://picsum.photos/400/500?random=26',
      'https://picsum.photos/400/500?random=27',
    ],
    packages: [],
    reviewStats: {
      completedJobs: 220,
      inProgress: 35,
      challengeWins: 58,
      rating: 4.8,
    },
    isFavorite: true,
    instagramHandle: '@alexmorgan_wellness',
  },
  {
    id: '6',
    name: 'Jessica Lee',
    username: '@jessicalee_beauty',
    avatar: Person3,
    verified: true,
    location: {
      city: 'New York',
      country: 'United States',
    },
    stats: {
      xpScore: 290,
      followers: '41.7K',
      engagementRate: '3.6%',
      tier: 'Rising Talent',
      badge: 'gold',
    },
    categories: ['Beauty', 'Cosmetic'],
    bio: 'Makeup artist and beauty content creator. Sharing tutorials, product reviews, and beauty tips to help you look and feel confident.',
    gallery: [
      'https://picsum.photos/400/500?random=28',
      'https://picsum.photos/400/500?random=29',
      'https://picsum.photos/400/500?random=30',
      'https://picsum.photos/400/500?random=31',
    ],
    packages: [],
    reviewStats: {
      completedJobs: 130,
      inProgress: 18,
      challengeWins: 28,
      rating: 4.3,
    },
    isFavorite: false,
    instagramHandle: '@jessica_beauty',
  },
];

export const availableCategories = [
  'Fashion',
  'Comedy',
  'Beauty',
  'Health & Wellness',
  'Consumer Goods',
  'Cosmetic',
  'Technology',
  'Food & Drink',
  'Travel',
  'Lifestyle',
  'Fitness',
  'Music',
];

export const availablePlatforms = [
  'Instagram',
  'TikTok',
  'YouTube',
  'Facebook',
  'Twitter',
];

export const availableLocations = [
  'New York, United States',
  'Los Angeles, United States',
  'Chicago, United States',
  'Miami, United States',
  'San Francisco, United States',
  'London, United Kingdom',
  'Paris, France',
  'Tokyo, Japan',
];
