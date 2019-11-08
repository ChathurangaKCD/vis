import {
  Action,
  action,
  computed,
  Computed,
  Thunk,
  thunk,
  ThunkOn,
  thunkOn
} from "easy-peasy";
import { Service, ServiceID } from "../types/service";
import { Injections } from "./injections";

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
  /** Remove a service in store */
  removeService: Action<ServicesModel, ServiceID>;
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
  /** Delete service & update store */
  deleteService: ServiceThunk<ServiceID, boolean>;
  /** Compute dependants of each service */
  dependantsById: Computed<ServicesModel, { [x in ServiceID]: ServiceID[] }>;
  /** Refetch and update a modified/created service */
  onUpsertService: ThunkOn<ServicesModel>;
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
  removeService: action((state, serviceId) => {
    const idx = state.allIds.findIndex(id => id === serviceId);
    state.allIds.splice(idx, 1);
    delete state.byId[serviceId];
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
  deleteService: thunk(async (actions, serviceId, { injections }) => {
    try {
      await injections.servicesAPI.deleteServiceById(serviceId);
      actions.removeService(serviceId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }),
  onUpsertService: thunkOn(
    actions => [actions.createService, actions.updateService],
    async (actions, targetAction) => {
      const { result, payload } = targetAction;
      if (result === true) {
        const res = await actions.reloadServiceById(payload.id);
        console.log(
          `Refetch service ${payload.id} ${res ? "success" : "error"}`
        );
      } else {
        console.log(
          "Service update action resulted in an error. Won't be refetched."
        );
      }
    }
  ),
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
