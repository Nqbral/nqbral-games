'use client';

import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false }, // Fond noir total
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ['#00ffff', '#8b5cf6', '#10b981'], // cyan, violet néon, vert émeraude
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
            random: true,
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 0.3,
              sync: false,
            },
          },
          size: {
            value: 2.5,
            random: true,
            animation: {
              enable: true,
              speed: 3,
              minimumValue: 1,
              sync: false,
            },
          },
          links: {
            enable: true,
            distance: 130,
            color: '#ffffff',
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: 'none',
            random: false,
            straight: false,
            outModes: {
              default: 'bounce',
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
}
