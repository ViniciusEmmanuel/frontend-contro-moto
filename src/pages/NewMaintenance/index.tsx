import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiLoader } from 'react-icons/fi';
import api from '../../services/api';

import { Input as InputForm } from '../../components/InputForm';
import { Select as SelectForm } from '../../components/SelectForm';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button/styles';
import { StyleLink } from '../../components/Link/styles';

import { Container, Section } from './styles';
import { Istate, IinicialState } from '../../interfaces/redux/home';

import { requestToListMaintenance } from '../../store/redux/ListMaintenance/actions';
import {
  Istate as IstateMaintenance,
  IinicialState as IinicialMaintenance,
} from '../../interfaces/redux/listMaintenance';

interface Iformdata {
  motorcicleId: number;
  partId: number;
  date: string;
  km: number;
  price: number;
  mechanic: string;
  description: string;
}

export const NewMaintenance = () => {
  const dispatch = useDispatch();

  const [motorcicles, setMotorcicles] = useState([]);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const stateHome = useSelector<Istate, IinicialState>((state) => state.home);

  const { startDate, finishDate, motorcicleId, partId } = useSelector<
    IstateMaintenance,
    IinicialMaintenance
  >((state) => state.listMaintenance);

  useEffect(() => {
    setMotorcicles(stateHome.motorcicles);
    setParts(stateHome.parts);
  }, [stateHome]);

  const handleSubmit: SubmitHandler<Iformdata> = async (
    dataForm,
    { reset }
  ) => {
    setLoading(true);
    try {
      formRef.current.setErrors({});
      const schema = yup.object().shape({
        motorcicleId: yup.number().required(),
        partId: yup.number().required(),
        date: yup.date().required(),
        km: yup.number().required(),
        price: yup.number().required(),
        mechanic: yup.string().required(),
        description: yup.string(),
      });

      await schema.validate(dataForm, {
        abortEarly: false,
      });
      const { status } = await api.post('/maintenance', dataForm);

      if (status === 201) {
        reset();
        toast.success('Cadastrado com sucesso.');
        dispatch(
          requestToListMaintenance({
            startDate,
            finishDate,
            motorcicleId,
            partId,
          })
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

          <h1 className="title">Cadastro de Manutenção</h1>
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

            <SelectForm name="partId" defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              {parts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.description}
                </option>
              ))}
            </SelectForm>

            <InputForm name="date" type="date" placeholder="Data" required />

            <InputForm name="km" type="text" placeholder="Km" required />
          </div>

          <div className="content">
            <InputForm name="price" type="text" placeholder="Valor" required />
            <InputForm
              name="mechanic"
              type="text"
              placeholder="Mecanico"
              required
            />

            <TextArea name="description" placeholder="Descrição" />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <FiLoader size={32} color="#fff" /> : 'Cadastrar'}
          </Button>
        </Form>
      </Section>
    </Container>
  );
};
