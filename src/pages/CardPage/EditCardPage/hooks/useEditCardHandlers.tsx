import { RocketCard, SelectedOption } from "../../../../interfaces/rocket";
import { validateRequiredFields } from "../../helpers";
import { isNameOccupied } from "./useEditCard.helpers";

interface State {
  localActions: {
    setFormValues: (values: Omit<RocketCard, "id">) => void;
    setSelectedoption: (option: SelectedOption | null) => void;
    setValidationErrors: (errors: string[]) => void;
  };
  localState: {
    currentRocket: RocketCard | undefined;
    validationErrors: string[];
    selectedOption: SelectedOption | null | undefined;
    formValues: Omit<RocketCard, "id">;
  };
  globalState: {
    rocketsList: RocketCard[];
    editRocket: (rocket: RocketCard) => void;
  };
}

export const useEditCardHandlers = ({
  localActions,
  localState,
  globalState,
}: State) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    localActions.setFormValues({ ...localState.formValues, [name]: value });
  };

  const handleSelectChange = (selectedOption: SelectedOption | null) => {
    localActions.setSelectedoption(selectedOption);
    localActions.setFormValues({
      ...localState.formValues,
      user: selectedOption && selectedOption.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors = validateRequiredFields(localState.formValues);
    const isRocketNameOccupied =
      localState.currentRocket &&
      !isNameOccupied(
        localState.formValues.name,
        globalState.rocketsList,
        localState.currentRocket
      ) &&
      !errors.length;
      
    if (isRocketNameOccupied) {
      globalState.editRocket({
        ...localState.currentRocket,
        ...localState.formValues,
      } as RocketCard);
      localActions.setValidationErrors([]);
    } else {
      localActions.setValidationErrors(errors);
    }
  };

  return { handleChange, handleSelectChange, handleSubmit };
};
