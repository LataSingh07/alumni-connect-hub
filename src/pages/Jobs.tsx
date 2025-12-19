import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  MapPin, 
  Building,
  DollarSign,
  Clock,
  Briefcase,
  BookmarkPlus,
  ExternalLink,
  Filter,
  Users
} from 'lucide-react';

// Mock jobs data
const jobsData = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Google',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$150k - $200k',
    posted: '2 days ago',
    description: 'Join our team to build the next generation of web experiences. Work with React, TypeScript, and cutting-edge technologies.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'System design skills'],
    postedBy: 'Sarah Mitchell (Alumni \'18)',
    isRemote: true,
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Meta',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$140k - $180k',
    posted: '1 week ago',
    description: 'Lead product strategy for our social commerce initiatives. Work with cross-functional teams to ship impactful features.',
    requirements: ['3+ years PM experience', 'Technical background', 'Strong analytics skills'],
    postedBy: 'Michael Chen (Alumni \'17)',
    isRemote: false,
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Netflix',
    location: 'Los Angeles, CA',
    type: 'Internship',
    salary: '$50/hour',
    posted: '3 days ago',
    description: 'Summer internship opportunity to work on recommendation algorithms and content analytics.',
    requirements: ['Currently pursuing MS/PhD', 'Python & ML experience', 'Statistical modeling'],
    postedBy: 'Emily Rodriguez (Alumni \'19)',
    isRemote: true,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Amazon',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130k - $170k',
    posted: '5 days ago',
    description: 'Build and maintain cloud infrastructure for AWS services. Focus on reliability and scalability.',
    requirements: ['AWS certification preferred', 'Kubernetes experience', 'CI/CD expertise'],
    postedBy: 'David Kim (Alumni \'16)',
    isRemote: false,
  },
  {
    id: '5',
    title: 'UX Designer',
    company: 'Airbnb',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    posted: '1 day ago',
    description: 'Design beautiful and intuitive experiences for millions of travelers and hosts worldwide.',
    requirements: ['4+ years UX design', 'Figma expertise', 'Portfolio required'],
    postedBy: 'Priya Sharma (Alumni \'20)',
    isRemote: true,
  },
  {
    id: '6',
    title: 'Machine Learning Engineer',
    company: 'Tesla',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$160k - $220k',
    posted: '4 days ago',
    description: 'Work on computer vision and autonomous driving systems. Push the boundaries of AI.',
    requirements: ['Deep learning expertise', 'Computer vision', 'C++ proficiency'],
    postedBy: 'James Wilson (Alumni \'12)',
    isRemote: false,
  },
];

const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Internship', 'Contract'];
const locations = ['All Locations', 'Remote', 'San Francisco', 'New York', 'Seattle', 'Austin'];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All Types' || job.type === selectedType;
    
    const matchesLocation = selectedLocation === 'All Locations' || 
      job.location.includes(selectedLocation) ||
      (selectedLocation === 'Remote' && job.isRemote);

    return matchesSearch && matchesType && matchesLocation;
  });

  const handleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast({ description: 'Job removed from saved' });
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast({ description: 'Job saved!' });
    }
  };

  const handleApply = (jobTitle: string) => {
    toast({
      title: 'Application started',
      description: `You're applying for ${jobTitle}`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Job Board</h1>
          <p className="text-muted-foreground mt-1">Exclusive opportunities from alumni-led companies</p>
        </div>

        {/* Search and Filters */}
        <div className="card-elevated p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, company, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[150px]"
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[160px]"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-4">
          Showing {filteredJobs.length} of {jobsData.length} jobs
        </p>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card-interactive p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Company Logo Placeholder */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building className="w-8 h-8 text-primary" />
                </div>

                {/* Job Details */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{job.title}</h3>
                      <p className="text-primary font-medium">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.type === 'Full-time' ? 'bg-success/10 text-success' :
                        job.type === 'Internship' ? 'bg-accent/10 text-accent-foreground' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {job.type}
                      </span>
                      {job.isRemote && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                          Remote OK
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.posted}
                    </span>
                  </div>

                  <p className="text-muted-foreground mt-3 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.requirements.map((req) => (
                      <span key={req} className="badge-muted text-xs">{req}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Posted by {job.postedBy}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveJob(job.id)}
                        className={savedJobs.includes(job.id) ? 'text-primary border-primary' : ''}
                      >
                        <BookmarkPlus className="w-4 h-4 mr-1" />
                        {savedJobs.includes(job.id) ? 'Saved' : 'Save'}
                      </Button>
                      <Button size="sm" onClick={() => handleApply(job.title)}>
                        Apply Now
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
              <Briefcase className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Jobs;
