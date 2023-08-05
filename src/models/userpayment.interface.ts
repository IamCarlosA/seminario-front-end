export interface TUserPayment {
  name: string;
  email: string;
  mobile_phone: string;
  city: string;
  address: string;
  termsAgreed: boolean;
  deliveryCity?: string;
  deliveryAddress?: string;
  deliveryDistrict?: string;
  deliveryNotes?: string;
  deliveryTime?: string;
}

export interface TUserDate {
  name: string;
  email: string;
  mobile_phone: string;
  city: string;
  address: string;
  termsAgreed: boolean;
}

export interface TUserWaitlist {
  name: string;
  email: string;
  mobile_phone: string;
  digitalPlatform: boolean;
}
