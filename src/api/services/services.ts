import { Service, ServiceID } from "../../types/service";
import { Requests } from "../requests";

const BASE_URL = "/api/services/";

export async function fetchServices(): Promise<Service[]> {
  const { default: data } = await import("./data.json");
  return data.services as Service[];
}

export async function fetchAllServices(): Promise<Service[]> {
  const url = BASE_URL;
  const services = await Requests.getData(url);
  return services;
}

export async function fetchServiceById(serviceId: ServiceID): Promise<Service> {
  const url = BASE_URL + serviceId;
  const service = await Requests.postData(url);
  return service;
}

export async function createService(service: Service): Promise<boolean> {
  const url = BASE_URL;
  await Requests.postData(url, service);
  return true;
}

export async function deleteServiceById(
  serviceId: ServiceID
): Promise<boolean> {
  const url = BASE_URL + serviceId;
  await Requests.deleteResource(url);
  return true;
}
