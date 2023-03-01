import { Link } from "react-router-dom";
import { Card } from "../../components";
import styles from "./homepage.module.css";
import { IoRocketSharp } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRocketsList } from "../../zustand/store";
import { GITHUB_BASE_URL } from "../../constants";
import { RocketsListState, RocketCard } from "../../interfaces/rocket";

function HomePage() {
  const { rocketsList, removeRocket } = useRocketsList(
    (state: RocketsListState) => state
  );

  return (
    <>
      <div className={styles.cardsAdd}>
        <div className={styles.header}>
          <IoRocketSharp
            className="fs-2 text-danger fw-bold"
            size={30}
            style={{ color: "#f34747" }}
          />
          <h3 className={styles.headerText}>List of rockets</h3>
        </div>

        <Link to="/create">
          <HiPlus
            className="fs-2 text-danger fw-bold"
            size={30}
            style={{ color: "grey" }}
          />
        </Link>
      </div>
      {!rocketsList.length ? (
        <h2 className={styles.emptyList}>
          Cards list is empty. Don't worry, you can add as much as you want
        </h2>
      ) : (
        <div className={styles.cardsList}>
          {rocketsList.map((rocket: RocketCard) => (
            <Card
              key={rocket.id}
              id={rocket.id}
              name={rocket.name}
              login={rocket.user!.login}
              title={rocket.title}
              description={rocket.description}
              imageUrl={rocket.user!.avatarUrl}
              linkUrl={`${GITHUB_BASE_URL}/${rocket.user!.login}`}
              handleDelete={() => {
                removeRocket(rocket);
              }}
            />
          ))}
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default HomePage;
