// "use client";

// import { useAppSelector } from "@/store/hooks";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute = ({ children }: PrivateRouteProps) => {
//   const router = useRouter();
//   const {is_admin} = useAppSelector((state) => state.getUser);

//   useEffect(() => {
//     if (!is_admin) {
//       router.replace("/");
//     }
//   }, [is_admin, router]);

//   if (!is_admin) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500 text-lg">Checking authentication...</p>
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default PrivateRoute;
