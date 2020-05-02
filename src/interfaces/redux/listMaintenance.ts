import { Imaintenance } from '../models/IMaintenance';

export interface IinicialState {
  startDate: string;
  finishDate: string;
  motorcicleId: string;
  partId: string;
  maintenances: Imaintenance[] | [];
  loading: boolean;
}

export interface Istate {
  listMaintenance: IinicialState;
}

export interface IrequestListMaintenance {
  startDate: string;
  finishDate: string;
  motorcicleId: string;
  partId: string;
}
