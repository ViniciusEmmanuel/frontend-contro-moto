import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../../../services/api';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FiLoader } from 'react-icons/fi';

import { closeModal } from '../../../../store/redux/Modal/actions';
import { Imaintenance } from '../../../../interfaces/models/IMaintenance';
import { Istate, IinicialState } from '../../../../interfaces/redux/home';

import { Button } from '../../../Button/styles';
import { Input as InputForm } from '../../../InputForm';
import { Select as SelectForm } from '../../../SelectForm';
import { TextArea } from '../../../TextArea';
import { Section } from './styles';

interface Iprops {
  props: Imaintenance;
}

interface Iformdata {
  motorcicleId: number;
  partId: number;
  date: string;
  km: number;
  price: number;
  mechanic: string;
  description: string;
}

export const ModalMaintenance = React.forwardRef(
  ({ props }: Iprops, ref: React.Ref<HTMLDListElement>) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [maintenance, setMaintenance] = useState<Imaintenance>(Object);
    const { motorcicles: stateMotorcicles, parts: stateParts } = useSelector<
      Istate,
      IinicialState
    >((state) => state.home);

    const motorcicles = useMemo(() => stateMotorcicles, [stateMotorcicles]);
    const parts = useMemo(() => stateParts, [stateParts]);

    const formRef = useRef(null);

    const handleSubmit: SubmitHandler<Iformdata> = async (dataForm) => {
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
        const { status } = await api.put(
          `/maintenance/${maintenance.id}`,
          dataForm
        );

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
        partId: props.part_id,
      };
      setMaintenance(data);
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
              <span>Peças</span>
              <SelectForm name="partId" defaultValue="default">
                <option value="default" disabled>
                  Selecione
                </option>
                {parts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - {item.description}
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
              <span>Valor</span>
              <InputForm
                name="price"
                type="text"
                placeholder="Valor"
                required
              />
            </label>
            <label>
              <span>Mêcanico</span>
              <InputForm
                name="mechanic"
                type="text"
                placeholder="Mecanico"
                required
              />
            </label>

            <label>
              <span>Descrição</span>
              <TextArea name="description" placeholder="Descrição" />
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
