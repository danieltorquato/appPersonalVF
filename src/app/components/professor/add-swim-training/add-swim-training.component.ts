/* eslint-disable max-len */
/* eslint-disable object-shorthand */
import { PupilsComponent } from 'src/app/components/professor/pupils/pupils.component';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { OverlayEventDetail } from '@ionic/core/components';
/* eslint-disable @typescript-eslint/member-ordering */
import { InfiniteScrollCustomEvent, IonModal, ModalController, NavController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercicio } from '../../../models/exercicios.model';
import { ExerciciosService } from '../../../services/exercicios.service';
import { addDoc, collection, doc, setDoc, getDocs, QuerySnapshot, query, where, getDoc } from 'firebase/firestore';
import { db } from 'src/environments/environment';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
@Component({
  selector: 'app-add-swim-training',
  templateUrl: './add-swim-training.component.html',
  styleUrls: ['./add-swim-training.component.scss'],
})
export class AddSwimTrainingComponent  implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  exercicios: any[] = [];
  name: any;
  message: string;
  isModalOpen = false;
  exercicio: Exercicio = { nome: '', descricao: '', categoria: '' };
  str = undefined;
  items = [];
  filterItems: any[];
  searchTerm = '';
  searchCategory = '';
 id:  string;
 pupilsItem = [];
 trainingItems = [];
 component = PupilsComponent;
  uid: string;
exerciseName;
exerciseCategory;
exerciseVariation;
exerciseWeight;
exerciseObservation;
  constructor(private modalController: ModalController, private exerciciosService: ExerciciosService, private activatedRoute: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      this.uid = user.uid;
      console.log(this.uid);
      this.usePupil();
      this.currentTraining();
    } else {
      alert('Você precisa estar logado');
    }
  });
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    console.log('funciona');
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
  async currentTraining(){
    const querySnapshot = await getDocs(collection(db, 'users', `${this.uid}`,'pupils', `${this.id}`,'treinoPiscina'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.trainingItems.push(doc.data());
      console.log(this.trainingItems);
    });
    console.log('pegando');
    console.log(this.trainingItems);
  }

  async buscarDados(){
    const querySnapshot = await getDocs(collection(db, 'exerciciosPiscina'));
    this.items = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.filterItems = [];
      this.items.push(doc.data());
      this.filterItems = this.items;
      this.exerciseName = doc.data().nome;
      this.exerciseVariation = doc.data().variacao;
      console.log(doc.data().nome);
    });
    console.log(this.items);

}
emptyList(){
  this.items=[];
}
  addExercise() {
    this.exerciciosService.adicionarExercicio(this.exercicio)
      .then(async () => {
        console.log('Exercício adicionado com sucesso!');
        // faça algo após adicionar o exercício, se necessário
        // const docRef = await addDoc(collection(db, 'exercicios'), {
        //   nome: this.exercicio.nome,
        //   descricao: this.exercicio.descricao,
        //   categoria: this.exercicio.categoria
        // });
      })
      .catch(error => console.error('Erro ao adicionar exercício:', error));
  }
  onIonInfinite(ev) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
    this.currentTraining();
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.addExercise();
    }
  }
  filterExercises() {
    this.searchCategory = '';
    if(this.searchTerm.length === 0){
      this.emptyList();
      this.filterItems = [];
          }
    // Filtrar os exercícios com base no termo de pesquisa
    this.filterItems = this.items.filter(item =>
      item.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    }
  async filterExercisesCategory() {
    if(this.searchCategory.length === 0){
      this.emptyList();
this.filterItems = [];
    }
    const queryCategory = query(collection(db, "exerciciosPiscina"), where("categoria", "==" , this.searchCategory));
    const querySnapshot = await getDocs(queryCategory);
  this.emptyList();
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      this.items.push(doc.data());
      this.filterItems = this.items.filter(item =>
        item.categoria.toLowerCase().includes(this.searchCategory.toLowerCase())
      );
      console.log(this.searchCategory);
    });

    }
   async addExerciseInTraining(nome, variacao){
    if (variacao === undefined) {
variacao = '';
    }
    console.log(nome, variacao);
    const docRef = await addDoc(collection(db, 'users', `${this.uid}`,'pupils', `${this.id}`, 'treinoPiscina'), {
      nome: nome,
      variacao: variacao,
      intensidade: 'A1',
      metros: 50,
    });
    const docRefPupil = await addDoc(collection(db, 'users', `${this.id}`,'treinoPiscina'), {
      nome: nome,
      variacao: variacao,
      intensidade: 'A1',
      metros: 50,
    });
    }
    pegaId(id){
      console.log(id);
    }
}
