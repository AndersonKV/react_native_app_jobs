import React from 'react';
import {Props} from './fontawesome';

export function FontAwesomeIcon({className, children, ...props}: Props) {
  return (
    <i className={`fa ${className}`} {...props}>
      {children}
    </i>
  );
}
