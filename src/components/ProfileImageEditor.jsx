import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ProfileImageEditor = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    height: 30,
    x: 50,
    y: 50,
  });
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const [zoom, setZoom] = useState(1);
  const imageRef = useRef(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleCropChange = (crop) => {
    setCrop(crop);
  };

  const handleRotationChange = (event) => {
    setRotation(event.target.value);
  };

  const handleFlipChange = (event) => {
    setFlip({
      ...flip,
      [event.target.name]: event.target.checked,
    });
  };

  const handleZoomChange = (event) => {
    setZoom(event.target.value);
  };

  const handleSave = () => {
    // You can now save the edited image
    // using the current state of the image, crop, rotation, flip, and zoom
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {image && (
        <div>
          <ReactCrop
            src={URL.createObjectURL(image)}
            crop={crop}
            ruleOfThirds
            onImageLoaded={(img) => (imageRef.current = img)}
            onCropChange={handleCropChange}
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom}) scaleX(${
                flip.horizontal ? -1 : 1
              }) scaleY(${flip.vertical ? -1 : 1})`,
            }}
          />
          <div>
            <label>
              Rotation:
              <input
                type="range"
                min="-180"
                max="180"
                value={rotation}
                onChange={handleRotationChange}
              />
            </label>
            <label>
              Horizontal Flip:
              <input
                type="checkbox"
                name="horizontal"
                checked={flip.horizontal}
                onChange={handleFlipChange}
              />
            </label>
            <label>
              Vertical Flip:
              <input
                type="checkbox"
                name="vertical"
                checked={flip.vertical}
                onChange={handleFlipChange}
              />
            </label>
            <label>
              Zoom:
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={zoom}
                onChange={handleZoomChange}
              />
            </label>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageEditor;