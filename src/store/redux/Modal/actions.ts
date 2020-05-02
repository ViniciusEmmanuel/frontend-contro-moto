import { CONSTANTE } from './_CONSTANTS';

import { IinicialState } from '../../../interfaces/redux/modal';

export const openModal = (payload: IinicialState) => {
  return {
    type: CONSTANTE.OPEN_MODAL,
    payload,
  };
};

export const closeModal = () => {
  return {
    type: CONSTANTE.CLOSE_MODAL,
  };
};
