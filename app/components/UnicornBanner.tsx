'use client';
import { useEffect } from 'react';

export default function UnicornBanner() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const u = w.UnicornStudio;
    if (u && u.init) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => u.init());
      } else {
        u.init();
      }
    } else {
      w.UnicornStudio = { isInitialized: false };
      const i = document.createElement('script');
      i.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js';
      i.onload = () => {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => w.UnicornStudio.init());
        } else {
          w.UnicornStudio.init();
        }
      };
      (document.head || document.body).appendChild(i);
    }
  }, []);

  return (
    <div
      style={{ width: '100%', height: '900px', display: 'block', lineHeight: 0 }}
      data-us-project="Er0s1lg6jrtlnelZmgAW"
    />
  );
}
