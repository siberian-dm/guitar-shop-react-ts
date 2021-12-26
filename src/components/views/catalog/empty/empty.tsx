import styles from './empty.module.css';

function Empty(): JSX.Element {
  return (
    <div className={styles.container}>
      <h3>По вашему запросу ничего не найдено.</h3>
    </div>
  );
}

export default Empty;
