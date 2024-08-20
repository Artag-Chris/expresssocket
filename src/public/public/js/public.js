


function renderTickets (tickets=[]) {

    for (let i=0;i<tickets.length;i++){
        if(i>=4) break;
        const ticket=tickets[i];
        if(!ticket) break;

        const lblTicket=document.querySelector(`#lbl-ticket-0${i+1}`);
        const lblDesk=document.querySelector(`#lbl-desk-0${i+1}`);

        lblTicket.innerText=`Ticket ${ticket.number}`;
        lblDesk.innerText=`Escritorio ${ticket.handleAtDesk}`;
    }
}

async function loadCurrentTickets() {
    const tickets= await fetch("http://localhost:3000/api/tickets/working-on")
    .then(res=>res.json());
    
    renderTickets(tickets);
}



function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');
  
    socket.onmessage = ( event ) => {
      const { payload,type } = JSON.parse( event.data );
      if( type !== 'on-working-changed') return;

      renderTickets(payload);
    
    };
  
    socket.onclose = ( event ) => {
     
      setTimeout( () => {
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
  }
  
loadCurrentTickets();
connectToWebSockets();