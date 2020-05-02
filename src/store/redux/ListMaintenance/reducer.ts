import { CONSTANTE } from './_CONSTANTS';
import { IAction } from '../../../interfaces/redux/redux';
import { IinicialState } from '../../../interfaces/redux/listMaintenance';

const InicialState = {
  startDate: '',
  finishDate: new Date().toISOString().split('T')[0],
  maintenances: [],
  motorcicleId: '',
  partId: '',
  loading: false,
} as IinicialState;

export const listMaintenance = (
  state = InicialState,
  action: IAction<IinicialState>
) => {
  switch (action.type) {
    case CONSTANTE.RESPONSE_LIST_MAINTENANCE:
      return { ...action.payload };

    case CONSTANTE.LOADING_LIST_MAINTENANCE:
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
};
