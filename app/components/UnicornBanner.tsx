'use client';

import UnicornScene from "unicornstudio-react/next";

export default function UnicornBanner() {
  return (
    <div style={{
      width: '100%',
      display: 'block',
      lineHeight: 0,
      borderTop: '1px solid rgba(201,168,76,0.08)',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
      background: '#0D0B09',
    }}>
      <UnicornScene
        projectId="Er0s1lg6jrtlnelZmgAW"
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.5/dist/unicornStudio.umd.js"
        width="100%"
        height="600px"
      />
    </div>
  );
}
