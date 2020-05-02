import { JSXElementConstructor } from 'react';

export interface IinicialState {
  component: false | JSXElementConstructor<any>;
  props: object;
}

export interface Istate {
  modal: IinicialState;
}
