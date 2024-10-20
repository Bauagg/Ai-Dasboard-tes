import React, { useState } from "react";
import NavbarArtikel from "../pages/navbarArticel";
import Navbar from "./Navbar";

const Card = ({ article }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 ">
      <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover rounded-md" />
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{article.source}</span>
          <span className={`text-sm ${article.reliabilityScore > 70 ? "text-green-500" : "text-red-500"}`}>{article.reliabilityScore}% Reliability Score</span>
        </div>
        <h2 className="text-lg font-semibold mt-2">{article.title}</h2>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">{article.sentiment}</span>
          <span className="text-xs text-gray-400">{article.time}</span>
        </div>
      </div>
    </div>
  );
};

const Articel = () => {
  const [articles, setArticles] = useState([
    {
      title: "NHS Wales: Man carries grandad into hospital amid ambulance shortage",
      source: "BBC Health News",
      reliabilityScore: 85,
      sentiment: "Positive",
      time: "26 mins ago",
      imageUrl: "/path-to-image/nhs-wales.jpg",
    },
    {
      title: "James Cameron talks about Avatar sequels",
      source: "BBC News",
      reliabilityScore: 80,
      sentiment: "Neutral",
      time: "1 hour ago",
      imageUrl: "/path-to-image/avatar.jpg",
    },
    {
      title: "Whataburger brings back Dr Pepper milkshake by popular demand",
      source: "Washington Examiner",
      reliabilityScore: 60,
      sentiment: "Positive",
      time: "26 mins ago",
      imageUrl: "/path-to-image/whataburger.jpg",
    },
    // Tambahkan artikel lainnya sesuai kebutuhan
  ]);

  return (
    <>
      <Navbar />
      <NavbarArtikel />
      <div className="container mx-auto py-6 flex gap-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full">
          {articles.map((article, index) => (
            <Card key={index} article={article} />
          ))}
        </div>

        <div className="flex flex-col gap-6 w-[400px] h-full">
          <h1 className="text-[21px] font-bold">Trending News</h1>
          <div className="flex flex-col gap-3">
            {articles.map((article, index) => (
              <Card key={index} article={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articel;
