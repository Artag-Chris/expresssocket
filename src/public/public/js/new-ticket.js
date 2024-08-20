

const currentTicketLBL= document.querySelector('span');
const createTicketBtn = document.querySelector('button');


async function getLastTicket(){
    const lastTicket=await fetch("/api/ticket/last").then(res=>res.json());
    currentTicketLBL.innerText=lastTicket;
 
    console.log(lastTicket);
 
}
getLastTicket(); 