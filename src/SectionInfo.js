import React from "react";

const SectionInfo = () => {
  const infoData = [
    {
      id: 1,
      value: 47,
      label: "Total Prefectures",
      icon: "../assets/population.svg",
    },
    {
      id: 2,
      value: 125800000,
      label: "Total Population",
      icon: "../assets/population.svg",
    },
    {
      id: 3,
      value: 377975,
      label: "Total Area",
      icon: "../assets/population.svg",
    },
    {
      id: 4,
      value: 1718,
      label: "Municipalities",
      icon: "../assets/population.svg",
    },
  ];
  return (
    <div className="flex flex-wrap gap-10 justify-center mt-10 mb-10 w-full">
      {infoData.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 items-center bg-white shadow-lg rounded-lg p-4 w-64"
        >
          <img className="w-8 h-8" src={item.icon} alt={item.label} />
          <div className="text-left">
            <h1 className="font-bold text-xl">{item.value}</h1>
            <p className="text-gray-600 text-sm">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionInfo;
