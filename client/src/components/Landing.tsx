import React, { useEffect, useState } from 'react';
import store from "../redux/store";
import { getToken, getUser } from "../services/api/auth/AuthService";
import { setAuthToken } from "../services/api/axiosInstance";
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import InventoryDashboard from './component/InventoryDashboard';
import LoginFromInv from './component/LoginFromInv';
import { Dashboard } from './component/dashboard';

interface userInfo {
  id: number | undefined;
  username: string | undefined;
}

const Landing: React.FC = () => {
  const [glitchText, setGlitchText] = useState("Delightful events");
  const [isGlitching, setIsGlitching] = useState(true);
  const glitchDuration = 300; // Duration for glitch effect in milliseconds

  const [user, setUser] = useState<userInfo>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await store.dispatch(getToken);
        setAuthToken(token);

        const user = await getUser();
        console.log("User:", user?.id);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (isGlitching) {
      const glitchInterval = setInterval(() => {
        const glitched = glitchText.split('').map(char =>
          Math.random() > 0.9 ? String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 5)) : char
        ).join('');
        setGlitchText(glitched);
      }, 100);

      const stopGlitchTimeout = setTimeout(() => {
        clearInterval(glitchInterval);
        setIsGlitching(false); 
        setGlitchText("Delightful events"); 
      }, glitchDuration);

      return () => {
        clearInterval(glitchInterval);
        clearTimeout(stopGlitchTimeout);
      };
    }
  }, [isGlitching, glitchText, glitchDuration]);

  return (
    <>
      <div className="min-h-screen text-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 overflow-hidden">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl sm:text-3xl md:text-4xl font-light tracking-wider text-gray-400">NexEvent</h1>
            <pre className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight whitespace-pre-wrap break-words">
              {isGlitching ? glitchText : "Delightful events"} 
            </pre>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto md:mx-0">
              Set up an event page, invite friends and sell tickets. Host a memorable event today.
            </p>
            <div className="py-2">
              <Link to="/signup">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Create Your First Event
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative flex justify-center items-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-900 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-700 opacity-75"></div>
              <img
                src="https://th.bing.com/th/id/OIP.Otr8MV-QgqrZ1afOE6ryAwAAAA?w=290&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Event App Interface"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-4 border-white rounded-3xl transform rotate-12 animate-float"></div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-12 h-12 bg-pink-400 rounded-lg opacity-75 animate-float-slow"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`, 
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float-slow {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }

          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite; /* Adjust duration here */
          }
        `}</style>
      </div>
     
    </>
  );
};

export default Landing;