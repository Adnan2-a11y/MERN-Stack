import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <GraduationCap className="w-16 h-16 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Congratulations, Graduates 🎓
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Step into the future with confidence! Celebrate your achievements and explore endless possibilities.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition">
            Join Celebration
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition">
            Learn More
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
