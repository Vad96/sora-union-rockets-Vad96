import { useState, useMemo } from "react";
import { useRocketsList } from "../../../../zustand/store";
import {
  RocketsListState,
  RocketCard,
  SelectedOption,
} from "../../../../interfaces/rocket";
import { useParams } from "react-router-dom";

export const useEditCardData = () => {
  const { rocketsList, editRocket } = useRocketsList(
    (state: RocketsListState) => state
  );

  const { id: rocketId } = useParams();

  const currentRocket = useMemo(() => {
    return rocketsList.find((rocket: RocketCard) => rocket!.id === rocketId);
  }, [rocketId, rocketsList]);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [selectedOption, setSelectedoption] = useState<SelectedOption | null>();
  const [formValues, setFormValues] = useState<Omit<RocketCard, "id">>({
    title: (currentRocket && currentRocket.title) || "",
    name: (currentRocket && currentRocket.name) || "",
    description: (currentRocket && currentRocket.description) || "",
    user: currentRocket!.user,
  });

  const localActions = useMemo(() => {
    return {
      setValidationErrors,
      setSelectedoption,
      setFormValues,
    };
  }, []);

  return {
    localActions,
    localState: {
      currentRocket,
      validationErrors,
      selectedOption,
      formValues,
    },
    globalState: { rocketsList, editRocket },
  };
};
