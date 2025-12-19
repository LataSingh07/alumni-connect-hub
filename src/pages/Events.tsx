import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  ArrowRight,
  Video,
  Building
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock events data
const eventsData = [
  {
    id: '1',
    title: 'Tech Talk: AI in Healthcare',
    description: 'Join us for an insightful session on how artificial intelligence is transforming healthcare. Industry experts will share real-world applications and future trends.',
    date: 'Dec 20, 2025',
    time: '2:00 PM - 4:00 PM',
    location: 'Virtual (Zoom)',
    type: 'webinar',
    attendees: 156,
    maxAttendees: 200,
    speaker: 'Dr. Emily Chen, Google Health',
    image: null,
    isPast: false,
  },
  {
    id: '2',
    title: 'Annual Alumni Meetup 2025',
    description: 'The biggest networking event of the year! Connect with fellow alumni, enjoy great food, and celebrate our community.',
    date: 'Dec 25, 2025',
    time: '6:00 PM - 10:00 PM',
    location: 'Grand Ballroom, University Campus',
    type: 'in-person',
    attendees: 342,
    maxAttendees: 500,
    speaker: null,
    image: null,
    isPast: false,
  },
  {
    id: '3',
    title: 'Career Workshop: Resume Building',
    description: 'Learn how to craft a compelling resume that gets noticed by top recruiters. Hands-on workshop with personalized feedback.',
    date: 'Jan 5, 2026',
    time: '10:00 AM - 12:00 PM',
    location: 'Career Center, Room 201',
    type: 'workshop',
    attendees: 45,
    maxAttendees: 50,
    speaker: 'HR Team from Microsoft',
    image: null,
    isPast: false,
  },
  {
    id: '4',
    title: 'Startup Pitch Night',
    description: 'Watch alumni entrepreneurs pitch their startups to a panel of investors. Great opportunity to learn and network.',
    date: 'Jan 15, 2026',
    time: '5:00 PM - 8:00 PM',
    location: 'Innovation Hub',
    type: 'networking',
    attendees: 89,
    maxAttendees: 150,
    speaker: 'Various Alumni Founders',
    image: null,
    isPast: false,
  },
  {
    id: '5',
    title: 'Industry Panel: Future of Remote Work',
    description: 'Leaders from top tech companies discuss how remote work is evolving and what it means for your career.',
    date: 'Nov 10, 2025',
    time: '3:00 PM - 5:00 PM',
    location: 'Virtual (Teams)',
    type: 'webinar',
    attendees: 234,
    maxAttendees: 250,
    speaker: 'Panel of Industry Leaders',
    image: null,
    isPast: true,
  },
  {
    id: '6',
    title: 'Homecoming Weekend 2025',
    description: 'Celebrate homecoming with games, reunions, and festivities. All alumni and families welcome!',
    date: 'Oct 15, 2025',
    time: 'All Day',
    location: 'University Campus',
    type: 'in-person',
    attendees: 1200,
    maxAttendees: 2000,
    speaker: null,
    image: null,
    isPast: true,
  },
];

const eventTypeColors: Record<string, string> = {
  webinar: 'bg-primary/10 text-primary',
  'in-person': 'bg-success/10 text-success',
  workshop: 'bg-accent/10 text-accent-foreground',
  networking: 'bg-warning/10 text-warning',
};

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);
  const { toast } = useToast();

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'upcoming' && !event.isPast) ||
      (filter === 'past' && event.isPast);

    return matchesSearch && matchesFilter;
  });

  const handleRegister = (eventId: string) => {
    toast({
      title: 'Registration successful!',
      description: 'You have been registered for this event.',
    });
    setSelectedEvent(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1">Discover and register for upcoming alumni events</p>
        </div>

        {/* Search and Filters */}
        <div className="card-elevated p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              {(['upcoming', 'past', 'all'] as const).map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? 'default' : 'outline'}
                  onClick={() => setFilter(f)}
                  className="capitalize"
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className={`card-interactive overflow-hidden ${event.isPast ? 'opacity-70' : ''}`}>
              {/* Event Header */}
              <div className="h-32 bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center relative">
                <Calendar className="w-16 h-16 text-primary-foreground/30" />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium capitalize ${eventTypeColors[event.type]}`}>
                  {event.type === 'in-person' ? 'In Person' : event.type}
                </div>
                {event.isPast && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    Past Event
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {event.type === 'webinar' ? (
                      <Video className="w-4 h-4 text-primary" />
                    ) : (
                      <MapPin className="w-4 h-4 text-primary" />
                    )}
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.attendees} / {event.maxAttendees} registered</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button 
                    className="w-full" 
                    variant={event.isPast ? 'outline' : 'default'}
                    onClick={() => setSelectedEvent(event)}
                    disabled={event.isPast}
                  >
                    {event.isPast ? 'View Details' : 'Register Now'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Event Details Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-lg">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <div className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-medium capitalize mb-2 ${eventTypeColors[selectedEvent.type]}`}>
                    {selectedEvent.type === 'in-person' ? 'In Person' : selectedEvent.type}
                  </div>
                  <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    {selectedEvent.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {selectedEvent.date}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {selectedEvent.time}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium flex items-center gap-2">
                      {selectedEvent.type === 'webinar' ? (
                        <Video className="w-4 h-4 text-primary" />
                      ) : (
                        <MapPin className="w-4 h-4 text-primary" />
                      )}
                      {selectedEvent.location}
                    </p>
                  </div>

                  {selectedEvent.speaker && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Speaker</p>
                      <p className="font-medium">{selectedEvent.speaker}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
                    <div>
                      <p className="text-sm text-muted-foreground">Registered Attendees</p>
                      <p className="text-2xl font-bold text-foreground">{selectedEvent.attendees} / {selectedEvent.maxAttendees}</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {Math.round((selectedEvent.attendees / selectedEvent.maxAttendees) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedEvent(null)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={() => handleRegister(selectedEvent.id)}>
                    Confirm Registration
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Events;
