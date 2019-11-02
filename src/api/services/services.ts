import { Service } from "../../types/service.js";

export async function fetchServices(): Promise<Service[]> {
  const { default: data } = await import("./data.json");
  return data.services as Service[];
}
