"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUser } from "@/store/slices/User/getUserSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { is_admin, loading: userLoading } = useAppSelector(
    (state) => state.getUser
  );
  const [loading, setLoading] = useState(true);

  // استدعاء بيانات المستخدم مرة واحدة
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUser());
      setLoading(false); // بعد تحميل البيانات نوقف الـ loading
    };
    fetchUser();
  }, [dispatch]);

  // redirect إذا المستخدم ليس admin
  useEffect(() => {
    if (!loading && is_admin === false) {
      router.replace("/notAccess");
    }
  }, [loading, is_admin, router]);

  // عرض spinner أثناء تحميل بيانات المستخدم
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12"></span>
      </div>
    );
  }

  // المستخدم admin، عرض المحتوى
  return <>{children}</>;
};

export default AdminRoute;
