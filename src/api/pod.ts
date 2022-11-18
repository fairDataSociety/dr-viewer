import axios from "./axios";

export async function openPod(
  pod_name: string,
  password: string
): Promise<void> {
  return await axios.post("pod/open", {
    pod_name,
    password,
  });
}
