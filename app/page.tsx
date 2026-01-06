"use client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllAppointment } from "@/store/slices/Appointment/getAllAppointmentSlice";
import { getAppointmentDoctor } from "@/store/slices/Appointment/getAppointmentDoctorSlice";
import { getdoctors } from "@/store/slices/Patient/getdoctorsSlice";
import { getUser } from "@/store/slices/User/getUserSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const { Doctors } = useAppSelector((state: RootState) => state.getdoctors);
  const { user_id, is_admin } = useAppSelector(
    (state: RootState) => state.getUser
  );

  console.log(user_id);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const access = localStorage.getItem("access");
      setIsLoggedIn(!!access);
    }
    dispatch(getUser());
    dispatch(getdoctors());
  }, [dispatch]);
  console.log(Doctors, "uihorffre");

  const doctors = [
    {
      id: 1,
      first_name: "Dr. James Mitchell",
      specialty: "Cardiologist",
      img_url:
        "https://raw.createusercontent.com/d455f0d9-49e4-4059-9162-92086e0b4b90/",
    },
    {
      id: 2,
      first_name: "Dr. Sarah Johnson",
      specialty: "Surgeon",
      img_url:
        "https://raw.createusercontent.com/d455f0d9-49e4-4059-9162-92086e0b4b90/",
    },
    {
      id: 3,
      first_name: "Dr. Emma Williams",
      specialty: "Pediatrician",
      img_url:
        "https://raw.createusercontent.com/d455f0d9-49e4-4059-9162-92086e0b4b90/",
    },
    {
      id: 4,
      first_name: "Dr. Robert Taylor",
      specialty: "Neurologist",
      img_url:
        "https://raw.createusercontent.com/d455f0d9-49e4-4059-9162-92086e0b4b90/",
    },
    {
      id: 5,
      first_name: "Dr. Lisa Anderson",
      specialty: "Dermatologist",
      img_url:
        "https://raw.createusercontent.com/d455f0d9-49e4-4059-9162-92086e0b4b90/",
    },
  ];

  const duration = 30;
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  if (isLoggedIn === null) return null;

  return (
    <div className="min-h-screen bg-[#131619] overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131619]/80  border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img
                  src="/assets/icons/logo-full.svg"
                  alt="Healthcare Clinic Logo"
                  className="h-8 md:h-11 relative z-10"
                />
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className="relative px-5 py-2.5 text-white font-medium rounded-xl hover:bg-white/5 transition-all group"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 rounded-xl transition-all"></div>
              </a>
              <a
                href="#Services"
                className="relative px-5 py-2.5 text-white/70 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all group"
              >
                <span className="relative z-10">Services</span>
              </a>
              <a
                href="#About"
                className="relative px-5 py-2.5 text-white/70 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all group"
              >
                <span className="relative z-10">About</span>
              </a>
              <a
                href="#Contact"
                className="relative px-5 py-2.5 text-white/70 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all group"
              >
                <span className="relative z-10">Contact</span>
              </a>
            </nav>
            <div className="flex items-center space-x-3">
              {!isLoggedIn ? (
                <>
                  <a
                    href="/login"
                    className="text-white/80 hover:text-white transition-colors font-medium px-5 py-2.5 hover:bg-white/5 rounded-xl"
                  >
                    Log in
                  </a>
                  <a
                    href="/patients/register"
                    className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-7 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 transition-all"
                  >
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                </>
              ) : (
                <>
                  <button
                    className="relative group overflow-hidden bg-red-500/10 text-red-400 border border-red-500/20 px-6 py-2.5 rounded-xl hover:bg-red-500/20 hover:border-red-500/30 transition-all font-semibold"
                    onClick={handleLogout}
                  >
                    <span className="relative z-10">Logout</span>
                  </button>
                  {is_admin && (
                    <a
                      href="/admin"
                      className="relative group overflow-hidden bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-2.5 rounded-xl hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all font-semibold"
                    >
                      <span className="relative z-10">Admin</span>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 relative">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/20 rounded-full blur-[100px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block animate-fade-in-up">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                    <span className="relative bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-6 py-3 rounded-full text-sm font-bold border border-emerald-500/30  inline-flex items-center space-x-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                      <span>✨ Your Trusted Health Partner</span>
                    </span>
                  </div>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] animate-fade-in-up delay-100">
                  Your Health is Our{" "}
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 blur-2xl opacity-50"></span>
                    <span className="relative bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                      Priority
                    </span>
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/60 leading-relaxed animate-fade-in-up delay-200">
                  Experience compassionate, comprehensive healthcare from a team
                  of dedicated medical professionals committed to your wellness
                  and recovery.
                </p>
                <div className="flex flex-wrap gap-5 animate-fade-in-up delay-300">
                  <a
                    href={
                      !isLoggedIn
                        ? "/login"
                        : `/patients/${user_id}/new-appointment`
                    }
                    className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Book Appointment</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                  <a
                    href="#About"
                    className="group relative overflow-hidden bg-white/5  text-white px-10 py-5 rounded-2xl font-bold text-lg border-2 border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Learn More</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </a>
                </div>
                <div className="flex items-center space-x-8 pt-8 animate-fade-in-up delay-400">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 border-2 border-[#131619] flex items-center justify-center text-white font-bold text-sm"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">
                      50K+ Patients
                    </p>
                    <p className="text-white/50 text-sm">Trusted worldwide</p>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in-right">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-[3rem] blur-3xl animate-pulse"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-[3rem] blur-2xl"></div>
                  <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/10 ">
                    <img
                      src="/assets/images/freepik__upload__11078.png"
                      alt="Healthcare"
                      className="w-full h-[550px] object-cover hidden md:block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131619]/50 to-transparent"></div>
                  </div>
                </div>
                <div className="absolute  hidden md:block -bottom-6 -right-6 bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-6 rounded-3xl shadow-2xl shadow-emerald-500/40  border border-white/20">
                  <p className="text-4xl font-black">98%</p>
                  <p className="text-sm font-semibold opacity-90">
                    Satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "https://raw.createusercontent.com/e0fc3ce2-5af8-4c09-ae8c-367eb7c3cade/",
                  title: "Board-Certified Doctors",
                  desc: "Our physicians have extensive training and expertise in their respective specialties.",
                },
                {
                  icon: "https://raw.createusercontent.com/5fd6a6da-eb5a-4b06-9867-bc60bf287210/",
                  title: "Advanced Technology",
                  desc: "State-of-the-art diagnostic and treatment equipment for accurate results.",
                },
                {
                  icon: "https://raw.createusercontent.com/edfa1241-5597-4350-b24f-765b63111315/",
                  title: "Patient-Centered Care",
                  desc: "Personalized treatment plans tailored to your individual health needs.",
                },
              ].map((feature, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-white/5  p-8 rounded-3xl border border-white/10 group-hover:border-emerald-500/30 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                      <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
                        <img
                          src={feature.icon}
                          alt={feature.title}
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Section */}
        <div className="py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-6 py-3 rounded-full text-sm font-bold border border-emerald-500/30 ">
                  👨‍⚕️ Our Expert Team
                </span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Meet Our{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Doctors
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Highly skilled specialists dedicated to providing you with
                exceptional care and treatment
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-[3rem] blur-2xl"></div>
              <div className="relative rounded-[3rem] overflow-hidden bg-white/5  border border-white/10">
                <InfiniteMovingCards
                  items={Doctors.length !== 0 ? Doctors : doctors}
                  direction="right"
                  speed="slow"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="Services" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-teal-500/5"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-6 py-3 rounded-full text-sm font-bold border border-emerald-500/30 ">
                  🏥 What We Offer
                </span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Comprehensive healthcare solutions for the whole family
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "https://raw.createusercontent.com/42217a4d-c4b5-425b-94f0-56602fba9971/",
                  title: "General Medicine",
                  desc: "Preventive care, health screenings, and treatment for common illnesses.",
                  link: "https://en.wikipedia.org/wiki/Internal_medicine",
                },
                {
                  icon: "https://raw.createusercontent.com/df699793-d51a-4324-b56c-eabbe453ed58/",
                  title: "Pediatrics",
                  desc: "Specialized care for infants and children, including vaccinations and monitoring.",
                  link: "https://en.wikipedia.org/wiki/Pediatrics",
                },
                {
                  icon: "https://raw.createusercontent.com/00718a94-03a6-4abb-8766-705e73ecb0a8/",
                  title: "Cardiology",
                  desc: "Expert cardiac care including heart disease prevention and treatment.",
                  link: "https://en.wikipedia.org/wiki/Cardiology",
                },
                {
                  icon: "https://raw.createusercontent.com/6a5ecf3a-ec67-459c-8093-e1a8b3e3db0a/",
                  title: "Neurology",
                  desc: "Specialized treatment for neurological conditions and nervous system disorders.",
                  link: "https://en.wikipedia.org/wiki/Neurology",
                },
              ].map((service, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-white/5  p-8 rounded-3xl border border-white/10 group-hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="w-8 h-8"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                      {service.desc}
                    </p>
                    <a
                      href={service.link}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-bold inline-flex items-center space-x-2 group/link"
                    >
                      <span>Learn More</span>
                      <span className="group-hover/link:translate-x-1 transition-transform">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div id="About" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-[3rem] blur-2xl"></div>
              <div className="relative grid md:grid-cols-4 gap-6">
                {[
                  { num: "15+", label: "Years of Excellence" },
                  { num: "50K+", label: "Patients Served" },
                  { num: "40+", label: "Medical Experts" },
                  { num: "98%", label: "Patient Satisfaction" },
                ].map((stat, idx) => (
                  <div key={idx} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative bg-white/5  p-10 rounded-3xl border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300 text-center group-hover:transform group-hover:scale-105">
                      <div className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-3 animate-gradient">
                        {stat.num}
                      </div>
                      <div className="text-white/70 font-bold">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 relative">
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 rounded-[3rem] blur-3xl group-hover:blur-[100px] transition-all duration-700"></div>
              <div className="relative bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20  p-16 rounded-[3rem] border-2 border-emerald-500/30 shadow-2xl text-center">
                <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Ready to Take Control of Your{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Health?
                  </span>
                </h2>
                <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                  Schedule your appointment today and experience world-class
                  healthcare in a warm and welcoming environment.
                </p>
                <Link
                  href={
                    !isLoggedIn
                      ? "/login"
                      : `/patients/${user_id}/new-appointment`
                  }
                  className="inline-block group/btn relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-105 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Schedule Now</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="Contact" className="relative border-t border-white/10 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-teal-500/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <img
                  src="/assets/icons/logo-full.svg"
                  alt="CarePlus Clinic"
                  className="h-10 mb-4"
                />
              </div>
              <h2 className="text-2xl font-black text-white mb-4">
                CarePlus Clinic
              </h2>
              <p className="text-white/60 leading-relaxed">
                Providing exceptional healthcare services with compassion and
                innovation since 2010.
              </p>
            </div>
            <div className="bg-white/5  p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-black text-emerald-400 mb-4">
                Frontend Developer
              </h3>
              <p className="text-white font-bold mb-3">Mahmoud Mohamed</p>
              <p className="text-white/70 text-sm mb-2 flex items-center space-x-2">
                <span>📧</span>
                <a
                  href="mailto:mahnud0987@gmail.com"
                  className="hover:text-emerald-400 transition-colors"
                >
                  mahnud0987@gmail.com
                </a>
              </p>
              <p className="text-white/70 text-sm flex items-center space-x-2">
                <span>📞</span>
                <a
                  href="tel:+201009014597"
                  className="hover:text-emerald-400 transition-colors"
                >
                  01009014597
                </a>
              </p>
            </div>
            <div className="bg-white/5  p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-black text-teal-400 mb-4">
                Backend Developer
              </h3>
              <p className="text-white font-bold mb-3">Mohamed Fouad</p>
              <p className="text-white/70 text-sm mb-2 flex items-center space-x-2">
                <span>📧</span>
                <a
                  href="mailto:mfb4010@gmail.com"
                  className="hover:text-emerald-400 transition-colors"
                >
                  mfb4010@gmail.com
                </a>
              </p>
              <p className="text-white/70 text-sm flex items-center space-x-2">
                <span>📞</span>
                <a
                  href="tel:+201153032052"
                  className="hover:text-emerald-400 transition-colors"
                >
                  01153032052
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/50 text-sm">
              &copy; 2025 CarePlus Clinic. All rights reserved. Made with ❤️ by
              our amazing team.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
