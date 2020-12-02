import React, { useState } from 'react';
import './App.css';

type Card = {
  section1: number | string;
  section2: number | string;
  section3: number | string;
  section4: number | string;
};

const App = () => {
  const [cardNumber, setCardNumber] = useState<Card>({
    section1: '',
    section2: '',
    section3: '',
    section4: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { maxLength, value, tabIndex } = e.target;
    const valueLength = value.length;

    const data = {
      ...cardNumber,
      [`section${tabIndex}`]: value,
    };

    setCardNumber(data);
    if (valueLength === maxLength) {
      const nextSibling = document.getElementsByClassName(`field-${tabIndex + 1}`)[0] as HTMLInputElement;

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
  };

  return (
    <div className="example-form">
      <div className="field-credit-card">
        <input
          maxLength={4}
          onChange={onChange}
          value={cardNumber.section1}
          className="card-number field-1"
          tabIndex={1}
        />
        <input
          maxLength={4}
          onChange={onChange}
          value={cardNumber.section2}
          className="card-number field-2"
          tabIndex={2}
        />
        <input
          maxLength={4}
          onChange={onChange}
          value={cardNumber.section3}
          className="card-number field-3"
          tabIndex={3}
        />
        <input
          maxLength={4}
          onChange={onChange}
          value={cardNumber.section4}
          className="card-number field-4"
          tabIndex={4}
        />
        <input type="text" className="card-expire-date" pattern="[0-9][0-9]/[0-9][0-9]" />
        <input type="text" className="card-expire-date" pattern={'[0-9]*'} maxLength={3} />
      </div>
    </div>
  );
};

export default App;
