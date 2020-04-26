import { CONSTANTE } from './_CONSTANTS';
import { IAction } from '../../../interfaces/redux/redux';
import { IinicialState } from '../../../interfaces/redux/home';

const InicialState = {
  motorcicles: [],
  parts: [],
  loading: false,
};

export const home = (
  state = InicialState as IinicialState,
  action: IAction<IinicialState>
) => {
  switch (action.type) {
    case CONSTANTE.RESPONSE_MOTORCICLE_PARTS:
      return { ...action.payload };

    default:
      return state;
  }
};
