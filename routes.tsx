import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Dashboard from "./components/Dashboard";
import CropRecommendation from "./components/CropRecommendation";
import FertilizerAdvisory from "./components/FertilizerAdvisory";
import DiseaseDetection from "./components/DiseaseDetection";
import WeatherForecast from "./components/WeatherForecast";
import MarketPrices from "./components/MarketPrices";
import IrrigationAdvisory from "./components/IrrigationAdvisory";
import GovernmentSchemes from "./components/GovernmentSchemes";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "dashboard", Component: Dashboard },
      { path: "crop-recommendation", Component: CropRecommendation },
      { path: "fertilizer", Component: FertilizerAdvisory },
      { path: "disease-detection", Component: DiseaseDetection },
      { path: "weather", Component: WeatherForecast },
      { path: "market-prices", Component: MarketPrices },
      { path: "irrigation", Component: IrrigationAdvisory },
      { path: "schemes", Component: GovernmentSchemes },
      { path: "admin", Component: AdminPanel },
      { path: "*", Component: NotFound },
    ],
  },
]);
