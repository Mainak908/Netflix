import React from "react";

import { Infobtn } from "./ClntComp";
import PlayButton from "./PlayButton";

const Billboard: React.FC = async () => {
  const movie = await fetch(`${process.env.API_URL}/api/random`);
  const data = await movie.json();

  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
        // autoPlay
        muted
        loop
        src={data?.videoUrl}
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <Infobtn data={data} />
        </div>
      </div>
    </div>
  );
};
export default Billboard;
