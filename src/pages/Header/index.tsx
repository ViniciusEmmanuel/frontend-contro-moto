import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiPower } from 'react-icons/fi';

import { requestToLogout } from '../../store/redux/logon/actions';

import { Header as HeaderMain } from './styles';

export const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = useCallback((): void => {
    dispatch(requestToLogout());
    history.replace('/');
  }, [history, dispatch]);

  return (
    <HeaderMain>
      <div className="content">
        <span>
          Rwr <strong>Usuario Novo</strong>
        </span>

        <button type="button" className="btn-icon" onClick={logout}>
          <FiPower size={18} color="#f0f0f0" />
        </button>
      </div>
    </HeaderMain>
  );
};
