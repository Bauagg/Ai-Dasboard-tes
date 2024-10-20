import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { BarElement } from "chart.js";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Navbar from "./Navbar";
import axios from "axios";

// Register the required components with ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [selectedTopic, setSelectedTopic] = useState("CROWN PRINCE");
  const [dataSentimen, setdataSentimen] = useState([])
  const [mediaMentionsData, setMediaMentionsData] = useState(null);
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  // Handle topic change
  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  useEffect(() => {
    axios.get('https://ai.oigetit.com/AI71/Histogram?json={"TanggalMulai":"%2001-09-2024","TanggalAkhir":"01-10-2024%20","Permintaan":"UEA"}')
      .then((result) => {
        console.log(result.data)
        setdataSentimen(result.data)
        // Extract data for labels and datasets from API response
        const labels = result.data.map((item) => item.pubdate);
        const volumeData = result.data.map((item) => item.volume);

        // Set the media mentions data
        setMediaMentionsData({
          labels,
          datasets: [
            {
              label: 'Mentions',
              data: volumeData,
              backgroundColor: '#4473FFCC',
              borderColor: '#4473FFCC',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => console.log(err))
  }, [])

  // Convert dataSentimen to a format Chart.js can use
  const chartLabels = dataSentimen.map(item => item.pubdate);  // Extract pubdates
  const chartDataPositive = dataSentimen.map(item => item.volume_pos);  // Extract positive volumes
  const chartDataNeutral = dataSentimen.map(item => item.volume_neu);  // Extract neutral volumes
  const chartDataNegative = dataSentimen.map(item => item.volume_neg);  // Extract negative volumes

  // Data for the Sentiment in Real-Time chart
  const data = {
    labels: chartLabels,  // Dynamic labels
    datasets: [
      {
        label: "Positive",
        data: chartDataPositive,
        borderColor: "green",
        fill: false,
      },
      {
        label: "Neutral",
        data: chartDataNeutral,
        borderColor: "orange",
        fill: false,
      },
      {
        label: "Negative",
        data: chartDataNegative,
        borderColor: "red",
        fill: false,
      },
    ],
  };

  // Chart options with dynamic tooltip
  const mediaMentionsOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date', // Label for x-axis
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Volume', // Label for y-axis
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const data = mediaMentionsData.datasets[0].data[index];
            const sentimentInfo = dataSentimen[index]; // Get sentiment data

            // Format tooltip with sentiment details
            return `Volume: ${data}
Positive: ${sentimentInfo.volume_pos}
Negative: ${sentimentInfo.volume_neg}
Neutral: ${sentimentInfo.volume_neu}
Sentiment: ${sentimentInfo.sentiment.toFixed(2)}`;
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
            {mediaMentionsData ? (
              <Bar data={mediaMentionsData} options={mediaMentionsOptions} />
            ) : (
              <p>Loading</p>
            )
            }
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
