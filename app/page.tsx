export default function HomePage() {
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

  return (
    <div>
      <style>{`
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 100px;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 24px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .hero-content p {
          font-size: 1.1rem;
          color: #a1a5ab;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 500px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
        }

        .btn {
          padding: 14px 32px;
          border-radius: 24px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #24ae7c 0%, #1a8659 100%);
          color: #131619;
          min-width: 160px;
        }

        .btn-primary:hover {
          box-shadow: 0 8px 24px rgba(36, 174, 124, 0.3);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          color: #24ae7c;
          border: 2px solid #24ae7c;
          min-width: 160px;
        }

        .btn-secondary:hover {
          background: rgba(36, 174, 124, 0.1);
          transform: translateY(-2px);
        }

        .hero-image-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 500px;
        }

        .hero-image {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, rgba(36, 174, 124, 0.1) 0%, rgba(26, 134, 89, 0.05) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 140px;
          border: 2px solid rgba(36, 174, 124, 0.2);
          position: relative;
          overflow: hidden;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes scroll-doctors {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * 5 - 60px * 5));
          }
        }

        .hero-image::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(36, 174, 124, 0.1), transparent);
          animation: spin 8s linear infinite;
        }

        .features-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 100px;
        }

        .feature-item {
          background: #1a1d21;
          border: 1px solid #242831;
          border-radius: 16px;
          padding: 32px;
          backdrop-filter: blur(10px);
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: #242831;
          border-color: rgba(36, 174, 124, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(36, 174, 124, 0.1);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .feature-icon img,
        .service-icon img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
          margin: 0 auto;
          display: block;
        }

        .feature-item h3 {
          color: #ffffff;
          font-size: 1.2rem;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .feature-item p {
          color: #a1a5ab;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .doctors-section {
          margin-bottom: 100px;
        }

        .section-title {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title h2 {
          font-size: 2.8rem;
          color: #ffffff;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .section-title p {
          font-size: 1.1rem;
          color: #a1a5ab;
        }

        .doctors-scroll-container {
          position: relative;
          overflow: hidden;
          margin-bottom: 60px;
        }

        .doctors-scroll {
          display: flex;
          gap: 20px;
          animation: scroll-doctors 30s linear infinite;
        }

        .doctor-card {
          flex: 0 0 280px;
          background: #1a1d21;
          border: 1px solid #242831;
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          text-align: center;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .doctor-card:hover {
          background: #242831;
          border-color: rgba(36, 174, 124, 0.3);
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(36, 174, 124, 0.15);
        }

        .doctor-image {
          width: 200px;
          height: 200px;
          border-radius: 16px;
          object-fit: cover;
          margin-bottom: 20px;
          border: 2px solid rgba(36, 174, 124, 0.2);
        }

        .doctor-name {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .doctor-specialty {
          color: #24ae7c;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .services-section {
          margin-bottom: 100px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .service-card {
          background: #1a1d21;
          border: 1px solid #242831;
          border-radius: 16px;
          padding: 40px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .service-card:hover {
          background: #242831;
          border-color: rgba(36, 174, 124, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(36, 174, 124, 0.1);
        }

        .service-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .service-card h3 {
          color: #ffffff;
          font-size: 1.3rem;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .service-card p {
          color: #a1a5ab;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .service-link {
          color: #24ae7c;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: gap 0.3s ease;
        }

        .service-link:hover {
          gap: 12px;
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-bottom: 100px;
        }

        .stat-box {
          background: #1a1d21;
          border: 1px solid #242831;
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .stat-box:hover {
          border-color: rgba(36, 174, 124, 0.3);
          box-shadow: 0 8px 16px rgba(36, 174, 124, 0.1);
        }

        .stat-number {
          font-size: 2.5rem;
          color: #24ae7c;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #a1a5ab;
          font-size: 0.95rem;
        }

        .cta-section {
          background: #1a1d21;
          border: 1px solid #242831;
          border-radius: 16px;
          padding: 60px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .cta-section h2 {
          font-size: 2.2rem;
          color: #ffffff;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .cta-section p {
          font-size: 1.1rem;
          color: #a1a5ab;
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 1024px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 60px;
          }

          .hero-content h1 {
            font-size: 2.8rem;
          }

          .hero-image-container {
            height: 400px;
          }

          .hero-image {
            width: 300px;
            height: 300px;
            font-size: 100px;
          }

          .features-section {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
          }

          .doctors-scroll {
            animation: scroll-doctors 40s linear infinite;
          }
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }

          .btn {
            width: 100%;
          }

          .hero-image-container {
            height: 320px;
          }

          .hero-image {
            width: 240px;
            height: 240px;
            font-size: 80px;
          }

          .features-section {
            grid-template-columns: 1fr;
          }

          .section-title h2 {
            font-size: 2rem;
          }

          .stats-section {
            grid-template-columns: 1fr;
          }

          .cta-section {
            padding: 40px 20px;
          }

          .cta-section h2 {
            font-size: 1.6rem;
          }

          .doctor-card {
            flex: 0 0 240px;
          }

          .doctor-image {
            width: 160px;
            height: 160px;
          }
        }
           header {
            background: #1a1d21;
            color: white;
            position: sticky;
            top: 20px;
            z-index: 100;
            border-radius: 20px;
            border: 1px solid #242831;
            margin-bottom: 0;
            backdrop-filter: blur(10px);
          }

          .header-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo-section {
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 120px;
          }

          .logo-img {
            width: 180px;
            height: 60px;
            border-radius: 12px;
            padding: 4px;
          }

          .clinic-name {
            font-size: 1.2rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, #24ae7c 0%, #1a8659 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          nav {
            display: flex;
            gap: 32px;
            justify-content: center;
            margin: 0 40px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid #242831;
            border-radius: 50px;
            padding: 12px 32px;
            backdrop-filter: blur(10px);
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
          }

          nav a {
            color: #a1a5ab;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
            transition: color 0.3s ease;
            white-space: nowrap;
          }

          nav a:hover {
            color: #24ae7c;
          }

          .auth-buttons {
            display: flex;
            gap: 12px;
            min-width: 140px;
            justify-content: flex-end;
          }

          .auth-buttons a {
            padding: 10px 20px;
            border-radius: 24px;
            font-weight: 600;
            font-size: 14px;
            text-decoration: none;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
          }

          .login-btn {
            color: #a1a5ab;
            background: transparent;
            border: 1px solid #242831;
          }

          .login-btn:hover {
            background: #242831;
            color: #24ae7c;
            border-color: #24ae7c;
          }

          .register-btn {
            background: linear-gradient(135deg, #24ae7c 0%, #1a8659 100%);
            color: #131619;
            font-weight: 700;
            border: none;
          }

          .register-btn:hover {
            box-shadow: 0 8px 16px rgba(36, 174, 124, 0.3);
            transform: translateY(-2px);
          }

          main {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0;
            min-height: auto;
            background: #131619;
            border-radius: 24px;
            margin-top: -20px;
            overflow: hidden;
          }

          .main-content {
            padding: 80px 60px;
            background: #131619;
            min-height: calc(100vh - 200px);
            border-radius: 24px;
          }

          footer {
            background: #1a1d21;
            color: #a1a5ab;
            padding: 40px 60px;
            text-align: center;
            margin-top: 0;
            border-radius: 24px;
            border: 1px solid #242831;
          }

          .footer-content {
            max-width: 1400px;
            margin: 0 auto;
          }

          .footer-content p {
            margin: 10px 0;
            font-size: 0.95rem;
          }

          @media (max-width: 1024px) {
            .header-content {
              padding: 0 30px;
              flex-wrap: wrap;
            }

            nav {
              order: 3;
              width: 100%;
              margin: 20px 0 0 0;
              gap: 20px;
              padding: 12px 24px;
            }

            .auth-buttons {
              order: 2;
            }

            .main-content {
              padding: 60px 40px;
            }

            footer {
              padding: 30px 40px;
            }
          }

          @media (max-width: 768px) {
            body {
              padding: 16px;
            }

            header {
              top: 16px;
            }

            .header-content {
              flex-direction: column;
              gap: 16px;
              padding: 0 20px;
            }

            .logo-section {
              width: 100%;
              justify-content: center;
            }

            nav {
              order: 3;
              width: 100%;
              margin: 16px 0 0 0;
              gap: 12px;
              padding: 10px 16px;
              flex-wrap: wrap;
              justify-content: center;
            }

            nav a {
              font-size: 0.85rem;
              gap: 8px;
            }

            .auth-buttons {
              order: 2;
              width: 100%;
              justify-content: center;
            }

            .clinic-name {
              font-size: 1rem;
            }

            main {
              margin-top: -16px;
            }

            .main-content {
              padding: 40px 20px;
              min-height: auto;
            }

            footer {
              padding: 20px;
            }
          }
      `}</style>
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
            <a href="/">Home</a>
            <a href="/">Services</a>
            <a href="/">About</a>
            <a href="/">Contact</a>
          </nav>
          <div className="auth-buttons">
            <a href="/login" className="login-btn">
              Log in
            </a>
            <a href="/patients/register" className="register-btn">
              Register
            </a>
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
              <button className="btn btn-primary">Book Appointment</button>
              <button className="btn btn-secondary">Learn More</button>
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
              {[...doctors, ...doctors].map((doctor, index) => (
                <div key={index} className="doctor-card">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="doctor-image"
                  />
                  <div className="doctor-name">{doctor.name}</div>
                  <div className="doctor-specialty">{doctor.specialty}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="services-section">
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
              <a href="/services" className="service-link">
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
              <a href="/services" className="service-link">
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
              <a href="/services" className="service-link">
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
              <a href="/services" className="service-link">
                Learn More →
              </a>
            </div>
          </div>
        </div>

        <div className="stats-section">
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
          <button className="btn btn-primary">Schedule Now</button>
        </div>
      </div>
      <footer>
        <div className="footer-content">
          <p>&copy; 2025 HealthCare Clinic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
