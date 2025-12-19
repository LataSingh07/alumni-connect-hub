import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  MapPin, 
  Building, 
  GraduationCap,
  Briefcase,
  Users,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  Award,
  Star,
  Calendar
} from 'lucide-react';

// Mock alumni profile data
const alumniProfile = {
  id: '1',
  name: 'Sarah Mitchell',
  designation: 'Senior Software Engineer',
  company: 'Google',
  location: 'San Francisco, CA',
  batch: '2018',
  course: 'Computer Science',
  email: 's.mitchell@alumni.edu',
  phone: '+1 (555) 123-4567',
  linkedin: 'linkedin.com/in/sarahmitchell',
  github: 'github.com/sarahmitchell',
  website: 'sarahmitchell.dev',
  bio: 'Passionate software engineer with 6+ years of experience building scalable web applications. Currently leading a team at Google working on Cloud infrastructure. Enthusiastic about mentoring the next generation of engineers.',
  skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'Cloud Architecture', 'System Design', 'Leadership', 'Agile'],
  isMentor: true,
  mentorshipAreas: ['Career Guidance', 'Technical Interviews', 'System Design', 'Leadership Development'],
  achievements: [
    { title: 'Google Cloud Certified', year: '2023' },
    { title: 'Speaker at React Conf', year: '2022' },
    { title: 'Best Thesis Award', year: '2018' },
    { title: 'Dean\'s List All Semesters', year: '2014-2018' },
  ],
  experience: [
    { role: 'Senior Software Engineer', company: 'Google', duration: '2021 - Present', description: 'Leading cloud infrastructure initiatives' },
    { role: 'Software Engineer', company: 'Meta', duration: '2018 - 2021', description: 'Built core features for Facebook Marketplace' },
    { role: 'Intern', company: 'Microsoft', duration: 'Summer 2017', description: 'Azure DevOps team' },
  ],
  avatar: null,
};

const AlumniProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </button>

        {/* Hero Section */}
        <div className="card-elevated p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-lg">
              <AvatarImage src={alumniProfile.avatar || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                {getInitials(alumniProfile.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-4 justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{alumniProfile.name}</h1>
                  <p className="text-lg text-muted-foreground mt-1">{alumniProfile.designation}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <span className="flex items-center gap-1 text-primary">
                      <Building className="w-4 h-4" />
                      {alumniProfile.company}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {alumniProfile.location}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      Class of {alumniProfile.batch}
                    </span>
                  </div>
                </div>

                {alumniProfile.isMentor && (
                  <div className="badge-success text-sm py-2 px-4">
                    <Users className="w-4 h-4 mr-1" />
                    Available for Mentorship
                  </div>
                )}
              </div>

              <p className="text-muted-foreground mt-4 leading-relaxed">
                {alumniProfile.bio}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                {alumniProfile.isMentor && (
                  <Button variant="accent">
                    <Users className="w-4 h-4 mr-2" />
                    Request Mentorship
                  </Button>
                )}
                <Button variant="outline">
                  <Linkedin className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="card-elevated p-6">
              <h2 className="font-semibold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-3">
                <a href={`mailto:${alumniProfile.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{alumniProfile.email}</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Linkedin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{alumniProfile.linkedin}</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Github className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{alumniProfile.github}</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{alumniProfile.website}</span>
                </a>
              </div>
            </div>

            {/* Skills */}
            <div className="card-elevated p-6">
              <h2 className="font-semibold text-foreground mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {alumniProfile.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Mentorship Areas */}
            {alumniProfile.isMentor && (
              <div className="card-elevated p-6">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  Mentorship Areas
                </h2>
                <div className="space-y-2">
                  {alumniProfile.mentorshipAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience */}
            <div className="card-elevated p-6">
              <h2 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Professional Experience
              </h2>
              <div className="space-y-6">
                {alumniProfile.experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-border pb-6 last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card-elevated p-6">
              <h2 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Achievements & Recognition
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alumniProfile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.year}</p>
                    </div>
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

export default AlumniProfile;
