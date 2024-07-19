import { getCurrentDate } from "../util/currentDate";
import { FaMapMarkerAlt } from "react-icons/fa";

interface CurrentProps {
  data: {
    current?: {
      condition: {
        icon: string;
        text: string;
      };
      temp_f: number;
    };
    location?: {
      name: string;
      region: string;
    };
  };
}

const Current = ({ data }: CurrentProps) => {
  const weatherIcon = data.current?.condition.icon || null;
  const currentDate = getCurrentDate();

  return (
    <div className="flex flex-col mb-8 md:mb-0 items-start gap-2 bg-black/25 p-6 rounded-xl animate-fade-in">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl text-white">Today</h1>
          <p className="text-white">{currentDate}</p>
        </div>
        {weatherIcon && (
          <div className="animate-pulse">
            <img className="w-[50px] object-cover" src={weatherIcon} alt="Weather Icon" />
          </div>
        )}
      </div>
      <div className="flex flex-col items-start">
        {data.current && (
          <>
            <p className="text-5xl text-white">
              {data.current.temp_f.toFixed()}
              <span>°</span>
            </p>
            <span className="text-white text-lg">{data.current.condition.text}</span>
          </>
        )}
      </div>
      <div className="flex items-center text-black bg-white/90 px-4 py-2 rounded-xl mt-4 animate-slide-in">
        {data.location && (
          <>
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {data.location.name}, {data.location.region}
            </span>
          </>
        )}
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

  @keyframes slide-in {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fade-in 1s ease-in-out;
  }

  .animate-slide-in {
    animation: slide-in 1s ease-in-out;
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`}</style>


export default Current;
