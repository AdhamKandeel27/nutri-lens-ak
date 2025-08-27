import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import "./photoInput.css";

const PhotoInput = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleImageUpload(e) {
    const file = e.currentTarget.files[0]; //3ashan el submit gy mn el input el 3andaha files array
    setErrorMsg("");
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file (jpg, png, etc.)");
      return;
    }

    const localPreviewUrl = URL.createObjectURL(file);
    setImageUrl(localPreviewUrl);
  }

  async function handlePhotoSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const file = e.currentTarget.photo.files[0]; //3ashan el submit gy mn el form wel form mehtaga enk te access input by their "name"
    const path = `${file.name}-${Date.now()}`;
    try {
      const { error } = await supabase.storage
        .from("meal-photos")
        .upload(path, file);
      if (error) {
        setErrorMsg(error.message);
        return;
      }
      const { data } = await supabase.storage
        .from("meal-photos")
        .createSignedUrl(path, 60 * 60); // 1 hour
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="upload-photo-wrapper">
      <div className="upload-photo-title">
        <h2>Upload Photo</h2>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </div>
      <div className="upload-photo-form">
        <form onSubmit={handlePhotoSubmit}>
          {imageUrl && (
            <div className="image-preview-container">
              <img src={imageUrl} alt="Uploaded meal" />
            </div>
          )}
          <div className="input-photo">
            <label htmlFor="photo" className="custom-file-upload">
              Upload Image
              <p>Drag and drop or click to upload image</p>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                id="photo"
                required
                name="photo"
              />
            </label>
          </div>
          <div className="save-button">
            <button type="submit" disabled={isLoading}>
              {isLoading ? <span className="spinner"></span> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotoInput;
