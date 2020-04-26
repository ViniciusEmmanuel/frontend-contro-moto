import React, { useState, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import { InputForm } from '../../components/InputForm/styles';
import { SelectForm } from '../../components/SelectForm/styles';
import { Button } from '../../components/Button/styles';
import { StyleLink } from '../../components/Link/styles';

import { Container, Section } from './styles';
import { Istate, IinicialState } from '../../interfaces/redux/home';

export const NewGasoline = () => {
  const [motorcicleId, setMotorcicleId] = useState('');
  const [date, setDate] = useState('');
  const [km, setKm] = useState('');
  const [price, setPrice] = useState('');
  const [liters, setLiters] = useState('');

  const [motorcicles, setMotorcicles] = useState([]);

  const { motorcicles: stateMoto } = useSelector<Istate, IinicialState>(
    (state) => state.home
  );

  useEffect(() => {
    setMotorcicles(stateMoto);
  }, [stateMoto]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const dataPost = {
      motorcicleId,
      date,
      km,
      price,
      liters,
    };

    const schema = yup.object().shape({
      motorcicleId: yup.number().required(),
      date: yup.date().required(),
      km: yup.number().required(),
      price: yup.number().required(),
      liters: yup.number().required(),
    });

    if (!(await schema.isValid(dataPost))) {
      toast.warn('Por favor preencha os campos corretamente.');
      return;
    }

    try {
      const { status } = await api.post('/gasoline', dataPost);

      if (status === 201) {
        toast.success('Cadastrado com sucesso.');
        setMotorcicleId('');
        setPrice('');
        setKm('');
        setDate('');
        setLiters('');
      }
    } catch (error) {
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

        <form onSubmit={handleSubmit}>
          <div className="content">
            <SelectForm
              onChange={(e) => {
                setMotorcicleId(e.target.value);
              }}
              value={motorcicleId}
              autoFocus
            >
              <option>Selecione</option>
              {motorcicles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.board}
                </option>
              ))}
            </SelectForm>

            <InputForm
              type="date"
              placeholder="Data"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
            />

            <InputForm
              type="number"
              placeholder="Km"
              value={km}
              onChange={(e) => {
                setKm(e.target.value);
              }}
              required
            />
          </div>

          <div className="content">
            <InputForm
              type="number"
              placeholder="Preço por litro"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              required
            />

            <InputForm
              placeholder="Litros"
              value={liters}
              onChange={(e) => {
                setLiters(e.target.value);
              }}
            />
          </div>

          <Button type="submit">Cadastrar</Button>
        </form>
      </Section>
    </Container>
  );
};
