import { CONSTANTE } from './_CONSTANTS';
import {
  IinicialState,
  IrequestListGasoline,
} from '../../../interfaces/redux/listGasoline';

export function requestToListGasoline(payload: IrequestListGasoline) {
  return {
    type: CONSTANTE.REQUEST_LIST_GASOLINE,
    payload,
  };
}

export function responseToListGasoline(payload: IinicialState) {
  return {
    type: CONSTANTE.RESPONSE_LIST_GASOLINE,
    payload,
  };
}

export function loadingToListGasoline(loading: boolean) {
  return {
    type: CONSTANTE.LOADING_LIST_GASOLINE,
    payload: { loading },
  };
}
