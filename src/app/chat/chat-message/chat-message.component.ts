import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from "./chat-message.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;

  constructor() { }

  ngOnInit() {
  }

  timeConverter(t) {
    const a = new Date(t);
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    if (a.setHours(0,0,0,0) === today.setHours(0,0,0,0))
      return 'today, ' + hour + ':' + min;
    else if (a.setHours(0,0,0,0) === yesterday.setHours(0,0,0,0))
      return 'yesterday, ' + hour + ':' + min;
    else if (year === today.getFullYear())
      return date + ' ' + month + ', ' + hour + ':' + min;
    else
      return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
  }
}
