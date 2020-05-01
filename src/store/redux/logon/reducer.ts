import { CONSTANTE } from './_CONSTANTS';
import { IAction } from '../../../interfaces/redux/redux';
import { IinicialState } from '../../../interfaces/redux/logon';

const InicialState = {
  auth: false,
  user: '',
  name: '',
  token: '',
  loading: false,
} as IinicialState;

export const logon = (state = InicialState, action: IAction<IinicialState>) => {
  switch (action.type) {
    case CONSTANTE.RESPONSE_LOGON:
      return { ...action.payload };

    case CONSTANTE.REQUEST_LOGOUT:
      localStorage.clear();
      return InicialState;

    case CONSTANTE.LOADING_TO_REQUEST:
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
};
