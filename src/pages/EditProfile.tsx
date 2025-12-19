import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  X, 
  Plus, 
  BookOpen, 
  Calendar, 
  Tag,
  User,
  ArrowLeft
} from 'lucide-react';

const courses = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Data Science',
  'Information Technology',
  'Civil Engineering',
  'Economics',
];

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

const suggestedInterests = [
  'Web Development', 'Machine Learning', 'Cloud Computing', 'UI/UX Design',
  'Mobile Development', 'Data Analysis', 'Cybersecurity', 'Blockchain',
  'DevOps', 'Product Management', 'Digital Marketing', 'Entrepreneurship',
];

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [course, setCourse] = useState('Computer Science');
  const [year, setYear] = useState('3rd Year');
  const [interests, setInterests] = useState<string[]>(['Web Development', 'Machine Learning', 'Cloud Computing']);
  const [newInterest, setNewInterest] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addInterest = (interest: string) => {
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Profile updated!',
      description: 'Your profile has been successfully updated.',
    });
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-foreground">Edit Profile</h1>
          <p className="text-muted-foreground mt-1">Update your academic information and interests</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Basic Information
            </h2>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={user?.name || ''}
                  disabled
                  className="bg-muted h-12"
                />
                <p className="text-xs text-muted-foreground">Name cannot be changed here</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted h-12"
                />
                <p className="text-xs text-muted-foreground">Contact admin to change email</p>
              </div>
            </div>
          </div>

          {/* Academic Info Card */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Academic Information
            </h2>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="course">Course / Program</Label>
                <select
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  {courses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Current Year</Label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              Interests & Skills
            </h2>

            <div className="space-y-4">
              {/* Current Interests */}
              <div>
                <Label className="mb-3 block">Your Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span key={interest} className="tag-removable group" onClick={() => removeInterest(interest)}>
                      {interest}
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    </span>
                  ))}
                  {interests.length === 0 && (
                    <p className="text-sm text-muted-foreground">No interests added yet</p>
                  )}
                </div>
              </div>

              {/* Add New Interest */}
              <div>
                <Label htmlFor="newInterest" className="mb-3 block">Add Interest</Label>
                <div className="flex gap-2">
                  <Input
                    id="newInterest"
                    placeholder="Type an interest..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addInterest(newInterest);
                      }
                    }}
                    className="flex-1 h-12"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addInterest(newInterest)}
                    disabled={!newInterest}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Suggested Interests */}
              <div>
                <Label className="mb-3 block">Suggested Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedInterests
                    .filter(i => !interests.includes(i))
                    .slice(0, 8)
                    .map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => addInterest(interest)}
                        className="px-3 py-1.5 rounded-full text-sm border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        + {interest}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="px-6">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
