export interface Imotorcicle {
  id: number;
  board: string;
  created_at: string;
}

export interface Iparts {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface IinicialState {
  motorcicles: Array<Imotorcicle>;
  parts: Array<Iparts>;
  loading: boolean;
}

export interface Istate {
  home: IinicialState;
}
