'use client';

import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RVImage {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface RVModel {
  modelName: string;
  category: string;
  sleeps: string;
  images: RVImage[];
}

const rvModels: RVModel[] = [
  {
    modelName: 'Momentum 2',
    category: 'Premium Luxury',
    sleeps: 'Sleeps 8–10',
    images: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1661220715153-95724e5f3500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBydiUyMG1vdG9yaG9tZSUyMGludGVyaW9yfGVufDF8fHx8MTc3NDA0MDM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Luxurious Living Room',
        description: 'Premium leather seating with state-of-the-art entertainment system',
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1593184091721-409ccc1753d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBydiUyMGNhbXBlciUyMGJlZHJvb218ZW58MXx8fHwxNzc0MDQwMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Master Bedroom Suite',
        description: 'King-size bed with premium bedding and climate control',
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1661415747894-308b6417c91e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBydiUyMGRyaXZlciUyMGNhYmlufGVufDF8fHx8MTc3NDA0MTMwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Fireplace & Marble Counters',
        description: 'Premium finishes throughout — marble counters, wood floors, designer fixtures',
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1706670368974-af427a98e816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGJhdGhyb29tJTIwc2hvd2VyJTIwbW9kZXJufGVufDF8fHx8MTc3NDA0MDM3OHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Spa-Style Bathroom',
        description: 'Modern bathroom with rain shower and luxury fixtures',
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1549047608-55b2fd4b8427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmhvbWUlMjBpbnRlcmlvciUyMHdpZGV8ZW58MXx8fHwxNzc0MDQxMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Open Floor Plan',
        description: 'Spacious interior with panoramic windows and natural light',
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1658535404457-f37576635f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBydiUyMHN0b3JhZ2V8ZW58MXx8fHwxNzc0MDQxMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: '4 Smart TVs',
        description: 'Entertainment in every room — full smart TV setup throughout',
      },
    ],
  },
  {
    modelName: 'Momentum 3',
    category: 'Deluxe Toy Hauler',
    sleeps: 'Sleeps 10',
    images: [
      {
        id: 7,
        image: 'https://images.unsplash.com/photo-1716919875151-674390e0dd57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZXIlMjB2YW4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NzQwNDAzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Luxury Interior',
        description: 'Beautifully designed space with premium wood finishes',
      },
      {
        id: 8,
        image: 'https://images.unsplash.com/photo-1612176894219-8493bf9b9b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZXIlMjBpbnRlcmlvciUyMG5pZ2h0dGltZXxlbnwxfHx8fDE3NzQwNDEwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Evening Ambiance',
        description: 'Perfect mood lighting for a relaxing night in',
      },
      {
        id: 9,
        image: 'https://images.unsplash.com/photo-1773762159818-d929964ab226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGludGVyaW9yJTIwc3Vuc2V0fGVufDF8fHx8MTc3NDA0MTA4NHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Patio Deck',
        description: 'Enjoy breathtaking Texas sunsets from your private outdoor deck',
      },
      {
        id: 10,
        image: 'https://images.unsplash.com/photo-1767874873697-19b7acacd711?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZXIlMjBraXRjaGVuJTIwY291bnRlcnxlbnwxfHx8fDE3NzQwNDEwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Marble Counter Kitchen',
        description: 'Fully equipped kitchen with marble counters and modern appliances',
      },
      {
        id: 11,
        image: 'https://images.unsplash.com/photo-1758390124652-85900e4174bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGludGVyaW9yJTIwY2FiaW58ZW58MXx8fHwxNzc0MDQxMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Heated Seats',
        description: 'Comfort features for every season — heated seating throughout',
      },
      {
        id: 12,
        image: 'https://images.unsplash.com/photo-1773123441763-68271a7114e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGludGVyaW9yJTIwd2luZG93JTIwdmlld3xlbnwxfHx8fDE3NzQwNDEwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Smart TVs Throughout',
        description: 'Entertainment system in every room',
      },
    ],
  },
  {
    modelName: 'Heartland Gateway',
    category: '5th Wheel',
    sleeps: 'Sleeps 12',
    images: [
      {
        id: 13,
        image: 'https://images.unsplash.com/photo-1599420187237-108ef829201c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmhvbWUlMjBsaXZpbmclMjByb29tJTIwY296eXxlbnwxfHx8fDE3NzQwNDAzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Spacious Living Room',
        description: 'Largest floor plan in our fleet — perfect for groups of 12',
      },
      {
        id: 14,
        image: 'https://images.unsplash.com/photo-1664987494952-819d234a1f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW1wZXIlMjBpbnRlcmlvciUyMHNlYXRzfGVufDF8fHx8MTc3NDA0MDM4MXww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Custom Hardwood Floors',
        description: 'Premium hardwood flooring and designer finishes throughout',
      },
      {
        id: 15,
        image: 'https://images.unsplash.com/photo-1578845426309-9215fc462b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGludGVyaW9yJTIwc29mYXxlbnwxfHx8fDE3NzQwNDEwODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Outdoor Kitchen',
        description: 'Full outdoor kitchen setup for al fresco dining under the stars',
      },
      {
        id: 16,
        image: 'https://images.unsplash.com/photo-1708901141722-d5b0583407b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGRpbmluZyUyMGFyZWElMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQwNDAzODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Grand Dining Area',
        description: 'Share meals together in a spacious, beautifully appointed dining space',
      },
      {
        id: 17,
        image: 'https://images.unsplash.com/photo-1736738742702-f519e130e7c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGJ1bmtzJTIwYmVkc3xlbnwxfHx8fDE3NzQwNDEzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: '2 Full Baths',
        description: 'Two complete bathrooms — no waiting, no crowding',
      },
      {
        id: 18,
        image: 'https://images.unsplash.com/photo-1533568379314-9a6c23b8d9e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmhvbWUlMjBjb250cm9sJTIwcGFuZWx8ZW58MXx8fHwxNzc0MDQxMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: '4 Smart TVs + 2 Fridges',
        description: 'Entertainment and provisions ready — all you need to bring is yourself',
      },
    ],
  },
  {
    modelName: 'Solitude',
    category: 'Luxury 5th Wheel',
    sleeps: 'King Bed · Full Bath',
    images: [
      {
        id: 19,
        image: 'https://images.unsplash.com/photo-1599548291260-8a88e3d3b095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGVudGVydGFpbm1lbnQlMjBzeXN0ZW18ZW58MXx8fHwxNzc0MDQxMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Marble Bar',
        description: 'Stunning marble bar and entertainment area for the ultimate evening',
      },
      {
        id: 20,
        image: 'https://images.unsplash.com/photo-1773751273676-e4241fe45c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmhvbWUlMjBoYWxsd2F5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc0MDQxMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Massage Chairs',
        description: 'Relax in full-body massage chairs after your day of adventure',
      },
      {
        id: 21,
        image: 'https://images.unsplash.com/photo-1771599141394-bc646d21cd61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGNlaWxpbmclMjBsaWdodHN8ZW58MXx8fHwxNzc0MDQwOTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Ambient Lighting',
        description: 'LED ceiling lights create perfect ambiance for any mood',
      },
      {
        id: 22,
        image: 'https://images.unsplash.com/photo-1760335180773-2acddfada16e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb3RvcmhvbWUlMjBzaW5rfGVufDF8fHx8MTc3NDA0MTMxMHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Double Fridge',
        description: 'Two full-size refrigerators — stocked and ready for your stay',
      },
      {
        id: 23,
        image: 'https://images.unsplash.com/photo-1692888756078-a8282e78ff86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMHdpbmRvdyUyMGN1cnRhaW5zfGVufDF8fHx8MTc3NDA0MTMxMHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Walk-in Closet',
        description: 'Full walk-in closet — bring everything you need for an extended stay',
      },
      {
        id: 24,
        image: 'https://images.unsplash.com/photo-1666713375333-facb6b8eec76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZXIlMjB2YW4lMjB0YWJsZXxlbnwxfHx8fDE3NzQwNDEzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Security System',
        description: 'Rest easy with a full onboard security and monitoring system',
      },
    ],
  },
  {
    modelName: 'Grand Design',
    category: 'Super Toy Hauler',
    sleeps: 'Sleeps 10',
    images: [
      {
        id: 25,
        image: 'https://images.unsplash.com/photo-1724873299560-355df1871c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYW1wZXIlMjBtaXJyb3J8ZW58MXx8fHwxNzc0MDQxMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Fireplace',
        description: 'Cozy fireplace — the perfect centerpiece for cool Texas evenings',
      },
      {
        id: 26,
        image: 'https://images.unsplash.com/photo-1709432767122-d3cb5326911a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGFpciUyMGNvbmRpdGlvbmluZ3xlbnwxfHx8fDE3NzQwNDEzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Marble Counters',
        description: 'Premium marble countertops in kitchen and bath',
      },
      {
        id: 27,
        image: 'https://images.unsplash.com/photo-1630873710708-35262d5f0eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmhvbWUlMjBiZW5jaCUyMHNlYXRpbmd8ZW58MXx8fHwxNzc0MDQxMzEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Walk-in Baths',
        description: 'Dual walk-in bathrooms — no sharing when you have a big group',
      },
      {
        id: 28,
        image: 'https://images.unsplash.com/photo-1769796330939-bdb06aacb524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wZXIlMjBjb2ZmZWUlMjBtYWtlcnxlbnwxfHx8fDE3NzQwNDEzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Smart TV Setup',
        description: 'Multiple 4K smart TVs throughout for everyone to enjoy',
      },
      {
        id: 29,
        image: 'https://images.unsplash.com/photo-1648634158203-199accfd7afc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBydiUyMGZsb29yaW5nfGVufDF8fHx8MTc3NDA0MDkxMHww&ixlib=rb-4.1.0&q=80&w=1080',
        title: 'Premium Flooring',
        description: 'Durable luxury vinyl plank flooring throughout',
      },
      {
        id: 30,
        image: 'https://images.unsplash.com/photo-1659005766979-45ab682d1d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydiUyMGFybWNoYWlyJTIwbG91bmdlfGVufDF8fHx8MTc3NDA0MTMxNnww&ixlib=rb-4.1.0&q=80&w=1080',
        title: '1 King + 3 Queen Beds',
        description: 'Sleeping for 10 — every guest gets a real bed, not a pullout',
      },
    ],
  },
];

interface ArrowProps {
  onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 group border border-white/20"
    aria-label="Previous slide"
  >
    <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
  </button>
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 group border border-white/20"
    aria-label="Next slide"
  >
    <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
  </button>
);

function RVModelSlider({ rv }: { rv: RVModel }) {
  const imageSliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: 'slick-dots image-dots',
  };

  return (
    <div className="h-full relative">
      <style>{`
        .rv-image-slider .slick-slider,
        .rv-image-slider .slick-list,
        .rv-image-slider .slick-track,
        .rv-image-slider .slick-slide > div {
          height: 100%;
        }

        .rv-image-slider .image-dots {
          bottom: 30px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 10px;
          list-style: none;
          padding: 0;
          margin: 0;
          z-index: 10;
        }

        .rv-image-slider .image-dots li {
          margin: 0;
          width: 10px;
          height: 10px;
        }

        .rv-image-slider .image-dots li button {
          width: 10px;
          height: 10px;
          padding: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .rv-image-slider .image-dots li button:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: scale(1.15);
        }

        .rv-image-slider .image-dots li.slick-active button {
          background: white;
          width: 28px;
          border-radius: 5px;
        }

        .rv-image-slider .image-dots li button:before {
          display: none;
        }
      `}</style>

      <div className="rv-image-slider h-full">
        <Slider {...imageSliderSettings}>
          {rv.images.map((image) => (
            <div key={image.id} className="relative h-full">
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
              </div>

              <div className="relative h-full flex items-end pb-28 px-8 md:px-16 lg:px-24">
                <div className="max-w-3xl space-y-4">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl text-white tracking-tight font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {image.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {image.description}
                  </p>
                  <div className="pt-4">
                    <a
                      href="tel:9729656901"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Book {rv.modelName}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export function RVSlider() {
  const mainSliderRef = useRef<Slider>(null);
  const [currentRVIndex, setCurrentRVIndex] = useState(0);

  const mainSliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    beforeChange: (_current: number, next: number) => {
      setCurrentRVIndex(next);
    },
  };

  const goToPrevRV = () => {
    mainSliderRef.current?.slickPrev();
  };

  const goToNextRV = () => {
    mainSliderRef.current?.slickNext();
  };

  const currentRV = rvModels[currentRVIndex];

  return (
    <div className="rv-slider-container">
      <style>{`
        .rv-slider-container {
          width: 100%;
          height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .rv-slider-container .slick-slider,
        .rv-slider-container .slick-list,
        .rv-slider-container .slick-track,
        .rv-slider-container .slick-slide > div {
          height: 100%;
        }

        @media (max-width: 768px) {
          .rv-slider-container {
            height: 100svh;
          }
        }
      `}</style>

      {/* RV Model Navigation — top center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        <button
          onClick={goToPrevRV}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2.5 transition-all duration-300 border border-white/20 hover:scale-110"
          aria-label="Previous RV model"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 px-8 py-4 shadow-2xl min-w-[280px]">
          <div className="text-center">
            <div className="text-white/70 text-sm tracking-widest uppercase mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {currentRV.category}
            </div>
            <div className="text-white text-2xl md:text-3xl lg:text-4xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {currentRV.modelName}
            </div>
            <div className="text-white/80 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {currentRV.sleeps}
            </div>
          </div>
        </div>

        <button
          onClick={goToNextRV}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2.5 transition-all duration-300 border border-white/20 hover:scale-110"
          aria-label="Next RV model"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      <Slider {...mainSliderSettings} ref={mainSliderRef}>
        {rvModels.map((rv, index) => (
          <div key={index} className="h-full">
            <RVModelSlider rv={rv} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
