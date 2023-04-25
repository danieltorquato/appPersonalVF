/* eslint-disable @typescript-eslint/member-ordering */
import { InfiniteScrollCustomEvent } from '@ionic/angular';
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
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
  exercicio: Exercicio = { nome: '', descricao: '', categoria: '' };
  items = [];
  constructor(private exerciciosService: ExerciciosService) {}

 async ngOnInit() {

    const querySnapshot = await getDocs(collection(db, 'exercicios'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.items.push(doc.data());
    });

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
}
