import { Action, action, Thunk, thunk, computed, Computed } from "easy-peasy";
import { Injections } from "./injections";
import { Service, ServiceID } from "../types/service";

type STORE_DATA_STATE = "EMPTY" | "FETCHING" | "AVAILABLE" | "ERROR";
export interface ServicesModel {
  dataState: STORE_DATA_STATE;
  byId: { [x: string]: Service };
  allIds: ServiceID[];
  setDataState: Action<ServicesModel, STORE_DATA_STATE>;
  replaceServices: Action<ServicesModel, Service[]>;
  reloadServices: Thunk<ServicesModel, void, Injections>;
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
    state.byId = Object.fromEntries(payload.map(s => [s.id, s]));
  }),
  reloadServices: thunk(async (actions, _, { injections }) => {
    actions.setDataState("FETCHING");
    try {
      const serviceList = await injections.servicesAPI.fetchAllServices();
      actions.replaceServices(serviceList);
      actions.setDataState("AVAILABLE");
    } catch (error) {
      actions.setDataState("ERROR");
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
