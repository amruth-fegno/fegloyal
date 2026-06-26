export type Page = 'home' | 'delete-account';

export interface Reward {
  id: string;
  name: string;
  points: number;
  category: 'Tech' | 'Lifestyle' | 'Vouchers' | 'Travel';
  imageUrl: string;
  description: string;
  tag: string;
  stockStatus: 'In Stock' | 'Limited' | 'Out of Stock';
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  points: number;
  type: 'credit' | 'redemption';
  status: 'Completed' | 'Pending';
  amount: string;
  category: string;
}

export interface TierInfo {
  name: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  pointsRequired: string;
  multiplier: string;
  colorClass: string;
  cardBgClass: string;
  perks: string[];
}

export interface DeleteState {
  step: 1 | 2 | 3 | 4;
  phoneNumber: string;
  otp: string;
  consentChecked: boolean;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
