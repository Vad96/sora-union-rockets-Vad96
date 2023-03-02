import { RocketCard } from "../../../../interfaces/rocket";

export const isNameOccupied = (
  name: string,
  list: RocketCard[],
  currentRocket: RocketCard
) =>
  list.some(
    (rocket: RocketCard) =>
      currentRocket!.id !== rocket!.id && rocket!.name === name
  );
