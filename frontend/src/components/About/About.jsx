import './style.css';

const About = () => {
  return (
    <div id="about">
      <div className="container grid">
        <aside className="plan-details">
          Quickly connect with clients, showcase your skills, manage bookings in
          real-time, and enjoy secure payments for your maintenance services.
        </aside>
      </div>

      <div className="container grid grid--4--cols gap-20">
        <div className="feature">
          <div className="feature-icon">
            <svg
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-hammer"
              viewBox="0 0 16 16"
            >
              <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5 5 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334" />
            </svg>
          </div>
          <p className="feature-title">24/7 Emergency Repairs</p>
          <p className="feature-text">
            Round-the-clock service for urgent repairs, anytime, anywhere
          </p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <svg
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-screwdriver"
              viewBox="0 0 16 16"
            >
              <path d="M0 .995.995 0l3.064 2.19a1 1 0 0 1 .417.809v.07c0 .264.105.517.291.704l5.677 5.676.909-.303a1 1 0 0 1 1.018.24l3.338 3.339a.995.995 0 0 1 0 1.406L14.13 15.71a.995.995 0 0 1-1.406 0l-3.337-3.34a1 1 0 0 1-.24-1.018l.302-.909-5.676-5.677a1 1 0 0 0-.704-.291H3a1 1 0 0 1-.81-.417zm11.293 9.595a.497.497 0 1 0-.703.703l2.984 2.984a.497.497 0 0 0 .703-.703z" />
            </svg>
          </div>
          <p className="feature-title">Professional Technicians</p>
          <p className="feature-text">
            Experienced technicians ensuring top-quality service
          </p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <svg
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-tools "
              viewBox="0 0 16 16"
            >
              <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
            </svg>
          </div>
          <p className="feature-title">Transparent Pricing</p>
          <p className="feature-text">
            Clear, upfront pricing with no hidden costs or surprises.
          </p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <svg
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-wrench"
              viewBox="0 0 16 16"
            >
              <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364zm13.37 9.019.528.026.287.445.445.287.026.529L15 13l-.242.471-.026.529-.445.287-.287.445-.529.026L13 15l-.471-.242-.529-.026-.287-.445-.445-.287-.026-.529L11 13l.242-.471.026-.529.445-.287.287-.445.529-.026L13 11z" />
            </svg>
          </div>
          <p className="feature-title">Instant Job Matching</p>
          <p className="feature-text">
            Quickly connect with clients seeking your maintenance expertise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
