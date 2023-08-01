/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/environments/environment';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent  implements OnInit {
  personal: any = {
    nome: 'Nome do Personal',
    email: 'personal@email.com',
    telefone: '(00) 1234-5678',
    endereco: 'Rua do Personal, 123'
  };
  str = undefined;
  items = [];
  filterItems: any[];
  name: any;
  searchTerm = '';
  searchCategory = '';
  isModalOpen = false;
 id:  string;
 pupilsItem = [];
 trainingItems = [];
  uid: string;
exerciseName;
exerciseCategory;
exerciseVariation;
exerciseWeight;
exerciseObservation;
  constructor(private activatedRoute: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.uid = user.uid;
        console.log(this.uid);
        this.usePupil();
      } else {
        alert('Você precisa estar logado');
      }
    });

    }
    async usePupil(){
      this.id = this.activatedRoute.snapshot.paramMap.get('info');
      console.log(this.id);
      const querySnapshot = await doc(db, 'users', `${this.id}`);
      const docSnap = await getDoc(querySnapshot);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.pupilsItem.push(docSnap.data());
        console.log(this.pupilsItem);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }

}
