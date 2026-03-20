'use client';
import UnicornScene from 'unicornstudio-react/next';

export default function UnicornSection() {
  return (
    <section style={{ background: '#071610', overflow: 'hidden', position: 'relative' }}>
      <UnicornScene
        jsonFilePath="/rv-scene-data.json"
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js"
        width="100%"
        height="600px"
      />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        <p style={{
          color: '#EA9B01',
          fontFamily: '"Holtwood One SC", serif',
          fontSize: 'clamp(32px, 4.7vw, 67px)',
          lineHeight: 1.36,
          margin: 0,
        }}>It&apos;s Time to</p>
        <p style={{
          color: '#FFFFFF',
          fontFamily: '"Holtwood One SC", serif',
          fontSize: 'clamp(32px, 4.7vw, 67px)',
          lineHeight: 1,
          margin: 0,
        }}>Exploreeeeeeee</p>
      </div>
    </section>
  );
}
