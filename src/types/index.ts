// User types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt?: string;
}

// Component prop types
export interface ButtonVariant {
  primary: string;
  secondary: string;
  outline: string;
}

export interface CardElevation {
  sm: string;
  md: string;
  lg: string;
}
