import React from 'react';
import image from './20.jpg';
function About() {
  return (
    <div>
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center mt-16" style={{backgroundImage: `url(${image})`}}>
    </div>
    <div className="max-w-2xl mx-auto px-4 py-8 mt-52">
    <h1 className="font-bold text-cyan-400 text-6xl mb-11 text-center">Welcome to our Apex Legends Blog</h1>
    <p className="text-lg text-slate-800 mb-52 text-center">
      Where we dive deep into the heart of the Apex Games! Whether you're a seasoned veteran or just dropping into Kings Canyon for the first time, our blog is your ultimate resource for all things Apex. From champion spotlights to weapon breakdowns, gameplay strategies to map updates, we cover it all. Join us as we explore the latest legends to enter the arena, analyze the ever-changing meta, and provide tips and tricks to help you dominate the competition. Gear up, Legends, because the battle for glory starts here.
    </p>
  </div></div>
  );
}

export default About;
