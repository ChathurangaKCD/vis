import { Action, action, Thunk, thunk, computed, Computed } from "easy-peasy";
import { Injections } from "./injections";
import { Service, ServiceID } from "../types/service";

type STORE_DATA_STATE = "EMPTY" | "FETCHING" | "AVAILABLE" | "ERROR";

type ServiceThunk<PayloadType, ReturnType> = Thunk<
  ServicesModel,
  PayloadType,
  Injections,
  never,
  Promise<ReturnType>
>;

export interface ServicesModel {
  dataState: STORE_DATA_STATE;
  byId: { [x: string]: Service };
  allIds: ServiceID[];
  setDataState: Action<ServicesModel, STORE_DATA_STATE>;
  /** Add new/Update existing service in store */
  upsertService: Action<ServicesModel, Service>;
  /** Replace all service data with fetched data */
  replaceServices: Action<ServicesModel, Service[]>;
  /** Fetch all services & replace store data */
  reloadServices: ServiceThunk<void, void>;
  /** Fetch a service & update store */
  reloadServiceById: ServiceThunk<ServiceID, boolean>;
  /** Create new service & update store */
  createService: ServiceThunk<Service, boolean>;
  /** Update exisitng service & update store */
  updateService: ServiceThunk<Service, boolean>;
  /** Compute dependants of each service */
  dependantsById: Computed<ServicesModel, { [x in ServiceID]: ServiceID[] }>;
}

export const servicesModel: ServicesModel = {
  dataState: "EMPTY",
  byId: {},
  allIds: [],
  setDataState: action((state, payload) => {
    state.dataState = payload;
  }),
  replaceServices: action((state, payload) => {
    state.allIds = payload.map(s => s.id);
    state.allIds.sort((a, b) => a - b);
    state.byId = Object.fromEntries(payload.map(s => [s.id, s]));
  }),
  upsertService: action((state, payload) => {
    const isNew = !state.byId[payload.id];
    if (isNew) {
      state.allIds.push(payload.id);
    }
    state.byId[payload.id] = payload;
  }),
  reloadServices: thunk(async (actions, _, { injections }) => {
    actions.setDataState("FETCHING");
    try {
      const serviceList = await injections.servicesAPI.fetchAllServices();
      actions.replaceServices(serviceList);
      actions.setDataState("AVAILABLE");
    } catch (error) {
      console.log(error);
      actions.setDataState("ERROR");
    }
  }),
  reloadServiceById: thunk(async (actions, serviceId, { injections }) => {
    try {
      const fetchedService = await injections.servicesAPI.fetchServiceById(
        serviceId
      );
      actions.upsertService(fetchedService);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }),
  createService: thunk(async (actions, serviceData, { injections }) => {
    try {
      await injections.servicesAPI.createService(serviceData);
      actions.upsertService(serviceData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }),
  updateService: thunk(async (actions, serviceData, { injections }) => {
    try {
      await injections.servicesAPI.updateService(serviceData);
      actions.upsertService(serviceData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }),
  dependantsById: computed(
    [state => state.allIds, state => state.byId],
    (allIds, byId) => {
      const depsById = new Map<ServiceID, ServiceID[]>();
      allIds.forEach(sourceId => {
        const targets = byId[sourceId].dependsOn;
        targets.forEach(targetId => {
          const deps = depsById.get(targetId);
          if (!deps) {
            depsById.set(targetId, [sourceId]);
          } else {
            deps.push(sourceId);
          }
        });
      });
      return Object.fromEntries(depsById.entries());
    }
  )
};
