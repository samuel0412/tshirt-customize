import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

// List of allowed MIME types
const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

// Function to get MIME type based on magic numbers
const getMimeType = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onloadend = function (e) {
      const arr = new Uint8Array(e.target.result).subarray(0, 4);
      let header = "";
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16); // Convert to hexadecimal
      }

      let mimeType = "unknown";

      // Check the magic number against known types
      switch (header) {
        case "89504e47":
          mimeType = "image/png";
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
          mimeType = "image/jpeg";
          break;
        case "47494638":
          mimeType = "image/gif";
          break;
        default:
          mimeType = "unknown";
          break;
      }

      resolve(mimeType);
    };

    fileReader.readAsArrayBuffer(file.slice(0, 4));
  });
};

const singleImageUpload = async (file, additionalDirName) => {
  // Validate file size
  const MAX_FILE_SIZE = 8 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`${file.name} exceeds the 8MB file size limit.`);
  }

  // Check the MIME type of the file using the getMimeType function
  const mimeType = await getMimeType(file);
  // Ensure the detected MIME type matches the allowed types
  if (!allowedMimeTypes.includes(mimeType)) {
    throw new Error(`${file.name} has an invalid MIME type: ${mimeType}`);
  }
  window.Buffer = Buffer;
  // Determine directory based on environment
  let dirName = process.env.NODE_ENV === "production" ? "prod" : "test";
  dirName = `${dirName}/${additionalDirName}`;

  // AWS S3 configuration
  const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    },
  });

  const newFileName = file.name.replace(/\s+/g, ""); // Remove spaces from filename
  const fileKey = `${dirName}${newFileName}`;
  const uploadParams = {
    Bucket: process.env.REACT_APP_LOCAL_BUCKET,
    Key: fileKey,
    Body: file,
    ContentType: file.type, // Ensure correct MIME type
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${process.env.REACT_APP_LOCAL_BUCKET}.s3.amazonaws.com/${fileKey}`;
    return { fileName: newFileName, location: fileUrl };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
};

export { singleImageUpload };
