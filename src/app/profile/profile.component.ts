import {Component, OnDestroy, OnInit} from '@angular/core';
import {OAuthService} from '../services/oauth.service';
import {Subscription} from 'rxjs';
import { Apollo } from 'apollo-angular';
import {GQL_USER_PROFILE} from '../graphql';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
    private loading: boolean;
    private currentUser: {
        name: string,
        mail: string
    };
    private payload: {};
    private querySubscription: Subscription;

  constructor(private oauthService: OAuthService,
              private apollo: Apollo) {
      this.payload = oauthService.getPayload();
      this.loading = true;
      console.log(this.payload);
  }

  ngOnInit() {
      this.querySubscription = this.apollo.watchQuery<any>({
          query: GQL_USER_PROFILE,
          variables: {
              uid: this.payload.sub,
          }
      })
          .valueChanges
          .subscribe(
              ({data, loading}) => {
                  this.loading = loading;
                  this.currentUser = data.userById;
                  console.log(data.userById);
              },
              (error) => {
                  console.log(error);
              }
          );
  }

  ngOnDestroy() {
      this.querySubscription.unsubscribe();
  }

}
