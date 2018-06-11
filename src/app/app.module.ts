import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule} from "./app-routing.module";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AuthService} from "./services/auth.service";
import { ChatComponent } from './chat/chat.component';
import {AuthGuardService} from "./services/auth-guard.service";
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import {AngularFirestore, AngularFirestoreModule} from "angularfire2/firestore";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MarkdownModule, MarkedOptions} from "ngx-markdown";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { TimesheetComponent } from './timesheet/timesheet.component';
import {OAuthService} from './services/oauth.service';
import {JwtService} from './services/jwt.service';
import { ProfileComponent } from './profile/profile.component';
import {OAuthGuardService} from './services/oauth-guard.service';
import ApolloClient from 'apollo-client/ApolloClient';
import {Apollo, ApolloModule } from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import { TimesheetRecordComponent } from './timesheet/timesheet-record/timesheet-record.component';
import { TimesheetAddComponent } from './timesheet/timesheet-add/timesheet-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ChatComponent,
    ChatMessageComponent,
    TimesheetComponent,
    ProfileComponent,
    TimesheetRecordComponent,
    TimesheetAddComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
      ReactiveFormsModule,
    MarkdownModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        }
      }
    }),
      ApolloModule
  ],
  providers: [
    AuthService, AuthGuardService, OAuthService, JwtService, OAuthGuardService, HttpLink
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(apollo: Apollo,
                httpLink: HttpLink) {

        const httpLink = createHttpLink({
            uri: 'http://timesheet.lndo.site:8080/graphql',
        });

        const authLink = setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            const token = localStorage.getItem('id_token');
            console.log(token);
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                }
            }
        });

        console.log(authLink.concat(httpLink));

        apollo.create({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache
        });
    }
}
