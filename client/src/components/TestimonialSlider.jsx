import React from 'react';
import TestimonialSlider from './TestimonialSlider';

const TestimonialPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
      {/* Testimonial Section */}
      <section className="relative bg-black bg-opacity-90">
        <img
          src="https://storage.googleapis.com/a1aa/image/2fd89a5e-537c-4dbb-eeff-7a4a829f9a36.jpg"
          alt="Darkened cityscape background with buildings and river"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-yellow-500 text-sm mb-2">Testimonials</h2>
          <div className="w-14 border-b border-gray-400 mx-auto mb-6" />
          <p className="text-xs max-w-md mx-auto mb-8 leading-tight">
            Cras mattis consectetur purus sit amet fermentum. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem
            malesuada magna mollis euismod. Cras justo odio, dapibus.
          </p>

          {/* ✅ Integrated Testimonial Slider */}
          <TestimonialSlider />
        </div>
      </section>

      {/* Logos Section */}
      <section className="bg-white py-8 text-black">
        <div className="max-w-6xl mx-auto flex justify-center items-center space-x-8 px-4">
          {[
            "57b7329b-816c-4f79-47d0-947ef95ed474",
            "07782bc5-02c3-4672-3f84-450a127273ba",
            "28cb90a6-602f-481c-9e7f-81252816b23d",
            "d3838959-1c97-49dc-d2d6-51c06c33aa51",
            "ce6e65d7-d189-4a7f-da31-da45edea7a39",
          ].map((id) => (
            <img
              key={id}
              src={`https://storage.googleapis.com/a1aa/image/${id}.jpg`}
              alt="Client logo"
              className="object-contain"
              width={90}
              height={40}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TestimonialPage;
