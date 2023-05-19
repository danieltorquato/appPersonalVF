/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-feedback-pupil',
  templateUrl: './feedback-pupil.component.html',
  styleUrls: ['./feedback-pupil.component.scss'],
})
export class FeedbackPupilComponent  implements OnInit {
  feedbacks = [];
  db = getFirestore();
  uid: string;
  auth = getAuth();
  idDoc: any;
  dataDoc: any;
  constructor() { }

  ngOnInit() {
    this.carregarFeedbacks();
  }


  async carregarFeedbacks() {
    onAuthStateChanged(this.auth, async (user) => {

      this.uid = user.uid;
      const q = await query(collection(this.db, 'users', this.uid, 'feedbackPupil'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.feedbacks = [];
        querySnapshot.forEach((doc)=>{

          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          this.feedbacks.push(doc.data());

          this.dataDoc = doc.data();
          console.log(this.dataDoc);

        });
      });
    });
  }
  toggleCollapse(feedback: any) {
    feedback.collapsed = !feedback.collapsed;
  }
}
