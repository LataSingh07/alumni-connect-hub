import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Calendar, Briefcase, ArrowRight, Star, Award, Globe } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-hover py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary-foreground" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm mb-6">
              <Star className="w-4 h-4" />
              Trusted by 10,000+ Alumni Worldwide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Connect, Grow, and <span className="text-accent">Succeed Together</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join our vibrant community of students and alumni. Build meaningful connections, find mentorship, and unlock career opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="xl" variant="accent" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/alumni">
                <Button size="xl" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Browse Alumni
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Active Alumni' },
              { value: '500+', label: 'Partner Companies' },
              { value: '95%', label: 'Placement Rate' },
              { value: '200+', label: 'Events Yearly' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Powerful tools to connect, learn, and grow within our alumni community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Alumni Network', desc: 'Connect with graduates across industries and locations', color: 'bg-primary/10 text-primary' },
              { icon: Award, title: 'Mentorship', desc: 'Get guidance from experienced alumni mentors', color: 'bg-accent/10 text-accent' },
              { icon: Calendar, title: 'Events', desc: 'Attend exclusive networking events and workshops', color: 'bg-success/10 text-success' },
              { icon: Briefcase, title: 'Job Board', desc: 'Access exclusive job opportunities from alumni', color: 'bg-warning/10 text-warning' },
            ].map((feature) => (
              <div key={feature.title} className="card-elevated p-6 text-center">
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Join Our Community?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">Create your account today and start connecting with thousands of alumni and students.</p>
          <Link to="/register">
            <Button size="lg">
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
