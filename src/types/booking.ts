export interface User {
  id: string;
  email: string;
  role: 'provider' | 'admin' | 'user';
  name: string;
  avatar?: string;
}

export interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceType: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  provider?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface CreateBookingRequest {
  providerId: string;
  serviceType: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

export interface NotificationEvent {
  id: string;
  type: 'booking.created' | 'booking.reminder' | 'booking.updated';
  title: string;
  message: string;
  timestamp: Date;
  booking?: Booking;
  read: boolean;
}