import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import produce from "immer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/localStorage";
import { RocketsListState, RocketCard } from "../interfaces/rocket";

export const useRocketsList = create(
  immer<RocketsListState>((set) => ({
    rocketsList: getLocalStorageData("rockets") || [],

    addRocket: (rocket: RocketCard) => {
      set((state: RocketsListState) => {
        try {
          state.rocketsList.push(rocket);
          setLocalStorageData("rockets", state.rocketsList);
          toast.success(`${rocket.name} is created`);
        } catch (error) {
          console.error("Error creating rocket: ", error);
          toast.error("Ooooops!...Error creating rocket");
        }
      });
    },

    removeRocket: (rocket: RocketCard) => {
      set((state: RocketsListState) => {
        try {
          state.rocketsList = state.rocketsList.filter((item: RocketCard) => {
            return item.name !== rocket.name;
          });
          setLocalStorageData("rockets", state.rocketsList);
          toast.success(`${rocket.name} was deleted`);
        } catch (error) {
          console.error("Error removing rocket: ", error);
          toast.error("Ooooops!...Error removing rocket");
        }
      });
    },

    editRocket: (rocket: RocketCard) =>
      set((state: RocketsListState) =>
        produce(state, (draft: RocketsListState) => {
          try {
            const currentObj = draft.rocketsList.find(
              (obj: RocketCard) => obj.id === rocket.id
            );
            Object.assign(currentObj!, rocket);
            setLocalStorageData("rockets", draft.rocketsList);
            toast.success(`${rocket.name} was updated`);
          } catch (error) {
            console.error("Error editing rocket: ", error);
            toast.error("Ooooops!...Error editing rocket");
          }
        })
      ),
  }))
);
