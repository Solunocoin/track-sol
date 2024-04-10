import styles from './Card.module.scss';

const Card = ({ children }: ICard) => {
  return (
    <div className={styles.tokenCardWrapper}>
      <div className={styles.tokenCard}>{children}</div>
    </div>
  );
};

export default Card;
