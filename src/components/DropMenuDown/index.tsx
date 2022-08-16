import React from 'react';
import {SubDropDown} from '../DropSubMenu';

interface Props {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}
export function DropDown({handleChange}: Props) {
  return (
    <>
      <SubDropDown
        handleChange={handleChange('types_contract')}
        title="Tipo de contrato"
        subTitltes={['clt', 'pj', 'estagio']}
      />
      <SubDropDown
        handleChange={handleChange('experience_level')}
        title="Nivel de experiência"
        subTitltes={['junior', 'pleno', 'senior']}
      />

      <SubDropDown
        handleChange={handleChange('size_company')}
        title="Tamanho da empresa"
        subTitltes={['startup', 'pequena', 'grande']}
      />

      <SubDropDown
        handleChange={handleChange('remote')}
        title="Remoto"
        subTitltes={['sim', 'não']}
      />
    </>
  );
}
