
const lblPending= document.querySelector("#lbl-pending");
const deskHeader= document.querySelector("h1");

const searchParams= new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){
    window.location='index.html';
    throw new Error('El escritorio es obligatorio');
}

const deskNumber =searchParams.get("escritorio");
deskHeader.innerText= `Escritorio ${deskNumber}`;


async function loadInitianCount() {
    const pending=await fetch("http://localhost:3000/api/tickets/pending")
    .then(res=>res.json());

    lblPending.innerHTML=pending.length || 0; 
}

function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');
  
    socket.onmessage = ( event ) => {
      const { payload,type } = JSON.parse( event.data );
      if( type !== 'on-ticket-count-changed') return;

      
      lblPending.innerHTML=payload;
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
  
  
  
  
  
  loadInitianCount();
  connectToWebSockets();