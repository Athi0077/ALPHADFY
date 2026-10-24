import React, { useEffect, useRef } from 'react';

export default function ButterflyBg({ theme }) {
  const weatherInstanceRef = useRef(null);

  useEffect(() => {
    if (weatherInstanceRef.current && weatherInstanceRef.current.wrapper) {
      weatherInstanceRef.current.wrapper.setAttribute('data-theme', theme || 'light');
    }
  }, [theme]);

  useEffect(() => { 
    let isMounted = true;

    const startEffect = () => {
      if (typeof window !== 'undefined' && window.YZhanWeather) {
        try {
          if (!weatherInstanceRef.current) {
            const instance = new window.YZhanWeather();
            if (instance.wrapper) {
              instance.wrapper.id = 'butterfly-bg';
              instance.wrapper.setAttribute('data-theme', theme || 'light');
              instance.wrapper.setAttribute('aria-hidden', 'true');
              instance.wrapper.style.position = 'fixed';
              instance.wrapper.style.top = '0';
              instance.wrapper.style.left = '0';
              instance.wrapper.style.width = '100vw';
              instance.wrapper.style.height = '100vh';
              instance.wrapper.style.pointerEvents = 'none';
              instance.wrapper.style.zIndex = '1';
              instance.wrapper.style.overflow = 'hidden';
            }
            instance.run('butterfly', { maxDuration: 10 });
            weatherInstanceRef.current = instance;
          }
        } catch (e) {
          console.warn('Butterfly effect note:', e);
        }
      }
    };

    if (window.YZhanWeather) {
      startEffect();
    } else {
      const script = document.createElement('script');
      script.src = '/yzhanweather.min.js';
      script.async = true;
      script.onload = () => {
        if (isMounted) startEffect();
      };
      document.body.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (weatherInstanceRef.current) {
        try {
          if (typeof weatherInstanceRef.current.destory === 'function') {
            weatherInstanceRef.current.destory();
          } else if (typeof weatherInstanceRef.current.destroy === 'function') {
            weatherInstanceRef.current.destroy();
          }
        } catch (_) {}
        weatherInstanceRef.current = null;
      }
      const existing = document.getElementById('butterfly-bg');
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  return null;
}
