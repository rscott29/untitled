export interface User {
  data: Datum[];
  message: string;
}

export interface Datum {
  id: number;
  email: string;
  password: string;
}
