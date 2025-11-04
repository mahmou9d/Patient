"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.getUser);

  useEffect(() => {
    if (!user.is_admin) {
      router.replace("/notAccess");
    } else if (user.is_admin) {
      router.replace("/admin");
    }
  }, [user, router]);

  if (!user.is_admin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Checking admin access...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
