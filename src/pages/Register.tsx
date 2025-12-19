import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Mail, Lock, User, Users, Shield, ArrowRight, Eye, EyeOff, UserPlus } from 'lucide-react';

const roleOptions: { value: UserRole; label: string; icon: typeof User; description: string }[] = [
  { value: 'student', label: 'Student', icon: User, description: 'Currently enrolled' },
  { value: 'alumni', label: 'Alumni', icon: Users, description: 'Graduated' },
  { value: 'admin', label: 'Admin', icon: Shield, description: 'Staff member' },
];

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    
    if (!name) {
      newErrors.name = 'Full name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await register(email, password, name, role);
      toast({
        title: 'Account created!',
        description: 'Welcome to AlumniConnect. Let\'s get you started.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex">
        {/* Left Panel - Decorative */}
        <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-hover" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent" />
            <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-primary-foreground" />
            <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-accent" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Start Your Journey
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-md">
              Join our vibrant community of students and alumni. Build connections that last a lifetime.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-6 text-left">
              {[
                { title: 'Mentorship', desc: 'Connect with experienced alumni' },
                { title: 'Job Board', desc: 'Exclusive career opportunities' },
                { title: 'Events', desc: 'Networking & workshops' },
                { title: 'Resources', desc: 'Learning materials & guides' },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-primary-foreground/10 backdrop-blur">
                  <h3 className="font-semibold text-primary-foreground">{item.title}</h3>
                  <p className="text-primary-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6 animate-fade-in">
            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center shadow-lg mb-6">
                <UserPlus className="w-9 h-9 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
              <p className="text-muted-foreground mt-2">Join AlumniConnect today</p>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">I am a</Label>
              <div className="grid grid-cols-3 gap-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                      role === option.value
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/30 hover:bg-secondary'
                    }`}
                  >
                    <option.icon className={`w-5 h-5 mx-auto mb-1.5 ${
                      role === option.value ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className={`text-xs font-medium ${
                      role === option.value ? 'text-primary' : 'text-foreground'
                    }`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`pl-11 h-12 ${errors.name ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-11 h-12 ${errors.email ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-11 h-12 ${errors.password ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-11 h-12 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPassword ? 'Hide' : 'Show'} password
                </button>
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Terms */}
            <p className="text-xs text-center text-muted-foreground">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>

            {/* Login Link */}
            <p className="text-center text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
