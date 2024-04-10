import Image from 'next/image';
import styles from './LogoLink.module.scss';
import { ILogoLink } from './LogoLink.types';

const LogoLink = ({ logo, alt, href }: ILogoLink) => {
  return (
    <a href={href} target="_blank" className={styles.logoLink}>
      <Image fill src={logo} alt={alt}></Image>
    </a>
  );
};

export default LogoLink;
