import { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function HoriontalCardCarousel({ data = [], heading, media_type }) {
  const containerRef = useRef();

  function handleNext() {
    containerRef.current.scrollLeft += 250;
  }
  function handlePrevious() {
    containerRef.current.scrollLeft -= 250;
  }

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>
      <div className=" relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] grid-flow-col gap-5 2xl:gap-6 overflow-x-scroll overflow-hidden relative z-10 scroll-smooth transition-all scrollbar-none p-2"
        >
          {data.map((data, index) => (
            <Card
              key={data.id + heading}
              data={data}
              index={index}
              trending={heading.toLowerCase() === "trending"}
              media_type={media_type}
            />
          ))}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between w-full items-center h-full">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-2 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-2 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HoriontalCardCarousel;
