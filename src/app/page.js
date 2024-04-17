"use client";

import { useState } from "react";
import Avatar from "react-avatar-edit";
import Image from "next/image";
import html2canvas from "html2canvas";
const Home = () => {

  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [isFlippedX, setIsFlippedX] = useState(false);
  const [isFlippedY, setIsFlippedY] = useState(false);

  const exportAsImage = async () => {
    const node = document.getElementById("my-component");
    const canvas = await html2canvas(node);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "pr.jpg";
    link.href = dataURL;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex flex-col gap-10 justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-cyan-200 ">
        {isEditing && (
          <div className="absolute z-10 w-full h-full flex flex-col justify-center items-center bg-black/50">
            <div>
              <Avatar
                height={200}
                width={200}
                onCrop={(view) => setPreview(view)}
                onClose={() => setIsEditing(false)}
                style={{ transform: `rotate(5deg)` }}
              />
            </div>
          </div>
        )}

        <div
          className="flex bg-[url('/bg.png')] p-10 rounded-3xl border-2 border-pink-100 shadow-lg"
          id="my-component"
        >
          <Image
            src={preview || "/add.png"}
            width={250}
            height={200}
            alt="Preview"
            onClick={() => (!isEditing ? setIsEditing(true) : null)}
            className={`${!isEditing ? "cursor-pointer" : ""} rounded-full`}
            style={{
              transform: `rotate(${rotation}deg) scaleX(${isFlippedX ? "-1" : "1"}) scaleY(${isFlippedY ? "-1" : "1"})`,
            }}
            unoptimized
          />
          <div className="text-xl font-semibold">
            <input
              type="text"
              className=" border-b-2 border-slate-200 border-dashed bg-transparent pl-2"
            />
            <div className="">
              <div className="m-5">
                <span className=" font-bold text-slate-700">Std: </span>
                <input
                  type="text"
                  className=" border-b-2 border-slate-200 border-dashed bg-transparent pl-2"
                />
              </div>{" "}
              <div className="m-5">
                <span className=" font-bold text-slate-700">Sec: </span>
                <input
                  type="text"
                  className=" border-b-2 border-slate-200 border-dashed bg-transparent pl-2"
                />
              </div>
            </div>
            <div className="m-5">
              <span className=" font-bold text-slate-700">Subject: </span>
              <input
                type="text"
                className=" border-b-2 border-slate-200 border-dashed bg-transparent pl-2"
              />
            </div>
            <div className="m-5">
              <span className=" font-bold text-slate-700">School: </span>
              <input
                type="text"
                className=" border-b-2 border-slate-200 border-dashed bg-transparent pl-2"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-slate-50 h-fit w-fit px-5 py-2 translate-y-2 rounded-xl">
          <button onClick={() => setRotation(rotation - 5)} className=" z-10">
            <svg
              // width="69px"
              // height="69px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 rounded-lg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.4"
                  d="M7.81 2H16.18C19.83 2 22 4.17 22 7.81V16.18C22 19.82 19.83 21.99 16.19 21.99H7.81C4.17 22 2 19.83 2 16.19V7.81C2 4.17 4.17 2 7.81 2Z"
                  fill="#70b0ff"
                ></path>{" "}
                <path
                  d="M12 18.5799C8.83 18.5799 6.25 15.9999 6.25 12.8299C6.25 11.6899 6.58 10.5799 7.22 9.6399C7.45 9.2999 7.92 9.1999 8.26 9.4299C8.6 9.6599 8.7 10.1299 8.47 10.4699C8 11.1699 7.76 11.9899 7.76 12.8299C7.76 15.1699 9.67 17.0799 12.01 17.0799C14.35 17.0799 16.26 15.1699 16.26 12.8299C16.26 10.5899 14.52 8.7499 12.32 8.5899L12.73 8.8899C13.06 9.1299 13.14 9.5999 12.89 9.9399C12.65 10.2699 12.18 10.3499 11.84 10.0999L9.9 8.6899C9.83 8.6399 9.77 8.5799 9.72 8.5099C9.71 8.4999 9.7 8.4899 9.69 8.4699C9.65 8.3999 9.62 8.3199 9.6 8.2399C9.58 8.1399 9.58 8.0499 9.59 7.9499C9.6 7.9099 9.61 7.8699 9.62 7.8299C9.64 7.7599 9.68 7.6999 9.72 7.6299C9.74 7.6199 9.76 7.5999 9.78 7.5799L11.44 5.6799C11.71 5.3699 12.19 5.3399 12.5 5.6099C12.81 5.8799 12.84 6.3599 12.57 6.6699L12.2 7.0999C15.28 7.1999 17.76 9.7399 17.76 12.8499C17.75 15.9999 15.17 18.5799 12 18.5799Z"
                  fill="#70b0ff"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <button onClick={() => setRotation(rotation + 5)}>
            <svg
              width="156px"
              height="156px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 rounded-lg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.4"
                  d="M7.81 2H16.18C19.83 2 22 4.17 22 7.81V16.18C22 19.82 19.83 21.99 16.19 21.99H7.81C4.17 22 2 19.83 2 16.19V7.81C2 4.17 4.17 2 7.81 2Z"
                  fill="#70b0ff"
                ></path>{" "}
                <path
                  d="M12 18.5801C8.83 18.5801 6.25 16.0001 6.25 12.8301C6.25 9.72012 8.73 7.19012 11.81 7.08012L11.44 6.65012C11.17 6.34012 11.2 5.86012 11.51 5.59012C11.82 5.32012 12.3 5.35012 12.57 5.66012L14.23 7.56012C14.25 7.58012 14.26 7.60012 14.28 7.62012C14.32 7.68012 14.36 7.75012 14.38 7.82012C14.39 7.86012 14.4 7.90012 14.41 7.94012C14.43 8.03012 14.42 8.13012 14.4 8.22012C14.38 8.30012 14.35 8.38012 14.31 8.46012C14.3 8.48012 14.28 8.50012 14.27 8.52012C14.23 8.58012 14.17 8.63012 14.11 8.67012C14.11 8.67012 14.1 8.67012 14.1 8.68012L12.16 10.1001C11.82 10.3401 11.36 10.2701 11.11 9.94012C10.87 9.61012 10.94 9.14012 11.27 8.89012L11.68 8.59012C9.48 8.75012 7.74 10.5901 7.74 12.8301C7.74 15.1701 9.65 17.0801 11.99 17.0801C14.33 17.0801 16.24 15.1701 16.24 12.8301C16.24 11.9901 15.99 11.1701 15.53 10.4701C15.3 10.1301 15.39 9.66012 15.74 9.43012C16.09 9.20012 16.55 9.29012 16.78 9.64012C17.41 10.5901 17.75 11.6901 17.75 12.8301C17.75 16.0001 15.17 18.5801 12 18.5801Z"
                  fill="#70b0ff"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <button
            onClick={() =>
              isFlippedX ? setIsFlippedX(false) : setIsFlippedX(true)
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 rounded-lg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M3.5 5.06006V18.9401C3.5 19.3501 3.16 19.6901 2.75 19.6901C2.34 19.6901 2 19.3501 2 18.9401V5.06006C2 4.65006 2.34 4.31006 2.75 4.31006C3.16 4.31006 3.5 4.65006 3.5 5.06006Z"
                  fill="#70b0ff"
                ></path>{" "}
                <path
                  d="M22 5.06006V18.9401C22 19.3501 21.66 19.6901 21.25 19.6901C20.84 19.6901 20.5 19.3501 20.5 18.9401V5.06006C20.5 4.65006 20.84 4.31006 21.25 4.31006C21.66 4.31006 22 4.65006 22 5.06006Z"
                  fill="#70b0ff"
                ></path>{" "}
                <path
                  opacity="0.4"
                  d="M7.59961 21.25H16.3996C18.0596 21.25 19.3996 19.91 19.3996 18.25V5.75C19.3996 4.09 18.0596 2.75 16.3996 2.75H7.59961C5.93961 2.75 4.59961 4.09 4.59961 5.75V18.25C4.59961 19.91 5.93961 21.25 7.59961 21.25Z"
                  fill="#70b0ff"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <button
            onClick={() =>
              isFlippedY ? setIsFlippedY(false) : setIsFlippedY(true)
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 rounded-lg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M18.9405 3.5H5.06055C4.65055 3.5 4.31055 3.16 4.31055 2.75C4.31055 2.34 4.65055 2 5.06055 2H18.9405C19.3505 2 19.6905 2.34 19.6905 2.75C19.6905 3.16 19.3505 3.5 18.9405 3.5Z"
                  fill="#70b0ff"
                ></path>{" "}
                <path
                  d="M18.9405 22H5.06055C4.65055 22 4.31055 21.66 4.31055 21.25C4.31055 20.84 4.65055 20.5 5.06055 20.5H18.9405C19.3505 20.5 19.6905 20.84 19.6905 21.25C19.6905 21.66 19.3505 22 18.9405 22Z"
                  fill="#70b0ff"
                ></path>{" "}
                <path
                  opacity="0.4"
                  d="M2.75 7.6001V16.4001C2.75 18.0601 4.09 19.4001 5.75 19.4001H18.25C19.91 19.4001 21.25 18.0601 21.25 16.4001V7.6001C21.25 5.9401 19.91 4.6001 18.25 4.6001H5.75C4.09 4.6001 2.75 5.9401 2.75 7.6001Z"
                  fill="#70b0ff"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
        <button
          onClick={exportAsImage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-44 m-2"
        >
          Export as Image
        </button>
      </div>
    </>
  );
};

export default Home;
