

const currentTicketLBL= document.querySelector('span');
const createTicketBtn = document.querySelector('button');


async function getLastTicket(){
    const lastTicket=await fetch("http://localhost:3000/api/tickets/last").then(res=>res.json());
    currentTicketLBL.innerText=lastTicket;
 
}


async function createTicket() {
    const newTicket = await fetch('http://localhost:3000/api/tickets',{
      method: 'POST'
    }).then( resp => resp.json());
   
  
    currentTicketLBL.innerText = newTicket.number;
  }

createTicketBtn.addEventListener('click',createTicket);

getLastTicket(); 