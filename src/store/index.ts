import { createStore } from "easy-peasy";
import { storeModel } from "./store.model";
import { ServicesAPI } from "../api";

const store = createStore(storeModel, {
  injections: { servicesAPI: ServicesAPI }
});

export default store;
