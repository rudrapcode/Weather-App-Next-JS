import React, { useState } from 'react';
import Slider from 'react-slick';

interface DayForecast {
  date: string;
  day: {
    condition: {
      icon: string;
      text: string;
    };
    maxtemp_f: number;
    mintemp_f: number;
  };
  hour?: HourForecast[]; // Include hourly forecast
}

interface HourForecast {
  time: string;
  temp_f: number;
  condition: {
    icon: string;
    text: string;
  };
}

interface WeekForecastProps {
  data: {
    forecast?: {
      forecastday: DayForecast[];
    };
  };
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const HourlyForecast = ({ hours }: { hours?: HourForecast[] }) => {
  if (!hours) return null;

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-2">Hourly Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {hours.map((hour, index) => (
          <div
            key={index}
            className="bg-white/40 p-2 text-center rounded-lg flex flex-col items-center font-semibold"
          >
            <p className="text-sm">{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <img className="w-10 h-10" src={hour.condition.icon} alt={hour.condition.text} />
            <p className="text-xl">{hour.temp_f.toFixed()}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeekForecast = ({ data }: WeekForecastProps) => {
  const [selectedDay, setSelectedDay] = useState<DayForecast | null>(null);

  if (!data.forecast) {
    return null;
  }

  const todayIndex = data.forecast.forecastday.findIndex(day =>
    new Date(day.date).toDateString() === new Date().toDateString()
  );

  const validTodayIndex = todayIndex >= 0 ? todayIndex : 0;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    initialSlide: validTodayIndex,
    beforeChange: (current: number, next: number) => {
      if (next < validTodayIndex) {
        return false;
      }
    },
  };

  const handleDayClick = (day: DayForecast) => {
    // Update the state to show hourly forecast for the selected day
    setSelectedDay(day);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Slider {...settings}>
        {data.forecast.forecastday.map((day, index) => (
          <div
            key={index}
            className="bg-white/40 p-4 text-center rounded-lg flex flex-col items-center font-semibold gap-4 transform transition-transform hover:scale-105 cursor-pointer"
            role="group"
            aria-label={`Forecast for ${formatDate(day.date)}`}
            onClick={() => handleDayClick(day)}
          >
            <p className="text-xl">{formatDate(day.date)}</p>
            <img
              className="w-14 h-14"
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              aria-label={day.day.condition.text}
            />
            <div>
              <p className="bg-black/25 px-2 py-1 rounded-xl text-white mb-2">
                High:{" "}
                <span aria-label={`Maximum temperature: ${day.day.maxtemp_f.toFixed()} degrees Fahrenheit`}>
                  {day.day.maxtemp_f.toFixed()}°
                </span>
              </p>
              <p className="bg-black/25 px-2 py-1 rounded-xl text-white">
                Low:{" "}
                <span aria-label={`Minimum temperature: ${day.day.mintemp_f.toFixed()} degrees Fahrenheit`}>
                  {day.day.mintemp_f.toFixed()}°
                </span>
              </p>
            </div>
          </div>
        ))}
      </Slider>
      {selectedDay && <HourlyForecast hours={selectedDay.hour} />}
    </div>
  );
};

export default WeekForecast;
