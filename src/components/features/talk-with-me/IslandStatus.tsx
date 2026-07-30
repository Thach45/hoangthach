'use client';

import { useEffect, useState } from 'react';
import { CloudSun, Cloudy, Sun } from 'lucide-react';

interface Weather {
  temperature: number;
  code: number;
}

const weatherDetails: Record<number, { label: string; icon: typeof Sun }> = {
  0: { label: 'Clear sky', icon: Sun },
  1: { label: 'Mostly clear', icon: CloudSun },
  2: { label: 'Partly cloudy', icon: CloudSun },
  3: { label: 'Cloudy', icon: Cloudy },
  45: { label: 'Foggy', icon: Cloudy },
  48: { label: 'Foggy', icon: Cloudy },
  51: { label: 'Light drizzle', icon: CloudSun },
  53: { label: 'Drizzle', icon: CloudSun },
  55: { label: 'Heavy drizzle', icon: Cloudy },
  61: { label: 'Light rain', icon: CloudSun },
  63: { label: 'Rain', icon: CloudSun },
  65: { label: 'Heavy rain', icon: Cloudy },
  80: { label: 'Rain showers', icon: CloudSun },
  81: { label: 'Rain showers', icon: Cloudy },
  82: { label: 'Heavy showers', icon: Cloudy },
  95: { label: 'Thunderstorm', icon: Cloudy },
};

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export default function IslandStatus({ expanded }: { expanded?: boolean }) {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => setTime(formatTime(new Date())), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let active = true;
    fetch('https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current=temperature_2m,weather_code&timezone=Asia%2FHo_Chi_Minh')
      .then((response) => response.json())
      .then((data) => {
        if (active && typeof data.current?.temperature_2m === 'number') {
          setWeather({ temperature: Math.round(data.current.temperature_2m), code: data.current.weather_code });
        }
      })
      .catch(() => undefined);

    return () => { active = false; };
  }, []);

  const details = weatherDetails[weather?.code ?? 0] || weatherDetails[0];
  const Icon = details.icon;

  if (!expanded) {
    return (
      <div className="flex w-full items-center justify-between gap-2 px-1 text-white">
        <span className="text-xs font-bold tabular-nums tracking-wide">{time}</span>
        <span className="h-3 w-px bg-white/20" />
        <span className="flex items-center gap-1 text-xs font-semibold text-white/85"><Icon size={14} className="text-amber-300" />{weather ? `${weather.temperature}°` : '--°'}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-between gap-4 text-white">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Ho Chi Minh City</p>
        <p className="mt-0.5 text-xl font-semibold tabular-nums">{time}</p>
      </div>
      <div className="flex items-center gap-3 text-right">
        <Icon size={30} className="text-amber-300" />
        <div><p className="text-xl font-semibold">{weather ? `${weather.temperature}°` : '--°'}</p><p className="text-[10px] text-white/55">{details.label}</p></div>
      </div>
    </div>
  );
}
