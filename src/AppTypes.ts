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

export interface IProps {}

export interface IState {
  cardNumber: CardNumber;
  code: Code;
  cardType: string;
  expirationDate: string;
  validationMessage: string;
}
