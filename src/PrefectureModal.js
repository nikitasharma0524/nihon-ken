import React, { useEffect, useState } from "react";

const PrefectureModal = ({ isOpen, onClose, prefecture }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!prefecture?.name) return;

    import(`./images/prefectures/${prefecture.name}.jpg`)
      .then((img) => setImage(img.default))
      .catch(() =>
        import(`./images/prefectures/Niigata.jpg`).then((img) =>
          setImage(img.default)
        )
      );
  }, [prefecture]);

  if (!isOpen || !prefecture) return null;

  const mapSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    prefecture.name + " Japan"
  )}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl relative">
        <button
          className="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        {image && (
          <img
            src={image}
            alt={prefecture.name}
            className="w-full h-50 p-4 object-cover rounded-md mb-6"
          />
        )}

        <h2 className="text-2xl font-bold mb-1">{prefecture.name}</h2>
        <p className="text-gray-500 mb-1">
          <strong>Capital - </strong> {prefecture.capital}
        </p>
        <p className="text-gray-600 mb-3">{prefecture.description}</p>

        <a
          href={mapSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 underline text-sm mb-4"
        >
          📍 View on Google Maps
        </a>

        <div className="mt-4 text-sm text-gray-600">
          <p>
            🥘 <strong>Famous food:</strong>{" "}
            {prefecture.food || "Wanko Soba, Morioka Reimen"}
          </p>
          <p>
            🧭 <strong>Interesting Fact:</strong> {prefecture.interestingFact}
          </p>
          <p>
            <strong>Region:</strong> {prefecture.region}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrefectureModal;
