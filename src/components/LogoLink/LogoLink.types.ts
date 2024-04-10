import { StaticImageData } from 'next/image';

export interface ILogoLink {
  logo: StaticImageData;
  alt: string;
  href: string;
}
