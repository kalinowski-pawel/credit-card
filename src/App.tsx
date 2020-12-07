import React, { useEffect, useState } from 'react';
import creditCardType from 'credit-card-type';
import classNames from 'classnames';

import styles from './App.module.css';

type CardNumber = {
  value: string;
  maxLength: number;
  minLength: number;
};

type Code = {
  value: string;
  name: string;
  size: number;
};
const App: React.FC = () => {
  const initialCardNumber = {
    value: '',
    minLength: 12,
    maxLength: 12,
  };

  const initialCode = {
    value: '',
    name: '',
    size: 0,
  };

  const [cardNumber, setCardNumber] = useState<CardNumber>(initialCardNumber);
  const [inputsCount, setInputCount] = useState<number>(0);
  const [cardType, setCardType] = useState<string>('');
  const [expireDate, setExpireDate] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [code, setCode] = useState<Code>(initialCode);

  useEffect(() => {
    //get count of inputs to set proper value to autoTab navigation, it could be basically replaced by static const
    setInputCount(document.getElementsByClassName('form-field').length as number);
    handleCardType();
  }, [cardNumber.value]);

  const onChangeCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validationMessage) {
      setValidationMessage('');
    }
    const { maxLength, value, tabIndex } = event.target;
    setCardNumber({
      ...cardNumber,
      //set card number with spaces after every 4 chars
      value: value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '),
    });
    handleAutoTab(value.length === maxLength, tabIndex);
  };

  const onChangeExpireDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { maxLength, value, tabIndex } = event.target;

    handleExpireDateValidation(value);
    //set date with "/" separator
    setExpireDate(value.replace(/\W/i, '').replace(/(.{2})/, '$1/'));
    handleAutoTab(value.length === maxLength, tabIndex);
  };

  const onChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { maxLength, value, tabIndex } = event.target;

    const data = {
      ...code,
      value,
    };
    setCode(data);
    handleAutoTab(value.length === maxLength, tabIndex);
  };

  const handleCardType = () => {
    if (cardNumber.value) {
      try {
        const cardData = creditCardType(cardNumber.value)[0];

        setCardNumber({
          ...cardNumber,
          //length below includes spaces
          minLength: cardData.lengths[0] + cardData.gaps.length,
          maxLength: cardData.lengths[0] + cardData.gaps.length,
        });
        setCardType(cardData.type);
        setCode({
          name: cardData.code.name,
          size: cardData.code.size,
          value: code.value,
        });
      } catch (e) {
        setValidationMessage('Incorrect card number');
        setCode(initialCode);
        setCardType('');
      }
    }
  };

  const handleExpireDateValidation = (date: string) => {
    const month = parseInt(date.slice(0, 2));
    if (month < 0 || month > 12) {
      setValidationMessage('Incorrect card date');
    }
  };

  const handleAutoTab = (shouldAutoTab: boolean, tabIndex: number) => {
    if (shouldAutoTab) {
      const nextSibling = document.getElementsByClassName(`form-input-${tabIndex + 1}`)[0] as HTMLInputElement;

      if (nextSibling !== null && tabIndex < inputsCount) {
        nextSibling.focus();
      }
    }
  };

  return (
    <React.Fragment>
      <div className={styles.form}>
        {cardType && (
          <div className={classNames(styles[`form-card-type__${cardType}`], styles['form-card-type'])}></div>
        )}
        <input
          minLength={cardNumber.minLength}
          maxLength={cardNumber.maxLength}
          onChange={onChangeCardNumber} //TODO change from onChange to keyPress event
          value={cardNumber.value}
          className={classNames(styles['form-card-number'], 'form-input-1', 'form-field')}
          tabIndex={1}
          autoComplete="off"
          placeholder="CardNumber"
        />
        <input
          onChange={onChangeExpireDate} //TODO change from onChange to keyPress event
          type="text"
          className={classNames(styles['form-card-expire-date'], 'form-input-2', 'form-field')}
          tabIndex={2}
          value={expireDate}
          maxLength={5}
          placeholder="MM/YY"
        />
        {code.name && (
          <input
            onChange={onChangeCode}
            type="text"
            className={classNames(styles['form-card-code'], 'form-input-3', 'form-field')}
            maxLength={code.size}
            tabIndex={3}
            value={code.value}
            placeholder={code.name}
          />
        )}
      </div>
      {validationMessage && <div className={styles.validation}>{validationMessage}</div>}
    </React.Fragment>
  );
};

export default App;
