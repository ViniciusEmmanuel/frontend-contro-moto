import { CONSTANTE } from './_CONSTANTS';
import {
  IinicialState,
  IrequestListMaintenance,
} from '../../../interfaces/redux/listMaintenance';

export function requestToListMaintenance(payload: IrequestListMaintenance) {
  return {
    type: CONSTANTE.REQUEST_LIST_MAINTENANCE,
    payload,
  };
}

export function responseToListMaintenance(payload: IinicialState) {
  return {
    type: CONSTANTE.RESPONSE_LIST_MAINTENANCE,
    payload,
  };
}

export function loadingToListMaintenance(loading: boolean) {
  return {
    type: CONSTANTE.LOADING_LIST_MAINTENANCE,
    payload: { loading },
  };
}
