import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./landingPage.css"; // for custom styles
import { Link } from "react-router-dom";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="landing-page">
      <nav className="navbar navbar-expand-lg nav">
        <img
          src="https://cdn.prod.website-files.com/5b15d605b7c459fc409872b5/6584c9d60c1bfe93ba753276_Close%20CRM%20Logo%204.png"
          alt=""
        />
        <a className="name" href="/signup">
          ChatAI
        </a>
        <div className="">
          <a className="navbar-brand" href="/signup">
            Signup
          </a>
          <a
            className="navbar-brand"
            href="https://www.linkedin.com/in/thejas-sn-921706284/"
          >
            Contact us
          </a>
          <i className="fa-solid fa-magnifying-glass"></i>
          <a className="navbar-brand" href="">
            <i className="fa-solid fa-bars"></i>
          </a>
        </div>
      </nav>
      <div className="hero-container">
        <section className="hero" id="home" data-aos="fade-up">
          <h1>Smart AI Conversations, Instantly</h1>
          <p>
            Experience the future of communication with ChatAI — your
            intelligent assistant for everything you need to know, do, or
            discover.
          </p>
          <Link to="/login">
            <button className="btn">Get Started</button>
          </Link>
        </section>
      </div>

      <section className="features" id="features">
        <div className="feature" data-aos="zoom-in">
          <h3>Natural Conversations</h3>
          <p className="feature-text">
            Talk to ChatAI like a human. Get answers, solve problems, and
            explore ideas in real time.
          </p>
        </div>
        <div className="feature" data-aos="zoom-in" data-aos-delay="200">
          <h3>Technology Used </h3>
          <p className="feature-text">
            Built with the Latest web technologies, this app is a full-stack.
            Frontend with React, backend powered by Node.js and Express, MongoDB
            for the Storing Data.
          </p>
        </div>
        <div className="feature" data-aos="zoom-in" data-aos-delay="400">
          <h3>Student Friendly</h3>
          <p className="feature-text">
            Get study help, clear your doubts instantly, and stay organized with
            smart tools made for students. Whether you're studying for exams,
            working on projects, or just curious to learn, ChatAI is your
            perfect companion.
          </p>
        </div>
      </section>

      <section className="about" id="about" data-aos="fade-up">
        <h2>About Me</h2>
        <p className="about-text">
          Hi! I'm Thejas SN, a passionate software developer and BCA final-year
          student. I specialize in building modern, intelligent web applications
          that blend smart user interfaces with powerful backend logic.
        </p>
        <p className="about-text">
          This ChatAI platform is a part of my journey to explore the power of
          AI and web technologies. I’ve previously built apps for stock trading,
          property listings, and real-time chat — always aiming to solve real
          problems with clean, user-friendly solutions.
        </p>
        <p className="about-text">
          I'm constantly learning, experimenting, and working towards a future
          where I can contribute to world-class innovations .
        </p>
      </section>

      <footer className="footer" id="contact">
        © 2025 ChatAI. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
