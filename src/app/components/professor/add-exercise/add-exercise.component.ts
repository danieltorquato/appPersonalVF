/* eslint-disable object-shorthand */
import { PupilsComponent } from 'src/app/components/professor/pupils/pupils.component';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { OverlayEventDetail } from '@ionic/core/components';
/* eslint-disable @typescript-eslint/member-ordering */
import { InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercicio } from '../../../models/exercicios.model';
import { ExerciciosService } from '../../../services/exercicios.service';
import { addDoc, collection, doc, setDoc, getDocs, QuerySnapshot, query, where, getDoc } from 'firebase/firestore';
import { db } from 'src/environments/environment';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent implements OnInit {


  @ViewChild(IonModal) modal: IonModal;
  exercicio: Exercicio = { nome: '', descricao: '', categoria: '' };
  str = undefined;
  items = [];
  filterItems: any[];
  name: any;
  searchTerm = '';
  searchCategory = '';
  isModalOpen = false;
 id:  string;
 pupilsItem = [];
 component = PupilsComponent;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor(private exerciciosService: ExerciciosService, private activatedRoute: ActivatedRoute ) {}
  public chartType = 'doughnut';
  public chartData = [300, 50, 100];
  public chartLabels = ['Red', 'Yellow', 'Blue'];
 async ngOnInit() {
    // const querySnapshot = await getDocs(collection(db, 'exercicios'));
    // querySnapshot.forEach((doc) => {
    //   doc.data() is never undefined for query doc snapshots
    //   this.items.push(doc.data());
    // });
    // this.filterItems = this.items;
    // console.log(this.filterItems);
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
  async buscarDados(){
    const querySnapshot = await getDocs(collection(db, 'exercicios'));
    this.items = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.filterItems = [];
      this.items.push(doc.data());
      this.filterItems = this.items;
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
    const queryCategory = query(collection(db, "exercicios"), where("categoria", "==" , this.searchCategory));
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
}
