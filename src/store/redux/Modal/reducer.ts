import { CONSTANTE } from './_CONSTANTS';
import { IinicialState } from '../../../interfaces/redux/modal';
import { IAction } from '../../../interfaces/redux/redux';

const InicialState = {
  component: false,
  props: {},
} as IinicialState;

export const modal = (state = InicialState, action: IAction<IinicialState>) => {
  switch (action.type) {
    case CONSTANTE.OPEN_MODAL:
      return {
        component: action.payload.component,
        props: action.payload.props,
      };

    case CONSTANTE.CLOSE_MODAL:
      return InicialState;

    default:
      return state;
  }
};
