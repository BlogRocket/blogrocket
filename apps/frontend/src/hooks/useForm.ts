import React from 'react';

const useForm = <V extends Record<string, any>>(initialValues?: V) => {
  const [values, setValues] = React.useState<V | {}>(initialValues || {});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const onTextChange = (text: string, name: string) => {
    setValues((v) => ({ ...v, [name]: text }));
  }

  return {
    values: values as V,
    onChange,
    onTextChange
  };
};

export default useForm;