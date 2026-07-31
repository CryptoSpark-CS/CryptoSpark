export default function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <svg
            className="spark"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
          </svg>
          CRYPTOSPARK
        </div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#contact" className="nav-cta">
          Start a project →
        </a>
      </nav>
    </header>
  );
}
