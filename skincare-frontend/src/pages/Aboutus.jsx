import React from 'react';
import aboutSubImg from '../assets/aboutsub.jpg';
import aboutSub2Img from '../assets/aboutsub2.jpg';
import aboutImg from '../assets/about.jpg';

const Aboutus = () => {
  return (
    <div className="w-full py-16">
      <h1 className="text-5xl font-bold text-center mb-20 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>About Us</h1>

      {/* Section 1: Image Left, Mission Right */}
      <div className="flex flex-col md:flex-row items-center mb-0">
        <div className="md:w-1/2 w-full">
          <img src={aboutSubImg} alt="Our Mission" className="w-full h-[500px] object-cover" />
        </div>
        <div className="md:w-1/2 w-full text-center md:text-left p-8 md:pl-16 h-[500px] flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-wide" style={{ fontFamily: '"Italiana", sans-serif' }}>OUR MISSION</h2>
          <p className="text-xl text-gray-700 leading-relaxed font-light">
            We are on a mission to make the practice of self-care a simple, joyful and effective part of your everyday.
          </p>
        </div>
      </div>

      {/* Section 2: Philosophy Left, Image Right */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 w-full order-2 md:order-1 text-center md:text-left p-8 md:pr-16 h-[500px] flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-wide" style={{ fontFamily: '"Italiana", sans-serif' }}>OUR PHILOSOPHY</h2>
          <p className="text-xl text-gray-700 leading-relaxed font-light mb-4">
            We believe in the power of small, consistent steps to achieve lasting results.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed font-light">
            By combining time-tested holistic practices with the latest in innovation, we help you consciously commit to nourishing your mind, body and spirit with self-care rituals that work.
          </p>
        </div>
        <div className="md:w-1/2 w-full order-1 md:order-2">
          <img src={aboutSub2Img} alt="Our Philosophy" className="w-full h-[500px] object-cover" />
        </div>
      </div>

      {/* Section 3: Full Width Image with Overlay */}
      <div className="relative w-full h-[600px] mt-10">
        <img src={aboutImg} alt="Why 7°Skin" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20 text-white bg-black/40">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: '"Italiana", sans-serif' }}>WHY 7°Skin</h2>
          <h3 className="text-2xl font-semibold mb-6">Born in Sri Lanka, for the world.</h3>
          <div className="max-w-4xl text-lg md:text-xl leading-relaxed space-y-4 font-light">
            <p>Inspired by the standard meridian that runs through our island and connects us to the rhythm of the globe, we set out to create a modern self-care experience rooted in Sri Lankan heritage and shaped for a global lifestyle.</p>
            <p>Grounded in nature, enriched by tradition, and refined with innovation, this balance defines every product we create and every ritual we share.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;