import { Component, OnInit } from '@angular/core';
import {io} from 'socket.io-client';

const SOCKET_ENDPOINT = 'http://localhost:3000';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  socket:any;
  message!:string;
  
  constructor() { }

  ngOnInit(): void {
    this.setupSocketConnection();
  }

  setupSocketConnection(){
    this.socket = io(SOCKET_ENDPOINT, {
      auth: {
        token: "abc"
      }
    });
    this.socket.on("connect", () => {
      console.log(this.socket.connected);
    });
    this.socket.on('my broadcast', (data:string) => {
      if(data){
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '15px';
        document.getElementById('message-list')?.append(element);
      }
    });
  }
  sendMsg(){
    this.message = (document.getElementById("msg") as HTMLInputElement).value;
    this.socket.emit('my message', this.message)
    this.message = '';
  }
}
