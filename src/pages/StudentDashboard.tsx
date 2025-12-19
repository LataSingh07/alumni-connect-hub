import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  BookOpen, 
  Calendar, 
  Tag, 
  Users, 
  Briefcase, 
  GraduationCap,
  Edit,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

// Mock data for student
const studentData = {
  course: 'Computer Science',
  year: '3rd Year',
  batch: '2022-2026',
  interests: ['Web Development', 'Machine Learning', 'Cloud Computing', 'UI/UX Design'],
  mentor: {
    name: 'Sarah Mitchell',
    role: 'Senior Software Engineer',
    company: 'Google',
    avatar: null,
  },
  upcomingEvents: [
    { id: '1', title: 'Tech Talk: AI in Healthcare', date: 'Dec 20, 2025', time: '2:00 PM' },
    { id: '2', title: 'Alumni Meetup 2025', date: 'Dec 25, 2025', time: '6:00 PM' },
  ],
  recommendedJobs: [
    { id: '1', title: 'Frontend Developer Intern', company: 'Microsoft', location: 'Remote' },
    { id: '2', title: 'ML Research Assistant', company: 'Stanford AI Lab', location: 'California' },
  ],
};

const StudentDashboard = () => {
  const { user } = useAuth();

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening in your alumni network</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Summary */}
            <div className="card-elevated p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
                <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
                <div className="badge-primary mt-3 capitalize">{user?.role}</div>
              </div>

              <div className="border-t border-border mt-6 pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Course</p>
                    <p className="font-medium text-foreground">{studentData.course}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year & Batch</p>
                    <p className="font-medium text-foreground">{studentData.year} • {studentData.batch}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border mt-6 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Interests</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {studentData.interests.map((interest) => (
                    <span key={interest} className="tag text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <Link to="/edit-profile">
                <Button variant="outline" className="w-full mt-6">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>

            {/* Assigned Mentor */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                Your Mentor
              </h3>
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-accent/30">
                  <AvatarFallback className="bg-accent/10 text-accent font-semibold">
                    SM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{studentData.mentor.name}</h4>
                  <p className="text-sm text-muted-foreground">{studentData.mentor.role}</p>
                  <p className="text-sm text-primary">{studentData.mentor.company}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="w-full mt-4">
                Send Message
              </Button>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Connections', value: '24', icon: Users, color: 'bg-primary/10 text-primary' },
                { label: 'Events Attended', value: '8', icon: Calendar, color: 'bg-accent/10 text-accent' },
                { label: 'Jobs Applied', value: '5', icon: Briefcase, color: 'bg-success/10 text-success' },
                { label: 'Courses', value: '12', icon: GraduationCap, color: 'bg-warning/10 text-warning' },
              ].map((stat) => (
                <div key={stat.label} className="card-elevated p-4 text-center">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Upcoming Events */}
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Events
                </h3>
                <Link to="/events" className="text-sm text-primary hover:underline font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {studentData.upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.date} at {event.time}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      RSVP
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Recommended for You
                </h3>
                <Link to="/jobs" className="text-sm text-primary hover:underline font-medium">
                  View All Jobs
                </Link>
              </div>
              <div className="space-y-3">
                {studentData.recommendedJobs.map((job) => (
                  <div key={job.id} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
