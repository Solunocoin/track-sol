import { HTMLAttributes } from 'react';

export interface ITokenDetailsContainer
  extends React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  innerClassName?: string;
}
