import { Igasoline } from '../models/IGasoline';

export interface IinicialState {
  startDate: string;
  finishDate: string;
  motorcicleId: string;
  gasolines: Igasoline[] | [];
  loading: boolean;
}

export interface Istate {
  listGasoline: IinicialState;
}

export interface IrequestListGasoline {
  startDate: string;
  finishDate: string;
  motorcicleId: string;
}
