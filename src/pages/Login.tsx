import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Mail, Lock, User, Users, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';

const roleOptions: { value: UserRole; label: string; icon: typeof User; description: string }[] = [
  { value: 'student', label: 'Student', icon: User, description: 'Currently enrolled student' },
  { value: 'alumni', label: 'Alumni', icon: Users, description: 'Graduated from the institution' },
  { value: 'admin', label: 'Administrator', icon: Shield, description: 'Staff or faculty member' },
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await login(email, password, role);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex">
        {/* Left Panel - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center shadow-lg mb-6">
                <GraduationCap className="w-9 h-9 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground mt-2">Sign in to access your account</p>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Sign in as</Label>
              <div className="grid grid-cols-3 gap-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                      role === option.value
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/30 hover:bg-secondary'
                    }`}
                  >
                    <option.icon className={`w-6 h-6 mx-auto mb-2 ${
                      role === option.value ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className={`text-sm font-medium ${
                      role === option.value ? 'text-primary' : 'text-foreground'
                    }`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

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
                    className={`pl-11 pr-11 h-12 ${errors.password ? 'border-destructive' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline font-medium">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Right Panel - Decorative */}
        <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-hover" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent" />
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary-foreground" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Connect. Grow. Succeed.
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-md">
              Join thousands of alumni and students building meaningful connections and advancing their careers.
            </p>
            <div className="mt-12 flex items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-accent">10K+</p>
                <p className="text-primary-foreground/70 text-sm">Alumni</p>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div className="text-center">
                <p className="text-4xl font-bold text-accent">500+</p>
                <p className="text-primary-foreground/70 text-sm">Companies</p>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div className="text-center">
                <p className="text-4xl font-bold text-accent">95%</p>
                <p className="text-primary-foreground/70 text-sm">Placement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
