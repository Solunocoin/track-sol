import styles from './Button.module.scss';

const Button = ({ children, disabled, className, ...rest }: IButton) => {
  return (
    <button
      className={` ${className ? className : ''} ${styles.button} ${
        disabled ? styles.buttonDisabled : ''
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
