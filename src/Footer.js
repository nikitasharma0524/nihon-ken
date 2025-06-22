import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm py-4 text-center mt-16 shadow-inner">
      <p>
        © {new Date().getFullYear()} Nihonken ・ Learn about Japan, one fact at
        a time.
      </p>
    </footer>
  );
};

export default Footer;
