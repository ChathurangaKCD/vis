export type ServiceID = number;
export type ServiceType = "HTTP" | "gRPC";

export interface Service {
  id: ServiceID;
  type: ServiceType;
  dependsOn: ServiceID[];
}
