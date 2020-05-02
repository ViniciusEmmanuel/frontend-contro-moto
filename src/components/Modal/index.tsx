import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../store/redux/Modal/actions';

import { Istate, IinicialState } from '../../interfaces/redux/modal';

import { Container, Content } from './styles';
import { FiX } from 'react-icons/fi';
export const Modal = () => {
  const dispatch = useDispatch();

  const { component: Component, props } = useSelector<Istate, IinicialState>(
    (state) => state.modal
  );

  if (!Component || Object.entries(Component).length === 0) {
    return <></>;
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  const ref = React.createRef<HTMLDivElement>();

  return (
    <Container className="modal --open">
      <Content>
        <button className="close" type="button" onClick={handleClose}>
          <FiX size={32} color="#018fe1" />
        </button>
        <Component className="children" props={props} ref={ref} />
      </Content>
    </Container>
  );
};
