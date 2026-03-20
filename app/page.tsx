import React from "react";

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './globals.css';

/* ─── Data ──────────────────────────────────────────────────── */
const fleet = [
  {
    name: 'Momentum 2',
    type: 'Luxury Toy Hauler',
    specs: 'Sleeps 8–10 · 3 King Beds · 2 Baths',
    features: ['Fireplace', 'Marble Counters', '4 Smart TVs', 'Outdoor Kitchen'],
    tag: 'Most Popular',
    bg: '#0F2A18',
  },
  {
    name: 'Momentum 3',
    type: 'Deluxe Toy Hauler',
    specs: 'Sleeps 10 · 3 King + 1 Queen · 2 Baths',
    features: ['Marble Counters', 'Heated Seats', 'Patio Deck', 'Smart TVs'],
    tag: 'Best for Groups',
    bg: '#1A3820',
  },
  {
    name: 'Heartland Gateway',
    type: '5th Wheel',
    specs: 'Sleeps 12 · 2 Beds · 2 Baths',
    features: ['Custom Hardwood', 'Outdoor Kitchen', '4 Smart TVs', '2 Fridges'],
    tag: 'Largest Fleet',
    bg: '#0D2416',
  },
  {
    name: 'Solitude',
    type: 'Luxury 5th Wheel',
    specs: 'King Bed · Full Bath · Walk-in Closet',
    features: ['Marble Bar', 'Massage Chairs', 'Double Fridge', 'Security'],
    tag: 'Most Private',
    bg: '#1C3A1E',
  },
  {
    name: 'Grand Design',
    type: 'Super Toy Hauler',
    specs: 'Sleeps 10 · 1 King + 3 Queen · 2 Baths',
    features: ['Fireplace', 'Marble Counters', 'Walk-in Baths', 'Smart TVs'],
    tag: 'Best Value',
    bg: '#142E1C',
  },
];

const reviews = [
  {
    name: 'Verified Guest',
    loc: 'Tyler State Park Visit',
    stars: 5,
    text: "Everything was clean and inviting! We came in to visit Tyler State Park and it was perfect. Westin is an excellent host and so very polite and kind. Will absolutely be back.",
  },
  {
    name: 'Horse Show Attendee',
    loc: 'Texas Rose Horse Park',
    stars: 5,
    text: "Loved our experience! It's a great place to stay for a horse show. Close to town and the renter is awesome. The RV had everything we needed and more.",
  },
  {
    name: 'VRBO Verified Guest',
    loc: 'Weekend Trip',
    stars: 5,
    text: "Owner met us at our convenience and gave us a thorough walkthrough of the unit. Unit met expectations and was what we needed for our weekend plans. Would rent again.",
  },
  {
    name: 'Repeat Customer',
    loc: 'Tyler, TX',
    stars: 5,
    text: "Very clean. Cozy and comfortable. The closest and most convenient horse show lodging we've found in all of Texas. Property manager was very attentive and accommodating.",
  },
  {
    name: 'Family Group',
    loc: 'East Texas',
    stars: 5,
    text: "Used for a family reunion in East Texas. Could not have been easier — they handle everything from start to finish. The RV was nicer than most hotels we've stayed in.",
  },
  {
    name: 'Event Renter',
    loc: 'Dallas, TX',
    stars: 5,
    text: "24/7 support is real — Westin picked up late at night when I had a question. That alone sets them apart from any rental company I've ever used. The Momentum was stunning.",
  },
];

const faqs = [
  {
    q: 'How far do you deliver?',
    a: 'We deliver across Texas — Tyler, Dallas/Fort Worth, Houston, Austin, San Antonio, and surrounding areas. Call us to confirm your specific location and get a delivery quote.',
  },
  {
    q: "What's included in the rental?",
    a: "Every rental includes full delivery, setup, fresh linens, cookware, and a complete walkthrough. You get 24/7 support for your entire stay. Optional outdoor package (grill, chairs, lawn setup) available for just $75. Ask us when you call!",
  },
  {
    q: 'Do I need a truck or special license?',
    a: "No. We deliver and set up the RV at your location. You don't need a truck, a hitch, or any experience. We handle all the logistics — you just walk in.",
  },
  {
    q: 'How does booking work?',
    a: 'Simple: call or text us at (972) 965-6901. Tell us your dates and location. Most bookings are confirmed within the hour.',
  },
  {
    q: "What's your cancellation policy?",
    a: "Full refund for cancellations 30+ days out. 50% refund for 8–30 days. No refund within 7 days. Something came up? Just call us — we'll always try to work with you.",
  },
  {
    q: 'Can I rent for just one night?',
    a: "Yes. We offer daily, weekly, and monthly rentals. Weekend single-night slots go fast, especially in spring and fall — call early to lock in your dates.",
  },
];

const moreServices = [
  { label: 'Great Southwest', href: 'https://triplewrentals.com/great-southwest' },
  { label: 'Texas Rose Horse Park', href: 'https://triplewrentals.com/texas-rose-horse-park' },
  { label: 'Contact & Services', href: 'https://triplewrentals.com/contact-%26-services' },
  { label: 'Generator Rentals', href: 'https://triplewrentals.com/generator-rentals' },
  { label: 'Hauling Services', href: 'https://triplewrentals.com/hauling-services' },
  { label: 'DFW RV Rentals', href: 'https://triplewrentals.com/dfw-rv-rentals' },
  { label: 'Houston RV Rentals', href: 'https://triplewrentals.com/houston-rv-rentals' },
  { label: "New RV's", href: 'https://triplewrentals.com/new-rvs' },
  { label: 'RV Consignment Texas', href: 'https://triplewrentals.com/rv-consignment-texas' },
  { label: 'Consign Your Supercar', href: 'https://triplewrentals.com/consign-your-supercar' },
  { label: 'Austin Rentals', href: 'https://triplewrentals.com/austin-rentals' },
  { label: 'APHA', href: 'https://triplewrentals.com/apha' },
  { label: 'Power Generators', href: 'https://triplewrentals.com/power-generators' },
  { label: 'Texas Motorplex', href: 'https://triplewrentals.com/texas-motorplex' },
  { label: 'Book with us!', href: 'https://triplewrentals.com/book-with-us' },
  { label: 'River Run ATV Park', href: 'https://triplewrentals.com/river-run-atv-park' },
  { label: 'Get your quote', href: 'https://triplewrentals.com/get-your-quote' },
  { label: 'Newest Additions', href: 'https://triplewrentals.com/newest-additions' },
];

// ...existing code...
// The rest of your page.jsx content goes here, unchanged.
// ...existing code...
