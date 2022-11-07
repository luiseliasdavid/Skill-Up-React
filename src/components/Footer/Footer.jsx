import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="container d-flex mt-5 bg-light ">
      <span>SkillUp - Noviembre 2022</span>
      <ul id="footer-list" className="container d-flex justify-content-between">
        <li className="footer-item">Daiana Gimenez</li>
        <li className="footer-item">Facundo Alvarez</li>
        <li className="footer-item">Juan Manuel Monaco</li>
        <li className="footer-item">Lucas C.</li>
        <li className="footer-item">Luis Davi</li>
        <li className="footer-item">Santiago</li>
        <li className="footer-item">Tobias Zavallo</li>
      </ul>
    </footer>
  );
};

export default Footer;
