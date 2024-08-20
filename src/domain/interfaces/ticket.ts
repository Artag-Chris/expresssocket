

export interface Ticket {

    id: string;
    number: number;
    createdAt: Date;
    handleAtDesk?:string; //en que escritorio
    handleAt?:Date;
    done:boolean;
    
}