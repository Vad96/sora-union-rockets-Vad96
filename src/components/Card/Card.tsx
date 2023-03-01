import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  name: string;
  login: string;
  id: string;
  handleDelete: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  linkUrl,
  name,
  login,
  id,
  handleDelete,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.ad}>Your add could be here</div>

      <div className={styles.details}>
        <div className={styles.buttonsContainer}>
          <span className={`${styles.truncate}`}>{title}</span>

          <div className={styles.buttons}>
            <Link to={`edit/${id}`}>
              <GrEdit size={25} />
            </Link>
            <button onClick={handleDelete} className={styles.deleteButton}>
              <AiTwotoneDelete size={25} style={{ color: "#f34747" }} />
            </button>
          </div>
        </div>

        <div className={`${styles.cardName} ${styles.truncate}`}>{name}</div>

        <div className={`${styles.descriptionContainer}`}>
          <p className={`${styles.truncate}`}>{description}</p>
          <div className={styles.tooltip}>{description}</div>
        </div>

        <div className={styles.githubProfile}>
          <img className={styles.image} src={imageUrl} alt={name} />
          <div>
            <div> {login}</div>
            <a href={linkUrl} className={styles.githubLink}>
              GitHub profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
