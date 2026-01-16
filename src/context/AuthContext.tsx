import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  userType: 'brand' | 'influencer';
  name: string;
  avatar?: string;
  // Brand-specific fields
  brandName?: string;
  businessInfo?: string;
  logo?: string;
  // Influencer-specific fields
  bio?: string;
  location?: string;
  categories?: string[];
  instagramUsername?: string;
  advertisingPrice?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
