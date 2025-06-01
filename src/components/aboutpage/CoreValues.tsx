"use client";

import React from 'react';
import { FiAward, FiUsers, FiZap, FiHeart, FiBookOpen } from 'react-icons/fi';

const values = [
  {
    icon: <FiAward size={40} className="text-blue-600 mb-4" aria-hidden="true" />,
    title: 'Excellence',
    description:
      'At Radiant High School, we strive for the highest standards in academic excellence, personal conduct, and overall institutional performance to empower every student’s success.',
  },
  {
    icon: <FiBookOpen size={40} className="text-green-600 mb-4" aria-hidden="true" />,
    title: 'Integrity',
    description:
      'We uphold honesty, ethical behavior, and accountability, nurturing a culture of trust and transparency throughout our school community in Vijayawada.',
  },
  {
    icon: <FiUsers size={40} className="text-purple-600 mb-4" aria-hidden="true" />,
    title: 'Community',
    description:
      'We foster a supportive, inclusive, and collaborative learning environment where all students, teachers, and parents feel valued, respected, and connected.',
  },
  {
    icon: <FiZap size={40} className="text-yellow-500 mb-4" aria-hidden="true" />,
    title: 'Innovation',
    description:
      'Encouraging creativity and critical thinking, Radiant High School inspires students to explore new ideas and adapt to a rapidly changing world with confidence.',
  },
  {
    icon: <FiHeart size={40} className="text-red-500 mb-4" aria-hidden="true" />,
    title: 'Respect',
    description:
      'We cultivate a culture of respect for oneself, others, diversity, and the learning environment, building responsible and empathetic future citizens.',
  },
];

const CoreValues = () => {
  return (
    <section className="py-12 md:py-20 bg-[#E9ECEF]" aria-labelledby="core-values-heading">
      <div className="container mx-auto px-6 md:px-12">
        <h2
          id="core-values-heading"
          className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12 md:mb-16"
        >
          The Pillars of Radiant High School
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {values.map((value, index) => (
            <article
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
              tabIndex={0} // Make focusable for accessibility
              aria-label={`${value.title} core value`}
            >
              {value.icon}
              <h3 className="text-2xl font-semibold text-slate-700 mb-3">{value.title}</h3>
              <p className="text-md text-slate-600 leading-relaxed">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
