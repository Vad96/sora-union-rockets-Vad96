import uniqid from "uniqid";
import { RocketCard, SelectedOption } from "../../../../interfaces/rocket";
import { validateRequiredFields } from "../../helpers";
import { isNameOccupied } from "./useCreateCard.helpers";

interface State {
  localActions: {
    setFormValues: (values: Omit<RocketCard, "id">) => void;
    setSelectedoption: (option: SelectedOption | null) => void;
    setValidationErrors: (errors: string[]) => void;
  };
  localState: {
    validationErrors: string[];
    selectedOption: SelectedOption | null | undefined;
    formValues: Omit<RocketCard, "id">;
  };
  globalState: {
    rocketsList: RocketCard[];
    addRocket: (rocket: RocketCard) => void;
  };
}

export const useCreateCardHandlers = ({
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
      user: selectedOption!.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors = validateRequiredFields(localState.formValues);

    const isRocketNameOccupied =
      !isNameOccupied(localState.formValues.name, globalState.rocketsList) &&
      !errors.length;

    if (isRocketNameOccupied) {
      globalState.addRocket({ ...localState.formValues, id: uniqid() });
      localActions.setFormValues({
        title: "",
        name: "",
        description: "",
        user: null,
      });

      localActions.setValidationErrors([]);
      localActions.setSelectedoption(null);
    } else {
      localActions.setValidationErrors(errors);
    }
  };

  return { handleChange, handleSelectChange, handleSubmit };
};
