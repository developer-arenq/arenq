import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const AboutStory = () => {
  const [selected, setSelected] = useState('story');
  const router = useRouter();

  const data = {
    story: {
      image: '/images/blogs/Blog1.png',
      description:
        'Nestled in the lap of the majestic Himalayas and other scenic mountain ranges of India, countless artisans, farmers, and small manufacturers pour their hearts into creating products that reflect the purity, culture, and spirit of the hills. Yet, their creations often remain hidden from the mainstream market.',
      buttonLabel: 'Go to Blog',
      path: '/blog',
    },
    about: {
      image: '/images/blogs/Blog3.png',
      description:
        'What if the biggest challenge for a business isn’t the product, but its visibility? Whenever I visited my hometown, Dharamshala, I saw talented artisans and hardworking shop owners struggling—not because they lacked quality or dedication, but because they didn’t have access to a larger market..',
      buttonLabel: 'Go to About Us',
      path: '/about-us',
    },
  };

  const handleClick = (type) => setSelected(type);
  const handleNavigate = () => router.push(data[selected].path);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => handleClick('story')}
          className={`px-5 py-2 rounded-full transition ${
            selected === 'story'
              ? 'bg-[#2d241b] text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Story
        </button>
        <button
          onClick={() => handleClick('about')}
          className={`px-5 py-2 rounded-full transition ${
            selected === 'about'
              ? 'bg-[#2d241b] text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          About Us
        </button>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="w-full flex justify-center">
          <div className="relative w-full h-[300px] md:h-[400px] rounded shadow overflow-hidden">
            <Image
              src={data[selected].image}
              alt={selected}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="text-center md:text-left">
          <p className="mb-4 text-lg text-gray-800">
            {data[selected].description}
          </p>
          <button
            onClick={handleNavigate}
            className="mt-2 px-6 py-2 bg-[#2d241b] text-white rounded hover:bg-[#524232] transition"
          >
            {data[selected].buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
