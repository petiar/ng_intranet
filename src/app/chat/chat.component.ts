import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/index";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import {ChatMessage} from "./chat-message/chat-message.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('f') messageForm: NgForm;

  private messagesCollection: AngularFirestoreCollection<ChatMessage>;
  public messages: Observable<any>;
  name: string;
  message: string = '';

  constructor(private db: AngularFirestore,
              private authService: AuthService) {
    this.messagesCollection = db.collection<ChatMessage>('/messages', ref => {
      return ref.limit(10).orderBy('timestamp', 'desc');
    });
    this.messages = this.messagesCollection.valueChanges();
    console.log(this.messages);
  }

  ngOnInit() {
  }

  onKeySubmit(event, messageForm) {
    if (event.keyCode === 13 && !event.shiftKey) {
      this.onSubmit(messageForm);
    }
  }

  onSubmit(messageForm) {
    const messageObj = {
      name: this.authService.getName(),
      message: messageForm.value.message,
      timestamp: + new Date()
    };

    messageForm.reset();
    this.db.collection('/messages').add(messageObj);
  }
}
