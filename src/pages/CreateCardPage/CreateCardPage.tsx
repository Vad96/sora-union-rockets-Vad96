import { useState, useCallback } from "react";
import { Input } from "../../components/";
import { Button } from "../../components/";
import { Textarea } from "../../components/";
import styles from "./createCardPage.module.css";
import AsyncSelect from "react-select/async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoRocketSharp } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import uniqid from "uniqid";
import { useRocketsList } from "../../zustand/store";
import { validateRequiredFields } from "../helpers";
import { debounceLoadOptions } from "../helpers";
import {
  RocketsListState,
  RocketCard,
  SelectedOption,
} from "../../interfaces/rocket";

function CreateCardPage() {
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

  const isOccupiedRocketName = useCallback(
    (name: string) => {
      return rocketsList.some((rocket: RocketCard) => rocket.name === name);
    },
    [rocketsList]
  );

  const isFieldInError = useCallback(
    (fieldName: string) => {
      return validationErrors.includes(fieldName);
    },
    [validationErrors]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    },
    [formValues]
  );

  const handleSelectChange = (selectedOption: SelectedOption | null) => {
    setSelectedoption(selectedOption);
    setFormValues({ ...formValues, user: selectedOption!.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors = validateRequiredFields(formValues);
    if (!isOccupiedRocketName(formValues.name) && !errors.length) {
      addRocket({ ...formValues, id: uniqid() });
      setFormValues({
        title: "",
        name: "",
        description: "",
        user: null,
      });
      setValidationErrors([]);
      setSelectedoption(null);
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>New Rocket</h3>
        <BsStars
          className="fs-2 text-danger fw-bold"
          size={30}
          style={{ color: "#ffe923" }}
        />
        <IoRocketSharp
          className="fs-2 text-danger fw-bold"
          size={30}
          style={{ color: "#f34747", margin: "0 8px" }}
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

export default CreateCardPage;
