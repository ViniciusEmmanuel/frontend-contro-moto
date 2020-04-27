import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Logon } from './pages/Logon';
import { Header } from './pages/Header';
import { Home } from './pages/Home';
import { NewMaintenance } from './pages/NewMaintenance';
import { ListMaintenance } from './pages/ListMaitenance';
import { NewGasoline } from './pages/NewGasoline';
import { ListGasoline } from './pages/ListGasoline';
import { NewPart } from './pages/NewPart';
import { NewMotorcicle } from './pages/NewMotorcicle';

import { Istate } from './interfaces/redux/logon';

const PrivateRoutes = () => {
  const auth = useSelector<Istate>((state) => state.logon.auth);

  if (!auth) {
    return <Redirect to="/" exact />;
  }

  return (
    <>
      <Header />
      <Route path="/home" component={Home} />
      <Route path="/cadastrar-manutencao" component={NewMaintenance} />
      <Route path="/listar-manutencao" component={ListMaintenance} />
      <Route path="/cadastrar-gasolina" component={NewGasoline} />
      <Route path="/listar-gasolina" component={ListGasoline} />
      <Route path="/cadastrar-moto" component={NewMotorcicle} />
      <Route path="/cadastrar-pecas" component={NewPart} />
    </>
  );
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <PrivateRoutes />
      </Switch>
    </BrowserRouter>
  );
}
