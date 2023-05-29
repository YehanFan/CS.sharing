import { useState} from "react";

// Custom hook for handling file input
export default function useFileHandler() {
  const [imageFile, setImageFile] = useState();
  const [isFileLoading, setFileLoading] = useState(false);

  // Function to clear the file state
  function clearFile() {
    setImageFile({
      file: {},
      url: "",
      id: ""
    }  );
  }

  // Event handler for file input change
  const onFileChange = async (event, callback) => {
    if (!event.target.files) {
      return;
    }

    const value = event.target.value;
    const image = event.target.files[0];

    clearFile()



    const size = image.size / 1024 / 1024;
    const regex = /(\.jpg|\.jpeg|\.png|\.webp)$/i;

    setFileLoading(true);
    if (!regex.exec(value)) {
      console.error('File type must be .jpg or .png')
    } else if (size > 1) {
      console.error('File size exceeded 1 MB')
    } else {
      const file = event.target.files[0]
      const url = URL.createObjectURL(file);
      setImageFile({ file, url, id: file.name });

      if (callback) {
        callback(imageFile);
      }

      setFileLoading(false);
    }
  }

  // Return the file handling functions as an object for external use
  return {
    imageFile,
    setImageFile,
    isFileLoading,
    onFileChange,
    clearFile
  };
}
