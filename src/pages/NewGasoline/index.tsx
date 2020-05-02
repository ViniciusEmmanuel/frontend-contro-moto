import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiLoader } from 'react-icons/fi';
import api from '../../services/api';

import { Input as InputForm } from '../../components/InputForm';
import { Select as SelectForm } from '../../components/SelectForm';
import { Button } from '../../components/Button/styles';
import { StyleLink } from '../../components/Link/styles';

import { Container, Section } from './styles';
import { Istate, IinicialState } from '../../interfaces/redux/home';

import { requestToListGasoline } from '../../store/redux/ListGasoline/actions';
import {
  Istate as IstateGasoline,
  IinicialState as IinicialGasoline,
} from '../../interfaces/redux/listGasoline';

interface Iformdata {
  motorcicleId: number;
  date: string;
  km: number;
  price: number;
  liters: number;
}

export const NewGasoline = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [motorcicles, setMotorcicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { motorcicles: stateMoto } = useSelector<Istate, IinicialState>(
    (state) => state.home
  );

  const { startDate, finishDate, motorcicleId } = useSelector<
    IstateGasoline,
    IinicialGasoline
  >((state) => state.listGasoline);

  useEffect(() => {
    setMotorcicles(stateMoto);
  }, [stateMoto]);

  const handleSubmit: SubmitHandler<Iformdata> = async (
    dataForm,
    { reset }
  ) => {
    setLoading(true);
    try {
      formRef.current.setErrors({});
      const schema = yup.object().shape({
        motorcicleId: yup.number().required(),
        date: yup.date().required(),
        km: yup.number().required(),
        price: yup.number().required(),
        liters: yup.number().required(),
      });

      await schema.validate(dataForm, {
        abortEarly: false,
      });
      const { status } = await api.post('/gasoline', dataForm);

      if (status === 201) {
        reset();
        toast.success('Cadastrado com sucesso.');
        dispatch(
          requestToListGasoline({ startDate, finishDate, motorcicleId })
        );
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

          <h1 className="title">Cadastro de gasolina</h1>
        </div>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="content">
            <SelectForm name="motorcicleId" defaultValue="" autoFocus>
              <option value="" disabled>
                Selecione
              </option>
              {motorcicles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.board}
                </option>
              ))}
            </SelectForm>

            <InputForm name="date" type="date" placeholder="Data" required />

            <InputForm name="km" type="text" placeholder="Km" required />
          </div>

          <div className="content">
            <InputForm
              name="price"
              type="text"
              placeholder="Preço por litro"
              required
            />

            <InputForm name="liters" placeholder="Litros" />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <FiLoader size={32} color="#fff" /> : 'Cadastrar'}
          </Button>
        </Form>
      </Section>
    </Container>
  );
};
