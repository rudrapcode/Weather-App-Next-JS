import { FaWind, FaTint, FaArrowUp, FaArrowDown, FaCloudSun, FaEye, FaTachometerAlt } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";

interface WeatherDetailsProps {
  data: {
    current?: {
      wind_mph: number;
      humidity: number;
      wind_dir: string;
      pressure_mb: number;
      feelslike_f: number;
      vis_km: number;
    };
    forecast?: {
      forecastday: {
        astro: {
          sunrise: string;
          sunset: string;
        };
      }[];
    };
  };
}

const getWindDirectionAnimation = (direction: string) => {
  switch (direction) {
    case 'N':
      return 'animate-wind-north';
    case 'E':
      return 'animate-wind-east';
    case 'S':
      return 'animate-wind-south';
    case 'W':
      return 'animate-wind-west';
    default:
      return '';
  }
};

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  if (!data.current) {
    return null;
  }

  return (
    <div className="p-12 animate-fade-in">
      <h1 className="mb-4 text-2xl text-white italic font-bold">Weather Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center italic font-normal">
        {[
          { label: "Wind Speed", value: `${data.current.wind_mph} mph`, aria: `Wind Speed: ${data.current.wind_mph} mph`, icon: <FaWind className={`text-5xl text-white ${data.current.wind_mph ? 'animate-wind' : ''}`} /> },
          { label: "Humidity", value: `${data.current.humidity}%`, aria: `Humidity: ${data.current.humidity}%`, icon: <FaTint className="text-5xl text-white animate-fade" /> },
          { label: "Wind Direction", value: data.current.wind_dir, aria: `Wind Direction: ${data.current.wind_dir}`, icon: <FaArrowUp className={`text-5xl text-white ${getWindDirectionAnimation(data.current.wind_dir)}`} /> },
          { label: "Sunrise", value: data.forecast?.forecastday[0]?.astro.sunrise, aria: `Sunrise: ${data.forecast?.forecastday[0]?.astro.sunrise}`, icon: <IoIosSunny className="text-5xl text-white animate-sunrise" /> },
          { label: "Sunset", value: data.forecast?.forecastday[0]?.astro.sunset, aria: `Sunset: ${data.forecast?.forecastday[0]?.astro.sunset}`, icon: <IoIosSunny className="text-5xl text-white animate-sunset" /> },
          { label: "Air Pressure", value: `${data.current.pressure_mb} hPa`, aria: `Air Pressure: ${data.current.pressure_mb} hPa`, icon: <FaTachometerAlt className="text-5xl text-white animate-fade" /> },
          { label: "Feels Like", value: `${data.current.feelslike_f}°`, aria: `Feels Like: ${data.current.feelslike_f}°`, icon: <FaCloudSun className="text-5xl text-white animate-fade" /> },
          { label: "Visibility", value: `${data.current.vis_km} km`, aria: `Visibility: ${data.current.vis_km} km`, icon: <FaEye className="text-5xl text-white animate-fade" /> },
        ].map((detail, index) => (
          <div key={index} className="bg-white/50 flex p-4 items-center justify-center gap-6 rounded-xl transform transition-transform hover:scale-105 hover:bg-white/60">
            <div className="flex items-center gap-4">
              <div className="text-5xl flex-shrink-0">
                {detail.icon}
              </div>
              <div className="text-xl">
                <h3>{detail.label}</h3>
                <h3 className="text-white bg-black/25 rounded-xl mt-1 px-2" aria-label={detail.aria}>
                  {detail.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

<style jsx>{`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes wind {
    0% { transform: translateX(-10%); }
    50% { transform: translateX(10%); }
    100% { transform: translateX(-10%); }
  }

  @keyframes sunrise {
    0% { transform: translateY(-10%); opacity: 0.5; }
    50% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-10%); opacity: 0.5; }
  }

  @keyframes sunset {
    0% { transform: translateY(10%); opacity: 0.5; }
    50% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(10%); opacity: 0.5; }
  }

  @keyframes wind-north {
    0% { transform: rotate(0); }
    100% { transform: rotate(180deg); }
  }

  @keyframes wind-east {
    0% { transform: rotate(90deg); }
    100% { transform: rotate(270deg); }
  }

  @keyframes wind-south {
    0% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes wind-west {
    0% { transform: rotate(270deg); }
    100% { transform: rotate(450deg); }
  }

  .animate-fade-in {
    animation: fade-in 1s ease-in-out;
  }

  .animate-wind {
    animation: wind 2s ease-in-out infinite;
  }

  .animate-sunrise {
    animation: sunrise 2s ease-in-out infinite;
  }

  .animate-sunset {
    animation: sunset 2s ease-in-out infinite;
  }

  .animate-wind-north {
    animation: wind-north 2s ease-in-out infinite;
  }

  .animate-wind-east {
    animation: wind-east 2s ease-in-out infinite;
  }

  .animate-wind-south {
    animation: wind-south 2s ease-in-out infinite;
  }

  .animate-wind-west {
    animation: wind-west 2s ease-in-out infinite;
  }
`}</style>

export default WeatherDetails;
