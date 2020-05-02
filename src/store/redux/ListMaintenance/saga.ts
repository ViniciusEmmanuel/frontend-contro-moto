import { all, call, put, takeLatest } from 'redux-saga/effects';

import { CONSTANTE } from './_CONSTANTS';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { responseToListMaintenance, loadingToListMaintenance } from './actions';
import { Iresposnse } from '../../../interfaces/api/IResponse';
import { Imaintenance } from '../../../interfaces/models/IMaintenance';
import { IAction } from '../../../interfaces/redux/redux';
import { IrequestListMaintenance } from '../../../interfaces/redux/listMaintenance';

function* requestListMaintenance({
  payload,
}: IAction<IrequestListMaintenance>) {
  yield put(loadingToListMaintenance(true));
  try {
    const params = {
      date_before: payload.startDate,
      date_after: payload.finishDate,
      motorcicle_id: payload.motorcicleId,
      part_id: payload.partId,
    };

    !payload.motorcicleId && delete payload.motorcicleId;
    !payload.partId && delete payload.partId;

    const { status, data: response }: Iresposnse<Imaintenance[]> = yield call(
      api.get,
      `/maintenance`,
      {
        params,
      }
    );
    if (status === 200) {
      yield put(
        responseToListMaintenance({
          ...payload,
          maintenances: response.data,
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

  return yield put(loadingToListMaintenance(false));
}

export default all([
  takeLatest(CONSTANTE.REQUEST_LIST_MAINTENANCE, requestListMaintenance),
]);
