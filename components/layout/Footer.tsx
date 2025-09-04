import React from "react";
import Logo from "../common/Logo";
import Button from "../common/Button";

/**
 * Footer component
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-3 border-base py-12 mt-16 relative">
      <div className="container mx-auto px-4 relative">
        <div className="neo-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <Logo showDot={true} />
              <p className="text-xl font-bold">
                <span className="text-accent">Believe</span> in yourself
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <Button variant="secondary">Terms</Button>
              <Button variant="secondary">Privacy</Button>
              <Button variant="secondary">Contact</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="font-bold border-3 border-base bg-white inline-block px-4 py-2">
            &copy; {new Date().getFullYear()} haters.me. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;