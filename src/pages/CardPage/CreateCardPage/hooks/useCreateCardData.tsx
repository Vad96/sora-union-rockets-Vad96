import { useState, useMemo } from "react";
import { useRocketsList } from "../../../../zustand/store";
import {
  RocketsListState,
  RocketCard,
  SelectedOption,
} from "../../../../interfaces/rocket";

export const useCreateCardData = () => {
  const { rocketsList, addRocket } = useRocketsList(
    (state: RocketsListState) => state
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [selectedOption, setSelectedoption] = useState<SelectedOption | null>();
  const [formValues, setFormValues] = useState<Omit<RocketCard, "id">>({
    title: "",
    name: "",
    description: "",
    user: null,
  });

  return {
    localActions: {
      setValidationErrors,
      setSelectedoption,
      setFormValues,
    },
    localState: {
      validationErrors,
      selectedOption,
      formValues,
    },
    globalState: { rocketsList, addRocket },
  };
};
