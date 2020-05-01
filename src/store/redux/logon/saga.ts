import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { responseToLogon } from './actions';
import { CONSTANTE } from './_CONSTANTS';

import { Iresposnse } from '../../../interfaces/api/IResponse';
import { Iuser } from '../../../interfaces/models/IUser';

import { IAction } from '../../../interfaces/redux/redux';
import { Ilogon } from '../../../interfaces/redux/logon';

function* requestToLogon({ payload }: IAction<Ilogon>) {
  try {
    const { status, data: response }: Iresposnse<Iuser> = yield call(
      api.post,
      `/session`,
      { ...payload }
    );
    if (status === 201) {
      localStorage.setItem('@rwr/token', JSON.stringify(response.data.token));

      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

      return yield put(
        responseToLogon({
          auth: true,
          name: response.data.name,
          user: response.data.user,
          token: response.data.token,
          loading: false,
        })
      );
    }
    toast.error('Email ou senhas não conferem.');
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;

      if (message) {
        toast.error(message);
      }
    }

    return yield put(
      responseToLogon({
        auth: false,
        name: '',
        user: '',
        token: '',
        loading: false,
      })
    );
  }
}

export default all([takeLatest(CONSTANTE.REQUEST_LOGON, requestToLogon)]);
