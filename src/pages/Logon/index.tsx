import React, { FormEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import { FiLoader } from 'react-icons/fi';

import { InputForm } from '../../components/InputForm/styles';
import { Button } from '../../components/Button/styles';

import { MainLogon, SectionForm } from './styles';

import { Istate, IinicialState } from '../../interfaces/redux/logon';
import {
  requestToLogin,
  loadingToLogon,
} from '../../store/redux/logon/actions';

export default function Logon() {
  const history = useHistory();

  const [userId, setUser] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { auth, token, loading } = useSelector<Istate, IinicialState>(
    (state) => state.logon
  );

  useEffect(() => {
    if (auth && token) {
      history.replace('/home');
    }
  }, [history, auth, token]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const dataPost = { userId, password };

    const schema = yup.object().shape({
      userId: yup.number().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(dataPost))) {
      return;
    }
    dispatch(loadingToLogon(true));
    dispatch(requestToLogin(dataPost));
  };

  return (
    <MainLogon>
      <SectionForm>
        <form className="form-logon" onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <InputForm
            type="number"
            placeholder="Usuário"
            onChange={(e) => setUser(e.target.value)}
          />

          <InputForm
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? <FiLoader size={32} color="#fff" /> : 'Entrar'}
          </Button>
        </form>
      </SectionForm>
    </MainLogon>
  );
}
