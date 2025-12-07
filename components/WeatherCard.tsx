import React from 'react';
import { WeatherData, GroundingChunk } from '../types';
import ForecastChart from './ForecastChart';
import SourceLinks from './SourceLinks';

interface WeatherCardProps {
  data: WeatherData;
  sources: GroundingChunk[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, sources }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 animate-fade-in-up">
      <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white">
        
        {/* Decorative background circle */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold tracking-tight">{data.city}</h2>
              <p className="text-blue-200 mt-1 capitalize text-lg">{data.condition}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-6xl font-extralight tracking-tighter">
                {Math.round(data.temp_c)}°
              </div>
              <div className="text-white/40 text-sm font-medium">
                 {Math.round(data.temp_f)}°F
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-white/90 leading-relaxed mb-8 font-light border-l-4 border-blue-400 pl-4">
            {data.description}
          </p>

          {/* Grid Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 rounded-2xl p-4 flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-full text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-7.406-1.547-2.69-2.937-4.094-4-5.594-1.063 1.5-2.453 2.904-4 5.594C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase font-semibold">Humidity</p>
                <p className="text-xl font-medium">{data.humidity}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 flex items-center space-x-3">
               <div className="p-2 bg-purple-500/20 rounded-full text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path><path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path><path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path></svg>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase font-semibold">Wind</p>
                <p className="text-xl font-medium">{data.wind}</p>
              </div>
            </div>
          </div>

          {/* Forecast Chart */}
          {data.forecast && data.forecast.length > 0 && (
             <ForecastChart data={data.forecast} />
          )}

          {/* Sources */}
          <SourceLinks sources={sources} />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
