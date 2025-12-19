import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Users, Calendar, Briefcase, GraduationCap, 
  TrendingUp, UserPlus, FileText, Settings,
  ChevronRight, Bell
} from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '2,450', icon: GraduationCap, color: 'bg-primary/10 text-primary', change: '+12%' },
  { label: 'Total Alumni', value: '8,320', icon: Users, color: 'bg-accent/10 text-accent', change: '+8%' },
  { label: 'Active Events', value: '24', icon: Calendar, color: 'bg-success/10 text-success', change: '+3' },
  { label: 'Job Postings', value: '156', icon: Briefcase, color: 'bg-warning/10 text-warning', change: '+15%' },
];

const quickActions = [
  { label: 'Manage Users', icon: Users, path: '/admin/users', desc: 'View and manage all users' },
  { label: 'Approve Alumni', icon: UserPlus, path: '/admin/approvals', desc: 'Review pending applications' },
  { label: 'Create Event', icon: Calendar, path: '/admin/events', desc: 'Schedule new events' },
  { label: 'Post Job', icon: Briefcase, path: '/admin/jobs', desc: 'Add job opportunities' },
  { label: 'View Reports', icon: FileText, path: '/admin/reports', desc: 'Analytics and insights' },
  { label: 'Settings', icon: Settings, path: '/admin/settings', desc: 'Platform configuration' },
];

const recentActivity = [
  { action: 'New alumni registration', user: 'John Smith', time: '5 min ago' },
  { action: 'Event created', user: 'Admin', time: '1 hour ago' },
  { action: 'Job posting approved', user: 'Sarah M.', time: '2 hours ago' },
  { action: 'User profile updated', user: 'Mike Chen', time: '3 hours ago' },
];

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your alumni platform</p>
          </div>
          <Button>
            <Bell className="w-4 h-4 mr-2" />
            3 Pending Approvals
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="card-elevated p-6">
              <h2 className="font-semibold text-foreground mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.label} to={action.path} className="p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <action.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground">{action.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card-elevated p-6">
            <h2 className="font-semibold text-foreground mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.user} • {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" size="sm">
              View All Activity
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
