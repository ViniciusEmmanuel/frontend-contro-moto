import { CONSTANTE } from './_CONSTANTS';
import { Ilogon, IinicialState } from '../../../interfaces/redux/logon';

export function requestToLogin(user: Ilogon) {
  return {
    type: CONSTANTE.REQUEST_LOGON,
    payload: user,
  };
}

export function responseToLogon(payload: IinicialState) {
  return {
    type: CONSTANTE.RESPONSE_LOGON,
    payload,
  };
}

export function requestToLogout() {
  return {
    type: CONSTANTE.REQUEST_LOGOUT,
    payload: {},
  };
}

export function loadingToLogon(loading: boolean) {
  return {
    type: CONSTANTE.LOADING_TO_REQUEST,
    payload: { loading },
  };
}
