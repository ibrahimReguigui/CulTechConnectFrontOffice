import { Echange } from "../echange/echange.model";

export interface Participant {
  user: string;
  statut: string;
  message: string;
  echange: {
    id:number;
  }; // Ensure this is of the correct type
}
