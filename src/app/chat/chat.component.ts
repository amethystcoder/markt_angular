import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  roomId: number = 1;

  private chatService = inject(ChatService);

  ngOnInit(): void {
    this.chatService.connect();

    this.chatService.onMessage().subscribe((message) => {
      console.log('Received message:', message);
      this.messages.push(message);
    });

    this.chatService.onProductShared().subscribe((productMessage: any) => {
      console.log('Received product message:', productMessage);
      this.messages.push({
        user: productMessage.user,
        product: productMessage.product,
      });
    });

    this.chatService.joinRoom(this.roomId);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.roomId, this.newMessage);
      this.newMessage = ''; // Clears the input field after sending
    }
  }

  ngOnDestroy() {
    this.chatService.leaveRoom(this.roomId);
    this.chatService.disconnect();
  }
}
