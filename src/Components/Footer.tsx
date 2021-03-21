import { ReactElement } from "react";

function Footer(): ReactElement {
  return (
    <footer className="footer">
      <code className="footer-text">
        <span className="footer-text--pre">
          Made by 
        </span>{" "}
        <span className="highlight">
          <a href="https://www.buymeacoffee.com/davidsint" target="_blank" rel="noopener noreferrer">
            David Sint
          </a>
        </span>
      </code>
    </footer>
  );
}

export default Footer;

