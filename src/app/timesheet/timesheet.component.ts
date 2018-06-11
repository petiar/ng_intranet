import {Component, OnInit, ViewChild} from '@angular/core';
import {OAuthService} from '../services/oauth.service';
import {Router} from '@angular/router';
import {JwtService} from '../services/jwt.service';
import {Subscription} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {GQL_TIMESHEET_GET_TASKS} from '../graphql';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
    @ViewChild('modal') modalForm: NgForm;
    private payload: {};
    private querySubscription: Subscription;
    private loading;
    private entities;
    private modalRef;

  constructor(
      private oauthService: OAuthService,
      private router: Router,
      private jwtService: JwtService,
      private apollo: Apollo,
      private modalService: NgbModal
  ) {
      this.payload = this.oauthService.getPayload();
      console.log('constructor');
  }

  ngOnInit() {
      this.querySubscription = this.apollo.watchQuery<any>({
          query: GQL_TIMESHEET_GET_TASKS,
          variables: {
              fromDate: '2018-06-10',
              toDate: '2018-06-17',
              uid: this.oauthService.getId(),
          }
      })
          .valueChanges
          .subscribe(
              ({data, loading}) => {
                  this.loading = loading;
                  this.entities = data.timesheetRecordEntityQuery.entities;
              },
              (error) => {
                  console.log(error);
              }
          );
  }

}
