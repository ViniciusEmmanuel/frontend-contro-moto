import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowRight } from 'react-icons/fi';

import { StyleLink } from '../../components/Link/styles';
import { Container, List, MainHome } from './styles';

import { requestToMotorcicleParts } from '../../store/redux/Home/actions';
import { Istate, IinicialState } from '../../interfaces/redux/home';

export const Home = () => {
  const optionsMenu = [
    { id: '1', name: 'Cadastrar manutenção', link: '/cadastrar-manutencao' },
    { id: '2', name: 'Listar manuteção', link: '/listar-manutencao' },
    { id: '3', name: 'Castrar peça', link: '/cadastrar-pecas' },
    { id: '4', name: 'Cadastrar gasolina', link: '/cadastrar-gasolina' },
    { id: '5', name: 'Listar gasolina', link: '/listar-gasolina' },
    { id: '6', name: 'Castrar moto', link: '/cadastrar-moto' },
  ];

  const dispacth = useDispatch();

  const { motorcicles, parts } = useSelector<Istate, IinicialState>(
    (state) => state.home
  );

  useEffect(() => {
    if (motorcicles.length === 0 || parts.length === 0) {
      dispacth(requestToMotorcicleParts());
    }
  }, [dispacth, motorcicles, parts]);

  return (
    <Container>
      <MainHome>
        <List>
          {optionsMenu.map((item) => {
            return (
              <li key={item.id}>
                <StyleLink to={item.link} className="link">
                  <button type="button">
                    <strong>{item.name}</strong>
                    <FiArrowRight size={20} color="#018fe1" />
                  </button>
                </StyleLink>
              </li>
            );
          })}

          <li>
            <a
              href="http://www.controle-moto.dx.am/"
              target="blank"
              className="link"
            >
              <button type="button">
                <strong>Versão antiga</strong>
                <FiArrowRight size={20} color="#018fe1" />
              </button>
            </a>
          </li>
        </List>
      </MainHome>
    </Container>
  );
};
