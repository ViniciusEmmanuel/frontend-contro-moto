import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import { FiLoader } from 'react-icons/fi';

import { Input as InputForm } from '../../components/InputForm';
import { Button } from '../../components/Button/styles';

import { MainLogon, SectionForm } from './styles';

import { Istate, IinicialState } from '../../interfaces/redux/logon';
import {
  requestToLogin,
  loadingToLogon,
} from '../../store/redux/logon/actions';

interface Iformdata {
  userId: string;
  password: string;
}

export const Logon = () => {
  const history = useHistory();
  const formRef = useRef(null);

  const dispatch = useDispatch();
  const { auth, token, loading } = useSelector<Istate, IinicialState>(
    (state) => state.logon
  );

  useEffect(() => {
    if (auth && token) {
      history.replace('/home');
    }
  }, [history, auth, token]);

  const handleLogin: SubmitHandler<Iformdata> = async (dataForm, { reset }) => {
    try {
      formRef.current.setErrors({});

      const schema = yup.object().shape({
        userId: yup.number().required(),
        password: yup.string().required(),
      });

      await schema.validate(dataForm, {
        abortEarly: false,
      });

      dispatch(loadingToLogon(true));
      dispatch(requestToLogin(dataForm));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};

        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <MainLogon>
      <SectionForm>
        <Form ref={formRef} className="form-logon" onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <InputForm
            name="userId"
            type="number"
            placeholder="Usuário"
            required
          />

          <InputForm
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? <FiLoader size={32} color="#fff" /> : 'Entrar'}
          </Button>
        </Form>
      </SectionForm>
    </MainLogon>
  );
};
