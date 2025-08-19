import React, { useState } from 'react';
import { Clock, MapPin, User, Calendar, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Booking } from '@/types/booking';

const mockBookings: Booking[] = [
  {
    id: '1',
    userId: 'user1',
    providerId: 'provider1',
    serviceType: 'Medical Consultation',
    startTime: new Date('2024-08-20T10:00:00'),
    endTime: new Date('2024-08-20T11:00:00'),
    status: 'confirmed',
    notes: 'Annual checkup appointment',
    createdAt: new Date('2024-08-15T09:00:00'),
    updatedAt: new Date('2024-08-15T09:00:00'),
    provider: {
      id: 'provider1',
      name: 'Dr. Sarah Wilson',
      avatar: '/api/placeholder/40/40'
    }
  },
  {
    id: '2',
    userId: 'user1',
    providerId: 'provider2',
    serviceType: 'Dental Cleaning',
    startTime: new Date('2024-08-22T14:30:00'),
    endTime: new Date('2024-08-22T15:30:00'),
    status: 'pending',
    notes: 'Regular cleaning appointment',
    createdAt: new Date('2024-08-18T16:00:00'),
    updatedAt: new Date('2024-08-18T16:00:00'),
    provider: {
      id: 'provider2',
      name: 'Dr. Michael Chen',
      avatar: '/api/placeholder/40/40'
    }
  },
  {
    id: '3',
    userId: 'user1',
    providerId: 'provider3',
    serviceType: 'Therapy Session',
    startTime: new Date('2024-08-18T16:00:00'),
    endTime: new Date('2024-08-18T17:00:00'),
    status: 'completed',
    notes: 'Weekly therapy session',
    createdAt: new Date('2024-08-11T10:00:00'),
    updatedAt: new Date('2024-08-18T17:00:00'),
    provider: {
      id: 'provider3',
      name: 'Dr. Emily Rodriguez',
      avatar: '/api/placeholder/40/40'
    }
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-success text-success-foreground';
    case 'pending':
      return 'bg-warning text-warning-foreground';
    case 'completed':
      return 'bg-primary text-primary-foreground';
    case 'cancelled':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

const BookingCard = ({ booking }: { booking: Booking }) => (
  <Card className="glass-card hover:bg-accent/20 smooth-transition">
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{booking.serviceType}</h3>
            <p className="text-sm text-muted-foreground">
              with {booking.provider?.name}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(booking.startTime)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Intl.DateTimeFormat('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                }).format(booking.startTime)} - {new Intl.DateTimeFormat('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                }).format(booking.endTime)}
              </div>
            </div>
            
            {booking.notes && (
              <p className="text-sm text-muted-foreground mt-2">
                {booking.notes}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Booking</DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Cancel Booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const BookingsList = () => {
  const upcomingBookings = mockBookings.filter(b => 
    new Date(b.startTime) > new Date() && b.status !== 'cancelled'
  );
  
  const pastBookings = mockBookings.filter(b => 
    new Date(b.startTime) <= new Date() || b.status === 'completed'
  );

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Your Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4 mt-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground">
                  Create your first booking to get started
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4 mt-4">
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                <p className="text-muted-foreground">
                  Your booking history will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};