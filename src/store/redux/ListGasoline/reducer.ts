import { CONSTANTE } from './_CONSTANTS';
import { IAction } from '../../../interfaces/redux/redux';
import { IinicialState } from '../../../interfaces/redux/listGasoline';

const InicialState = {
  startDate: '',
  finishDate: new Date().toISOString().split('T')[0],
  gasolines: [],
  motorcicleId: '',
  loading: false,
} as IinicialState;

export const listGasoline = (
  state = InicialState,
  action: IAction<IinicialState>
) => {
  switch (action.type) {
    case CONSTANTE.RESPONSE_LIST_GASOLINE:
      return { ...action.payload };

    case CONSTANTE.LOADING_LIST_GASOLINE:
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
};
