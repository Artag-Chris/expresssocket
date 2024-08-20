

const currentTicketLBL= document.querySelector('span');
const createTicketBtn = document.querySelector('button');


async function getLastTicket(){
    const lastTicket=await fetch("localhost:3000/api/tickets/last").then(res=>res.json());
    currentTicketLBL.innerText=lastTicket;
 
    console.log(lastTicket);
 
}
getLastTicket(); 