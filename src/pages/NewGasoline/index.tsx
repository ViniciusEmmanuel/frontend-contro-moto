import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import { Input as InputForm } from '../../components/InputForm';
import { Select as SelectForm } from '../../components/SelectForm';
import { Button } from '../../components/Button/styles';
import { StyleLink } from '../../components/Link/styles';

import { Container, Section } from './styles';
import { Istate, IinicialState } from '../../interfaces/redux/home';

interface Iformdata {
  motorcicleId: number;
  date: string;
  km: number;
  price: number;
  liters: number;
}

export const NewGasoline = () => {
  const formRef = useRef(null);
  const [motorcicles, setMotorcicles] = useState([]);

  const { motorcicles: stateMoto } = useSelector<Istate, IinicialState>(
    (state) => state.home
  );

  useEffect(() => {
    setMotorcicles(stateMoto);
  }, [stateMoto]);

  const handleSubmit: SubmitHandler<Iformdata> = async (
    dataForm,
    { reset }
  ) => {
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
            <SelectForm name="motorcicleId" defaultValue="default" autoFocus>
              <option value="default" disabled>
                Selecione
              </option>
              {motorcicles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.board}
                </option>
              ))}
            </SelectForm>

            <InputForm name="date" type="date" placeholder="Data" required />

            <InputForm name="km" type="number" placeholder="Km" required />
          </div>

          <div className="content">
            <InputForm
              name="price"
              type="number"
              placeholder="Preço por litro"
              required
            />

            <InputForm name="liters" placeholder="Litros" />
          </div>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Section>
    </Container>
  );
};
