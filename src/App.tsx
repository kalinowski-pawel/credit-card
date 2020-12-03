import React, { useEffect, useState } from 'react';
import './App.css';

const CARD_TYPES = {
  MASTER_CARD: 'MasterCard',
  VISA: 'Visa',
};

type Card = {
  numberSection1: number | string;
  numberSection2: number | string;
  numberSection3: number | string;
  numberSection4: number | string;
};

const App: React.FC = () => {
  const [cardData, setCardData] = useState<Card>({
    numberSection1: '',
    numberSection2: '',
    numberSection3: '',
    numberSection4: '',
  });

  const [inputsCount, setInputCount] = useState<number>(0);
  const [cardLogo, setCardLogo] = useState<string>(CARD_TYPES.MASTER_CARD);
  const [expireDate, setExpireDate] = useState<string>('');
  const [cvcCode, setCvcCode] = useState<string>('');

  useEffect(() => {
    setInputCount(document.getElementsByClassName('field').length as number);
    handleCardType();
  }, [cardData]);

  const onChangeCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { maxLength, value, tabIndex, id } = event.target;
    const data = {
      ...cardData,
      [`${id}`]: value,
    };

    setCardData(data);

    if (value.length === maxLength) {
      handleAutoTab(tabIndex);
    }
  };

  const onChangeExpireDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TODO validate expiry date with card number
    const { maxLength, value, tabIndex } = event.target;
    setExpireDate(value);
    if (value.length === maxLength) {
      handleAutoTab(tabIndex);
    }
  };

  const onChangeCvcCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TODO validate correctness of cvc code
    const { maxLength, value, tabIndex } = event.target;
    setCvcCode(value);
    if (value.length === maxLength) {
      handleAutoTab(tabIndex);
    }
  };

  //TODO verify card type by number card
  const handleCardType = () => {
    if (cardData.numberSection1 === '1111') {
      setCardLogo(CARD_TYPES.MASTER_CARD);
    } else {
      setCardLogo(CARD_TYPES.VISA);
    }
  };

  const handleAutoTab = (tabIndex: number) => {
    const nextSibling = document.getElementsByClassName(`input-field-${tabIndex + 1}`)[0] as HTMLInputElement;

    if (nextSibling !== null && tabIndex < inputsCount) {
      nextSibling.focus();
    }
  };

  return (
    <div className="example-form">
      <span>{cardLogo}</span>
      <div className="card-number">
        <input
          maxLength={4}
          onChange={onChangeCardNumber}
          value={cardData.numberSection1}
          className="card-number-section input-field-1 field"
          tabIndex={1}
          id="numberSection1"
        />
        <input
          maxLength={4}
          onChange={onChangeCardNumber}
          value={cardData.numberSection2}
          className="card-number-section input-field-2 field"
          tabIndex={2}
          id="numberSection2"
        />
        <input
          maxLength={4}
          onChange={onChangeCardNumber}
          value={cardData.numberSection3}
          className="card-number-section input-field-3 field"
          tabIndex={3}
          id="numberSection3"
        />
        <input
          maxLength={4}
          onChange={onChangeCardNumber}
          value={cardData.numberSection4}
          className="card-number-section input-field-4 field"
          tabIndex={4}
          id="numberSection4"
        />
      </div>
      <input
        onChange={onChangeExpireDate}
        type="text"
        className="card-expire-date input-field-5 field"
        tabIndex={5}
        value={expireDate}
        maxLength={4}
        id="expireDate"
      />
      <input
        onChange={onChangeCvcCode}
        type="text"
        className="card-cvc-code input-field-6 field"
        maxLength={3}
        tabIndex={6}
        value={cvcCode}
        id="cvcCode"
      />
    </div>
  );
};

export default App;
