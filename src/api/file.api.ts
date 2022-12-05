import formatURL from "../utils/url";
import axios from "./axios";

export async function downloadFile(
  podName: string,
  directory: string,
  filename: string
): Promise<Blob> {
  const writePath = directory ? "/" + formatURL(directory) + "/" : "/";

  const formData = new FormData();
  formData.append("filePath", writePath + filename);
  formData.append("podName", podName);

  const downloadFile = await axios.post("file/download", formData, {
    responseType: "blob",
  });

  return downloadFile.data;
}
