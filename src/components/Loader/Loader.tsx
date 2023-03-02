import styles from './loader.module.css';

const Loader = (): JSX.Element => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Loader;
