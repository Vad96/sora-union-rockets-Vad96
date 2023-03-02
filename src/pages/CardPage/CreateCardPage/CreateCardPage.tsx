import { Input } from "../../../components/";
import { Button } from "../../../components/";
import { Textarea } from "../../../components/";
import styles from "./createCardPage.module.css";
import AsyncSelect from "react-select/async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoRocketSharp } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { useCreateCardData } from "./hooks/useCreateCardData";
import { useCreateCardHandlers } from "./hooks/useCreateCardHandlers";
import { isNameOccupied } from "./hooks/useCreateCard.helpers";
import { debounceLoadOptions, isFieldInError } from "../helpers";

const CreateCardPage = (): JSX.Element => {
  const { localState, localActions, globalState } = useCreateCardData();
  const { handleChange, handleSelectChange, handleSubmit } =
    useCreateCardHandlers({ localState, localActions, globalState });

  return (
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>New Rocket</h3>
        <BsStars size={30} style={{ color: "#ffe923" }} />
        <IoRocketSharp
          size={30}
          style={{ color: "#f34747", margin: "0 8px" }}
        />
        <BsStars size={30} style={{ color: "#ffe923" }} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={localState.formValues.title}
          onChange={handleChange}
          title="Title"
          placeholder="Enter title"
          isValidField={isFieldInError(
            localState.formValues.title,
            localState.validationErrors
          )}
        />
        <Input
          type="text"
          name="name"
          value={localState.formValues.name}
          onChange={handleChange}
          title="Name"
          placeholder="Enter Rocket name"
          isValidField={isFieldInError(
            localState.formValues.name,
            localState.validationErrors
          )}
        />
        {isNameOccupied(
          localState.formValues.name,
          globalState.rocketsList
        ) && <div className={styles.takenName}>Name is already taken</div>}
        <Textarea
          name="description"
          value={localState.formValues.description}
          onChange={handleChange}
          title="Description"
          placeholder="Enter description"
        />
        <AsyncSelect
          cacheOptions
          loadOptions={debounceLoadOptions}
          onChange={handleSelectChange}
          defaultOptions
          value={localState.selectedOption}
          className={styles.select}
          name="userSelect"
          required
        />
        <Button type="submit">Submit</Button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default CreateCardPage;
