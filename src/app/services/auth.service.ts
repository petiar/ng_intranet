import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import * as firebase from "firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth,
              private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  getName() {
    return this.userDetails.displayName;
  }

  signWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(
        (res) => this.router.navigate(['/'])
      );
  }

  getImageUrl() {
    if (this.userDetails) {
      return this.userDetails.photoURL;
    } else {
      return null;
    }
  }
}
