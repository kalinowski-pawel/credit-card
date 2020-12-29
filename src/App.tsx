import React from 'react';
import creditCardType from 'credit-card-type';
import classNames from 'classnames';

import styles from './App.module.css';

interface IProps {}

interface IState {
  cardNumber: CardNumber;
  code: Code;
  cardType: string;
  expirationDate: string;
  validationMessage: string;
}

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

export class App extends React.Component<IProps, IState> {
  private INPUTS_COUNT = 3 as number;
  private readonly myRefs;
  private initialCardNumber = {
    value: '',
    minLength: 12,
    maxLength: 12,
  };

  private initialCode = {
    value: '',
    name: 'CVS',
    size: 3,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      cardNumber: this.initialCardNumber,
      code: this.initialCode,
      cardType: '',
      expirationDate: '',
      validationMessage: '',
    };

    this.myRefs = {
      1: React.createRef(),
      2: React.createRef(),
      3: React.createRef(),
    } as any;
  }

  onChangeCardNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (this.state.validationMessage) {
      this.setState({
        validationMessage: '',
      });
    }

    const { maxLength, value, tabIndex } = event.target;
    try {
      const cardData = creditCardType(value)[0];

      this.setState({
        cardNumber: {
          ...this.state.cardNumber,
          minLength: cardData.lengths[0] + cardData.gaps.length,
          maxLength: cardData.lengths[0] + cardData.gaps.length,
          //set card number with spaces after every 4 chars
          value: value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '),
        },
        cardType: value.length > 0 ? cardData.type : '',
        code: {
          name: cardData.code.name,
          size: cardData.code.size,
          value: this.state.code.value,
        },
      });
    } catch (e) {
      this.setState({
        validationMessage: 'Incorrect card number',
        code: this.initialCode,
        cardType: '',
      });
    }
    this.handleAutoTab(value.length === maxLength, tabIndex);
  };

  onChangeExpireDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { maxLength, value, tabIndex } = event.target;

    this.handleExpireDateValidation(value);
    //set date with "/" separator
    this.setState({
      expirationDate: value.replace(/\W/i, '').replace(/(.{2})/, '$1/'),
    });

    this.handleAutoTab(value.length === maxLength, tabIndex);
  };

  onChangeCode = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { maxLength, value, tabIndex } = event.target;
    this.setState({
      code: {
        ...this.state.code,
        value: value,
      },
    });

    this.handleAutoTab(value.length === maxLength, tabIndex);
  };

  handleExpireDateValidation = (date: string): void => {
    const month = parseInt(date.slice(0, 2));
    if (month < 0 || month > 12) {
      this.setState({
        validationMessage: 'Incorrect card date',
      });
    }
  };

  handleAutoTab = (shouldAutoTab: boolean, tabIndex: number): void => {
    if (this.myRefs[tabIndex + 1] && shouldAutoTab && tabIndex < this.INPUTS_COUNT) {
      this.myRefs[tabIndex + 1].current.focus();
    }
  };

  render(): JSX.Element {
    console.log(this.state.cardType);
    return (
      <React.Fragment>
        <div className={styles.form}>
          <div className={classNames(styles[`form-card-type__${this.state.cardType}`], styles['form-card-type'])}></div>
          <input
            minLength={this.state.cardNumber.minLength}
            maxLength={this.state.cardNumber.maxLength}
            onChange={this.onChangeCardNumber} //TODO change from onChange to keyPress event
            value={this.state.cardNumber.value}
            className={classNames(styles['form-card-number'], 'form-input-1', 'form-field')}
            tabIndex={1}
            autoComplete="off"
            placeholder="CardNumber"
            ref={this.myRefs[1]}
          />
          <input
            onChange={this.onChangeExpireDate} //TODO change from onChange to keyPress event
            type="text"
            className={classNames(styles['form-card-expire-date'], 'form-input-2', 'form-field')}
            tabIndex={2}
            value={this.state.expirationDate}
            maxLength={5}
            placeholder="MM/YY"
            ref={this.myRefs[2]}
          />
          <input
            onChange={this.onChangeCode}
            type="text"
            className={classNames(styles['form-card-code'], 'form-input-3', 'form-field')}
            maxLength={this.state.code.size}
            tabIndex={3}
            value={this.state.code.value}
            placeholder={this.state.code.name}
            ref={this.myRefs[3]}
          />
        </div>
        {this.state.validationMessage && <div className={styles.validation}>{this.state.validationMessage}</div>}
      </React.Fragment>
    );
  }
}
