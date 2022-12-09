import axios from "./axios";

export async function openPod(
  podName: string,
  password: string
): Promise<void> {
  return await axios.post("v1/pod/open", {
    podName,
    password,
  });
}
