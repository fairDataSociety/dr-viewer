import { isConsent } from "../utils/asserts";
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

  const downloadFile = await axios.post("v1/file/download", formData, {
    responseType: "blob",
  });

  return downloadFile.data;
}

export async function uploadFile(
  podName: string,
  directory: string,
  content: File
): Promise<void> {
  const writePath = directory ? `/${directory}` : "/";

  const formData = new FormData();
  formData.append("files", content);
  formData.append("dirPath", writePath);
  formData.append("podName", podName);
  formData.append("blockSize", "64Mb");

  await axios.post("v1/file/upload", formData);
}

export async function createDirectory(
  podName: string,
  directory: string
): Promise<void> {
  const dirPath = directory.startsWith("/") ? directory : `/${directory}`;

  await axios.post("v1/dir/mkdir", {
    podName,
    dirPath,
  });
}

export async function saveConsentBase64(
  podName: string,
  directory: string,
  filename: string,
  base64Content: string
): Promise<File> {
  try {
    const content = atob(base64Content);
    const data = JSON.parse(content);
    const file = new File([content], filename);
    if (!isConsent(data)) {
      throw new Error("Provided data is not a consent file.");
    }
    await uploadFile(podName, directory, file);

    return file;
  } catch (error) {
    throw new Error("Couldn't save file " + error);
  }
}
