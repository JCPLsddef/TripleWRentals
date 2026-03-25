'use client';

import { useState, useEffect, useRef } from 'react';

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
        image: 'https://static.wixstatic.com/media/62f926_b687d2cf0d374773b965a26a2da00832~mv2.webp',
        title: 'Luxurious Living Room',
        description: 'Premium leather seating with state-of-the-art entertainment system',
      },
      {
        id: 2,
        image: 'https://static.wixstatic.com/media/62f926_a4d11de4461f4bdd954c4a308e09f35b~mv2.webp',
        title: 'Master Bedroom Suite',
        description: 'King-size bed with premium bedding and climate control',
      },
      {
        id: 3,
        image: 'https://static.wixstatic.com/media/62f926_e82ba4137dbb44ecb018eda98ab166b9~mv2.webp',
        title: 'Fireplace & Marble Counters',
        description: 'Premium finishes throughout — marble counters, wood floors, designer fixtures',
      },
      {
        id: 4,
        image: 'https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp',
        title: 'Spa-Style Bathroom',
        description: 'Modern bathroom with rain shower and luxury fixtures',
      },
      {
        id: 5,
        image: 'https://static.wixstatic.com/media/62f926_e812f0456a774b2f9b8205a2b3ae04ba~mv2.webp',
        title: 'Open Floor Plan',
        description: 'Spacious interior with panoramic windows and natural light',
      },
      {
        id: 6,
        image: 'https://static.wixstatic.com/media/62f926_d5db0126f18a4cc0884f4308913f9362~mv2.webp',
        title: '4 Smart TVs',
        description: 'Entertainment in every room — full smart TV setup throughout',
      },
      {
        id: 101,
        image: 'https://static.wixstatic.com/media/62f926_72984415dae543f5a93113defc3976a4~mv2.webp',
        title: 'Outdoor Kitchen',
        description: 'Fully equipped outdoor kitchen — perfect for gathering outside',
      },
      {
        id: 102,
        image: 'https://static.wixstatic.com/media/62f926_c78197cec5b64ab58bdb735fefce1098~mv2.webp',
        title: 'Premium Seating Area',
        description: 'Designer seating and lounge space for the whole group',
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
        image: 'https://static.wixstatic.com/media/62f926_6081972934c541bf9b8aaa703b74f585~mv2.webp',
        title: 'Luxury Interior',
        description: 'Beautifully designed space with premium wood finishes',
      },
      {
        id: 8,
        image: 'https://static.wixstatic.com/media/62f926_443343f7fc40482887ec376c0e19a0f9~mv2.webp',
        title: 'Evening Ambiance',
        description: 'Perfect mood lighting for a relaxing night in',
      },
      {
        id: 9,
        image: 'https://static.wixstatic.com/media/62f926_33fd4b449a434b54938f418db6548ec2~mv2.webp',
        title: 'Patio Deck',
        description: 'Enjoy breathtaking Texas sunsets from your private outdoor deck',
      },
      {
        id: 10,
        image: 'https://static.wixstatic.com/media/62f926_5d0188ae90c246848530cb010961d221~mv2.webp',
        title: 'Marble Counter Kitchen',
        description: 'Fully equipped kitchen with marble counters and modern appliances',
      },
      {
        id: 11,
        image: 'https://static.wixstatic.com/media/62f926_69694ee7940c4fe4985b984e4067343e~mv2.webp',
        title: 'Heated Seats',
        description: 'Comfort features for every season — heated seating throughout',
      },
      {
        id: 12,
        image: 'https://static.wixstatic.com/media/62f926_26b6714d0a0d4937b73e45668ce44bd9~mv2.webp',
        title: 'Smart TVs Throughout',
        description: 'Entertainment system in every room',
      },
      {
        id: 103,
        image: 'https://static.wixstatic.com/media/62f926_cf6fafa3b7184f93b149c98ee96c783f~mv2.webp',
        title: 'King + Queen Bedrooms',
        description: 'Three king beds plus one queen — everyone sleeps in luxury',
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
        image: 'https://static.wixstatic.com/media/62f926_a4cf7b87738c4ed89d251b691e9f8426~mv2.webp',
        title: 'Spacious Living Room',
        description: 'Largest floor plan in our fleet — perfect for groups of 12',
      },
      {
        id: 14,
        image: 'https://static.wixstatic.com/media/62f926_9ee95a2eecc14c969297f773233204c2~mv2.webp',
        title: 'Custom Hardwood Floors',
        description: 'Premium hardwood flooring and designer finishes throughout',
      },
      {
        id: 15,
        image: 'https://static.wixstatic.com/media/62f926_207b922f6b0e46928ae3360530eff2c2~mv2.webp',
        title: 'Outdoor Kitchen',
        description: 'Full outdoor kitchen setup for al fresco dining under the stars',
      },
      {
        id: 16,
        image: 'https://static.wixstatic.com/media/62f926_ce7133d0987c415eb4f5ee91efd1c6eb~mv2.webp',
        title: 'Grand Dining Area',
        description: 'Share meals together in a spacious, beautifully appointed dining space',
      },
      {
        id: 17,
        image: 'https://static.wixstatic.com/media/62f926_6c5b7fab0f724615b8e162a679eeb62b~mv2.webp',
        title: '2 Full Baths',
        description: 'Two complete bathrooms — no waiting, no crowding',
      },
      {
        id: 18,
        image: 'https://static.wixstatic.com/media/62f926_37c1e8793eed4c8b964cc8e5c2fde39d~mv2.webp',
        title: '4 Smart TVs + 2 Fridges',
        description: 'Entertainment and provisions ready — all you need to bring is yourself',
      },
      {
        id: 104,
        image: 'https://static.wixstatic.com/media/62f926_534d95c573274570991aca183e418e52~mv2.webp',
        title: 'Master Bedroom',
        description: 'Private king suite — your retreat after a day of adventure',
      },
      {
        id: 105,
        image: 'https://static.wixstatic.com/media/62f926_ddabb6034c7d4ce6bbe4c2150afc0cac~mv2.webp',
        title: 'Premium Interior Finishes',
        description: 'Every surface thoughtfully designed — nothing was overlooked',
      },
      {
        id: 106,
        image: 'https://static.wixstatic.com/media/62f926_241e8b855acf40829621a9b0fe20d0fa~mv2.webp',
        title: 'Entertainment Hub',
        description: 'Gather the whole group — space and screens for everyone',
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
        image: 'https://static.wixstatic.com/media/62f926_1ba23ff81e904ae2b5feae14ed4754fb~mv2.webp',
        title: 'Marble Bar',
        description: 'Stunning marble bar and entertainment area for the ultimate evening',
      },
      {
        id: 20,
        image: 'https://static.wixstatic.com/media/62f926_466f946f8bb54bb8ad05778235bae078~mv2.webp',
        title: 'Massage Chairs',
        description: 'Relax in full-body massage chairs after your day of adventure',
      },
      {
        id: 21,
        image: 'https://static.wixstatic.com/media/62f926_b833defbf81b455991760bc1f4c878ff~mv2.webp',
        title: 'Ambient Lighting',
        description: 'LED ceiling lights create perfect ambiance for any mood',
      },
      {
        id: 22,
        image: 'https://static.wixstatic.com/media/62f926_bbc15df6d74d4834919f4a028f93565e~mv2.webp',
        title: 'Double Fridge',
        description: 'Two full-size refrigerators — stocked and ready for your stay',
      },
      {
        id: 23,
        image: 'https://static.wixstatic.com/media/62f926_75156b5c17724ab9b9ef8acbf986ecd7~mv2.webp',
        title: 'Walk-in Closet',
        description: 'Full walk-in closet — bring everything you need for an extended stay',
      },
      {
        id: 24,
        image: 'https://static.wixstatic.com/media/62f926_e4c918f468b243d89371fa40f6424fce~mv2.webp',
        title: 'Security System',
        description: 'Rest easy with a full onboard security and monitoring system',
      },
      {
        id: 108,
        image: 'https://static.wixstatic.com/media/62f926_2d4fd6e6357345238f12874fbb60275a~mv2.webp',
        title: 'Private King Suite',
        description: 'Your personal retreat — king bed, luxury bedding, complete privacy',
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
        image: 'https://static.wixstatic.com/media/62f926_5abd0783793944788440bebea1f1fe3d~mv2.webp',
        title: 'Fireplace',
        description: 'Cozy fireplace — the perfect centerpiece for cool Texas evenings',
      },
      {
        id: 26,
        image: 'https://static.wixstatic.com/media/62f926_bc6238a5bf814773bd2e0e2151bd217a~mv2.webp',
        title: 'Marble Counters',
        description: 'Premium marble countertops in kitchen and bath',
      },
      {
        id: 27,
        image: 'https://static.wixstatic.com/media/62f926_7a92bd74408e41c58bc09ff603a3ad99~mv2.webp',
        title: 'Walk-in Baths',
        description: 'Dual walk-in bathrooms — no sharing when you have a big group',
      },
      {
        id: 28,
        image: 'https://static.wixstatic.com/media/62f926_5cdcb1dc675545f09c15015e56aecbcd~mv2.webp',
        title: 'Smart TV Setup',
        description: 'Multiple 4K smart TVs throughout for everyone to enjoy',
      },
      {
        id: 29,
        image: 'https://static.wixstatic.com/media/62f926_1f5bbb3cd8b24fcda74b07962d80a56d~mv2.webp',
        title: 'Premium Flooring',
        description: 'Durable luxury vinyl plank flooring throughout',
      },
      {
        id: 30,
        image: 'https://static.wixstatic.com/media/62f926_d05e3ef09e46412eb17c6e809b6936b7~mv2.webp',
        title: '1 King + 3 Queen Beds',
        description: 'Sleeping for 10 — every guest gets a real bed, not a pullout',
      },
      {
        id: 107,
        image: 'https://static.wixstatic.com/media/62f926_3557795d5fd94ffba61852ad6069d6dd~mv2.webp',
        title: 'Grand Living Area',
        description: 'Open, airy living space designed for comfort and entertaining',
      },
    ],
  },
  {
    modelName: 'Forest River Impression',
    category: 'Travel Trailer',
    sleeps: 'Sleeps 6–8',
    images: [
      {
        id: 109,
        image: 'https://static.wixstatic.com/media/62f926_3e0d0811d2454966bc7015857b8c03bc~mv2.png',
        title: 'Inviting Living Area',
        description: 'Open, comfortable living space designed for relaxing with the whole group',
      },
      {
        id: 110,
        image: 'https://static.wixstatic.com/media/62f926_f6a82b27184644ac9b16ccc51b341e73~mv2.png',
        title: 'Spacious Interior',
        description: 'Smart layout maximizes every inch — room to move, room to breathe',
      },
      {
        id: 111,
        image: 'https://static.wixstatic.com/media/62f926_2d76600405a640adafabec105dffe06c~mv2.png',
        title: 'Full Kitchen Setup',
        description: 'Fully equipped kitchen ready for home-cooked meals on the road',
      },
      {
        id: 112,
        image: 'https://static.wixstatic.com/media/62f926_317c231599b8407bbb5755c7c3190254~mv2.png',
        title: 'Comfortable Bedroom',
        description: 'Wake up refreshed — quality mattress and blackout shades included',
      },
    ],
  },
  {
    modelName: 'The Microlite',
    category: 'Lightweight Trailer',
    sleeps: 'Sleeps 4–6',
    images: [
      {
        id: 113,
        image: 'https://static.wixstatic.com/media/62f926_8a2a857db25c46ae9265a9dc86c75d43~mv2.webp',
        title: 'Lightweight & Nimble',
        description: 'Easy to tow, easy to set up — adventure without the hassle',
      },
      {
        id: 114,
        image: 'https://static.wixstatic.com/media/62f926_b614319e4475408f8c82b196ee5a07ed~mv2.webp',
        title: 'Cozy Living Space',
        description: 'Compact never felt this comfortable — designed for smart adventurers',
      },
      {
        id: 115,
        image: 'https://static.wixstatic.com/media/62f926_fd65a90a537e47f39b4242ad2713f7c9~mv2.webp',
        title: 'Compact Kitchen',
        description: 'Everything you need to cook a great meal, nothing you don\'t',
      },
      {
        id: 116,
        image: 'https://static.wixstatic.com/media/62f926_4576e39519604a6cbbe5d9402b397050~mv2.webp',
        title: 'Relaxing Bedroom',
        description: 'Cozy sleeping quarters — fall asleep to the sound of nature',
      },
      {
        id: 117,
        image: 'https://static.wixstatic.com/media/62f926_971fa237736944e984593279e2b0d70f~mv2.webp',
        title: 'Smart Storage Solutions',
        description: 'Clever built-in storage keeps everything organized and within reach',
      },
      {
        id: 118,
        image: 'https://static.wixstatic.com/media/62f926_6c9b976f988e48e39391149af9e0d50b~mv2.webp',
        title: 'Modern Bathroom',
        description: 'Clean, functional bathroom — all the essentials for a comfortable trip',
      },
      {
        id: 119,
        image: 'https://static.wixstatic.com/media/62f926_2f9bf5e9f2dd4548bcbf298b36700ce4~mv2.webp',
        title: 'Outdoor Living',
        description: 'Step outside and make the most of every campsite',
      },
      {
        id: 120,
        image: 'https://static.wixstatic.com/media/62f926_0debeb58aec247d5b727d35912a510da~mv2.webp',
        title: 'Premium Details',
        description: 'Quality finishes throughout — looks great, built to last',
      },
    ],
  },
  {
    modelName: 'Forest River Heritage',
    category: '5th Wheel',
    sleeps: 'Sleeps 8–10',
    images: [
      {
        id: 121,
        image: 'https://static.wixstatic.com/media/62f926_e05fb3ce92574c66a334114046593382~mv2.webp',
        title: 'Heritage Living Room',
        description: 'Classic elegance meets modern comfort in this stunning living space',
      },
      {
        id: 122,
        image: 'https://static.wixstatic.com/media/62f926_07c7ecd0dd5e4d66b3308d41c427f29f~mv2.webp',
        title: 'Full-Size Kitchen',
        description: 'Spacious kitchen with all appliances — cook like you\'re at home',
      },
      {
        id: 123,
        image: 'https://static.wixstatic.com/media/62f926_e12e04e8ba604688b6c0d1bfe103a90f~mv2.webp',
        title: 'Master Bedroom',
        description: 'Retreat to a private master suite with premium bedding',
      },
      {
        id: 124,
        image: 'https://static.wixstatic.com/media/62f926_18996ea267114985825cfb6686308d1d~mv2.webp',
        title: 'Spa Bathroom',
        description: 'Luxurious bathroom with walk-in shower and designer fixtures',
      },
      {
        id: 125,
        image: 'https://static.wixstatic.com/media/62f926_43de8d38dce547bf879faf6535563803~mv2.webp',
        title: 'Dining Area',
        description: 'Seats the whole group — great meals, great memories',
      },
      {
        id: 126,
        image: 'https://static.wixstatic.com/media/62f926_0b15de3ed81649a9b10b06b995ab7793~mv2.webp',
        title: 'Smart TV Entertainment',
        description: 'Stream your favorites — smart TVs in the living room and master',
      },
      {
        id: 127,
        image: 'https://static.wixstatic.com/media/62f926_2859c9d4dc1b4dd8a20e29dce61ea6d3~mv2.webp',
        title: 'Outdoor Deck',
        description: 'Extend your living space outside — perfect for evenings under the stars',
      },
      {
        id: 128,
        image: 'https://static.wixstatic.com/media/62f926_296f6958a1674f5fbb3b072684cd9c15~mv2.webp',
        title: 'Premium Finishes',
        description: 'Hardwood cabinetry, stone counters, and decorator touches throughout',
      },
    ],
  },
  {
    modelName: 'KZ Sportsman',
    category: 'Travel Trailer',
    sleeps: 'Sleeps 6–8',
    images: [
      {
        id: 129,
        image: 'https://static.wixstatic.com/media/62f926_d7c8797c2dcb4ddb8543ed0811a21e4d~mv2.webp',
        title: 'Spacious Living Room',
        description: 'Big comfortable seating and entertainment — kick back and unwind',
      },
      {
        id: 130,
        image: 'https://static.wixstatic.com/media/62f926_8ddfdcc1378846e19308f5decd42954b~mv2.webp',
        title: 'Fully Equipped Kitchen',
        description: 'Everything you need to make great meals at any campsite',
      },
      {
        id: 131,
        image: 'https://static.wixstatic.com/media/62f926_862ae2976e6b46bfbc714d707de7e5cb~mv2.webp',
        title: 'Master Suite',
        description: 'Spacious bedroom with quality mattress and ample storage',
      },
      {
        id: 132,
        image: 'https://static.wixstatic.com/media/62f926_b8f5b8cfba3c4071bd6fb8d38bf9da06~mv2.webp',
        title: 'Bathroom & Shower',
        description: 'Full bathroom with hot shower — all the comforts of home',
      },
      {
        id: 133,
        image: 'https://static.wixstatic.com/media/62f926_1ccda7c73e6542419369b7d635a0d598~mv2.webp',
        title: 'Smart TV Setup',
        description: 'Catch the game or stream your shows — smart TV ready',
      },
      {
        id: 134,
        image: 'https://static.wixstatic.com/media/62f926_8f67a97a881a491eaef4298c583aa932~mv2.webp',
        title: 'Dining Area',
        description: 'Convertible dinette seats six — doubles as extra sleeping space',
      },
      {
        id: 135,
        image: 'https://static.wixstatic.com/media/62f926_9008260328a9413ca775a6e013e43944~mv2.webp',
        title: 'Outdoor Features',
        description: 'Outdoor hookups and awning — set up your camp like a pro',
      },
      {
        id: 136,
        image: 'https://static.wixstatic.com/media/62f926_6b7d30596652485881269a211e1320a8~mv2.webp',
        title: 'Premium Interior',
        description: 'Thoughtful design with quality materials throughout',
      },
      {
        id: 137,
        image: 'https://static.wixstatic.com/media/62f926_648504df6e18467b9ecd9653e424c8d4~mv2.webp',
        title: 'Storage Solutions',
        description: 'Generous pass-through storage keeps all your gear organized',
      },
    ],
  },
  {
    modelName: 'Jayco Eagle',
    category: 'Premium Travel Trailer',
    sleeps: 'Sleeps 6–8',
    images: [
      {
        id: 138,
        image: 'https://static.wixstatic.com/media/62f926_d14b130547104e86b135861160a9314f~mv2.webp',
        title: 'Elegant Living Space',
        description: 'Soaring ceilings and designer finishes — the Eagle sets the standard',
      },
      {
        id: 139,
        image: 'https://static.wixstatic.com/media/62f926_1ca16272240a4372bc2aa04ecdb70f68~mv2.webp',
        title: 'Master Bedroom',
        description: 'King bed, premium linens, and private slide-out — true luxury camping',
      },
      {
        id: 140,
        image: 'https://static.wixstatic.com/media/62f926_8b44f34301574299885a050aa9a68c9a~mv2.webp',
        title: 'Modern Kitchen',
        description: 'Full residential-style kitchen with solid surface counters',
      },
      {
        id: 141,
        image: 'https://static.wixstatic.com/media/62f926_f1081b4b72fc40e582e59f9181ad285f~mv2.webp',
        title: 'Full Bathroom',
        description: 'Spacious bathroom with separate shower and vanity',
      },
      {
        id: 142,
        image: 'https://static.wixstatic.com/media/62f926_34f257cc2daa4c65b83bc9569e019837~mv2.webp',
        title: 'Dining Area',
        description: 'Booth-style dinette perfect for morning coffee or evening cards',
      },
      {
        id: 143,
        image: 'https://static.wixstatic.com/media/62f926_9142cf1d7d7b4b20bdccbcc1cfd127f0~mv2.webp',
        title: 'Smart Entertainment',
        description: 'Smart TVs plus bluetooth audio — your trip, your soundtrack',
      },
    ],
  },
  {
    modelName: 'Jayco 2',
    category: 'Travel Trailer',
    sleeps: 'Sleeps 6–8',
    images: [
      {
        id: 144,
        image: 'https://static.wixstatic.com/media/62f926_f1d3c48f5a5447f9ae80fdf23baa0ba4~mv2.webp',
        title: 'Inviting Living Room',
        description: 'Slide-out living area gives you room to spread out and relax',
      },
      {
        id: 145,
        image: 'https://static.wixstatic.com/media/62f926_ea21b556afd14d34962facb959536f46~mv2.webp',
        title: 'Comfortable Bedroom',
        description: 'Queen bed with memory foam mattress and overhead storage',
      },
      {
        id: 146,
        image: 'https://static.wixstatic.com/media/62f926_c91b7f6eabed455a9da3deac55e365d5~mv2.webp',
        title: 'Full Kitchen',
        description: 'Three-burner range, full refrigerator, and solid surface counters',
      },
      {
        id: 147,
        image: 'https://static.wixstatic.com/media/62f926_12b413a2a22a44bdbae2a0ca80a23b86~mv2.webp',
        title: 'Bathroom Suite',
        description: 'Private bath with walk-in shower — no more campground restrooms',
      },
      {
        id: 148,
        image: 'https://static.wixstatic.com/media/62f926_2854379309834e0f8dd02fc5271f8d1c~mv2.webp',
        title: 'Dining Space',
        description: 'Convertible dinette seats four — breakfast with a view every morning',
      },
      {
        id: 149,
        image: 'https://static.wixstatic.com/media/62f926_33896ca91b514db4a32a57b5cd68a412~mv2.webp',
        title: 'Smart TVs',
        description: 'Stay connected or cut loose — smart TV and signal booster ready',
      },
      {
        id: 150,
        image: 'https://static.wixstatic.com/media/62f926_331f269cb18c438389d01660cc29a6d5~mv2.webp',
        title: 'Premium Finishes',
        description: 'Hardwood cabinet doors, stainless appliances, and designer accents',
      },
    ],
  },
  {
    modelName: 'Heartland Northtrail',
    category: 'Travel Trailer',
    sleeps: 'Sleeps 6–8',
    images: [
      {
        id: 151,
        image: 'https://static.wixstatic.com/media/62f926_b0d5c22fd0324b248704c32102ccd815~mv2.webp',
        title: 'Trail-Ready Living Room',
        description: 'Rugged style meets everyday comfort — built for the adventurous family',
      },
      {
        id: 152,
        image: 'https://static.wixstatic.com/media/62f926_48d92a7331924666bc3922fd1e30a2c3~mv2.webp',
        title: 'Comfortable Bedroom',
        description: 'Rest and recharge — queen bed and wardrobe storage included',
      },
      {
        id: 153,
        image: 'https://static.wixstatic.com/media/62f926_7cc79564954e432788b763882fbdcaf9~mv2.webp',
        title: 'Full Kitchen',
        description: 'Fully stocked kitchen — cook real meals wherever the road takes you',
      },
      {
        id: 154,
        image: 'https://static.wixstatic.com/media/62f926_a13c8b97ce834ddaa794b9a9099a7869~mv2.webp',
        title: 'Modern Bathroom',
        description: 'Full-size shower and vanity — clean up in comfort after a long day',
      },
      {
        id: 155,
        image: 'https://static.wixstatic.com/media/62f926_f4e33964823e45b28f02fb180de920da~mv2.webp',
        title: 'Smart TV Setup',
        description: 'Kick back with your favorite shows after a day on the trail',
      },
      {
        id: 156,
        image: 'https://static.wixstatic.com/media/62f926_91daec95e6614702af43789209961f3b~mv2.webp',
        title: 'Dining Area',
        description: 'Eat together, laugh together — dinette for the whole crew',
      },
      {
        id: 157,
        image: 'https://static.wixstatic.com/media/62f926_e6036c47ae9f44ccb15007d5857c80d9~mv2.webp',
        title: 'Outdoor Hookup',
        description: 'Outdoor kitchen hookup and awning — turn any site into your basecamp',
      },
    ],
  },
  {
    modelName: 'Grey Wolf',
    category: 'Travel Trailer',
    sleeps: 'Sleeps 4–6',
    images: [
      {
        id: 158,
        image: 'https://static.wixstatic.com/media/62f926_066b6605277e4b258acfe579536d6307~mv2.webp',
        title: 'Open Living Area',
        description: 'Light and airy interior — plenty of room to relax and entertain',
      },
      {
        id: 159,
        image: 'https://static.wixstatic.com/media/62f926_8541ad49bc4b402ebf78d62469c30e1e~mv2.webp',
        title: 'Comfortable Bedroom',
        description: 'Queen bed with quality bedding — sleep well after a day outside',
      },
      {
        id: 160,
        image: 'https://static.wixstatic.com/media/62f926_101f1c451d9a4eb7b35d4cf226a6f2c6~mv2.webp',
        title: 'Equipped Kitchen',
        description: 'Compact and fully featured — cook anything you\'d make at home',
      },
      {
        id: 161,
        image: 'https://static.wixstatic.com/media/62f926_b0295c7e94ca471a884b1c34571832a1~mv2.webp',
        title: 'Clean Bathroom',
        description: 'Step-in shower and full vanity — refreshed and ready for the next adventure',
      },
      {
        id: 162,
        image: 'https://static.wixstatic.com/media/62f926_8e8560c93e0743988dd3ff3a0bbac818~mv2.webp',
        title: 'Dining & Lounge',
        description: 'Versatile dinette that converts for extra sleeping or game night',
      },
      {
        id: 163,
        image: 'https://static.wixstatic.com/media/62f926_aa58ae66a11c4fb0a158af540415f0d4~mv2.webp',
        title: 'Outdoor Access',
        description: 'Power awning and exterior outlets — outdoor living made easy',
      },
    ],
  },
  {
    modelName: 'Crusader 5th Wheel',
    category: '5th Wheel',
    sleeps: 'Sleeps 6–8',
    images: [
      {
        id: 164,
        image: 'https://static.wixstatic.com/media/62f926_d680c246e2ac43db9a7415175b5b1952~mv2.webp',
        title: 'Grand Living Room',
        description: 'Soaring cathedral ceiling and residential furniture — five-star on wheels',
      },
      {
        id: 165,
        image: 'https://static.wixstatic.com/media/62f926_5b01a1501ab64b9e83b424495c1b46f9~mv2.webp',
        title: 'Luxury Bedroom Suite',
        description: 'King bed, walk-in closet, and private bath — your personal retreat',
      },
      {
        id: 166,
        image: 'https://static.wixstatic.com/media/62f926_b160d7ddc6b245da998c162b371bcdc4~mv2.webp',
        title: 'Premium Kitchen',
        description: 'Residential appliances and solid surface counters for the home cook',
      },
      {
        id: 167,
        image: 'https://static.wixstatic.com/media/62f926_f962953933ff4fafbc7a75ca2a68ebbc~mv2.webp',
        title: 'Full Bathroom',
        description: 'Oversized shower, linen closet, and premium fixtures throughout',
      },
    ],
  },
];

export default function RVSlider() {
  const [activeModel, setActiveModel] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const rv = rvModels[activeModel];
  const img = rv.images[activeImage];

  const changeModel = (idx: number) => {
    if (idx === activeModel) return;
    setPrevSrc(rv.images[activeImage].image);
    setFading(true);
    setTimeout(() => {
      setActiveModel(idx);
      setActiveImage(0);
      setFading(false);
      setPrevSrc(null);
    }, 380);
  };

  const changeImage = (idx: number) => {
    if (idx === activeImage) return;
    setActiveImage(idx);
  };

  useEffect(() => {
    if (navRef.current) {
      const el = navRef.current.querySelector<HTMLElement>('.flt-nav-active');
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeModel]);

  useEffect(() => {
    if (stripRef.current) {
      const el = stripRef.current.querySelector<HTMLElement>('.flt-thumb-active');
      el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeImage, activeModel]);

  return (
    <>
      <section className="flt-section" id="fleet">
        <div className="flt-header">
          <h2 className="flt-title">Every Journey<br />Starts Here.</h2>
          <p className="flt-subtitle">
            14 premium RVs. Every one maintained to perfection.<br />
            Built to carry you somewhere you&apos;ll never forget.
          </p>
        </div>

        <div className="flt-interface">
          <nav className="flt-nav" ref={navRef} aria-label="RV Fleet">
            {rvModels.map((m, i) => (
              <button
                key={i}
                className={`flt-nav-item${i === activeModel ? ' flt-nav-active' : ''}`}
                onClick={() => changeModel(i)}
                aria-label={`View ${m.modelName}`}
              >
                <span className="flt-nav-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="flt-nav-text">
                  <span className="flt-nav-name">{m.modelName}</span>
                  <span className="flt-nav-cat">{m.category}</span>
                </div>
                <svg className="flt-nav-arrow" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </nav>

          <div className="flt-display">
            <div className="flt-hero">
              {prevSrc && (
                <img src={prevSrc} alt="" className="flt-hero-img flt-img-prev" aria-hidden />
              )}
              <img
                key={`${activeModel}-${activeImage}`}
                src={img.image}
                alt={img.title}
                className={`flt-hero-img flt-img-curr ${fading ? 'flt-fade-out' : 'flt-fade-in'}`}
              />
              <div className="flt-grad-bottom" aria-hidden />
              <div className="flt-grad-left" aria-hidden />
              <div className="flt-info">
                <div className="flt-badges">
                  <span className="flt-badge flt-badge-cat">{rv.category}</span>
                  <span className="flt-badge flt-badge-sleeps">{rv.sleeps}</span>
                </div>
                <h3 className="flt-model-name">{rv.modelName}</h3>
                <p className="flt-img-label">{img.title}</p>
                <p className="flt-img-desc">{img.description}</p>
              </div>
              <div className="flt-counter" aria-hidden>
                <span className="flt-cnt-curr">{String(activeModel + 1).padStart(2, '0')}</span>
                <span className="flt-cnt-sep">/</span>
                <span className="flt-cnt-total">{String(rvModels.length).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="flt-strip-wrap">
              <div className="flt-strip" ref={stripRef}>
                {rv.images.map((im, i) => (
                  <button
                    key={im.id}
                    className={`flt-thumb${i === activeImage ? ' flt-thumb-active' : ''}`}
                    onClick={() => changeImage(i)}
                    aria-label={im.title}
                    aria-pressed={i === activeImage}
                  >
                    <img src={im.image} alt={im.title} className="flt-thumb-img" />
                    <div className="flt-thumb-hover">
                      <span className="flt-thumb-label">{im.title}</span>
                    </div>
                    {i === activeImage && <span className="flt-thumb-bar" aria-hidden />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flt-cta-bar">
          <p className="flt-cta-text">Ready to hit the road?</p>
          <a href="#quote" className="flt-cta-btn">
            Check Availability
            <svg viewBox="0 0 20 20" fill="none" className="flt-cta-icon" aria-hidden>
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@300;400;500;600&display=swap');

        .flt-section {
          position: relative;
          background: #0D0B09;
          padding: 7rem 0 5rem;
          overflow: hidden;
        }
        .flt-header {
          text-align: center;
          padding: 0 2rem 4.5rem;
          max-width: 680px;
          margin: 0 auto;
        }
        .flt-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.75rem, 5.5vw, 4.75rem);
          font-weight: 300;
          line-height: 1.06;
          color: #F5F0E8;
          margin: 0 0 1.4rem;
        }
        .flt-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 0.975rem;
          font-weight: 300;
          line-height: 1.75;
          color: #7A6B55;
          margin: 0;
        }
        .flt-interface {
          display: grid;
          grid-template-columns: 268px 1fr;
          max-width: 1380px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .flt-nav {
          border-right: 1px solid rgba(212,168,83,0.1);
          overflow-y: auto;
          max-height: 616px;
          scrollbar-width: thin;
          scrollbar-color: rgba(212,168,83,0.18) transparent;
        }
        .flt-nav::-webkit-scrollbar { width: 2px; }
        .flt-nav::-webkit-scrollbar-thumb { background: rgba(212,168,83,0.22); border-radius: 2px; }
        .flt-nav-item {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          width: 100%;
          padding: 0.95rem 1.4rem;
          background: none;
          border: none;
          border-left: 2px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .flt-nav-item:hover { background: rgba(212,168,83,0.04); border-left-color: rgba(212,168,83,0.28); }
        .flt-nav-active { background: rgba(212,168,83,0.055) !important; border-left-color: #D4A853 !important; }
        .flt-nav-active .flt-nav-name { color: #F5F0E8 !important; }
        .flt-nav-active .flt-nav-num { color: #D4A853 !important; }
        .flt-nav-active .flt-nav-arrow { opacity: 1 !important; color: #D4A853 !important; transform: translateX(0) !important; }
        .flt-nav-num {
          font-family: 'Outfit', sans-serif;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #3A3028;
          min-width: 20px;
          transition: color 0.22s ease;
        }
        .flt-nav-text { flex: 1; display: flex; flex-direction: column; gap: 0.18rem; overflow: hidden; }
        .flt-nav-name {
          font-family: 'Outfit', sans-serif;
          font-size: 0.84rem;
          font-weight: 400;
          color: #8A7A62;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.22s ease;
        }
        .flt-nav-item:hover .flt-nav-name { color: #C4B09A; }
        .flt-nav-cat {
          font-family: 'Outfit', sans-serif;
          font-size: 0.62rem;
          font-weight: 300;
          letter-spacing: 0.04em;
          color: #4A3F30;
        }
        .flt-nav-arrow {
          width: 15px; height: 15px;
          color: #3A3028;
          opacity: 0;
          transform: translateX(-5px);
          transition: opacity 0.22s ease, transform 0.22s ease, color 0.22s ease;
          flex-shrink: 0;
        }
        .flt-nav-item:hover .flt-nav-arrow { opacity: 0.45; transform: translateX(0); }
        .flt-display { display: flex; flex-direction: column; }
        .flt-hero { position: relative; height: 516px; overflow: hidden; background: #0C0A08; }
        .flt-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .flt-img-curr { z-index: 2; }
        .flt-img-prev { z-index: 1; }
        @keyframes fltFadeIn { from { opacity: 0; transform: scale(1.025); } to { opacity: 1; transform: scale(1); } }
        @keyframes fltFadeOut { from { opacity: 1; } to { opacity: 0; } }
        .flt-fade-in { animation: fltFadeIn 0.48s ease forwards; }
        .flt-fade-out { animation: fltFadeOut 0.32s ease forwards; }
        .flt-grad-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 68%;
          background: linear-gradient(to top, rgba(13,11,9,0.94) 0%, rgba(13,11,9,0.45) 45%, transparent 100%);
          z-index: 3; pointer-events: none;
        }
        .flt-grad-left {
          position: absolute; top: 0; left: 0; bottom: 0; width: 28%;
          background: linear-gradient(to right, rgba(13,11,9,0.42) 0%, transparent 100%);
          z-index: 3; pointer-events: none;
        }
        .flt-info { position: absolute; bottom: 2.25rem; left: 2.25rem; z-index: 4; max-width: 460px; }
        .flt-badges { display: flex; gap: 0.55rem; margin-bottom: 0.8rem; }
        .flt-badge {
          font-family: 'Outfit', sans-serif;
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.13em; text-transform: uppercase;
          padding: 0.28rem 0.7rem; border-radius: 2px;
        }
        .flt-badge-cat { background: rgba(212,168,83,0.14); color: #D4A853; border: 1px solid rgba(212,168,83,0.28); }
        .flt-badge-sleeps { background: rgba(245,240,232,0.06); color: #8A7A62; border: 1px solid rgba(245,240,232,0.09); }
        .flt-model-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.9rem, 3.5vw, 3.1rem);
          font-weight: 300; line-height: 1.1;
          color: #F5F0E8; margin: 0 0 0.55rem;
        }
        .flt-img-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.65rem; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #D4A853; margin: 0 0 0.35rem;
        }
        .flt-img-desc {
          font-family: 'Outfit', sans-serif;
          font-size: 0.845rem; font-weight: 300;
          line-height: 1.62; color: #7A6B55; margin: 0;
        }
        .flt-counter {
          position: absolute; top: 1.5rem; right: 1.75rem; z-index: 4;
          display: flex; align-items: baseline; gap: 0.28rem;
          font-family: 'Outfit', sans-serif;
        }
        .flt-cnt-curr { font-size: 1.65rem; font-weight: 300; color: #F5F0E8; line-height: 1; }
        .flt-cnt-sep { font-size: 0.8rem; color: #3A3028; font-weight: 300; }
        .flt-cnt-total { font-size: 0.8rem; color: #4A3F30; font-weight: 300; }
        .flt-strip-wrap { background: #0E0C0A; border-top: 1px solid rgba(212,168,83,0.07); padding: 1.1rem 1.5rem; }
        .flt-strip { display: flex; gap: 0.7rem; overflow-x: auto; scrollbar-width: none; }
        .flt-strip::-webkit-scrollbar { display: none; }
        .flt-thumb {
          flex-shrink: 0; position: relative;
          width: 108px; height: 70px;
          border: 1.5px solid transparent; border-radius: 3px;
          overflow: hidden; cursor: pointer; background: #1A1510;
          transition: transform 0.2s ease, border-color 0.22s ease;
          padding: 0;
        }
        .flt-thumb:hover { transform: translateY(-2px); border-color: rgba(212,168,83,0.3); }
        .flt-thumb-active { border-color: #D4A853 !important; }
        .flt-thumb-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; transition: opacity 0.22s ease; display: block; }
        .flt-thumb:hover .flt-thumb-img { opacity: 0.72; }
        .flt-thumb-active .flt-thumb-img { opacity: 1; }
        .flt-thumb-hover {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(13,11,9,0.75) 0%, transparent 55%);
          display: flex; align-items: flex-end;
          padding: 0.3rem 0.38rem; opacity: 0; transition: opacity 0.2s ease;
        }
        .flt-thumb:hover .flt-thumb-hover { opacity: 1; }
        .flt-thumb-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.58rem; font-weight: 400; color: #F5F0E8; line-height: 1.25;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .flt-thumb-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #D4A853; display: block; }
        .flt-cta-bar {
          display: flex; align-items: center; justify-content: center;
          gap: 2.5rem; padding: 3.5rem 2rem 0;
          max-width: 1380px; margin: 0 auto;
        }
        .flt-cta-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.45rem; font-weight: 300; font-style: italic;
          color: #6A5A45; margin: 0;
        }
        .flt-cta-btn {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.76rem; font-weight: 600;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: #0D0B09; background: #D4A853;
          padding: 0.88rem 2rem; border-radius: 2px;
          text-decoration: none;
          transition: background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
        }
        .flt-cta-btn:hover { background: #E0B96A; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(212,168,83,0.22); }
        .flt-cta-icon { width: 17px; height: 17px; transition: transform 0.22s ease; }
        .flt-cta-btn:hover .flt-cta-icon { transform: translateX(4px); }

        @media (max-width: 960px) {
          .flt-interface { grid-template-columns: 1fr; padding: 0; }
          .flt-nav { border-right: none; border-bottom: 1px solid rgba(212,168,83,0.08); max-height: none; display: flex; overflow-x: auto; scrollbar-width: none; padding: 0.4rem 1rem; gap: 0.15rem; }
          .flt-nav::-webkit-scrollbar { display: none; }
          .flt-nav-item { flex-direction: column; align-items: flex-start; gap: 0.15rem; padding: 0.7rem 1rem; min-width: 130px; border-left: none; border-bottom: 2px solid transparent; }
          .flt-nav-item:hover { border-left-color: transparent; border-bottom-color: rgba(212,168,83,0.3); }
          .flt-nav-active { border-left-color: transparent !important; border-bottom-color: #D4A853 !important; }
          .flt-nav-arrow { display: none; }
          .flt-hero { height: 400px; }
        }
        @media (max-width: 640px) {
          .flt-section { padding: 4.5rem 0 4rem; }
          .flt-hero { height: 300px; }
          .flt-info { left: 1.25rem; bottom: 1.25rem; max-width: calc(100% - 2.5rem); }
          .flt-model-name { font-size: 1.7rem; }
          .flt-thumb { width: 84px; height: 56px; }
          .flt-cta-bar { flex-direction: column; gap: 1.1rem; text-align: center; padding: 2.5rem 1.5rem 0; }
        }
      `}</style>
    </>
  );
}
