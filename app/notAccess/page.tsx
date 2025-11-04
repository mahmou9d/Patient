"use client";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function NotAccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 text-center">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <ShieldAlert className="w-16 h-16 text-yellow-300" />
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-sm opacity-90">
            Sorry, you don’t have permission to view this page. Please log in
            with an authorized account to continue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-green-800 font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Go to Login
            </button>
            <button
              onClick={() => router.push("/")}
              className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-green-800 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-5 text-sm opacity-70">
        &copy; {new Date().getFullYear()} CarePlus Clinic. All rights reserved.
      </footer>
    </div>
  );
}
