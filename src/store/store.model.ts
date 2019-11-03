import { servicesModel, ServicesModel } from "./services.model";

export interface StoreModel {
  services: ServicesModel;
}

export const storeModel: StoreModel = {
  services: servicesModel
};
