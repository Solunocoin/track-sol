import styles from './TokenDetailsContainer.module.scss';
import { ITokenDetailsContainer } from './TokenDetailsContainer.types';

const TokenDetailsContainer = ({
  children,
  className,
  innerClassName,
  ...rest
}: ITokenDetailsContainer) => {
  return (
    <div
      className={`${styles.tokenDetailsContainer} ${
        className ? className : ''
      }`}
      {...rest}
    >
      <div
        className={`${innerClassName ? innerClassName : ''} ${
          styles.tokenDetailsContainerInner
        } `}
      >
        {children}
      </div>
    </div>
  );
};

export default TokenDetailsContainer;
