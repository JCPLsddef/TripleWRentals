'use client';
import UnicornScene from 'unicornstudio-react/next';

export default function UnicornSection() {
  return (
    <section style={{ background: '#071610', overflow: 'hidden' }}>
      <UnicornScene
        jsonFilePath="/rv-scene-data.json"
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js"
        width="100%"
        height="600px"
      />
    </section>
  );
}
