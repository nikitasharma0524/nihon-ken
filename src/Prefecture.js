import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Prefecture = ({ name, capital, description, region, onViewDetails }) => {
  const [image, setImage] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    import(`./images/prefectures/${name}.jpg`)
      .then((img) => setImage(img.default))
      .catch(() =>
        import(`./images/prefectures/Niigata.jpg`).then((img) =>
          setImage(img.default)
        )
      );
  }, [name]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white w-[20%] rounded-md m-4 shadow-xl flex flex-col justify-between"
    >
      <div className="relative">
        {image && (
          <img
            className="aspect-[4/3] w-full overflow-hidden rounded-t-md"
            src={image}
            alt={name}
            loading="lazy"
          />
        )}
        <span className="absolute top-2 right-2 bg-white text-sm rounded-full px-2 py-1 shadow">
          {region}
        </span>
      </div>

      <div className="text-left m-2 flex-grow">
        <span className="font-bold text-lg">{name}</span>
        <div className="text-sm mt-1 text-gray-700">{capital}</div>
        <p className="text-sm mt-2 text-gray-600">{description}</p>
      </div>

      <div className="mt-auto">
        <button
          onClick={onViewDetails}
          className="px-4 py-2 bg-red-50 shadow mt-4 w-full font-semibold text-sm hover:bg-blue-700 hover:text-white transition rounded-b-md"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default Prefecture;
