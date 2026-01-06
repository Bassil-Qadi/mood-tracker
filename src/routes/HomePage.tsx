import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { useAuth } from "../context/authContext";
import Dropdown from "../components/UI/Dropdown";
import Modal from "../components/UI/Modal";
import moment from "moment";
import { useState, useEffect, useMemo } from "react";
import LogMoodForm from "../components/main/LogMoodForm";
import UpdateProfileForm from "../components/main/UpdateProfileForm";
import { userModeAPI } from "../utils/api";
import { toast } from "react-toastify";
import Chart from "../components/UI/Chart";
import DailyUserMood from "../components/main/DailuUserMood";
import iconVerySadColor from "../assets/images/icon-very-sad-white.svg";
import iconSadColor from "../assets/images/icon-sad-white.svg";
import iconNeutralColor from "../assets/images/icon-neutral-white.svg";
import iconHappyColor from "../assets/images/icon-happy-white.svg";
import iconVeryHappyColor from "../assets/images/icon-very-happy-white.svg";
import iconSleep from '../assets/images/icon-sleep.svg';

const moodIconMap = {
  "1": iconVerySadColor,
  "2": iconSadColor,
  "3": iconNeutralColor,
  "4": iconHappyColor,
  "5": iconVeryHappyColor,
};

const moodMap = {
  "1": "Very Sad",
  "2": "Sad",
  "3": "Neutral",
  "4": "Happy",
  "5": "Very Happy",
};

const moodColorMap = {
  "1": "#FF9B99",
  "2": "#B8B1FF",
  "3": "#89CAFF",
  "4": "#89E780",
  "5": "#FFC97C",
};

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasUserSubmittedData, setHasUserSubmittedData] = useState(false);
  const [userModeData, setUserModeData] = useState<any>(null);
  const [averageMood, setAverageMood] = useState(0);
  const [averageSleep, setAverageSleep] = useState(0);  
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);


  // Map sleep hour ranges to numeric values for Y-axis
  const sleepRangeToValue = (sleepHours: string): number => {
    switch (sleepHours) {
      case "0 - 2":
        return 1;
      case "3 - 4":
        return 2;
      case "5 - 6":
        return 3;
      case "7 - 8":
        return 4;
      case "+9":
        return 5;
      default:
        return 0;
    }
  };

  // Map numeric values back to sleep hour ranges for Y-axis labels
  const valueToSleepRange = (value: number): string => {
    switch (value) {
      case 1:
        return "0 - 2";
      case 2:
        return "3 - 4";
      case 3:
        return "5 - 6";
      case 4:
        return "7 - 8";
      case 5:
        return "+9";
      default:
        return "";
    }
  };

  // Map sleep hour ranges to colors
  const sleepRangeToColor = (sleepHours: string): string => {
    switch (sleepHours) {
      case "0 - 2":
        return "#ec4899"; // pink
      case "3 - 4":
        return "#a855f7"; // purple
      case "5 - 6":
        return "#3b82f6"; // blue
      case "7 - 8":
        return "#22c55e"; // green
      case "+9":
        return "#eab308"; // yellow
      default:
        return "#6b7280"; // gray (fallback)
    }
  };

  // Transform userModeData for chart
  const { chartSeries, chartOptions } = useMemo(() => {
    if (!userModeData || !Array.isArray(userModeData) || userModeData.length === 0) {
      return {
        chartSeries: [
          {
            name: "Sleep Hours",
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            id: "sleep-chart",
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 12,
              borderRadiusApplication: "around"
            }
          },
          xaxis: {
            categories: [],
          },
          yaxis: {
            min: 1,
            max: 5,
            tickAmount: 4,
            forceNiceScale: false,
            labels: {
              formatter: (value: number) => {
                const rounded = Math.round(value);
                if (rounded >= 1 && rounded <= 5) {
                  return valueToSleepRange(rounded);
                }
                return "";
              },
            },
          },
          grid: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
        },
      };
    }

    // Sort data by date
    const sortedData = [...userModeData].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Extract dates and sleep hour values
    const categories = sortedData.map((item) => moment(item.date).format("MMM DD"));
    const sleepData = sortedData.map((item) => sleepRangeToValue(item.sleepHours));
    const colors = sortedData.map((item) => sleepRangeToColor(item.sleepHours));

    return {
      chartSeries: [
        {
          name: "Sleep Hours",
          data: sleepData,
        },
      ],
      chartOptions: {
        chart: {
          id: "sleep-chart",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          min: 1,
          max: 5,
          tickAmount: 4,
          forceNiceScale: false,
          labels: {
            formatter: (value: number) => {
              const rounded = Math.round(value);
              if (rounded >= 1 && rounded <= 5) {
                return valueToSleepRange(rounded);
              }
              return "";
            },
          },
        },
        grid: {
          show: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 12,
            borderRadiusApplication: "around",
            distributed: true,
          },
        },
        colors: colors,
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
      },
    };
  }, [userModeData]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSettingsModalOpen = () => {
    setIsSettingsModalOpen(true);
  }

  const handleSettingsModalClose = () => {
    setIsSettingsModalOpen(false);
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSubmit = async (moodData: any) => {
    const result = await userModeAPI.createUserMode({ userId: user?.id, ...moodData });
    if (result.success) {
      setHasUserSubmittedData(true);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    handleModalClose();
    getUserModeData();
  };

  const getUserModeData = async () => {
    const result = await userModeAPI.getUserMode(user?.id || '');
    if (result.success) {
      const lastItem = (result.data as any[])[(result.data as any[]).length - 1];
      if (moment(lastItem.date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
        setHasUserSubmittedData(true);
      } else {
        setHasUserSubmittedData(false);
      }
      setUserModeData(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const calculateAverageMood = () => {
    if (!userModeData || userModeData.length === 0) return;
    const lastFive = userModeData.slice(-5);
    const averageMood = lastFive.reduce((acc: number, curr: any) => acc + Number(curr.overallMood), 0) / lastFive.length;
    setAverageMood(Math.round(averageMood));
  }

  const calculateAverageSleep = () => {
    if (!userModeData || userModeData.length === 0) return;
    const lastFive = userModeData.slice(-5);
    // Convert sleep hour ranges to numeric values, calculate average, then convert back
    const sleepValues = lastFive.map((item: any) => sleepRangeToValue(item.sleepHours));
    const averageSleepValue = sleepValues.reduce((acc: number, curr: number) => acc + curr, 0) / sleepValues.length;
    setAverageSleep(averageSleepValue);
  }

  useEffect(() => {
    if (user?.id) {
      getUserModeData();
    }
  }, [user?.id]);

  useEffect(() => {
    if (userModeData && userModeData.length > 0) {
      calculateAverageMood();
      calculateAverageSleep();
    }
  }, [userModeData]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <LogMoodForm onSubmit={handleSubmit} />
      </Modal>
      <Modal isOpen={isSettingsModalOpen} onClose={handleSettingsModalClose}>
          <UpdateProfileForm />
      </Modal>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <img src={logo} alt="logo" />
              </div>
              <div className="flex gap-4">
                {!user && (
                  <div>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                {user && (
                  <Dropdown
                    user={{
                      name: user.name || "",
                      email: user.email || "",
                      profileImage: user.profileImage || "",
                    }}
                    onLogout={handleLogout}
                    onSettings={handleSettingsModalOpen}
                  />
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <p className="mt-3 max-w-md font-bold mx-auto text-base text-indigo-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Hello, {user?.name}!
            </p>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl my-4">
              How are you feeling today?
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-semibold">
              {moment().format("dddd, MMMM Do, YYYY")}
            </p>
          </div>

          {/* Features Section */}
          { !hasUserSubmittedData && <div className="mt-16 mb-8">
            <div className="flex justify-center">
              <button
                className="bg-indigo-600 text-white px-6 py-4 rounded-lg text-lg font-semibold"
                onClick={handleModalOpen}
              >
                Log today's mood
              </button>
            </div>
          </div>}

          { hasUserSubmittedData && <DailyUserMood userModeData={userModeData.slice(-1)[0]} /> }

          {/* Mood History Section */}
        {userModeData && userModeData?.length < 5 && <div className="mt-12 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 w-full bg-white rounded-lg shadow-sm p-6">
            {/* Left column content */}
           <div className="flex flex-col gap-2 mb-8">
           <h3 className="text-lg font-semibold mb-2">Average Mood <small className="text-sm text-gray-500">(Last 5 Check-ins)</small></h3>
            <div className="flex items-start justify-between flex-col gap-2 bg-indigo-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold">Keep tracking!</h2>
                <h6 className="text-sm text-gray-500">Log 5 check-ins to see your average mood.</h6>
            </div>
           </div>
           <div className="flex flex-col gap-2">
           <h3 className="text-lg font-semibold mb-2">Average Sleep <small className="text-sm text-gray-500">(Last 5 Check-ins)</small></h3>
            <div className="flex items-start justify-between flex-col gap-2 bg-indigo-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold">Not enough data yet!</h2>
                <h6 className="text-sm text-gray-500">Track 5 nights to view average sleep.</h6>
            </div>
           </div>
          </div>
          <div className="md:w-2/3 w-full bg-white rounded-lg shadow-sm p-6">
            {/* Right column content */}
            <h3 className="text-3xl font-semibold mb-2">Mood and sleep trends</h3>
            <Chart data={chartSeries} options={chartOptions} />
          </div>
        </div>}
        {userModeData && userModeData?.length > 4 && <div className="mt-12 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 w-full bg-white rounded-lg shadow-sm p-6">
            {/* Left column content */}
           <div className="flex flex-col gap-2 mb-8">
           <h3 className="text-lg font-semibold mb-2">Average Mood <small className="text-sm text-gray-500">(Last 5 Check-ins)</small></h3>
            <div 
              className="flex items-start justify-between flex-col gap-2 p-8 rounded-xl"
              style={{ backgroundColor: moodColorMap[averageMood as unknown as keyof typeof moodColorMap] }}
            >
              <div className="flex items-center gap-4 mb-2">
                <img src={moodIconMap[averageMood as unknown as keyof typeof moodIconMap]} alt={moodMap[averageMood as unknown as keyof typeof moodMap]} className="w-6 h-6" />
                <h2 className="text-2xl font-bold">{moodMap[averageMood as unknown as keyof typeof moodMap]}</h2>
              </div>
                <h6 className="text-sm">Log 5 check-ins to see your average mood.</h6>
            </div>
           </div>
           <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold mb-2">Average Sleep <small className="text-sm text-gray-500">(Last 5 Check-ins)</small></h3>
              <div className="flex items-start justify-between flex-col gap-2 bg-indigo-500 p-8 rounded-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <img src={iconSleep} alt="Sleep" className="w-6 h-6" />
                    <h2 className="text-2xl font-bold text-white">{averageSleep} Hours</h2>
                  </div>
                  <h6 className="text-sm text-gray-200">Track 5 nights to view average sleep.</h6>
              </div>
           </div>
          </div>
          <div className="md:w-2/3 w-full bg-white rounded-lg shadow-sm p-6">
            {/* Right column content */}
            <h3 className="text-3xl font-semibold mb-2">Mood and sleep trends</h3>
            <Chart data={chartSeries} options={chartOptions} />
          </div>
        </div>}
        </main>
      </div>
    </>
  );
}

export default HomePage;

