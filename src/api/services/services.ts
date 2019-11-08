import { Service, ServiceID } from "../../types/service";
import { Requests } from "../requests";
import { API_BASE_URL } from "./constants";

const BASE_URL = API_BASE_URL + "/api/services/";

export async function fetchAllServices(): Promise<Service[]> {
  const url = BASE_URL;
  const services = await Requests.getData(url);
  return services;
}

export async function fetchServiceById(serviceId: ServiceID): Promise<Service> {
  const url = BASE_URL + serviceId;
  const service = await Requests.getData(url);
  return service;
}

export async function createService(service: Service): Promise<boolean> {
  const url = BASE_URL;
  await Requests.postData(url, service);
  return true;
}

export async function updateService(service: Service): Promise<boolean> {
  const url = BASE_URL;
  await Requests.postData(url, service, "PUT");
  return true;
}

export async function deleteServiceById(
  serviceId: ServiceID
): Promise<boolean> {
  const url = BASE_URL + serviceId;
  await Requests.deleteResource(url);
  return true;
}
