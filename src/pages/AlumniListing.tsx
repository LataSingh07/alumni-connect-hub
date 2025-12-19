import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  GraduationCap,
  Briefcase,
  Users,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock alumni data
const alumniData = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    designation: 'Senior Software Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    batch: '2018',
    skills: ['React', 'Node.js', 'Python', 'ML'],
    isMentor: true,
    avatar: null,
  },
  {
    id: '2',
    name: 'Michael Chen',
    designation: 'Product Manager',
    company: 'Meta',
    location: 'New York, NY',
    batch: '2017',
    skills: ['Product Strategy', 'Analytics', 'Agile'],
    isMentor: true,
    avatar: null,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    designation: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Angeles, CA',
    batch: '2019',
    skills: ['Python', 'TensorFlow', 'SQL', 'Tableau'],
    isMentor: false,
    avatar: null,
  },
  {
    id: '4',
    name: 'James Wilson',
    designation: 'CTO',
    company: 'TechStart Inc.',
    location: 'Austin, TX',
    batch: '2012',
    skills: ['Leadership', 'Architecture', 'Cloud'],
    isMentor: true,
    avatar: null,
  },
  {
    id: '5',
    name: 'Priya Sharma',
    designation: 'UX Designer',
    company: 'Airbnb',
    location: 'Seattle, WA',
    batch: '2020',
    skills: ['Figma', 'User Research', 'Prototyping'],
    isMentor: false,
    avatar: null,
  },
  {
    id: '6',
    name: 'David Kim',
    designation: 'DevOps Engineer',
    company: 'Amazon',
    location: 'Seattle, WA',
    batch: '2016',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    isMentor: true,
    avatar: null,
  },
  {
    id: '7',
    name: 'Lisa Thompson',
    designation: 'Marketing Director',
    company: 'Salesforce',
    location: 'Chicago, IL',
    batch: '2014',
    skills: ['Digital Marketing', 'Brand Strategy', 'SEO'],
    isMentor: false,
    avatar: null,
  },
  {
    id: '8',
    name: 'Alex Johnson',
    designation: 'Full Stack Developer',
    company: 'Stripe',
    location: 'Remote',
    batch: '2021',
    skills: ['TypeScript', 'React', 'PostgreSQL'],
    isMentor: false,
    avatar: null,
  },
];

const companies = ['All', 'Google', 'Meta', 'Netflix', 'Amazon', 'Airbnb', 'Other'];
const batches = ['All', '2012-2015', '2016-2018', '2019-2021', '2022+'];

const AlumniListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [showMentorsOnly, setShowMentorsOnly] = useState(false);

  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch = 
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCompany = selectedCompany === 'All' || alumni.company === selectedCompany;
    
    const matchesBatch = selectedBatch === 'All' || 
      (selectedBatch === '2012-2015' && parseInt(alumni.batch) >= 2012 && parseInt(alumni.batch) <= 2015) ||
      (selectedBatch === '2016-2018' && parseInt(alumni.batch) >= 2016 && parseInt(alumni.batch) <= 2018) ||
      (selectedBatch === '2019-2021' && parseInt(alumni.batch) >= 2019 && parseInt(alumni.batch) <= 2021) ||
      (selectedBatch === '2022+' && parseInt(alumni.batch) >= 2022);
    
    const matchesMentor = !showMentorsOnly || alumni.isMentor;

    return matchesSearch && matchesCompany && matchesBatch && matchesMentor;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Alumni Directory</h1>
          <p className="text-muted-foreground mt-1">Connect with graduates from your institution</p>
        </div>

        {/* Search and Filters */}
        <div className="card-elevated p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12"
              />
            </div>

            {/* Company Filter */}
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[160px]"
            >
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company === 'All' ? 'All Companies' : company}
                </option>
              ))}
            </select>

            {/* Batch Filter */}
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[140px]"
            >
              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch === 'All' ? 'All Batches' : batch}
                </option>
              ))}
            </select>

            {/* Mentor Toggle */}
            <Button
              variant={showMentorsOnly ? 'default' : 'outline'}
              onClick={() => setShowMentorsOnly(!showMentorsOnly)}
              className="h-12 whitespace-nowrap"
            >
              <Users className="w-4 h-4 mr-2" />
              Mentors Only
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-4">
          Showing {filteredAlumni.length} of {alumniData.length} alumni
        </p>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlumni.map((alumni) => (
            <div key={alumni.id} className="card-interactive p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4 border-4 border-primary/10">
                  <AvatarImage src={alumni.avatar || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    {getInitials(alumni.name)}
                  </AvatarFallback>
                </Avatar>

                <h3 className="font-semibold text-foreground text-lg">{alumni.name}</h3>
                <p className="text-sm text-muted-foreground">{alumni.designation}</p>
                
                <div className="flex items-center gap-1 mt-2 text-primary">
                  <Building className="w-4 h-4" />
                  <span className="text-sm font-medium">{alumni.company}</span>
                </div>

                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{alumni.location}</span>
                </div>

                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <GraduationCap className="w-3 h-3" />
                  <span className="text-xs">Class of {alumni.batch}</span>
                </div>

                {alumni.isMentor && (
                  <div className="badge-success mt-3">
                    <Users className="w-3 h-3 mr-1" />
                    Available for Mentorship
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mt-4 justify-center">
                  {alumni.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="badge-muted text-xs">
                      {skill}
                    </span>
                  ))}
                  {alumni.skills.length > 3 && (
                    <span className="badge-muted text-xs">+{alumni.skills.length - 3}</span>
                  )}
                </div>

                <Link to={`/alumni/${alumni.id}`} className="w-full mt-4">
                  <Button variant="outline" className="w-full" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlumni.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No alumni found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AlumniListing;
