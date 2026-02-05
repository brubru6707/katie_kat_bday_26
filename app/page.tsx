'use client';

import React, { useState, Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import react-three-fiber Canvas and drei components (no SSR)

// Only needed if you use these directly in this file, otherwise remove:
// const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false });
// const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false });
// const useLoader = dynamic(() => import('@react-three/fiber').then(mod => mod.useLoader), { ssr: false });
// const OBJLoader = dynamic(() => import('three/examples/jsm/loaders/OBJLoader').then(mod => mod.OBJLoader), { ssr: false });

// Move SceneObj dynamic import to module scope so it doesn't remount on every render
const Scene = dynamic(() => import('./SceneObj'), { ssr: false });

const images = [
  "77698233920__24786CA3-1DF3-4270-8ADB-7FE6A3867BDD.jpg",
  "IMG_1368.jpg",
  "IMG_1377.jpg",
  "IMG_1683.jpg",
  "IMG_2344.jpg",
  "IMG_2468.jpg",
  "IMG_2525.jpg",
  "IMG_2539.jpg",
  "IMG_2540.jpg",
  "IMG_2584.jpg",
  "IMG_2632.jpg",
  "IMG_2633(1).jpg",
  "IMG_2633.jpg",
  "IMG_2634.jpg",
  "IMG_2655.jpg",
  "IMG_2749.jpg",
  "IMG_2761.jpg",
  "IMG_2815.jpg",
  "IMG_2816.jpg",
  "IMG_2852.jpg",
  "IMG_2868.jpg",
  "IMG_2869.jpg",
  "IMG_2870.jpg",
  "IMG_2874.jpg",
  "IMG_2888.jpg",
  "IMG_2889.jpg",
  "IMG_2890.jpg",
  "IMG_2891.jpg",
  "IMG_3069.jpg",
  "IMG_3071.jpg",
  "IMG_3073.jpg",
  "IMG_3074.jpg",
  "IMG_3080.jpg",
  "IMG_3219.jpg",
  "IMG_3867.jpg",
  "IMG_7368.jpg",
  "IMG_7378.jpg",
  "IMG_7414.jpg",
  "IMG_7636.jpg",
  "IMG_7643.jpg",
  "IMG_8818.jpg",
  "IMG_8824.jpg",
  "IMG_8875.jpg",
  "IMG_9455.jpg",
  "IMG_9486.jpg",
  "P8110043.jpg",
];


function KatieObjViewer() {
  // No need for local dynamic import or state, just render Scene
  return (
    <div style={{ width: 240, height: 240 }}>
      <Suspense fallback={null}>
        <Scene objUrl="/objs/KatieKitKat.obj" />
      </Suspense>
    </div>
  );
}

export default function Home() {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [isRolling, setIsRolling] = useState(false);

  // Set random initial image only on client
  React.useEffect(() => {
    setCurrentImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  const rollDie = () => {
    if (isRolling) return;
    setIsRolling(true);
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[randomIndex]);
      rollCount++;
      if (rollCount >= 15) {
        clearInterval(rollInterval);
        const finalIndex = Math.floor(Math.random() * images.length);
        setCurrentImage(images[finalIndex]);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <div className="liquid-bg flex min-h-screen justify-center font-sans p-8">
      <main className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* OBJ Viewer */}
          {/* Die */}
          <button
            onClick={rollDie}
            disabled={isRolling}
            className={`relative bg-white rounded-3xl shadow-2xl cursor-pointer transform transition-all duration-200 hover:scale-110 active:scale-95
            } ${isRolling ? 'cursor-not-allowed' : 'hover:shadow-3xl'}`}
          >
          {currentImage && (
            <div className="flex flex-col items-center gap-4 bg-transparent p-6 rounded-2xl shadow-2xl">
              <h1 className="text-black">Press/Click to get a random pic :D</h1>
              <div className="relative w-64 h-64 md:w-96 md:h-96 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={`/pictures/${currentImage}`}
                  alt="Rolled image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 384px"
                />
              </div>
            </div>
          )}
          </button>
                <div style={{
          border: '4px solid white',
          borderRadius: '32px',
          padding: '16px',
          background: 'rgba(255,255,255,0.05)',
          boxShadow: '0 0 32px 0 rgba(0,0,0,0.15)'
        }}>
                  <h1 className="text-center">Move around :O</h1>
          <KatieObjViewer />
        </div>
        </div>
        <div>
          Happy Late Bday Katie Kat! I hope you like this little website.
          It&#39;s just a compilation of some of our pictures with you with your Cow Bear family.
          You mean so much to us and we&#39;re always here for you. 
          Esspeically, me, the developer, Bruno (the coder), your friend. 
          Your friends forever... forever... ever... ever... ever... ever...
          You will die with us. Muahahaha. Just kidding.
          Love you lots! -Bruno
        </div>
      </main>
      <style jsx global>{`
        .liquid-bg {
          position: relative;
          overflow: hidden;
        }
        .liquid-bg .liquid-blob {
          position: fixed;
          z-index: -2;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          filter: blur(60px) saturate(1.2) brightness(0.8);
        }
        .liquid-bg .liquid-blob1 {
          background: radial-gradient(ellipse 60% 40% at 20% 30%, #2d1c13 80%, transparent 100%);
          animation: blobMove1 16s ease-in-out infinite alternate;
        }
        .liquid-bg .liquid-blob2 {
          background: radial-gradient(ellipse 50% 60% at 80% 70%, #1a110b 80%, transparent 100%);
          animation: blobMove2 18s ease-in-out infinite alternate;
        }
        .liquid-bg .liquid-blob3 {
          background: radial-gradient(ellipse 40% 50% at 60% 20%, #3b2a1a 80%, transparent 100%);
          animation: blobMove3 20s ease-in-out infinite alternate;
        }
        .liquid-bg .liquid-blob4 {
          background: radial-gradient(ellipse 70% 30% at 40% 80%, #1a110b 60%, transparent 100%);
          animation: blobMove4 22s ease-in-out infinite alternate;
        }
        .liquid-bg .liquid-blob5 {
          background: radial-gradient(ellipse 30% 70% at 70% 40%, #2d1c13 60%, transparent 100%);
          animation: blobMove5 24s ease-in-out infinite alternate;
        }
        @keyframes blobMove1 {
          0% { transform: translate(0,0) scale(1.1,1); }
          50% { transform: translate(40px, 60px) scale(1.2,1.1); }
          100% { transform: translate(-30px, 20px) scale(1,1.2); }
        }
        @keyframes blobMove2 {
          0% { transform: translate(0,0) scale(1,1.1); }
          50% { transform: translate(-60px, -40px) scale(1.1,1.2); }
          100% { transform: translate(30px, -20px) scale(1.2,1); }
        }
        @keyframes blobMove3 {
          0% { transform: translate(0,0) scale(1.1,1.1); }
          50% { transform: translate(60px, 40px) scale(1.2,1.2); }
          100% { transform: translate(-40px, 30px) scale(1,1.1); }
        }
        @keyframes blobMove4 {
          0% { transform: translate(0,0) scale(1,1); }
          50% { transform: translate(-30px, 50px) scale(1.1,1.2); }
          100% { transform: translate(20px, -30px) scale(1.2,1); }
        }
        @keyframes blobMove5 {
          0% { transform: translate(0,0) scale(1.1,1); }
          50% { transform: translate(50px, -30px) scale(1.2,1.1); }
          100% { transform: translate(-20px, 40px) scale(1,1.2); }
        }
      `}</style>
      <div className="liquid-blob liquid-blob1" />
      <div className="liquid-blob liquid-blob2" />
      <div className="liquid-blob liquid-blob3" />
      <div className="liquid-blob liquid-blob4" />
      <div className="liquid-blob liquid-blob5" />
    </div>
  );
}
