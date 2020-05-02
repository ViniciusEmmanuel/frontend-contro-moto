/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiTrash2, FiEdit, FiArrowLeft, FiLoader } from 'react-icons/fi';

import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';

import { openModal } from '../../store/redux/Modal/actions';

import { Iresposnse } from '../../interfaces/api/IResponse';
import { Istate, IinicialState } from '../../interfaces/redux/home';
import { Imaintenance } from '../../interfaces/models/IMaintenance';

import { toast } from 'react-toastify';
import { Button as ButtonForm } from '../../components/Button/styles';
import { Input as InputForm } from '../../components/InputForm';
import { Select as SelectForm } from '../../components/SelectForm';
import { Container, Section, Button } from './styles';
import { StyleLink } from '../../components/Link/styles';

import { ModalMaintenance } from '../../components/Modal/modais/Maintenance';

interface Iformdata {
  startDate: string;
  finishDate: string;
  motorcicleId: string;
  partId: string;
}

export const ListMaintenance = () => {
  const dispatch = useDispatch();

  const { motorcicles: stateMotorcicles, parts: stateParts } = useSelector<
    Istate,
    IinicialState
  >((state) => state.home);

  const [loading, setLoading] = useState(false);
  const [listMaintenance, setListMaintenance] = useState<Imaintenance[]>([]);
  const motorcicles = useMemo(() => stateMotorcicles, [stateMotorcicles]);
  const parts = useMemo(() => stateParts, [stateParts]);

  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [motorcicleId, setMotorcicleId] = useState('');
  const [partId, setPartId] = useState('');

  const requestApi = useCallback(async (params) => {
    const {
      status,
      data: response,
    }: Iresposnse<Imaintenance[]> = await api.get('/maintenance', {
      params,
    });

    if (status === 200) {
      setListMaintenance(response.data);
    }
  }, []);

  const handleSubmit: SubmitHandler<Iformdata> = async (data) => {
    setLoading(true);
    const params = {
      date_before: data.startDate,
      date_after: data.finishDate,
      motorcicle_id: Number(data.motorcicleId),
      part_id: Number(data.partId),
    };

    !motorcicleId && delete params.motorcicle_id;
    !partId && delete params.part_id;

    await requestApi(params);
    setLoading(false);
  };

  const deleteData = useCallback(
    async (id: number) => {
      if (id) {
        try {
          const { status }: Iresposnse<[]> = await api.delete(
            `/maintenance/${id}`
          );

          if (status === 204) {
            const params = {
              date_before: startDate,
              date_after: finishDate,
              motorcicle_id: Number(motorcicleId),
              part_id: Number(partId),
            };

            !motorcicleId && delete params.motorcicle_id;
            !partId && delete params.part_id;

            requestApi(params);
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
    [requestApi, startDate, finishDate, motorcicleId, partId]
  );

  const modal = (props) => {
    dispatch(openModal({ component: ModalMaintenance, props }));
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
            >
              <option value="">Selecione</option>
              {motorcicles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.board}
                </option>
              ))}
            </SelectForm>
          </label>

          <label>
            <span>Peças</span>
            <SelectForm
              name="partId"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPartId(e.target.value);
              }}
            >
              <option value="">Selecione</option>
              {parts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
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
                    <Button type="button" onClick={() => modal(item)}>
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
