export interface ForecastPoint {
  time: string;
  temp: number;
}

export interface WeatherData {
  city: string;
  temp_c: number;
  temp_f: number;
  condition: string;
  humidity: string;
  wind: string;
  description: string;
  forecast: ForecastPoint[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface WeatherResponse {
  data: WeatherData | null;
  sources: GroundingChunk[];
  rawText?: string;
}
