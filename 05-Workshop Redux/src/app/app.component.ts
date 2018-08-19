import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

// Firebase Config
const firebaseConfig = {
  apiKey: 'AIzaSyDDX88cFnfCjQNfF_whqH_rVAXKxsEBBCw',
  authDomain: 'angular-recipes-8d419.firebaseapp.com'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    firebase.initializeApp(firebaseConfig); // Initialize Firebase
  }
}
