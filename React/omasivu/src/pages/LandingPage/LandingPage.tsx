import React from 'react';
import './LandingPage.css';

import engine1 from '../../assets/engine1.png';
import engine2 from '../../assets/engine2.png';
import nft1 from '../../assets/nft1.png';
import nft2 from '../../assets/nft2.png';
import catImage from '../../assets/Cat.png';
import webstore from '../../assets/webstore.png';
import skeleton from '../../assets/skeleton.png';

const LandingPage: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetSelector: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header>
        <div className="logo">Salmela Jenna</div>
        <nav>
          <ul>
            <li>
              <a href="#" onClick={(e) => handleScroll(e, '.projects')}>
                Projects
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleScroll(e, '.info')}>
                Info
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleScroll(e, '.contact')}>
                Contact
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleScroll(e, '.faq')}>
                FAQ
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="header-name">
          <h1 className="main-title">PORTFOLIO</h1>
        </section>
        <section className="projects">
          <h1>Projects</h1>
          <p>Explore my latest work and creative projects</p>
          <div className="project-card">
            <div className="large-image">
              <img src={engine1} alt="Engine Oil Design 1" />
            </div>
            <div className="content">
              <div className="small-image">
                <img src={engine2} alt="Engine Oil Design 2" />
              </div>
              <div className="project-description">
                <h2>Engine Cleaner Website</h2>
                <p>
                  A modern and responsive web application design for showcasing engine oils.
                  Created by me as both a designer and developer, focusing on sleek UI and user-friendly experience.
                </p>
              </div>
            </div>
          </div>
          <div className="project-card">
            <div className="large-image">
              <img src={nft1} alt="NFT Design 1" />
            </div>
            <div className="content">
              <div className="small-image">
                <img src={nft2} alt="NFT Design 2" />
              </div>
              <div className="project-description">
                <h2>NFT cards</h2>
                <p>
                  NFT Market is a modern web application,
                  with NFT digital collections in a minimalistic design.
                  The app's interface focuses on user experience, combining striking design and functionality.
                </p>
              </div>
            </div>
          </div>
          <div className="content1">
            <div className="cat-image">
              <img src={catImage} alt="Cat" />
            </div>
            <div className="project-description1">
              <p>
                Two different design styles that will work for
                different projects such as website design,
                social media posts or presentations.
              </p>
            </div>
          </div>
          <div className="project-card">
            <div className="large-image">
              <img src={webstore} alt="Web Design" />
            </div>
            <div className="content">
              <div className="project-description">
                <h2>Web store</h2>
                <p>
                  Electric skateboards online store.
                  The store's design combines minimalism with high technology,
                  underlining the innovative nature of the product.
                </p>
              </div>
            </div>
          </div>
          <div className="project-card1">
            <div className="small-image">
              <img src={skeleton} alt="Skeleton" />
            </div>
            <div className="project-description1">
              <h2>Portfolio</h2>
              <p>
                Creating your portfolio card for social media
                engages more clients and creates a first impression of the artist.
              </p>
            </div>
          </div>
        </section>
        <section className="info">
          <h1>Info</h1>
          <p>Get to know more about me, my journey, and my vision.</p>
        </section>
        <section className="contact">
          <h1>Contact</h1>
          <p>Reach out for collaborations or inquiries.</p>
        </section>
        <section className="faq">
          <h1>FAQ</h1>
          <p>Find answers to common questions about my work.</p>
        </section>
      </main>
      <footer>
        <p>© 2025 Salmela Jenna. All rights reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;