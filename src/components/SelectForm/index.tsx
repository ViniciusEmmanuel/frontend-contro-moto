import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { SelectForm } from './styles';

export const Select = ({ name, ...rest }) => {
  const ref = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
      });
    }
  }, [ref, fieldName, registerField]);

  return (
    <>
      <SelectForm
        className={error ? 'error' : ''}
        ref={ref}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
};
