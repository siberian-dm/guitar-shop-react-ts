import { useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import styles from './modal-success.module.css';

type TProps = {
  onClose: () => void;
}

function ModalSuccess({ onClose }: TProps): JSX.Element {

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onEscKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', onEscKeyDown);

    return () => {
      document.removeEventListener('keydown', onEscKeyDown);
    };
  }, [onClose]);

  const onModalOverlayClick = () => {
    onClose();
  };

  const onCloseBtnClick = () => {
    onClose();
  };

  return (
    <FocusLock>
      <div className={styles['modal-success']}>
        <div className="modal is-active modal--success">
          <div className="modal__wrapper">
            <div
              className="modal__overlay"
              data-testid="modal-overlay"
              data-close-modal
              onClick={onModalOverlayClick}
            />
            <div className="modal__content">
              <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                <use xlinkHref="#icon-success"/>
              </svg>
              <p className="modal__message">Спасибо за ваш отзыв!</p>
              <div className="modal__button-container modal__button-container--review">
                <button
                  className="button button--small modal__button modal__button--review"
                  onClick={onCloseBtnClick}
                >
                  К покупкам!
                </button>
              </div>
              <button
                className="modal__close-btn button-cross"
                type="button"
                aria-label="Закрыть"
                onClick={onCloseBtnClick}
              >
                <span className="button-cross__icon"/><span className="modal__close-btn-interactive-area"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default ModalSuccess;
