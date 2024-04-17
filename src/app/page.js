// import myComponent from "@/components/myComponent";
// import ExportImage from "@/components/ExportImage";
"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import html2canvas from "html2canvas";
import Cropper from "react-easy-crop";
import canvasToBlob from "canvas-to-blob";

export default function Home() {
  const exportAsImage = async () => {
    const node = document.getElementById("my-component");
    const canvas = await html2canvas(node);
    const dataURL = canvas.toDataURL("image/png");

    // Create a link element
    const link = document.createElement("a");
    link.download = "pr.jpg";
    link.href = dataURL;

    // Append the link to the document
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });

  const [isEditing, setIsEditing] = useState(true);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropChange = (newCrop) => setCrop(newCrop);
  const onZoomChange = (newZoom) => setZoom(newZoom);
  const onRotationChange = (newRotation) => setRotation(newRotation);
  const onFlipChange = (newFlip) => setFlip(newFlip);

  const cropperRef = useRef(null);
  const handleSaveImage = useCallback(async () => {
    console.log(cropperRef.current);
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      const croppedDataURL = croppedCanvas.toDataURL("image/png");
      setCroppedImage(croppedDataURL);
    }
  }, [cropperRef]);

  useEffect(() => {
    console.log(croppedImage);
  }, [croppedImage]);

  return (
    // <>
    //   <MyComponent />
    //   <ExportImage
    //     componentToExport={<MyComponent />}
    //     fileName="my-component.png"
    //   />
    // </>
    <div>
      <div className="flex justify-center flex-col">
        <div id="my-component" className="size-44 bg-blue-500 p-5 m-5">
          <h1>Image Processing Task</h1>
          {croppedImage && (
            <div style={{ marginTop: "20px" }}>
              <Image
                src={croppedImage}
                alt="Cropped Image"
                width={500}
                height={500}
              />
            </div>
          )}
        </div>

        <div
          className={`flex flex-col item justify-center h-96 w-full ${
            isEditing ? "block" : "hidden"
          }`}
        >
          <div style={{ position: "relative", flex: 1 }}>
            <Cropper
            ref={cropperRef}
              image="pr.jpg"
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              flip={flip}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onRotationChange={onRotationChange}
              onFlipChange={onFlipChange}
              aspect={1 / 1}
              // style={{
              //   position: 'absolute',
              //   top: 0,
              //   left: 0,
              //   width: '50%',
              //   height: '50%',
              // }}
            />
          </div>
          <div className="flex justify-center bg-slate-50 h-fit w-full">
            <button
              onClick={() => onRotationChange(rotation - 5)}
              className=" z-10"
            >
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
            <button onClick={() => onRotationChange(rotation + 5)}>
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
                onFlipChange({ ...flip, horizontal: !flip.horizontal })
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
                onFlipChange({ ...flip, vertical: !flip.vertical })
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
            <button onClick={() => onCropChange({ ...crop, x: crop.x - 5 })}>
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
                    opacity="0.4"
                    d="M7.81 2H16.18C19.83 2 22 4.17 22 7.81V16.18C22 19.82 19.83 21.99 16.19 21.99H7.81C4.17 22 2 19.83 2 16.19V7.81C2 4.17 4.17 2 7.81 2Z"
                    fill="#70b0ff"
                  ></path>{" "}
                  <path
                    d="M5.47 11.4699L9.76 7.1799C10.05 6.8899 10.53 6.8899 10.82 7.1799C11.11 7.4699 11.11 7.9499 10.82 8.2399L7.81 11.2499H18C18.41 11.2499 18.75 11.5899 18.75 11.9999C18.75 12.4099 18.41 12.7499 18 12.7499H7.81L10.82 15.7599C11.11 16.0499 11.11 16.5299 10.82 16.8199C10.67 16.9699 10.48 17.0399 10.29 17.0399C10.1 17.0399 9.91 16.9699 9.76 16.8199L5.47 12.5299C5.33 12.3899 5.25 12.1999 5.25 11.9999C5.25 11.7999 5.33 11.6099 5.47 11.4699Z"
                    fill="#70b0ff"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <button onClick={() => onCropChange({ ...crop, x: crop.x + 5 })}>
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
                    opacity="0.4"
                    d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
                    fill="#70b0ff"
                  ></path>{" "}
                  <path
                    d="M18.53 11.4699L14.24 7.1799C13.95 6.8899 13.47 6.8899 13.18 7.1799C12.89 7.4699 12.89 7.9499 13.18 8.2399L16.19 11.2499H6C5.59 11.2499 5.25 11.5899 5.25 11.9999C5.25 12.4099 5.59 12.7499 6 12.7499H16.19L13.18 15.7599C12.89 16.0499 12.89 16.5299 13.18 16.8199C13.33 16.9699 13.52 17.0399 13.71 17.0399C13.9 17.0399 14.09 16.9699 14.24 16.8199L18.53 12.5299C18.67 12.3899 18.75 12.1999 18.75 11.9999C18.75 11.7999 18.67 11.6099 18.53 11.4699Z"
                    fill="#70b0ff"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <button onClick={() => onCropChange({ ...crop, y: crop.y - 5 })}>
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
                    opacity="0.4"
                    d="M22 7.81V16.18C22 19.82 19.83 21.99 16.19 21.99H7.81C4.17 22 2 19.83 2 16.19V7.81C2 4.17 4.17 2 7.81 2H16.18C19.83 2 22 4.17 22 7.81Z"
                    fill="#70b0ff"
                  ></path>{" "}
                  <path
                    d="M12.5309 5.47L16.8209 9.76C17.1109 10.05 17.1109 10.53 16.8209 10.82C16.5309 11.11 16.0509 11.11 15.7609 10.82L12.7509 7.81V18C12.7509 18.41 12.4109 18.75 12.0009 18.75C11.5909 18.75 11.2509 18.41 11.2509 18V7.81L8.24094 10.82C7.95094 11.11 7.47094 11.11 7.18094 10.82C7.03094 10.67 6.96094 10.48 6.96094 10.29C6.96094 10.1 7.04094 9.9 7.18094 9.76L11.4709 5.47C11.6109 5.33 11.8009 5.25 12.0009 5.25C12.2009 5.25 12.3909 5.33 12.5309 5.47Z"
                    fill="#70b0ff"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <button onClick={() => onCropChange({ ...crop, y: crop.y + 5 })}>
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
                    opacity="0.4"
                    d="M2 16.19V7.81C2 4.17 4.17 2 7.81 2H16.18C19.83 2 22 4.17 22 7.81V16.18C22 19.82 19.83 21.99 16.19 21.99H7.81C4.17 22 2 19.83 2 16.19Z"
                    fill="#70b0ff"
                  ></path>{" "}
                  <path
                    d="M11.4704 18.53L7.18039 14.24C6.89039 13.95 6.89039 13.47 7.18039 13.18C7.47039 12.89 7.95039 12.89 8.24039 13.18L11.2504 16.19V6C11.2504 5.59 11.5904 5.25 12.0004 5.25C12.4104 5.25 12.7504 5.59 12.7504 6V16.19L15.7604 13.18C16.0504 12.89 16.5304 12.89 16.8204 13.18C16.9704 13.33 17.0404 13.52 17.0404 13.71C17.0404 13.9 16.9704 14.09 16.8204 14.24L12.5304 18.53C12.3904 18.67 12.2004 18.75 12.0004 18.75C11.8004 18.75 11.6104 18.67 11.4704 18.53Z"
                    fill="#70b0ff"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <button onClick={() => onZoomChange(zoom + 0.1)}>
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
                    opacity="0.4"
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    fill="#70b0ff"
                  ></path>{" "}
                  <path
                    d="M21.3005 22.0001C21.1205 22.0001 20.9405 21.9301 20.8105 21.8001L18.9505 19.9401C18.6805 19.6701 18.6805 19.2301 18.9505 18.9501C19.2205 18.6801 19.6605 18.6801 19.9405 18.9501L21.8005 20.8101C22.0705 21.0801 22.0705 21.5201 21.8005 21.8001C21.6605 21.9301 21.4805 22.0001 21.3005 22.0001Z"
                    fill="#70b0ff"
                  ></path>{" "}
                  <path
                    d="M14.1992 10.95H12.4492V9.19995C12.4492 8.78995 12.1092 8.44995 11.6992 8.44995C11.2892 8.44995 10.9492 8.78995 10.9492 9.19995V10.95H9.19922C8.78922 10.95 8.44922 11.29 8.44922 11.7C8.44922 12.11 8.78922 12.45 9.19922 12.45H10.9492V14.2C10.9492 14.61 11.2892 14.95 11.6992 14.95C12.1092 14.95 12.4492 14.61 12.4492 14.2V12.45H14.1992C14.6092 12.45 14.9492 12.11 14.9492 11.7C14.9492 11.29 14.6092 10.95 14.1992 10.95Z"
                    fill="#70b0ff"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <button onClick={() => onZoomChange(zoom - 0.1)}>
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
                    opacity="0.4"
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    fill="#70b0ff"
                  ></path>{" "}
                  <path
                    d="M21.3005 22.0001C21.1205 22.0001 20.9405 21.9301 20.8105 21.8001L18.9505 19.9401C18.6805 19.6701 18.6805 19.2301 18.9505 18.9501C19.2205 18.6801 19.6605 18.6801 19.9405 18.9501L21.8005 20.8101C22.0705 21.0801 22.0705 21.5201 21.8005 21.8001C21.6605 21.9301 21.4805 22.0001 21.3005 22.0001Z"
                    fill="#70b0ff"
                  ></path>{" "}
                  <path
                    d="M14 12.45H9C8.59 12.45 8.25 12.11 8.25 11.7C8.25 11.29 8.59 10.95 9 10.95H14C14.41 10.95 14.75 11.29 14.75 11.7C14.75 12.11 14.41 12.45 14 12.45Z"
                    fill="#70b0ff"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                handleSaveImage();
              }}
              className="bg-blue-500 p-5 rounded-lg font-bold text-white"
            >
              Done
            </button>
          </div>
        </div>

        <button
          onClick={exportAsImage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-44"
        >
          Export as Image
        </button>
      </div>
    </div>
  );
}
