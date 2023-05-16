/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import { db } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-history-pupils-c',
  templateUrl: './history-pupils-c.component.html',
  styleUrls: ['./history-pupils-c.component.scss'],
})
export class HistoryPupilsCComponent implements OnInit {
  uid: string;
  items: any;
  filterItems = [];
  auth = getAuth();
  id: string;
  pupilsItem = [];
  filterPupilsItems = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.uid = user.uid;
        console.log(this.uid);
        this.filterPupils();
      } else {
        alert('Você precisa estar logado');
      }
    });
  }

  async getPupils(){
    this.pupilsItem = [];
    const queryLa = collection(db, 'users');
    const q = query(queryLa, where('professor', '==', this.uid));
    const queryL = await getDocs(q);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    queryL.forEach(async (docs) => {
      this.id = docs.id;
      this.pupilsItem.push(docs.data());
      console.log(this.pupilsItem);
    });
  }
async filterPupils(){
  this.getPupils();
  this.pegaId(this.id);
  this.filterPupilsItems = [];
  this.pupilsItem = [];
  const queryLa = collection(db, 'users', `${this.uid}`,'pupils');
  const q = query(queryLa, where('id', '==', this.id));
  const queryL = await getDocs(q);
  queryL.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
    this.filterPupilsItems.push(doc.data());
    this.pupilsItem.push(doc.data());
    console.log(this.filterPupilsItems);
    console.log(this.pupilsItem);
  });
}
  async getData(){
    this.filterItems = [];
    const queryLa = collection(db, 'users', `${this.uid}`,'pupils', `${this.id}`, 'history');
    const q = query(queryLa, where('id', '==', this.id));
    const queryL = await getDocs(q);
    queryL.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      this.filterItems.push(doc.data());

      console.log(this.filterItems);
    });
  }
  onIonInfinite(ev) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  pegaId(id){
    this.id = this.activatedRoute.snapshot.paramMap.get('info');
    this.getData();
    console.log(id);
  }
}
