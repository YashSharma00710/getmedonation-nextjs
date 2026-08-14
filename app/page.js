import Image from "next/image";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center px-30 max-[589px]:px-5 max-[688px]:px-10 py-28 flex-col gap-3  max-[688px]:py-20">
        <div className="text-4xl font-bold flex items-center justify-center">
          <span>
            <Script
              src="https://cdn.lordicon.com/lordicon.js"
              strategy="lazyOnload"
            />
            <lord-icon src="https://cdn.lordicon.com/cukgelaw.json" trigger="loop" style={{ width: "50px", height: "50px" }}></lord-icon>
          </span> <span className="text-center max-[688px]:text-2xl max-[375px]:text-xl max-[340px]:text-[17px]">Help me to support my journey</span></div>
        <p className="text-center max-[375px]:text-[15px] max-[340px]:text-[12px]">A crowdFunding platform for creators. Get funded by your own fans and followers. Start Now</p>
        <div className="flex gap-3">
          <Link href={"/login"}>
            <button type="button" className="rounded-lg cursor-pointer text-[16px] text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base px-4 py-2.5 text-center leading-5 max-[340px]:text-[12px] max-[375px]:text-[15px] max-[375px]:px-2 max-[375px]:py-1.5">Start Now</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="rounded-lg cursor-pointer text-[16px] text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base px-4 py-2.5 text-center leading-5 max-[340px]:text-[12px] max-[375px]:text-[15px]  max-[375px]:px-2 max-[375px]:py-1.5">Read More</button>
          </Link>
        </div>
      </div>
      {/* A straight Line */}
      <div className="bg-white h-2 opacity-11"></div>
      {/* Second Half */}
      <div className="flex flex-col px-30 max-[589px]:px-5 max-[688px]:px-10 my-14 items-center gap-12 ">
        <h1 className="text-center text-2xl font-bold max-[688px]:text-2xl max-[375px]:text-xl max-[340px]:text-[17px]">Fans can help animals to make there life perfect </h1>
        <div className="flex justify-around container items-start max-[375px]:flex-col max-[375px]:justify-center max-[375px]:items-center">
          <div className="flex flex-col space-y-3 items-center text-center justify-center w-1/3 max-[375px]:w-full">
            <div className="bg-[#ffffff] p-3.5 rounded-full w-fit">
              <img src="/biodiversity.gif" width={60} alt="" />
            </div>
            <p>Choose an Shelter</p>
            <p>Explore verified animals and shelters that need your support.</p>
          </div>
          <div className="flex flex-col space-y-3 items-center text-center justify-center w-1/3 max-[375px]:w-full">
            <div className="bg-[#ffffff] p-3.5 rounded-full w-fit">
              <img src="/data-safety.gif" width={60} alt="" />
            </div>
            <p>Donate Securely</p>
            <p>Make a secure donation and directly help provide food, shelter, and medical care.</p>
          </div>
          <div className="flex flex-col space-y-3 items-center text-center justify-center w-1/3 max-[375px]:w-full">
            <div className="bg-[#ffffff] p-3.5 rounded-full w-fit">
              <img src="/discussion.gif" width={60} alt="" />
            </div>
            <p>Followers wants to help</p>
            <p>Your followers are available for you to help</p>
          </div>
        </div>
      </div>
      {/* A straight Line */}
      <div className="bg-white h-2 opacity-11"></div>
      {/* Third Half */}
      <div className="flex flex-col px-30 max-[589px]:px-5 max-[688px]:px-10 my-14 justify-center items-center gap-12">
        <h2 className="text-center text-4xl font-bold flex gap-3 max-[375px]:gap-2 items-center text-white">
          <img src="/role-model.png" className="max-[688px]:w-[35px]" width={50} alt="" />
          <span className="max-[688px]:text-2xl max-[375px]:text-xl max-[340px]:text-[17px]">Animal Heroes on YouTube</span>  </h2>
        <div className="grid grid-cols-3 grid-cols-1 max-[460px]:grid-cols-1 max-[688px]:grid-cols-2  gap-y-4 gap-x-2 w-full">
          <div className=" flex justify-center">
            <iframe className="w-full object-cover max-[688px]:h-[120px]" src="https://www.youtube.com/embed/HKnlBIctJgk?si=gZrM5fUL87GBrzvc" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className="flex justify-center">
            <iframe className="w-full object-cover max-[688px]:h-[120px]" src="https://www.youtube.com/embed/kuKOwWYs6hg?si=24yJg5rn3Z57k4hh" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className="flex justify-center">
            <iframe className="w-full object-cover max-[688px]:h-[120px]" src="https://www.youtube.com/embed/0erst0Yh4Xo?si=ZJL5_6t9fsMN7XIq" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className="flex justify-center">
            <iframe className="w-full object-cover max-[688px]:h-[120px]" src="https://www.youtube.com/embed/SgSMTZ23br8?si=VuLU6gRP4dY9r0v1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className="flex justify-center">
            <iframe className="w-full object-cover max-[688px]:h-[120px]" src="https://www.youtube.com/embed/la_CFttrG20?si=Z2rfu-Hvrs7r_bvZ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className="flex justify-center">
            <iframe className="w-full object-cover max-[688px]:h-[120px]" src="https://www.youtube.com/embed/0erst0Yh4Xo?si=ZJL5_6t9fsMN7XIq" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>

        </div>
      </div>

    </>
  );
}
