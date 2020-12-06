import React, { useEffect, useState } from 'react';
import creditCardType from 'credit-card-type';

import './App.css';

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
    setInputCount(document.getElementsByClassName('field').length as number);
    handleCardType();
    console.log('use effect');
  }, [cardNumber]);

  const onChangeCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onChangeNumber');
    if (validationMessage) {
      setValidationMessage('');
    }
    const { maxLength, value, tabIndex } = event.target;
    const test = value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    setCardNumber({
      ...cardNumber,
      value: test,
    });
    handleAutoTab(value.length === maxLength, tabIndex);
  };

  const onChangeExpireDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TODO validate expiry date with card number
    const { maxLength, value, tabIndex } = event.target;
    setExpireDate(value);
    handleAutoTab(value.length === maxLength, tabIndex);
  };

  const onChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onCHangeCode');
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
      console.log(creditCardType(cardNumber.value));
      try {
        const cardData = creditCardType(cardNumber.value)[0];
        setCardType(cardData.type);
        setCode({
          name: cardData.code.name,
          size: cardData.code.size,
          value: code.value,
        });
      } catch (e) {
        setValidationMessage('Incorrect card number');
        setCode(initialCode);
      }
    }
  };

  const handleAutoTab = (shouldAutoTab: boolean, tabIndex: number) => {
    if (shouldAutoTab) {
      const nextSibling = document.getElementsByClassName(`input-field-${tabIndex + 1}`)[0] as HTMLInputElement;

      if (nextSibling !== null && tabIndex < inputsCount) {
        nextSibling.focus();
      }
    }
  };

  return (
    <React.Fragment>
      <div className="example-form">
        {cardType && <div className={cardType}></div>}
        <input
          minLength={cardNumber.minLength}
          maxLength={cardNumber.maxLength}
          onChange={onChangeCardNumber}
          value={cardNumber.value}
          className="card-number-section input-field-1 field"
          tabIndex={1}
          autoComplete="off"
          placeholder="CardNumber"
        />
        <input
          onChange={onChangeExpireDate}
          type="text"
          className="card-expire-date input-field-2 field"
          tabIndex={2}
          value={expireDate}
          maxLength={4}
          placeholder="MM/YY"
        />
        {code.name && (
          <input
            onChange={onChangeCode}
            type="text"
            className="card-code input-field-3 field"
            maxLength={code.size}
            tabIndex={3}
            value={code.value}
            placeholder={code.name}
          />
        )}
      </div>
      {validationMessage && <div className="validation">{validationMessage}</div>}
    </React.Fragment>
  );
};

export default App;
