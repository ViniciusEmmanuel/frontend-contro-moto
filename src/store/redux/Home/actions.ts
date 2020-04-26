import { CONSTANTE } from './_CONSTANTS';
import { IinicialState } from '../../../interfaces/redux/home';

export function requestToMotorcicleParts() {
  return {
    type: CONSTANTE.REQUEST_MOTORCICLE_PARTS,
    payload: {},
  };
}

export function responseToMotorcicleParts(payload: IinicialState) {
  return {
    type: CONSTANTE.RESPONSE_MOTORCICLE_PARTS,
    payload,
  };
}
