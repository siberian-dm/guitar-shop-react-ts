import styles from './not-found.module.css';
import { AppRoute } from '../../../const';
import { useHistory } from 'react-router-dom';

function NotFound(): JSX.Element {
  const history = useHistory();

  const onBtnClick = () => {
    history.push(AppRoute.Root);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.text}>404. Страница не найдена!</h2>
      <button
        className='button button--mini'
        onClick={onBtnClick}
      >
        На главную
      </button>
    </div>
  );
}

export default NotFound;
