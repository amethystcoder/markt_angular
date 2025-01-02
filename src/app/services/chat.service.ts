import { inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = inject(Socket);

  connect() {
    this.socket.connect();

    this.socket.on('connect', () => {
      console.log('WebSocket connected!');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected!');
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  onConnect() {
    return this.socket.fromEvent('connected');
  }

  joinRoom(roomId: number) {
    this.socket.emit('join', { room: roomId });
  }

  leaveRoom(roomId: number) {
    this.socket.emit('leave', { room: roomId });
  }

  sendMessage(roomId: number, message: string) {
    this.socket.emit('message', { room: roomId, message });
  }

  onMessage() {
    return this.socket.fromEvent('message');
  }

  onProductShared() {
    return this.socket.fromEvent('product_shared');
  }
}
