import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { BarElement } from "chart.js";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Navbar from "./Navbar";

// Register the required components with ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [selectedTopic, setSelectedTopic] = useState("CROWN PRINCE");
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  // Handle topic change
  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  // Data for the charts
  const data = {
    labels: ["April", "May", "June", "July", "August", "September"],
    datasets: [
      {
        label: "Positive",
        data: [60, 50, 55, 70, 85, 90],
        borderColor: "green",
        fill: false,
      },
      {
        label: "Neutral",
        data: [30, 25, 40, 50, 60, 70],
        borderColor: "orange",
        fill: false,
      },
      {
        label: "Negative",
        data: [10, 15, 20, 15, 10, 5],
        borderColor: "red",
        fill: false,
      },
    ],
  };

  // Data untuk Media Mentions
  const mediaMentionsData = {
    labels: ["8/21", "8/31", "9/10", "9/20"], // Label untuk x-axis (Weeks)
    datasets: [
      {
        label: "Mentions",
        data: [50, 80, 100, 90], // Data volume untuk tiap bar
        backgroundColor: "#4473FFCC",
        borderColor: "#4473FFCC",
        borderWidth: 1,
      },
    ],
  };

  const mediaMentionsOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Weeks", // Label untuk x-axis
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Volume", // Label untuk y-axis
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          // Fungsi untuk menampilkan detail tooltip
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const volume = tooltipItem.raw;
            // Data sentiment untuk tiap bar (disimulasikan)
            const sentimentData = [
              { positive: 30, negative: 10, neutral: 10, sentiment: "Negative" },
              { positive: 60, negative: 10, neutral: 10, sentiment: "Positive" },
              { positive: 75, negative: 15, neutral: 10, sentiment: "Positive" },
              { positive: 55, negative: 20, neutral: 15, sentiment: "Positive" },
            ];
            const data = sentimentData[index];
            // Mengembalikan data yang akan muncul di tooltip
            return `Volume: ${volume}\nPositive: ${data.positive}\nNegative: ${data.negative}\nNeutral: ${data.neutral}\nSentiment: ${data.sentiment}`;
          },
        },
      },
    },
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="p-8 bg-gray-100">
        {/* Dashboard Header */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-4 ">
            <span className="text-lg">Topics:</span>
            <button className={`py-1 px-3 rounded-lg  ${selectedTopic === "CROWN PRINCE" ? "bg-[#0FA7E6] text-white" : "text-black"}`} onClick={() => handleTopicChange("CROWN PRINCE")}>
              CROWN PRINCE
            </button>
            <button className={`py-1 px-3 rounded-lg  ${selectedTopic === "FALCON LLM" ? "bg-[#0FA7E6] text-white" : "text-black"}`} onClick={() => handleTopicChange("FALCON LLM")}>
              FALCON LLM
            </button>
            <button className={`py-1 px-3 rounded-lg ${selectedTopic === "UAE LEADERSHIP" ? "bg-[#0FA7E6] text-white" : "text-black"}`} onClick={() => handleTopicChange("UAE LEADERSHIP")}>
              UAE LEADERSHIP
            </button>
            <button className={`py-1 px-3 rounded-lg  ${selectedTopic === "ATRC" ? "bg-[#0FA7E6] text-white" : "text-black"}`} onClick={() => handleTopicChange("ATRC")}>
              ATRC
            </button>
            <button className={`py-1 px-3 rounded-lg ${selectedTopic === "COP 28" ? "bg-[#0FA7E6] text-white" : "text-black"}`} onClick={() => handleTopicChange("COP 28")}>
              COP 28
            </button>
          </div>
        </div>

        <div className="my-5">
          <h1 className="text-3xl font-bold text-[#0FA7E6]">Falcon AI Dashboard</h1>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <div className="bg-white shadow-md p-4 rounded-lg w-full">
            <h2 className="text-xl font-semibold">Sentiment in Real-Time</h2>
            <Line data={data} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 w-full">
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Media Mentions</h2>
            <Bar data={mediaMentionsData} options={mediaMentionsOptions} /> {/* Ganti Line dengan Bar */}
          </div>
        </div>

        {/* Additional Charts and Maps */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Trustworthy News Score</h2>
            <Line
              data={{
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                datasets: [
                  {
                    label: "Trustworthy %",
                    data: [80, 70, 85, 90, 75, 60, 85],
                    borderColor: "#0FA7E6",
                    fill: false,
                  },
                ],
              }}
            />
          </div>

          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Reputation Map</h2>
            <ComposableMap>
              <Geographies geography={geoUrl}>{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF" />)}</Geographies>
            </ComposableMap>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
