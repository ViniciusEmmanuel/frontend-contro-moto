/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FiTrash2, FiEdit } from 'react-icons/fi';

import api from '../../services/api';

import { Iresposnse } from '../../interfaces/api/IResponse';
import { Istate, IinicialState } from '../../interfaces/redux/home';
import { Imaintenance } from '../../interfaces/models/IMaintenance';

import { toast } from 'react-toastify';
import { Button as ButtonForm } from '../../components/Button/styles';
import { InputForm } from '../../components/InputForm/styles';
import { SelectForm } from '../../components/SelectForm/styles';
import { Container, Section, Button } from './styles';

export const ListMaintenance = () => {
  const { motorcicles: stateMotorcicles } = useSelector<Istate, IinicialState>(
    (state) => state.home
  );

  const [listMaintenance, setListMaintenance] = useState<Imaintenance[]>([]);
  const motorcicles = useMemo(() => stateMotorcicles, [stateMotorcicles]);

  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [motorcicleId, setMotorcicleId] = useState('');

  const requestApi = useCallback(async () => {
    const {
      status,
      data: response,
    }: Iresposnse<Imaintenance[]> = await api.get('/maintenance');

    if (status === 200) {
      setListMaintenance(response.data);
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
              <th>Peça</th>
              <th>Data</th>
              <th>Km Anterior</th>
              <th>Km</th>
              <th>Km Rodado</th>
              <th>Preço</th>
              <th>Mêcanico</th>
              <th className="action"> # </th>
              <th className="action"> # </th>
            </tr>
          </thead>
          <tbody>
            {listMaintenance.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.board}</td>
                  <td>{item.name}</td>
                  <td>{item.date_formart}</td>
                  <td>{Number(item.km_last).toFixed(2)}</td>
                  <td>{Number(item.km).toFixed(2)}</td>
                  <td>{Number(item.km_per_run).toFixed(2)}</td>
                  <td>{Number(item.price).toFixed(2)}</td>
                  <td>{item.mechanic}</td>
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
