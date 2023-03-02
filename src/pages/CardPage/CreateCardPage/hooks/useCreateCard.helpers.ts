import { RocketCard } from "../../../../interfaces/rocket";

export const isNameOccupied = (name: string, list: RocketCard[]) => {
    return list.some((rocket: RocketCard) => rocket.name === name);
};
