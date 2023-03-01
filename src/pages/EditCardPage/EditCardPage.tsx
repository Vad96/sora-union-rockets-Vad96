import { useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../../components/";
import { Button } from "../../components/";
import { Textarea } from "../../components/";
import styles from "./editCardPage.module.css";
import AsyncSelect from "react-select/async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoRocketSharp } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { useRocketsList } from "../../zustand/store";
import { validateRequiredFields } from "../helpers";
import { debounceLoadOptions, normalizeUsersSelectData } from "../helpers";
import {
  RocketsListState,
  RocketCard,
  SelectedOption,
  GithubUser,
} from "../../interfaces/rocket";

function EditCardPage() {
  const { rocketsList, editRocket } = useRocketsList(
    (state: RocketsListState) => state
  );
  const { id: rocketId } = useParams();

  const currentRocket = useMemo(() => {
    return rocketsList.find((rocket: RocketCard) => rocket.id === rocketId);
  }, [rocketId, rocketsList]);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [selectedOption, setSelectedoption] = useState<SelectedOption | null>();
  const [formValues, setFormValues] = useState<Omit<RocketCard, "id">>({
    title: currentRocket!.title,
    name: currentRocket!.name,
    description: currentRocket!.description,
    user: currentRocket!.user,
  });

  const isOccupiedRocketName = useCallback(
    (name: string) =>
      rocketsList.some(
        (rocket: RocketCard) =>
          currentRocket!.id !== rocket.id && rocket.name === name
      ),
    [currentRocket, rocketsList]
  );

  const isFieldInError = useCallback(
    (fieldName: string) => validationErrors.includes(fieldName),
    [validationErrors]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    },
    [formValues]
  );

  const handleSelectChange = (selectedOption: SelectedOption) => {
    setSelectedoption(selectedOption);
    setFormValues({ ...formValues, user: selectedOption.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors = validateRequiredFields(formValues);
    if (!isOccupiedRocketName(formValues.name) && !errors.length) {
      editRocket({ ...currentRocket, ...formValues } as RocketCard);
      setValidationErrors([]);
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <>
      {" "}
      <div className={styles.header}>
        <h3 className={styles.title}>Edit Rocket</h3>
        <BsStars
          className="fs-2 text-danger fw-bold"
          size={30}
          style={{ color: "#ffe923" }}
        />
        <IoRocketSharp
          className="fs-2 text-danger fw-bold"
          size={30}
          style={{ color: "#37d69c", margin: "0 8px" }}
        />
        <BsStars
          className="fs-2 text-danger fw-bold"
          size={30}
          style={{ color: "#ffe923" }}
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          title="Title"
          placeholder="Enter title"
          isValidField={isFieldInError(formValues.title)}
        />

        <Input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          title="Name"
          placeholder="Enter Rocket name"
          isValidField={isFieldInError(formValues.name)}
        />
        {isOccupiedRocketName(formValues.name) && (
          <div className={styles.takenName}>Name is already taken</div>
        )}

        <Textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          title="Description"
          placeholder="Enter description"
        />
        <AsyncSelect
          cacheOptions
          defaultValue={normalizeUsersSelectData([
            currentRocket!.user,
          ] as GithubUser[])}
          loadOptions={debounceLoadOptions}
          onChange={handleSelectChange}
          defaultOptions
          value={selectedOption}
          className={styles.select}
          name="userSelect"
          required
        />
        <Button type="submit">Submit</Button>
        <ToastContainer />
      </form>
    </>
  );
}

export default EditCardPage;
