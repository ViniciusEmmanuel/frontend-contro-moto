import React, { useRef, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import { responseToMotorcicleParts } from '../../store/redux/Home/actions';

import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiLoader } from 'react-icons/fi';
import api from '../../services/api';

import { Input as InputForm } from '../../components/InputForm';
import { Button } from '../../components/Button/styles';
import { StyleLink } from '../../components/Link/styles';

import { Container, Section } from './styles';

import { Istate, IinicialState } from '../../interfaces/redux/home';

interface Iformdata {
  name: string;
  description: string;
}

export const NewMotorcicle = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const stateHome = useSelector<Istate, IinicialState>((state) => state.home);

  const { motorcicles, parts } = useMemo(() => stateHome, [stateHome]);

  const handleSubmit: SubmitHandler<Iformdata> = async (
    dataForm,
    { reset }
  ) => {
    setLoading(true);

    try {
      formRef.current.setErrors({});

      const schema = yup.object().shape({
        name: yup.string().length(8).required(),
        description: yup.string(),
      });

      await schema.validate(dataForm, {
        abortEarly: false,
      });
      const { status } = await api.post('/parts', dataForm);

      if (status === 201) {
        reset();

        const newMotor = {
          ...motorcicles,
          ...dataForm,
        };

        dispatch(
          responseToMotorcicleParts({
            loading: false,
            motorcicles: newMotor,
            parts,
          })
        );
        toast.success('Cadastrado com sucesso.');
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};

        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }

      if (error.response) {
        const { message } = error.response.data;

        if (message) {
          toast.error(message);
        }
      }
    }

    setLoading(false);
  };

  return (
    <Container>
      <Section className="form">
        <div className="header">
          <i title="Voltar" className="return">
            <StyleLink to="/home">
              <FiArrowLeft size={32} color="#018fe1" />
            </StyleLink>
          </i>

          <h1 className="title">Cadastro de moto</h1>
        </div>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputForm
            className="--upper"
            name="board"
            type="text"
            placeholder="Placa"
            required
          />

          <InputForm name="description" type="text" placeholder="Descrição" />

          <Button type="submit" disabled={loading}>
            {loading ? <FiLoader size={32} color="#fff" /> : 'Cadastrar'}
          </Button>
        </Form>
      </Section>
    </Container>
  );
};
