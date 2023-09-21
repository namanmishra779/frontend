import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";
const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  // const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  const [imagePreview, setImagePreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImageURL(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // cloudinaryRef.current = window.cloudinary;
    // widgetRef.current = cloudinaryRef.current.createUploadWidget(
    //   {
    //     cloudName: "dcdhklrjc",
    //     uploadPreset: "vx0dyjgc",
    //     maxFiles: 1,
    //   },
    //   (err, result) => {
    //     if (result.event === "success") {
    //       setImageURL(result.info.secure_url);
    //     }
    //   }
    // );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
          <input
            id="imageFile"
            type="file"
            value={imageURL}
            onChange={(e) => handleImage(e)}
          />
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imagePreview} alt="" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
