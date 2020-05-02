import { all, call, put, takeLatest } from 'redux-saga/effects';

import { CONSTANTE } from './_CONSTANTS';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { responseToListGasoline, loadingToListGasoline } from './actions';
import { Iresposnse } from '../../../interfaces/api/IResponse';
import { Igasoline } from '../../../interfaces/models/IGasoline';
import { IAction } from '../../../interfaces/redux/redux';
import { IrequestListGasoline } from '../../../interfaces/redux/listGasoline';

function* requestListGasoline({ payload }: IAction<IrequestListGasoline>) {
  yield put(loadingToListGasoline(true));
  try {
    const params = {
      date_before: payload.startDate,
      date_after: payload.finishDate,
      motorcicle_id: payload.motorcicleId,
    };

    !payload.motorcicleId && delete params.motorcicle_id;

    const { status, data: response }: Iresposnse<Igasoline[]> = yield call(
      api.get,
      `/gasoline`,
      {
        params,
      }
    );
    if (status === 200) {
      yield put(
        responseToListGasoline({
          ...payload,
          gasolines: response.data,
          loading: false,
        })
      );
    }
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;
      if (message) {
        toast.error(message);
      }
    }
  }

  return yield put(loadingToListGasoline(false));
}

export default all([
  takeLatest(CONSTANTE.REQUEST_LIST_GASOLINE, requestListGasoline),
]);
