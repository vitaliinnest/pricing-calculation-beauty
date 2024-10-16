import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistStorage } from "zustand/middleware";

export const buildStorage = <PersistedState,>(): PersistStorage<PersistedState> => ({
  getItem: async (name) => {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  },
  setItem: async (name, value) => {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(name, jsonValue);
  },
  removeItem: async (name) => await AsyncStorage.removeItem(name),
});
