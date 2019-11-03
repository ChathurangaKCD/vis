import { Action, action, Thunk, thunk } from "easy-peasy";
import { Injections } from "./injections";
import { Service, ServiceID } from "../types/service";

export interface ServicesModel {
  byId: { [x: string]: Service };
  allIds: ServiceID[];
  replaceServices: Action<ServicesModel, Service[]>;
  reloadServices: Thunk<ServicesModel, void, Injections>;
}

export const servicesModel: ServicesModel = {
  byId: {},
  allIds: [],
  replaceServices: action((state, payload) => {
    state.allIds = payload.map(s => s.id);
    state.byId = Object.fromEntries(payload.map(s => [s.id, s]));
  }),
  reloadServices: thunk(async (actions, _, { injections }) => {
    const serviceList = await injections.servicesAPI.fetchAllServices();
    actions.replaceServices(serviceList);
  })
};
