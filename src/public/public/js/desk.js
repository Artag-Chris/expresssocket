
const lblPending= document.querySelector("#lbl-pending");
const deskHeader= document.querySelector("h1");
const noMoreAlert= document.querySelector(".alert");
const btnDraw = document.querySelector("#btn-draw");
const btnDone = document.querySelector("#btn-done");
const lblCurrentTicket = document.querySelector("small");

let workingTicket=null;

const searchParams= new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){
    window.location='index.html';
    throw new Error('El escritorio es obligatorio');
}

const deskNumber =searchParams.get("escritorio");
deskHeader.innerText= `Escritorio ${deskNumber}`;

async function getTicket() {
    
    await finishTicket();

  const {status, ticket, message} = await fetch(`http://localhost:3000/api/tickets/draw/${deskNumber}`)
  .then(resp=>resp.json());

  if(status==="error"){
    lblCurrentTicket.innerText=message;
    return;
  }

  workingTicket=ticket;
  lblCurrentTicket.innerText="Ticket "+ticket.number;
}

async function loadInitianCount() {
    const pendingTickets=await fetch("http://localhost:3000/api/tickets/pending")
    .then(res=>res.json());

    checkTicketCount(pendingTickets.length);
}

function checkTicketCount(currentCount=0){
    if(currentCount===0){
        noMoreAlert.classList.remove("d-none");
    }
    else{
        noMoreAlert.classList.add("d-none");
    }
    
    lblPending.innerHTML=currentCount;
}  

async function finishTicket() {
    if (!workingTicket) return;

    const {status, message} = await fetch(`http://localhost:3000/api/tickets/done/${workingTicket.id}`
        ,{method:"PUT"})
    .then(resp=>resp.json());

    if (status==="ok"){
        workingTicket=null;
        lblCurrentTicket.innerText="Nadie";
        
    }

}

function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');
  
    socket.onmessage = ( event ) => {
      const { payload,type } = JSON.parse( event.data );
      if( type !== 'on-ticket-count-changed') return;

      
      checkTicketCount(payload);
    };
  
    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
  }
  
  //listerners
  btnDraw.addEventListener("click",getTicket);
  btnDone.addEventListener("click",finishTicket);
  //init
  loadInitianCount();
  connectToWebSockets();