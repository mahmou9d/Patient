"use client"
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
  // const { access, data } = useAppSelector(
  //   (state: RootState) => state.createUser
  // )
  const { user_id ,is_admin} = useAppSelector((state: RootState) => state.getUser);

  console.log(user_id);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const access = localStorage.getItem("access");
      setIsLoggedIn(!!access);
    }
    dispatch(getUser());
    // dispatch(getAllAppointment());
    dispatch(getdoctors());
  }, [dispatch]);
  console.log(Doctors, "uihorffre");
  const doctors = [
    {
      id: 1,
      name: "Dr. James Mitchell",
      specialty: "Cardiologist",
      image:
        "https://raw.createusercontent.com/d455f0d9-49e4-4059-9162-92086e0b4b90/",
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      specialty: "Surgeon",
      image:
        "https://raw.createusercontent.com/d455f0d9-49e4-4059-9162-92086e0b4b90/",
    },
    {
      id: 3,
      name: "Dr. Emma Williams",
      specialty: "Pediatrician",
      image:
        "https://raw.createusercontent.com/d455f0d9-49e4-4059-9162-92086e0b4b90/",
    },
    {
      id: 4,
      name: "Dr. Robert Taylor",
      specialty: "Neurologist",
      image:
        "https://raw.createusercontent.com/d455f0d9-49e4-4059-9162-92086e0b4b90/",
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      specialty: "Dermatologist",
      image:
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
    <div>
      <header>
        <div className="header-content">
          <div className="logo-section">
            <img
              src="/assets/icons/logo-full.svg"
              alt="Healthcare Clinic Logo"
              className="logo-img"
            />
          </div>
          <nav>
            <a href="#">Home</a>
            <a href="#Services">Services</a>
            <a href="#About">About</a>
            <a href="#Contact">Contact</a>
          </nav>
          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <a href="/login" className="login-btn">
                  Log in
                </a>
                <a href="/patients/register" className="register-btn">
                  Register
                </a>
              </>
            ) : (
              <>
                <button
                  className="logout-btn bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  onClick={handleLogout}
                >
                  logout
                </button>
                {is_admin&&<a href="/admin" className="text-green-500">
                  Admin
                </a>}
              </>
            )}
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Your Health is Our Priority</h1>
            <p>
              Experience compassionate, comprehensive healthcare from a team of
              dedicated medical professionals committed to your wellness and
              recovery.
            </p>
            <div className="hero-buttons">
              <a href="/login" className="btn btn-primary">
                Book Appointment
              </a>
              <a href="#About" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-image">
              <img
                style={{ height: "500px", objectFit: "cover" }}
                src="/assets/images/freepik__upload__11078.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-item">
            <div className="feature-icon">
              <img
                src="https://raw.createusercontent.com/e0fc3ce2-5af8-4c09-ae8c-367eb7c3cade/"
                alt="Board-Certified Doctors"
              />
            </div>
            <h3>Board-Certified Doctors</h3>
            <p>
              Our physicians have extensive training and expertise in their
              respective specialties.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <img
                src="https://raw.createusercontent.com/5fd6a6da-eb5a-4b06-9867-bc60bf287210/"
                alt="Advanced Technology"
              />
            </div>
            <h3>Advanced Technology</h3>
            <p>
              State-of-the-art diagnostic and treatment equipment for accurate
              results.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <img
                src="https://raw.createusercontent.com/edfa1241-5597-4350-b24f-765b63111315/"
                alt="Patient-Centered Care"
              />
            </div>
            <h3>Patient-Centered Care</h3>
            <p>
              Personalized treatment plans tailored to your individual health
              needs.
            </p>
          </div>
        </div>

        <div className="doctors-section">
          <div className="section-title">
            <h2>Meet Our Doctors</h2>
            <p>Highly skilled specialists dedicated to your care</p>
          </div>
          <div className="doctors-scroll-container">
            <div className="doctors-scroll">
              {/* {[...doctors, ...doctors].map((doctor, index) => (
                <div key={index} className="doctor-card">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="doctor-image"
                  />
                  <div className="doctor-name">{doctor.name}</div>
                  <div className="doctor-specialty">{doctor.specialty}</div>
                </div>
              ))} */}
              {/* <div
                className="wrapper relative h-24 overflow-hidden mx-auto mt-20"
                style={{
                  maskImage:
                    "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
                  width: "90%",
                  maxWidth: "1536px",
                }}
              >
                {doctors.map((tech, idx) => (
                  <div
                    key={idx}
                    className="item absolute h-20 w-24 rounded"
                    style={{
                      backgroundImage: `url(${tech.image})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      left: `max(calc(200px * ${doctors.length}), 100%)`,
                      animationName: "scrollLeft",
                      animationDuration: `${duration}s`,
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite",
                      animationDelay: `calc(${duration}s / ${
                        doctors.length - 2
                      } * (${doctors.length - 2} - ${idx}) * -1)`,
                    }}
                  />
                ))}
              </div> */}
              <div className="h-[40rem] rounded-md flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative">
                <InfiniteMovingCards
                  items={Doctors}
                  direction="right"
                  speed="slow"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="Services" className="services-section">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>Comprehensive healthcare solutions for the whole family</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <img
                  src="https://raw.createusercontent.com/42217a4d-c4b5-425b-94f0-56602fba9971/"
                  alt="General Medicine"
                />
              </div>
              <h3>General Medicine</h3>
              <p>
                Preventive care, health screenings, and treatment for common
                illnesses. Our general practitioners provide comprehensive
                primary care for patients of all ages.
              </p>
              <a
                href="https://en.wikipedia.org/wiki/Internal_medicine"
                className="service-link"
              >
                Learn More →
              </a>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img
                  src="https://raw.createusercontent.com/df699793-d51a-4324-b56c-eabbe453ed58/"
                  alt="Pediatrics"
                />
              </div>
              <h3>Pediatrics</h3>
              <p>
                Specialized care for infants and children, including
                vaccinations, growth monitoring, and developmental assessments.
              </p>
              <a
                href="https://en.wikipedia.org/wiki/Pediatrics"
                className="service-link"
              >
                Learn More →
              </a>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img
                  src="https://raw.createusercontent.com/00718a94-03a6-4abb-8766-705e73ecb0a8/"
                  alt="Cardiology"
                />
              </div>
              <h3>Cardiology</h3>
              <p>
                Expert cardiac care including heart disease prevention,
                diagnosis, and treatment with cutting-edge technology.
              </p>
              <a
                href="https://en.wikipedia.org/wiki/Cardiology"
                className="service-link"
              >
                Learn More →
              </a>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img
                  src="https://raw.createusercontent.com/6a5ecf3a-ec67-459c-8093-e1a8b3e3db0a/"
                  alt="Neurology"
                />
              </div>
              <h3>Neurology</h3>
              <p>
                Specialized treatment for neurological conditions, headaches,
                and disorders affecting the nervous system.
              </p>
              <a
                href="https://en.wikipedia.org/wiki/Neurology"
                className="service-link"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>

        <div id="About" className="stats-section">
          <div className="stat-box">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years of Excellence</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Patients Served</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">40+</div>
            <div className="stat-label">Medical Experts</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">98%</div>
            <div className="stat-label">Patient Satisfaction</div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Take Control of Your Health?</h2>
          <p>
            Schedule your appointment today and experience world-class
            healthcare in a warm and welcoming environment.
          </p>
          <Link
            href={
              !isLoggedIn ? "/login" : `/patients/${user_id}/new-appointment`
            }
            className="btn btn-primary"
          >
            Schedule Now
          </Link>
        </div>
      </div>
      <footer
        id="Contact"
        className="bg-gradient-to-r from-[#00000000] to-[#001a0b] text-white py-10 mt-20"
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold mb-3">CarePlus Clinic</h2>
              <p className="text-sm opacity-80">
                Providing exceptional healthcare services with compassion and
                innovation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Frontend Developer</h3>
              <p className="font-medium">Mahmoud Mohamed</p>
              <p className="text-sm mt-1">
                📧
                <a
                  href="mailto:mahnud0987@gmail.com"
                  className="underline hover:text-gray-200 ml-1"
                >
                  mahnud0987@gmail.com
                </a>
              </p>
              <p className="text-sm mt-2 pr-2">📞 01009014597</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Backend Developer</h3>
              <p className="font-medium">Mohamed Fouad</p>
              <p className="text-sm mt-1">
                📧
                <a
                  href="mailto:mfb4010@gmail.com"
                  className="underline hover:text-gray-200 ml-1"
                >
                  mfb4010@gmail.com
                </a>
              </p>
              <p className="text-sm mt-2 pr-2">📞 01153032052</p>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm opacity-80">
            <p>&copy; 2025 CarePlus Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
