import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { fetchWeather } from './services/weatherService';
import { WeatherData, GroundingChunk } from './types';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setSources([]);

    try {
      const response = await fetchWeather(city);
      if (response.data) {
        setWeather(response.data);
        setSources(response.sources);
      } else {
        setError("Could not retrieve weather data. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while fetching the weather. Please try another city.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center p-4 md:p-8">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 mb-2">
            SkyGem Weather
          </h1>
          <p className="text-blue-200/60 text-sm md:text-base">
            Powered by Gemini 2.5 & Google Search
          </p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {loading && (
          <div className="mt-20 flex flex-col items-center space-y-4">
             <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-blue-200 animate-pulse">Consulting the atmosphere...</p>
          </div>
        )}

        {error && (
          <div className="mt-12 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-center max-w-md backdrop-blur-md">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !weather && (
          <div className="mt-20 text-center text-white/30">
            <p className="text-lg">Search for a city to see the current forecast.</p>
          </div>
        )}

        {!loading && weather && (
          <WeatherCard data={weather} sources={sources} />
        )}
      </div>
      
      <footer className="mt-auto py-6 text-center text-white/20 text-xs z-10">
        <p>&copy; {new Date().getFullYear()} SkyGem Weather. Data provided by Google Search Grounding.</p>
      </footer>
    </div>
  );
};

export default App;
