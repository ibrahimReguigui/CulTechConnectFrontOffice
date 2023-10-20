import { TypeEvent } from "./typeEvenet.enum";

export class Event {
    idEvent: number;
    nom: string;
    description: string;
    lieu: string;
    dateDeb: Date;
    dateFin: Date;
    type: TypeEvent; 
}