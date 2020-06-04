/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiTrash2, FiEdit, FiArrowLeft, FiLoader } from 'react-icons/fi';

import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Iresposnse } from '../../interfaces/api/IResponse';
import { Istate, IinicialState } from '../../interfaces/redux/home';

import {
  Istate as IstateGasoline,
  IinicialState as IinicialGasoline,
} from '../../interfaces/redux/listGasoline';
import { Igasoline } from '../../interfaces/models/IGasoline';
import { requestToListGasoline } from '../../store/redux/ListGasoline/actions';

import { Button as ButtonForm } from '../../components/Button/styles';
import { Input as InputForm } from '../../components/InputForm';
import { Select as SelectForm } from '../../components/SelectForm';
import { Container, Section, Button } from './styles';
import { StyleLink } from '../../components/Link/styles';

import { openModal } from '../../store/redux/Modal/actions';
import { ModalGasoline } from '../../components/Modal/modais/Gasoline';

interface Iformdata {
  startDate: string;
  finishDate: string;
  motorcicleId: string;
}

export const ListGasoline = () => {
  const dispatch = useDispatch();

  const { motorcicles: stateMotorcicles } = useSelector<Istate, IinicialState>(
    (state) => state.home
  );

  const stateGasoline = useSelector<IstateGasoline, IinicialGasoline>(
    (state) => state.listGasoline
  );

  const listGasoline = useMemo<Igasoline[]>(() => stateGasoline.gasolines, [
    stateGasoline,
  ]);

  const loading = useMemo<boolean>(() => stateGasoline.loading, [
    stateGasoline,
  ]);

  const motorcicles = useMemo(() => stateMotorcicles, [stateMotorcicles]);

  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [motorcicleId, setMotorcicleId] = useState('');

  useEffect(() => {
    if (!loading) {
      setStartDate(stateGasoline.startDate);
      setFinishDate(stateGasoline.finishDate);
      setMotorcicleId(stateGasoline.motorcicleId);
    }
  }, [stateGasoline, loading]);

  const handleSubmit: SubmitHandler<Iformdata> = async (data) => {
    dispatch(requestToListGasoline(data));
  };

  const deleteData = useCallback(
    async (id: number) => {
      if (id) {
        try {
          const { status }: Iresposnse<[]> = await api.delete(
            `/gasoline/${id}`
          );

          if (status === 204) {
            dispatch(
              requestToListGasoline({ startDate, finishDate, motorcicleId })
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
      }
    },
    [dispatch, startDate, finishDate, motorcicleId]
  );

  const handleModal = (gasoline: Igasoline) => {
    dispatch(openModal({ component: ModalGasoline, props: gasoline }));
  };

  return (
    <Container>
      <Section>
        <Form className="header" onSubmit={handleSubmit}>
          <i title="Voltar" className="return">
            <StyleLink to="/home">
              <FiArrowLeft size={32} color="#018fe1" />
            </StyleLink>
          </i>

          <label>
            <span>Data inicial</span>
            <InputForm
              name="startDate"
              type="date"
              placeholder="Data"
              value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStartDate(e.target.value);
              }}
              required
              autoFocus
            />
          </label>
          <label>
            <span>Data final</span>
            <InputForm
              name="finishDate"
              type="date"
              placeholder="Data"
              value={finishDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFinishDate(e.target.value);
              }}
              required
            />
          </label>
          <label>
            <span>Motos</span>
            <SelectForm
              name="motorcicleId"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setMotorcicleId(e.target.value);
              }}
              value={motorcicleId}
              autoFocus
            >
              <option value="">Selecione</option>
              {motorcicles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.board}
                </option>
              ))}
            </SelectForm>
          </label>

          <ButtonForm type="submit" disabled={loading}>
            {loading ? <FiLoader size={32} color="#fff" /> : 'Buscar'}
          </ButtonForm>
        </Form>

        <table>
          <thead>
            <tr>
              <th>Moto</th>
              <th>Data</th>
              <th>Km Anterior</th>
              <th>Km</th>
              <th>Km Rodado</th>
              <th>Km por litro</th>
              <th>Litros</th>
              <th>Preço</th>
              <th>Valor Total</th>
              <th className="action"> # </th>
              <th className="action"> # </th>
            </tr>
          </thead>
          <tbody>
            {listGasoline.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.board}</td>
                  <td>{item.date_formart}</td>
                  <td>{Number(item.km_last).toFixed(2)}</td>
                  <td>{Number(item.km).toFixed(2)}</td>
                  <td>{Number(item.km_per_run).toFixed(2)}</td>
                  <td>{Number(item.km_per_liters).toFixed(2)}</td>
                  <td>{Number(item.liters).toFixed(2)}</td>
                  <td>{Number(item.price).toFixed(2)}</td>
                  <td>{Number(item.total).toFixed(2)}</td>
                  <td>
                    <Button type="button" onClick={() => handleModal(item)}>
                      <FiEdit size={18} color="#018fe1" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      onClick={() => {
                        deleteData(item.id);
                      }}
                    >
                      <FiTrash2 size={18} color="#018fe1" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>
    </Container>
  );
};
