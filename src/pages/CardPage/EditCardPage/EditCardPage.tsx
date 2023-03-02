import { Input } from "../../../components/";
import { Button } from "../../../components/";
import { Textarea } from "../../../components/";
import styles from "./editCardPage.module.css";
import AsyncSelect from "react-select/async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoRocketSharp } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { useEditCardData } from "./hooks/useEditCardData";
import { useEditCardHandlers } from "./hooks/useEditCardHandlers";
import { isNameOccupied } from "./hooks/useEditCard.helpers";
import {
  debounceLoadOptions,
  isFieldInError,
  normalizeUsersSelectData,
} from "../helpers";
import { GithubUser } from "../../../interfaces/rocket";

const EditCardPage = (): JSX.Element => {
  const { localState, localActions, globalState } = useEditCardData();
  const { handleChange, handleSelectChange, handleSubmit } =
    useEditCardHandlers({ localState, localActions, globalState });

  return (
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Edit Rocket</h3>
        <BsStars size={30} style={{ color: "#ffe923" }} />
        <IoRocketSharp
          size={30}
          style={{ color: "#37d69c", margin: "0 8px" }}
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
        {localState.currentRocket &&
          isNameOccupied(
            localState.formValues.name,
            globalState.rocketsList,
            localState.currentRocket
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
          defaultValue={normalizeUsersSelectData([
            localState.currentRocket!.user,
          ] as GithubUser[])}
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
};

export default EditCardPage;
