import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { BarElement } from "chart.js";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Menu from "../assets/menu.png";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geoJsonData from "../geoJson/custom.geo.json";

// Register the required components with ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [selectedTopic, setSelectedTopic] = useState("CROWN PRINCE");
  const [dataSentimen, setdataSentimen] = useState([]);
  const [mediaMentionsData, setMediaMentionsData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Untuk mengelola state dari hamburger menu
  const [dataCountry, setDataCountry] = useState([])
  const [trustworthyData, setTrustworthyData] = useState(null);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu
  };

  // Handle topic change
  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  useEffect(() => {
    axios
      .get('https://ai.oigetit.com/AI71/Histogram?json={"TanggalMulai":"%2001-09-2024","TanggalAkhir":"01-10-2024%20","Permintaan":"UEA"}')
      .then((result) => {
        console.log(result.data);
        setdataSentimen(result.data);
        // Extract data for labels and datasets from API response
        const labels = result.data.map((item) => item.pubdate);
        const volumeData = result.data.map((item) => item.volume);

        // Set the media mentions data
        setMediaMentionsData({
          labels,
          datasets: [
            {
              label: "Mentions",
              data: volumeData,
              backgroundColor: "#4473FFCC",
              borderColor: "#4473FFCC",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // Convert dataSentimen to a format Chart.js can use
  const chartLabels = dataSentimen.map((item) => item.pubdate); // Extract pubdates
  const chartDataPositive = dataSentimen.map((item) => item.volume_pos); // Extract positive volumes
  const chartDataNeutral = dataSentimen.map((item) => item.volume_neu); // Extract neutral volumes
  const chartDataNegative = dataSentimen.map((item) => item.volume_neg); // Extract negative volumes

  // Data for the Sentiment in Real-Time chart
  const data = {
    labels: chartLabels, // Dynamic labels
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
          text: "Date", // Label for x-axis
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Volume", // Label for y-axis
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

  useEffect(() => {
    axios.get('https://ai.oigetit.com/AI71/Country?json=%7B')
      .then((result) => {
        // Extract data for trustworthy chart
        const countries = result.data;
        const labels = countries.map(country => country.country);
        const data = countries.map(country => country.sentiment); // Use sentiment for the score

        setTrustworthyData({
          labels,
          datasets: [
            {
              label: "Trustworthy %", // Name of the dataset
              data: data, // Use sentiment data
              borderColor: "#0FA7E6",
              fill: false,
            },
          ],
        });

        setDataCountry(countries)
      })
      .catch((err) => console.log(err))
  }, [])

  const getColorBySentiment = (sentiment) => {
    if (sentiment >= 1) return 'green';  // Sentiment positif
    if (sentiment < 0) return 'red';    // Sentiment negatif
    return 'yellow';                    // Sentiment netral
  };

  // Komponen untuk mewarnai GeoJSON
  const style = (feature) => {
    const countryData = dataCountry.find(item => item.country === feature.properties.iso_a2);
    const color = countryData ? getColorBySentiment(countryData.sentiment) : 'gray'; // Warna default untuk negara lainnya
    return {
      fillColor: color,
      weight: 1,
      color: 'white',
      fillOpacity: 1,
    };
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="p-8 bg-gray-100">
        {/* Dashboard Header */}
        <div className="flex items-center  mb-4 gap-72 ">
          {/* Hamburger Menu */}
          <div className="">
            <button className="text-black focus:outline-none" onClick={handleHamburgerClick}>
              {/* Hamburger icon */}
              <img src={Menu} alt=""></img>
            </button>
            {/* Menu yang muncul saat hamburger diklik */}
            {isMenuOpen && (
              <div className="absolute top-10 left-0 w-full bg-white shadow-md">
                <Link to="/data">
                  <button className="block w-full text-left py-2 px-4 text-black hover:bg-gray-200">Data</button>
                </Link>

                <Link to="/artikel">
                  <button className="block w-full text-left py-2 px-4 text-black hover:bg-gray-200">Artikel</button>
                </Link>
              </div>
            )}
          </div>
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

        <div className=" mb-8 w-full">
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Media Mentions</h2>
            {mediaMentionsData ? <Bar data={mediaMentionsData} options={mediaMentionsOptions} /> : <p>Loading</p>}
          </div>
        </div>

        {/* Additional Charts and Maps */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Trustworthy News Score</h2>
            {trustworthyData && ( // Check if trustworthyData is available before rendering
              <Line data={trustworthyData} />
            )}
          </div>

          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Reputation Map</h2>
            <div className="bg-white p-4  mt-5">
              <MapContainer center={[20, 0]} zoom={2} style={{ height: '50vh', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {geoJsonData && (
                  <GeoJSON data={geoJsonData} style={style} />
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
