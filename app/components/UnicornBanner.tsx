'use client';

import { useEffect, useRef } from 'react';

export default function UnicornBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.unicorn.studio/v1.4.0/unicornStudio.umd.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).UnicornStudio) {
        (window as any).UnicornStudio.init();
      }
    };
    document.head.appendChild(script);

    return () => {
      // cleanup any existing scene
      if ((window as any).UnicornStudio && (window as any).UnicornStudio.destroy) {
        (window as any).UnicornStudio.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-us-project-src="/unicorn-scene.json"
      style={{ width: '100%', height: '600px', display: 'block' }}
    />
  );
}
