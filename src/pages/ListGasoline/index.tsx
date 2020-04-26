/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FiTrash2, FiEdit } from 'react-icons/fi';

import api from '../../services/api';

import { Iresposnse } from '../../interfaces/api/IResponse';
import { Istate, IinicialState } from '../../interfaces/redux/home';
import { Igasoline } from '../../interfaces/models/IGasoline';

import { toast } from 'react-toastify';
import { Button as ButtonForm } from '../../components/Button/styles';
import { InputForm } from '../../components/InputForm/styles';
import { SelectForm } from '../../components/SelectForm/styles';
import { Container, Section, Button } from './styles';

export const ListGasoline = () => {
  const { motorcicles: stateMotorcicles } = useSelector<Istate, IinicialState>(
    (state) => state.home
  );

  const [listGasoline, setListGasoline] = useState<Igasoline[]>([]);
  const motorcicles = useMemo(() => stateMotorcicles, [stateMotorcicles]);

  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [motorcicleId, setMotorcicleId] = useState('');

  const requestApi = useCallback(async () => {
    const { status, data: response }: Iresposnse<Igasoline[]> = await api.get(
      '/gasoline'
    );

    if (status === 200) {
      setListGasoline(response.data);
    }
  }, []);

  useEffect(() => {
    requestApi();
  }, [requestApi]);

  const deleteData = useCallback(
    async (id: number) => {
      if (id) {
        try {
          const { status }: Iresposnse<[]> = await api.delete(
            `/gasoline/${id}`
          );

          if (status === 204) {
            requestApi();
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
    [requestApi]
  );

  return (
    <Container>
      <Section>
        <form className="header">
          <label>
            <span>Data inicial</span>
            <InputForm
              type="date"
              placeholder="Data"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              required
              autoFocus
            />
          </label>
          <label>
            <span>Data final</span>
            <InputForm
              type="date"
              placeholder="Data"
              value={finishDate}
              onChange={(e) => {
                setFinishDate(e.target.value);
              }}
              required
            />
          </label>
          <label>
            <span>Motos</span>
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
          </label>

          <ButtonForm type="submit">Buscar</ButtonForm>
        </form>

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
                    <Button type="button">
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
