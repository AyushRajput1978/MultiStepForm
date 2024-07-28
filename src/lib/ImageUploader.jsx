import React, { useState, useEffect } from "react";
// import "react-image-crop/dist/ReactCrop.css";
import { useDropzone } from "react-dropzone";
import { Button, Image } from "react-bootstrap";
import dummyImage from "../Image/user-dummy.png"

const ImageUploader = ({ img, setImg }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    // Check if img is a File (binary)
    if (img instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        setImage(dataUrl);
      };
      reader.readAsDataURL(img);
    } else {
      // Assume img is a Data URL
      setImage(img);
    }
  }, [img]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      // setImage(reader.result);
      setImg(file);
      // onImageChange(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });
  return (
    <div
      className="border border-success rounded"
      {...getRootProps()}
      style={{
        marginBottom: "16px",
        border: "1px dashed #ccc",
        padding: "16px",
        textAlign: "center",
        width: "10em",
        height: "10em",
      }}
    >
      <input {...getInputProps()} />
      
        <Image
          src={image||dummyImage}
          alt="Profile Image"
          style={{ width: "100%", height: "100%" }}
        />
      
      {image && (
        <Button className="my-4 green-btn fontweigh-500">Change</Button>
      )}
    </div>
  );
};

export default ImageUploader;
