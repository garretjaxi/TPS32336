import { useAuth } from "@/_core/hooks/useAuth";
import { ReactNode } from "react";

interface AdminGuardProps {
  children: ReactNode;
  allowOnboarding?: boolean;
}

export function AdminGuard({ children, allowOnboarding = false }: AdminGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You must be logged in to access this page.</p>
          <a href="/" className="text-amber-600 hover:underline">Return to Home</a>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === "admin";
  const isOnboardingPage = allowOnboarding && user;

  if (!isAdmin && !isOnboardingPage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <a href="/" className="text-amber-600 hover:underline">Return to Home</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default AdminGuard;
