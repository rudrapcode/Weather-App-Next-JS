"use client";
import React, { useState, KeyboardEvent } from "react";
import Input from "./component/Input";
import Current from "./component/Current";
import WeatherDetails from "./component/WeatherDetails";
import WeekForecast from "./component/WeekForecast";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const getBackgroundGradient = (condition: string) => {
  switch (condition) {
    case 'Sunny':
      return 'bg-gradient-to-r from-[#fdc830] to-[#fc4a1a]'; // Orange to Yellow
    case 'Partly Cloudy':
      return 'bg-gradient-to-r from-[#fdc830] to-[#fc4a1a] to-[#d1d1d1]'; // Orange, Yellow, and Grey
    case 'Cloudy':
      return 'bg-gradient-to-r from-[#b0bec5] to-[#cfd8dc]'; // Grey and Blueish
    case 'Rain':
      return 'bg-gradient-to-r from-[#f7b733] to-[#fc4a1a]'; // Yellow and Dark Blue for Rain and Sun
    default:
      return 'bg-gradient-to-r from-[#2980b9] to-[#6dd5fa]'; // Default gradient
  }
};





const Home = () => {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string>("");

  const url = `http://api.weatherapi.com/v1/forecast.json?key=754b4100489d4abe886123158241907&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("City not found");
        setData({});
      }
    }
  };

  // Determine background gradient based on weather condition
  const weatherCondition = data.current?.condition?.text || '';
  const backgroundGradient = getBackgroundGradient(weatherCondition);

  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <div className="text-center mt-20 text-white">
        <h2 className="text-4xl">Welcome to the Weather App</h2>
        <p className="text-xl">Enter a city to get started</p>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div className="text-center mt-20 text-red-500">
        <p className="text-2xl">City Not Found</p>
        <p className="text-lg">Please enter a valid city</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Current data={data} />
          </div>
          <div className="flex-1">
            <WeekForecast data={data} />
          </div>
        </div>
        <div className="mt-10">
          <WeatherDetails data={data} />
        </div>
      </>
    );
  }

  return (
    <div className={`${backgroundGradient} min-h-screen flex flex-col items-center justify-between font-roboto`}>
      <main className="w-full max-w-screen-xl p-6 mt-8 bg-white/25 rounded-xl shadow-lg flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-start justify-between w-full mb-6">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="text-white text-3xl font-bold italic ml-4">Weather App</h1>
        </div>
        {content}
      </main>
      <footer className="bg-gray-800 text-white text-center py-2 w-full">
        <p className="font-light text-sm">By Rudra Patel</p>
      </footer>
    </div>
  );
};

export default Home;
