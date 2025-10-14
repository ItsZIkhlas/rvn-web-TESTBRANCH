import React from 'react'
import ImageBlock from './ImageBlock';

function Push1() {
  return (
    <section className="relative w-[75%] min-h-screen flex flex-row items-center justify-center font-['Montserrat',sans-serif] z-20 gap-10">
      <div className="">
        <h1 className="text-7xl font-light text-white mb-6 whitespace-nowrap">
          No need to calculate.
          <br />
          RVN’s got you covered.
        </h1>
        <p className="text-2xl font-normal text-white mb-20 max-w-lg">
          You don’t need to spend time calculating your top speed — RVN
          automatically does it for you, delivering far more detailed insights
          and performance breakdowns than you could ever get manually.
        </p>
      </div>
      <ImageBlock width={800} height={700} />
    </section>
  );
}

export default Push1