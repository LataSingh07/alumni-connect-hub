import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import EditProfile from "./pages/EditProfile";
import AlumniListing from "./pages/AlumniListing";
import AlumniProfile from "./pages/AlumniProfile";
import Events from "./pages/Events";
import Jobs from "./pages/Jobs";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/profile" element={<StudentDashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/alumni" element={<AlumniListing />} />
            <Route path="/alumni/:id" element={<AlumniProfile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
