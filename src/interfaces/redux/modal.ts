import { JSXElementConstructor } from 'react';

export interface IinicialState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: false | JSXElementConstructor<any>;
  props: object;
}

export interface Istate {
  modal: IinicialState;
}
