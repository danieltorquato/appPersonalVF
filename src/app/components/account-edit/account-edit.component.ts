/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import { ActionSheetController, AlertController } from '@ionic/angular';
import * as $ from 'jquery';
import { File } from '@ionic-native/file/ngx';
import { FormBuilder, Validators } from '@angular/forms';
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
  data = new Date();
  dia = String(this.data.getDate());
  mes = String(this.data.toLocaleString('pt-BR', { month: 'long' }));
  ano = String(this.data.getFullYear());
  dataAtual = `${this.dia}-${this.mes}-${this.ano}`;
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
  userData;
  base64Image: string;
  nameInput;
  constructor(
    public storage: Storage,
    private camera: Camera,
    public formbuilder: FormBuilder,
    public af: AngularFireStorage,
    public file: File,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.userCatch();

    //importa botões de arquivo

    const div = document.getElementsByClassName('teste')[0];
    this.input = document.getElementById('fileName') as HTMLInputElement | null;

    //Faz o tratamento do arquivo para ser enviado
    div.addEventListener('click', () => {
      this.input.click();
    });
    this.input.addEventListener('change', () => {
      let nome = 'Não há arquivo selecionado. Selecionar arquivo...';
      if (this.input.files.length > 0) {
        nome = this.input.files[0].name;
      }
      this.divHTML = nome;
      this.uploadImage();
      this.uploadImageUser();

    });
  }
  public userCatch(){
    //Captura usuário atual
   onAuthStateChanged(this.auth, (user) => {
      this.uid = user.uid;
      this.listRef = doc(this.db, 'users/' + this.uid);
      this.docRef = onSnapshot(doc(this.db, '/users/', this.uid), (doc) => {
        console.log(doc);
        this.items = doc.data();
        this.listArray = [doc.data()];
        console.log(this.items);
        this.userData = this.formbuilder.group({
          name: [this.items.name],
          shortName: [this.items.shortName],
          email: [null, [Validators.required, Validators.minLength(5)]],
          img: [null],
          isAdmin: [null],
          isProfessor: [null]
        });
      });
    });

  };
  //Configuração para abrir e capturar dados da imagem
  public openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Faz o upload da imagem para o banco
  uploadImage() {
    this.storage.create();
    const storage = getStorage();
    this.ref = ref(
      storage,
      `images/${this.uid}/${this.dataAtual}-${this.input.files[0].name}`
    );
    uploadBytesResumable(this.ref, this.input.files[0])
      .then((snapshot) => {
        console.log(snapshot);
        console.log('adicionado');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Atualiza a imagem do usuário
  async uploadImageUser() {
    //Chama a função de Upload e sobe a imagem para o banco
    this.uploadImage();
    //Abre um alert para confirmar se quer mesmo alterar sua imagem
    const alert = await this.alertController.create({
      header: 'Adicionar imagem',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

          handler: () => {
            /*Caso o usuário clique em Cancelar, a imagem é deletada do banco (economizar espaço não utilizado) na chamada da função deleteImage;*/
            this.deleteImage();
          },
        },
        {
          text: 'Alterar',
          role: 'confirm',
          handler: () => {
            /*Se clicar em Alterar buscamos o path da imagem no banco*/
            const storage = getStorage();
            const gsReference = ref(
              storage,
              `gs://vitor-f-app.appspot.com/images/${this.uid}/${this.dataAtual}-${this.input.files[0].name}`
            );
            getDownloadURL(gsReference)
              .then(async (response) => {
                //capturamos URL da Imagem
                this.urlImage = response;
                console.log(this.urlImage);
                $('.iconImg').attr('src',   this.urlImage);
              })
              .then((response) => {
                console.log(response);
                this.handlerMessage = 'Alert confirmed';
              });
          },
        },
      ],
    });
    await alert.present();
  }

//Deleta imagem do banco
  deleteImage() {
    deleteObject(this.ref)
      .then(() => {
        console.log('excluido');
      })
      .catch((err) => {
        console.log(err);
      });
  }
//Altera imagem do usuário
  async uploadUserData() {
    if (this.urlImage === undefined) {
      await updateDoc(this.listRef, {
        // eslint-disable-next-line quote-props
        name: this.userData.value.name,
        shortName: this.userData.value.shortName,

      });
    }else{
      await updateDoc(this.listRef, {
        // eslint-disable-next-line quote-props
        img: this.urlImage,
        name: this.userData.value.name,
        shortName: this.userData.value.shortName,


      });
    }
    console.log('Atualizado');
  }
}
