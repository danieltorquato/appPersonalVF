/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.component.html',
  styleUrls: ['./pupils.component.scss'],
})
export class PupilsComponent implements OnInit {
  db = getFirestore();
  id;
  data;
  apelido: any;
  auth = getAuth();
  uid: string;
  dataArray: any[] = [];
  datas: any;
  constructor() {}

  async ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      this.uid = user.uid;
      console.log(this.uid);
      const queryLa = collection(this.db, 'users');
      const q = query(queryLa, where('professor', '==', this.uid));
      const queryL = await getDocs(q);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      queryL.forEach(async (docs) => {
        this.id = docs.id;
        const docRef = doc(this.db, 'users', this.id);
        this.data = await getDoc(docRef);
        console.log(this.data.uid);
        console.log(this.data.id);

        const docRefs = doc(this.db, 'users', this.uid, 'pupils', this.data.id);
        console.log(this.data.id);
        setDoc(docRefs, this.data.data());
        // eslint-disable-next-line @typescript-eslint/no-shadow
        this.dataArray.push(this.data.data());
      });
    });
  }
}
