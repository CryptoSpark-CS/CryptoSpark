export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact">
      <div className="wrap">
        <div className="footer-grid">
          <div>
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
            <p
              style={{
                color: "var(--ink-soft)",
                fontSize: 14,
                marginTop: 14,
                maxWidth: 260,
              }}
            >
              Software engineering across fintech, web/mobile, commerce,
              blockchain, and trading signals.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h5>Services</h5>
              <a href="#services">Fintech</a>
              <a href="#services">Web & Mobile</a>
              <a href="#services">E-commerce</a>
              <a href="#services">Smart Contracts</a>
              <a href="#services">Trading Signals</a>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <a href="#work">Work</a>
              <a href="#process">Process</a>
              <a href="#">Careers</a>
            </div>
            <div className="footer-col">
              <h5>Get in touch</h5>
              <a href="mailto:hello@cryptospark.io">hello@cryptospark.io</a>
              <a href="#">+216 00 000 000</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} CryptoSpark. All rights reserved.</span>
          <span>Built to spec, not template.</span>
        </div>
      </div>
    </footer>
  );
}
