import React from 'react';
import { Props } from './Props.1';

export default function FontAwesomeIcon({
  className,
  children,
}: Props): JSX.Element {
  return <i className={`fa ${className}`}>{children}</i>;
}
