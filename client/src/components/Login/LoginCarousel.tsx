import { useEffect, useRef, useState } from "react";
import { carouselData } from "./carouselData";

const LoginCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const slideCount = carouselData.length;

  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentSlide]);

  const resetAutoPlay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 3000);
  };

  return (
    <div className="w-150 h-185 bg-linear-to-tr from-40% from-zinc-900 to-red-900 text-zinc-50 rounded-xl flex flex-col justify-end-safe">
      <div className="p-5">
        <img src="/favicon02.png" alt="" className="w-30 mx-auto" />
        {carouselData.map((item, index) => (
          <div
            key={item.id}
            className={`${currentSlide === index ? "block" : "hidden"}
          p-5 text-center
          `}
          >
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="text-sm font-light">{item.subText}</p>
          </div>
        ))}

        <div className="flex items-center justify-center gap-x-2 ">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5  rounded-full cursor-pointer 
                ${
                  currentSlide === index
                    ? "bg-linear-to-tr from-5% from-zinc-600 to-red-600"
                    : "bg-gray-300"
                }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginCarousel;
