
-- Create tables for F1 data storage

-- Seasons table
CREATE TABLE public.seasons (
  id SERIAL PRIMARY KEY,
  year INTEGER UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Circuits table
CREATE TABLE public.circuits (
  id SERIAL PRIMARY KEY,
  circuit_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  country VARCHAR(100),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  alt INTEGER,
  url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Constructors/Teams table
CREATE TABLE public.constructors (
  id SERIAL PRIMARY KEY,
  constructor_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  nationality VARCHAR(100),
  url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Drivers table
CREATE TABLE public.drivers (
  id SERIAL PRIMARY KEY,
  driver_id VARCHAR(50) UNIQUE NOT NULL,
  driver_number INTEGER,
  code VARCHAR(3),
  given_name VARCHAR(255),
  family_name VARCHAR(255),
  date_of_birth DATE,
  nationality VARCHAR(100),
  url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Races table
CREATE TABLE public.races (
  id SERIAL PRIMARY KEY,
  season INTEGER REFERENCES public.seasons(year),
  round INTEGER NOT NULL,
  race_id VARCHAR(50) UNIQUE NOT NULL,
  race_name VARCHAR(255) NOT NULL,
  circuit_id VARCHAR(50) REFERENCES public.circuits(circuit_id),
  date DATE,
  time TIME,
  url VARCHAR(500),
  fp1_date DATE,
  fp1_time TIME,
  fp2_date DATE,
  fp2_time TIME,
  fp3_date DATE,
  fp3_time TIME,
  qualifying_date DATE,
  qualifying_time TIME,
  sprint_date DATE,
  sprint_time TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Race results table
CREATE TABLE public.race_results (
  id SERIAL PRIMARY KEY,
  race_id VARCHAR(50) REFERENCES public.races(race_id),
  driver_id VARCHAR(50) REFERENCES public.drivers(driver_id),
  constructor_id VARCHAR(50) REFERENCES public.constructors(constructor_id),
  position INTEGER,
  position_text VARCHAR(10),
  position_order INTEGER,
  points DECIMAL(5,2),
  laps INTEGER,
  time_text VARCHAR(50),
  milliseconds BIGINT,
  fastest_lap INTEGER,
  fastest_lap_rank INTEGER,
  fastest_lap_time VARCHAR(20),
  fastest_lap_speed DECIMAL(6,3),
  status_id INTEGER,
  status VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Qualifying results table
CREATE TABLE public.qualifying_results (
  id SERIAL PRIMARY KEY,
  race_id VARCHAR(50) REFERENCES public.races(race_id),
  driver_id VARCHAR(50) REFERENCES public.drivers(driver_id),
  constructor_id VARCHAR(50) REFERENCES public.constructors(constructor_id),
  position INTEGER,
  q1_time VARCHAR(20),
  q2_time VARCHAR(20),
  q3_time VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Driver standings table
CREATE TABLE public.driver_standings (
  id SERIAL PRIMARY KEY,
  race_id VARCHAR(50) REFERENCES public.races(race_id),
  driver_id VARCHAR(50) REFERENCES public.drivers(driver_id),
  position INTEGER,
  position_text VARCHAR(10),
  points DECIMAL(6,2),
  wins INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Constructor standings table
CREATE TABLE public.constructor_standings (
  id SERIAL PRIMARY KEY,
  race_id VARCHAR(50) REFERENCES public.races(race_id),
  constructor_id VARCHAR(50) REFERENCES public.constructors(constructor_id),
  position INTEGER,
  position_text VARCHAR(10),
  points DECIMAL(6,2),
  wins INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Lap times table (for detailed FastF1 data)
CREATE TABLE public.lap_times (
  id SERIAL PRIMARY KEY,
  race_id VARCHAR(50) REFERENCES public.races(race_id),
  driver_id VARCHAR(50) REFERENCES public.drivers(driver_id),
  lap INTEGER,
  position INTEGER,
  time_text VARCHAR(20),
  milliseconds BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Weather data table
CREATE TABLE public.weather_data (
  id SERIAL PRIMARY KEY,
  race_id VARCHAR(50) REFERENCES public.races(race_id),
  air_temp DECIMAL(5,2),
  humidity DECIMAL(5,2),
  pressure DECIMAL(7,2),
  rainfall BOOLEAN DEFAULT FALSE,
  track_temp DECIMAL(5,2),
  wind_direction DECIMAL(5,2),
  wind_speed DECIMAL(5,2),
  session_type VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_races_season ON public.races(season);
CREATE INDEX idx_race_results_race_id ON public.race_results(race_id);
CREATE INDEX idx_qualifying_results_race_id ON public.qualifying_results(race_id);
CREATE INDEX idx_lap_times_race_id ON public.lap_times(race_id);
CREATE INDEX idx_driver_standings_race_id ON public.driver_standings(race_id);
CREATE INDEX idx_constructor_standings_race_id ON public.constructor_standings(race_id);

-- Enable Row Level Security (RLS) - making tables publicly readable for now
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circuits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.races ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.race_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualifying_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constructor_standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lap_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON public.seasons FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.circuits FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.constructors FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.drivers FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.races FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.race_results FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.qualifying_results FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.driver_standings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.constructor_standings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.lap_times FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.weather_data FOR SELECT USING (true);
