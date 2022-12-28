/* eslint-disable @typescript-eslint/no-shadow */
import { ActionSheetController, AlertController } from '@ionic/angular';
import * as $ from 'jquery';
import { File } from '@ionic-native/file/ngx';
import { FormBuilder } from '@angular/forms';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { Component, OnInit } from '@angular/core';
import 'firebase/compat/storage';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Storage } from '@ionic/storage-angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import '../home-painel-student/home-painel-student.component';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { doc, onSnapshot, getFirestore, updateDoc } from 'firebase/firestore';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit {
  data= new Date();
  dia= String(this.data.getDate());
  mes= String(this.data.toLocaleString('pt-BR', { month: 'long' }));
  ano= String(this.data.getFullYear());
    dataAtual= `${this.dia}-${this.mes}-${this.ano}`;
  listRef: any;
  urlImage: string;
  urlImages: any;
  id: string;
  divHTML: string;
  input;
  handlerMessage = '';
  roleMessage = '';
  ref: any;
uid;
list;
items;
auth = getAuth();
db = getFirestore();
  docRef: any;
  dataUser: any;
  listArray;
  result;
  constructor(
    public storage: Storage,
    private camera: Camera,
    public formbuilder: FormBuilder,
    public af: AngularFireStorage,
    public file: File,
    private alertController: AlertController,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {

    onAuthStateChanged(this.auth, (user) => {
      this.uid = user.uid;
      this.listRef = doc(this.db, 'users/' + this.uid);
      this.docRef = onSnapshot(doc(this.db, '/users/', this.uid), (doc) => {

        this.items = doc.data();
        this.listArray = [doc.data()];
        console.log(this.items);

      });
    });

    const div = document.getElementsByClassName('botaoArquivo')[0];
    this.input = document.getElementById('fileName') as HTMLInputElement | null;

    div.addEventListener('click', () => {
      this.input.click();
    });
    this.input.addEventListener('change', () => {
      let nome = 'Não há arquivo selecionado. Selecionar arquivo...';
      if (this.input.files.length > 0) {
        nome = this.input.files[0].name;
      }
      this.divHTML = nome;
    });
if(this.uid == null){
$('.code').html('Você não está logado');
}

  }
 public openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  uploadImage() {
    this.storage.create();
    const storage = getStorage();
    this.ref = ref(storage, `images/${this.items.name}/${this.dataAtual}-${this.input.files[0].name}`);
    uploadBytesResumable(this.ref, this.input.files[0])
      .then((snapshot) => {
        console.log(snapshot);
        console.log('adicionado');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async uploadImageUser() {
    this.uploadImage();
    const alert = await this.alertController.create({
      header: 'Adicionar imagem',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
            this.deleteImage();
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {

            const storage = getStorage();
            const gsReference = ref(
              storage,
              `gs://vitor-f-app.appspot.com/images/${this.items.name}/${this.dataAtual}-${this.input.files[0].name}`
            );
             getDownloadURL(gsReference).then(async (response) => {
              this.urlImage = response;
             console.log(this.urlImage);

            });
            this.handlerMessage = 'Alert confirmed';

          },
        },
      ],
    });
    await alert.present();
  }
  deleteImage() {
    deleteObject(this.ref)
      .then(() => {
        console.log('excluido');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async uploadUserImg(){

    await updateDoc(this.listRef, {
      // eslint-disable-next-line quote-props
      img: this.urlImage,

  });
  }
}
