import { call, all, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { CONSTANTE } from './_CONSTANTS';
import { responseToMotorcicleParts } from './actions';

import { Imotorcicle, Iparts } from '../../../interfaces/redux/home';

function* requestToMotorciclePart() {
  try {
    const [
      { status: statusM, data: dataMotorcicles },
      { status: statusP, data: dataParts },
    ] = yield all([call(api.get, '/motorcircles'), call(api.get, '/parts')]);

    if (statusM === 200 && statusP === 200) {
      const moto = dataMotorcicles.data as Array<Imotorcicle>;
      const part = dataParts.data as Array<Iparts>;

      yield put(
        responseToMotorcicleParts({
          motorcicles: moto,
          parts: part,
          loading: false,
        })
      );
    }
  } catch (error) {
    toast.error('Não foi possivel buscar os dados das motos e das peças.');
  }
}

export default all([
  takeLatest(CONSTANTE.REQUEST_MOTORCICLE_PARTS, requestToMotorciclePart),
]);
