import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../../../services/api';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FiLoader } from 'react-icons/fi';

import { closeModal } from '../../../../store/redux/Modal/actions';
import { Igasoline } from '../../../../interfaces/models/IGasoline';
import { Istate, IinicialState } from '../../../../interfaces/redux/home';

import { Button } from '../../../Button/styles';
import { Input as InputForm } from '../../../InputForm';
import { Select as SelectForm } from '../../../SelectForm';
import { Section } from './styles';

interface Iprops {
  props: Igasoline;
}

interface Iformdata {
  motorcicleId: number;
  date: string;
  km: number;
  price: number;
  liters: number;
}

export const ModalGasoline = React.forwardRef(
  ({ props }: Iprops, ref: React.Ref<HTMLDListElement>) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [gasoline, setGasoline] = useState<Igasoline>(Object);
    const { motorcicles } = useSelector<Istate, IinicialState>(
      (state) => state.home
    );

    const formRef = useRef(null);

    const handleSubmit: SubmitHandler<Iformdata> = async (dataForm) => {
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
        const { status } = await api.put(`/gasoline/${gasoline.id}`, dataForm);

        if (status === 204) {
          toast.success('Alterado com sucesso.');
          dispatch(closeModal());
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

    useEffect(() => {
      const data = {
        ...props,
        motorcicleId: props.motorcicle_id,
      };
      setGasoline(data);
      formRef.current.setData(data);
    }, [props]);

    return (
      <Section ref={ref}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="content">
            <label>
              <span>Motos</span>
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
            </label>

            <label>
              <span>Data</span>
              <InputForm name="date" type="date" placeholder="Data" required />
            </label>

            <label>
              <span>Km</span>
              <InputForm name="km" type="text" placeholder="Km" required />
            </label>
          </div>

          <div className="content">
            <label>
              <span>Preço por Litro</span>
              <InputForm
                name="price"
                type="text"
                placeholder="Preço por litro"
                required
              />
            </label>

            <label>
              <span>Litros</span>
              <InputForm name="liters" placeholder="Litros" required />
            </label>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <FiLoader size={32} color="#fff" /> : 'Salvar'}
          </Button>
        </Form>
      </Section>
    );
  }
);
