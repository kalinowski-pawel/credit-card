import React, { RefObject } from 'react';
import creditCardType from 'credit-card-type';
import classNames from 'classnames';
import { formatCardNumber } from './helpers/FormatCardNumber/FormatCardNumber';
import { dateFormat } from './helpers/DateFormat/DateFormat';
import { dateValidator } from './helpers/DateValidator/DateValidator';
import { VALIDATION, CARD } from './constants/const';
import { IProps, IState } from './AppTypes';

import styles from './App.module.css';

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
    name: CARD.CODE_CVS,
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

    this.myRefs = [React.createRef(), React.createRef(), React.createRef()] as Array<RefObject<HTMLInputElement>>;
  }

  onChangeCardNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (this.state.validationMessage) {
      this.setState({
        validationMessage: '',
      });
    }

    const { value, tabIndex } = event.target;
    try {
      const cardData = creditCardType(value)[0];

      this.setState(
        {
          cardNumber: {
            ...this.state.cardNumber,
            minLength: cardData.lengths[0] + cardData.gaps.length,
            maxLength: cardData.lengths[0] + cardData.gaps.length,
            value: formatCardNumber(value, cardData.gaps),
          },
          cardType: value.length > 0 ? cardData.type : '',
          code: {
            name: cardData.code.name,
            size: cardData.code.size,
            value: this.state.code.value,
          },
        },
        () => {
          this.handleAutoTab(value.length === this.state.cardNumber.maxLength, tabIndex);
        },
      );
    } catch (e) {
      this.setState({
        validationMessage: VALIDATION.INCORRECT_CARD_NUMBER,
        code: this.initialCode,
        cardType: '',
      });
    }
  };

  onChangeExpireDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { maxLength, value, tabIndex } = event.target;

    this.setState({
      expirationDate: dateFormat(value),
      // TODO set validation message properlly according to the current value
      validationMessage: !Number.isInteger(value) ? VALIDATION.DATE_AS_NUMBER : dateValidator(value),
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

  handleAutoTab = (shouldAutoTab: boolean, tabIndex: number): void => {
    if (this.myRefs[tabIndex] && shouldAutoTab && tabIndex < this.INPUTS_COUNT) {
      this.myRefs[tabIndex]?.current?.focus();
    }
  };

  render(): JSX.Element {
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={classNames(styles[`form-card-type__${this.state.cardType}`], styles['form-card-type'])} />
          <input
            minLength={this.state.cardNumber.minLength}
            maxLength={this.state.cardNumber.maxLength}
            onChange={this.onChangeCardNumber}
            value={this.state.cardNumber.value}
            className={classNames(styles['form-card-number'], 'form-input-1', 'form-field')}
            tabIndex={1}
            autoComplete="off"
            placeholder="CardNumber"
            ref={this.myRefs[0]}
          />
          <input
            onChange={this.onChangeExpireDate}
            type="text"
            className={classNames(styles['form-card-expire-date'], 'form-input-2', 'form-field')}
            tabIndex={2}
            value={this.state.expirationDate}
            maxLength={5}
            autoComplete="off"
            placeholder="MM/YY"
            ref={this.myRefs[1]}
          />
          <input
            onChange={this.onChangeCode}
            type="text"
            className={classNames(styles['form-card-code'], 'form-input-3', 'form-field')}
            maxLength={this.state.code.size}
            autoComplete="off"
            tabIndex={3}
            value={this.state.code.value}
            placeholder={this.state.code.name}
            ref={this.myRefs[2]}
          />
        </div>
        {this.state.validationMessage && <div className={styles.validation}>{this.state.validationMessage}</div>}
      </div>
    );
  }
}
