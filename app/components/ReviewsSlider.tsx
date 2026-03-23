'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReviewCard } from './ReviewCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  name: string;
  image: string;
  excerpt: string;
  fullReview: string;
  stars: number;
}

const reviews: Review[] = [
  {
    name: 'Tim S.',
    image: 'https://static.wixstatic.com/media/62f926_e823cada6ec745d5b64f7431a63badd5~mv2.png',
    excerpt: 'What makes this beyond 5 stars is the incredible hospitality. He goes beyond Ritz Carlton standards. The wifi is fast and reliable. Our new first choice when coming to Texas Rose Horse Park.',
    fullReview: 'The RVs are nice and convenient especially for horse shows. However what makes this beyond 5 stars is the incredible hospitality by the host. He goes beyond Ritz Carlton standards. The wifi is incredible and fast and reliable. This is our new first choice when coming to Texas Rose Horse Park.',
    stars: 5
  },
  {
    name: 'Wyman Jones',
    image: 'https://static.wixstatic.com/media/62f926_db0f2145b9b54be6947b1cd42f12e361~mv2.png',
    excerpt: 'When my reservation with another company was canceled last minute, I called Triple W and they came through. Corbin went above and beyond. His attention to detail and professionalism were greatly appreciated.',
    fullReview: 'Thank you, Triple W Rentals, for the great service I received last weekend. When my reservation with another company was canceled at the last minute, I called Triple W Rentals, and they came through. They were very patient and answered all of my questions. In addition, I want to thank your team member Corbin for outstanding customer service. He delivered the RV on time, set it up, and ensured that everything was working properly. And when there was an issue, Corbin went above and beyond to correct it. His attention to detail and his professionalism were greatly appreciated. We had a great time in the RV, and I will definitely rent from Triple W again.',
    stars: 5
  },
  {
    name: 'JT Seargeant',
    image: 'https://static.wixstatic.com/media/62f926_110004e747b34d239d959afbd1f2b88e~mv2.png',
    excerpt: 'I have rented from Triple W multiple times. The communication is always outstanding. Corbin arrived on site in minutes and checked in daily. Exceeded my expectations.',
    fullReview: 'I have rented from Triple W multiple times. The communication is always outstanding and the response time on site to any needs is quick. Corbin arrived on site in minutes to assist with one minor issue. He checked in daily to make sure all was well which exceeded my expectations. I will continue to use them on all my trips to Texas Rose Horse Park.',
    stars: 5
  },
  {
    name: 'Luci Wade-Cantu',
    image: 'https://static.wixstatic.com/media/62f926_7141074f78bc415e8c9d845a4433a831~mv2.png',
    excerpt: "Best RV rental ever! They rented to us at a moment's notice on the 4th of July. Delivered same day, setup, and provided an overview. Amazing! Top notch! Above and beyond!",
    fullReview: 'Best RV rental ever! Excellent service, experience and quality! They rented to us at a moments notice on the 4th of July. They delivered that same day, setup and provided an overview on how to use everything. They followed up with several phone calls to check in on how we were! Amazing! Top notch! Above and beyond! I will always use their service moving forward! Westin and team were the best!',
    stars: 5
  },
  {
    name: 'Amy Walker',
    image: 'https://static.wixstatic.com/media/62f926_e96de57f16044ca88717c7aa6ac0a0c5~mv2.png',
    excerpt: 'The customer service was outstanding. Shane went above and beyond. The camper was delivered and set up before I even arrived, completely stocked. All I had to do was bring my family and food.',
    fullReview: 'WOW!!! The customer service that I received from Triple W Rental was outstanding. The rental company completely accommodated my needs and my family. Not only did Shane go above and beyond to help me schedule the perfect rental, I was super impressed with the quality of the camper. The camper was delivered to my destination at Muddy Bottoms and set up before I even arrived, completely stocked. All I had to do was bring my family and food.',
    stars: 5
  },
  {
    name: 'Sandy McKinney',
    image: 'https://static.wixstatic.com/media/62f926_575e3599e5f64a11ac9775b952ae14c2~mv2.png',
    excerpt: 'Triple W was great to work with. As a RV novice Wayne was very polite, patient and accommodating. The RV was in great condition and fully loaded with strong A/C. Will definitely use them again.',
    fullReview: 'Triple W was great to work with. As a RV novice Wayne was very polite, patient and accommodating. The RV was in great condition and fully loaded! Given the temperature outside it was great to have an RV that had strong A/C. I will definitely use them again when we return to the Rose Horse Park.',
    stars: 5
  },
  {
    name: 'Jaden Richardson',
    image: 'https://static.wixstatic.com/media/62f926_1ec8069798744e269b3cd56333ec0268~mv2.png',
    excerpt: 'Great experience! The booking process was smooth, the staff was friendly and helpful, and the Momentum RV was in excellent condition. Everything went exactly as planned.',
    fullReview: 'Great experience with Triple W RV Rentals! The booking process was smooth, the staff was friendly and helpful, and the Momentum RV was in excellent condition. Everything went exactly as planned. Highly recommend!',
    stars: 5
  },
  {
    name: 'Grant Walker',
    image: 'https://static.wixstatic.com/media/62f926_641bcca631884ba09644963d5e5f9104~mv2.png',
    excerpt: "The RV was setup and delivered for us. Clean and roomy. Westin and his Company were a pleasure to do business with. Couldn't ask for a better experience!",
    fullReview: 'Me and my wife stayed in the North Trail RV near a pond on our Ranch. The RV was setup and delivered for us. The RV was Clean and roomy. Westin and his Company were a pleasure to do business with. Couldn\'t ask for a better experience!',
    stars: 5
  },
  {
    name: 'Marsha Swann',
    image: 'https://static.wixstatic.com/media/62f926_f644e58d08f94afd9a5f6698c775765c~mv2.png',
    excerpt: "Triple W rentals has amazing RVs and great employees. The delivery driver is the best I've seen and should always be recommended. Great job guys.",
    fullReview: "Triple W rentals has amazing RVs and great employees. The delivery driver is the best I've seen and should always be recommended when you're getting a rental! Great job guys.",
    stars: 5
  },
  {
    name: 'Giovanna Iriel',
    image: 'https://static.wixstatic.com/media/62f926_980c1d6c8b8d493d9b6b0d945debcd90~mv2.png',
    excerpt: 'Highly recommend! Their customer service was outstanding — so personable, responsive, and accommodating. They delivered our luxury golf cart right to our stalls. Super clean and comfortable.',
    fullReview: 'Highly recommend Triple W Rentals! Their customer service was outstanding — so personable, responsive, and accommodating. They made the entire process seamless by delivering our luxury golf cart right to our stalls at the horse show. The golf cart was in excellent condition, super clean, and incredibly comfortable. Will definitely rent from them again!',
    stars: 5
  }
];

export default function ReviewsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalPages = Math.ceil(reviews.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentReviews = () => {
    const start = currentSlide * 3;
    return reviews.slice(start, start + 3);
  };

  return (
    <section id="reviews" className="bg-[#0F0D0B] py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2.5 mb-5"
        >
          <span className="inline-block w-7 h-px bg-[#C9A84C]/60 flex-shrink-0" />
          <span className="text-[#C9A84C] text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>GUEST REVIEWS</span>
          <span className="inline-block w-7 h-px bg-[#C9A84C]/60 flex-shrink-0" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#F3EDE3] text-4xl md:text-5xl lg:text-6xl mb-7 text-center"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500, lineHeight: 1.1 }}
        >
          What Our Guests Experience
        </motion.h2>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#A89880] mb-20 flex items-center justify-center gap-2.5 flex-wrap"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px' }}
        >
          <span className="text-[#C9A84C]" style={{ fontWeight: 500 }}>4.7★</span>
          <span>on Google</span>
          <span className="text-[#C9A84C]/40">·</span>
          <span>193 verified reviews</span>
          <span className="text-[#C9A84C]/40">·</span>
          <span>Tyler, Texas</span>
        </motion.div>

        {/* Desktop: 3 Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16">
          {getCurrentReviews().map((review, index) => (
            <ReviewCard
              key={`${review.name}-${currentSlide}`}
              name={review.name}
              image={review.image}
              excerpt={review.excerpt}
              stars={review.stars}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>

        {/* Mobile: Single Card Slider */}
        <div className="md:hidden mb-12">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ReviewCard
                  name={reviews[currentSlide].name}
                  image={reviews[currentSlide].image}
                  excerpt={reviews[currentSlide].excerpt}
                  stars={reviews[currentSlide].stars}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Navigation: Arrows + Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="hidden md:flex justify-center items-center gap-6 mb-16"
        >
          <button
            onClick={prevSlide}
            className="w-11 h-11 rounded-full border border-[#2A2520]/60 bg-[#15120F] flex items-center justify-center text-[#C9A84C] hover:bg-[#1A1410] hover:border-[#C9A84C]/40 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(201,168,76,0.15)]"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2.5">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  index === currentSlide
                    ? 'bg-[#C9A84C] w-10 shadow-[0_0_8px_rgba(201,168,76,0.4)]'
                    : 'bg-[#2A2520] w-1.5 hover:bg-[#3A3530]'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-11 h-11 rounded-full border border-[#2A2520]/60 bg-[#15120F] flex items-center justify-center text-[#C9A84C] hover:bg-[#1A1410] hover:border-[#C9A84C]/40 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(201,168,76,0.15)]"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Mobile Navigation: Arrows + Dots */}
        <div className="md:hidden flex items-center justify-center gap-4 mb-16">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-[#2A2520]/60 bg-[#15120F] flex items-center justify-center text-[#C9A84C] hover:bg-[#1A1410] transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#C9A84C] w-8' : 'bg-[#2A2520] w-1.5'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-[#2A2520]/60 bg-[#15120F] flex items-center justify-center text-[#C9A84C] hover:bg-[#1A1410] transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <a
            href="#quote"
            className="inline-block bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0F0D0B] px-12 py-4 rounded-md transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] hover:-translate-y-0.5"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '15px', letterSpacing: '0.01em' }}
          >
            Start Your Booking
          </a>
        </motion.div>
      </div>
    </section>
  );
}
