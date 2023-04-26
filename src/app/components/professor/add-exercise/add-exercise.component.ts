/* eslint-disable @typescript-eslint/no-inferrable-types */
import { OverlayEventDetail } from '@ionic/core/components';
/* eslint-disable @typescript-eslint/member-ordering */
import { InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercicio } from '../../../models/exercicios.model';
import { ExerciciosService } from '../../../services/exercicios.service';
import { addDoc, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from 'src/environments/environment';
import * as $ from 'jquery';

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
  constructor(private exerciciosService: ExerciciosService) {}

 async ngOnInit() {

    const querySnapshot = await getDocs(collection(db, 'exercicios'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.items.push(doc.data());
    });
    this.filterItems = this.items;
    console.log(this.filterItems);
  }
  adicionarExercicio() {
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
      this.adicionarExercicio();
    }
  }
  filterExercises() {
    // Filtrar os exercícios com base no termo de pesquisa
    this.filterItems = this.items.filter(item =>
      item.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    }
}
