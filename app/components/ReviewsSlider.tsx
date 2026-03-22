'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const reviews = [
  {
    name: 'Wyman Jones',
    image: 'https://static.wixstatic.com/media/62f926_db0f2145b9b54be6947b1cd42f12e361~mv2.png',
    loc: 'Tyler, Texas',
    stars: 5,
    text: "Thank you, Triple W Rentals, for the great service I received last weekend. When my reservation with another company was canceled at the last minute, I called Triple W Rentals, and they came through. They were very patient and answered all of my questions. In addition, I want to thank your team member Corbin for outstanding customer service. He delivered the RV on time, set it up, and ensured that everything was working properly. And when there was an issue, Corbin went above and beyond to correct it. His attention to detail and his professionalism were greatly appreciated. We had a great time in the RV, and I will definitely rent from Triple W again.",
  },
  {
    name: 'JT Seargeant',
    image: 'https://static.wixstatic.com/media/62f926_110004e747b34d239d959afbd1f2b88e~mv2.png',
    loc: 'Texas Rose Horse Park',
    stars: 5,
    text: "I have rented from Triple W multiple times. The communication is always outstanding and the response time on site to any needs is quick. Corbin arrived on site in minutes to assist with one minor issue. He checked in daily to make sure all was well which exceeded my expectations. I will continue to use them on all my trips to Texas Rose Horse Park.",
  },
  {
    name: 'Jaden Richardson',
    image: 'https://static.wixstatic.com/media/62f926_1ec8069798744e269b3cd56333ec0268~mv2.png',
    loc: 'Texas',
    stars: 5,
    text: "Great experience with Triple W RV Rentals! The booking process was smooth, the staff was friendly and helpful, and the Momentum RV was in excellent condition. Everything went exactly as planned. Highly recommend!",
  },
  {
    name: 'Luci Wade-Cantu',
    image: 'https://static.wixstatic.com/media/62f926_7141074f78bc415e8c9d845a4433a831~mv2.png',
    loc: 'Tyler, Texas',
    stars: 5,
    text: "Best RV rental ever! Excellent service, experience and quality! They rented to us at a moments notice on the 4th of July. They delivered that same day, setup and provided an overview on how to use everything. They followed up with several phone calls to check in on how we were! Amazing! Top notch! Above and beyond! I will always use their service moving forward! Westin and team were the best!",
  },
  {
    name: 'Sandy McKinney',
    image: 'https://static.wixstatic.com/media/62f926_575e3599e5f64a11ac9775b952ae14c2~mv2.png',
    loc: 'Texas Rose Horse Park',
    stars: 5,
    text: "Triple W was great to work with. As a RV novice Wayne was very polite, patient and accommodating. The RV was in great condition and fully loaded! Given the temperature outside it was great to have an RV that had strong A/C. I will definitely use them again when we return to the Rose Horse Park.",
  },
  {
    name: 'Tim S.',
    image: 'https://static.wixstatic.com/media/62f926_e823cada6ec745d5b64f7431a63badd5~mv2.png',
    loc: 'Texas Rose Horse Park',
    stars: 5,
    text: "The RVs are nice and convenient especially for horse shows. However what makes this beyond 5 stars is the incredible hospitality by the host. He goes beyond Ritz Carlton standards. The wifi is incredible and fast and reliable. This is our new first choice when coming to Texas Rose Horse Park.",
  },
  {
    name: 'Grant Walker',
    image: 'https://static.wixstatic.com/media/62f926_641bcca631884ba09644963d5e5f9104~mv2.png',
    loc: 'Tyler, Texas',
    stars: 5,
    text: "Me and my wife stayed in the North Trail RV near a pond on our Ranch. The RV was setup and delivered for us. The RV was Clean and roomy. Westin and his Company were a pleasure to do business with. Couldn't ask for a better experience!",
  },
  {
    name: 'Amy Walker',
    image: 'https://static.wixstatic.com/media/62f926_e96de57f16044ca88717c7aa6ac0a0c5~mv2.png',
    loc: 'Muddy Bottoms',
    stars: 5,
    text: "WOW!!! The customer service that I received from Triple W Rental was outstanding. The rental company completely accommodated my needs and my family. Not only did Shane go above and beyond to help me schedule the perfect rental, I was super impressed with the quality of the camper. The camper was delivered to my destination at Muddy Bottoms and set up before I even arrived, completely stocked. All I had to do was bring my family and food.",
  },
  {
    name: 'Marsha Swann',
    image: 'https://static.wixstatic.com/media/62f926_f644e58d08f94afd9a5f6698c775765c~mv2.png',
    loc: 'Texas',
    stars: 5,
    text: "Triple W rentals has amazing RVs and great employees. The delivery driver is the best I've seen and should always be recommended when you're getting a rental! Great job guys.",
  },
  {
    name: 'Giovanna Iriel',
    image: 'https://static.wixstatic.com/media/62f926_980c1d6c8b8d493d9b6b0d945debcd90~mv2.png',
    loc: 'Texas Rose Horse Park',
    stars: 5,
    text: "Highly recommend Triple W Rentals! Their customer service was outstanding — so personable, responsive, and accommodating. They made the entire process seamless by delivering our luxury golf cart right to our stalls at the horse show. The golf cart was in excellent condition, super clean, and incredibly comfortable. Will definitely rent from them again!",
  },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0F0D0A',
        borderRadius: 10,
        padding: '24px 22px',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.15)'}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.2s ease',
        cursor: 'default',
      }}
    >
      {/* Stars */}
      <div style={{ color: '#C9A84C', fontSize: 13, marginBottom: 14, letterSpacing: '2px' }}>
        {'★'.repeat(review.stars)}
      </div>

      {/* Quote */}
      <p
        className={`review-text${expanded ? ' review-text--expanded' : ''}`}
        style={{
          fontSize: 13,
          color: 'rgba(210,195,165,0.90)',
          fontStyle: 'italic',
          lineHeight: 1.72,
          marginBottom: 8,
          fontFamily: "'Playfair Display', Georgia, serif",
          flex: 1,
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Read more */}
      <button
        className="review-read-more"
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#C9A84C', fontSize: 12, fontWeight: 400,
          fontFamily: "'Inter', sans-serif",
          padding: '4px 0',
          textAlign: 'left',
          marginBottom: 8,
          borderBottom: '1px solid rgba(201,168,76,0.3)',
          alignSelf: 'flex-start',
          letterSpacing: '0.02em',
        }}
      >
        {expanded ? 'Show less ↑' : 'Read more ↓'}
      </button>

      {/* Reviewer */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginTop: 'auto', paddingTop: 16,
        borderTop: '1px solid rgba(201,168,76,0.10)',
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(201,168,76,0.10)',
          border: '1px solid rgba(201,168,76,0.30)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 500,
          color: '#C9A84C',
          fontFamily: "'Cormorant Garamond', serif",
          flexShrink: 0,
        }}>
          {review.name.replace(/\./g, '').trim().split(/\s+/).map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()}
        </div>
        <div>
          <div style={{
            fontSize: 13, fontWeight: 500,
            color: '#F0E8D8',
            fontFamily: "'Inter', sans-serif",
          }}>{review.name}</div>
          <div style={{
            fontSize: 11,
            color: '#6B5F52',
            fontFamily: "'Inter', sans-serif",
          }}>{review.loc}</div>
        </div>
        <div style={{
          marginLeft: 'auto',
          fontSize: 10, color: '#6B5F52',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
        }}>
          Google
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3800,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    dotsClass: 'slick-dots reviews-slider-dots',
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '24px',
        },
      },
    ],
  };

  return (
    <div className="reviews-slider-outer">
      <style>{`
        .reviews-slider-outer {
          position: relative;
          margin: 0 -24px;
          padding: 0 24px;
        }

        /* Edge fade — desktop only */
        @media (min-width: 641px) {
          .reviews-slider-outer::before,
          .reviews-slider-outer::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 40px;
            width: 80px;
            z-index: 10;
            pointer-events: none;
          }
          .reviews-slider-outer::before {
            left: 0;
            background: linear-gradient(to right, #0D0B09 20%, transparent);
          }
          .reviews-slider-outer::after {
            right: 0;
            background: linear-gradient(to left, #0D0B09 20%, transparent);
          }
        }

        /* Slide padding */
        .reviews-slider-outer .slick-slide > div {
          padding: 8px 10px 16px;
        }

        @media (max-width: 640px) {
          .reviews-slider-outer .slick-slide > div {
            padding: 8px 6px 16px;
          }
        }

        /* Dots */
        .reviews-slider-dots {
          bottom: -8px !important;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .reviews-slider-dots li {
          margin: 0;
          width: 8px;
          height: 8px;
          transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .reviews-slider-dots li button {
          width: 7px;
          height: 7px;
          padding: 0;
          border-radius: 50%;
          background: rgba(201,168,76,0.25);
          border: none;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .reviews-slider-dots li button:hover {
          background: rgba(201,168,76,0.5);
        }

        .reviews-slider-dots li.slick-active {
          width: 22px;
        }

        .reviews-slider-dots li.slick-active button {
          background: #C9A84C;
          width: 22px;
          border-radius: 999px;
        }

        .reviews-slider-dots li button:before {
          display: none;
        }

        /* Equal height cards */
        .reviews-slider-outer .slick-track {
          display: flex !important;
        }

        .reviews-slider-outer .slick-slide {
          height: inherit !important;
        }

        .reviews-slider-outer .slick-slide > div {
          height: 100%;
        }

        /* Read more — all screen sizes */
        .review-text:not(.review-text--expanded) {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .review-read-more {
          display: inline-block;
        }
      `}</style>

      <Slider {...settings}>
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </Slider>
    </div>
  );
}
