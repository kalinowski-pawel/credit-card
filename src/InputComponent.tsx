import React from 'react';
import { ReactComponent } from '*.svg';

interface PropsInterface {
  maxLength?: number;
  onChange: () => string;
  value: string;
}

const InputComponent = (props: PropsInterface) => {
  const [validation, setValidation] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('test', event);
    props.onChange();
  };

  return (
    <React.Fragment>
      <input maxLength={props.maxLength} onChange={onChange} value={props.value} />
      <div></div>
    </React.Fragment>
  );
};
