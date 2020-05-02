export interface Imaintenance {
  id: number;
  motorcicle_id: number;
  part_id: number;
  board: string;
  date: string;
  date_formart: string;
  description: string | null;
  km: number;
  km_last: number;
  km_per_run: number;
  mechanic: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}
