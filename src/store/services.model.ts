export interface Service {
  id: number;
  type: "HTTP" | "gRPC";
  dependsOn: number[];
}

export interface ServicesModel {
  byId: { [x: number]: Service };
  allIds: number[];
}

export const servicesModel: ServicesModel = {
  byId: {},
  allIds: []
};
