import React, { useState } from 'react';
import { CalendarDays, Clock, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface CreateBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockProviders = [
  { id: 'provider1', name: 'Dr. Sarah Wilson', specialty: 'General Medicine' },
  { id: 'provider2', name: 'Dr. Michael Chen', specialty: 'Dentistry' },
  { id: 'provider3', name: 'Dr. Emily Rodriguez', specialty: 'Psychology' },
  { id: 'provider4', name: 'Dr. James Thompson', specialty: 'Dermatology' }
];

const serviceTypes = [
  'Medical Consultation',
  'Dental Cleaning',
  'Therapy Session',
  'Dermatology Check',
  'Follow-up Appointment',
  'Emergency Consultation'
];

export const CreateBookingDialog = ({ open, onOpenChange }: CreateBookingDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    providerId: '',
    serviceType: '',
    date: '',
    startTime: '',
    endTime: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.providerId || !formData.serviceType || !formData.date || !formData.startTime || !formData.endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Booking Created Successfully! 🎉",
        description: "Your appointment has been scheduled and is pending confirmation.",
        variant: "default"
      });
      
      // Reset form and close dialog
      setFormData({
        providerId: '',
        serviceType: '',
        date: '',
        startTime: '',
        endTime: '',
        notes: ''
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error Creating Booking",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProvider = mockProviders.find(p => p.id === formData.providerId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Schedule New Booking
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Provider Selection */}
          <div className="space-y-2">
            <Label htmlFor="provider" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Healthcare Provider
            </Label>
            <Select 
              value={formData.providerId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, providerId: value }))}
            >
              <SelectTrigger className="glass-card">
                <SelectValue placeholder="Select a healthcare provider" />
              </SelectTrigger>
              <SelectContent>
                {mockProviders.map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{provider.name}</span>
                      <span className="text-sm text-muted-foreground">{provider.specialty}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedProvider && (
              <Card className="glass-card mt-2">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedProvider.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedProvider.specialty}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="serviceType" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Service Type
            </Label>
            <Select 
              value={formData.serviceType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
            >
              <SelectTrigger className="glass-card">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map(service => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="glass-card"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                className="glass-card"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                className="glass-card"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any special requests or notes about your appointment..."
              className="glass-card min-h-[100px]"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="premium" 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Creating Booking...' : 'Create Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};