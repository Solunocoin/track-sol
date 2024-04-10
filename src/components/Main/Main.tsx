import styles from './Main.module.scss';

const Main = ({ children }: IMain) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
