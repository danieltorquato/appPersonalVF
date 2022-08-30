/* eslint-disable no-underscore-dangle */
import { AlertController } from '@ionic/angular';
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

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent implements OnInit {
  listRef: any;
  list: any;
  urlImage: string;
  urlImages: any;
  id: string;
  divHTML: string;
  input;
  handlerMessage = '';
  roleMessage = '';
  ref: any;
  constructor(
    private camera: Camera,
    public storage: Storage,
    public db: AngularFireDatabase,
    public formbuilder: FormBuilder,
    public af: AngularFireStorage,
    public file: File,
    private alertController: AlertController
  ) {}

  ngOnInit() {
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
  }

  openGallery() {
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
    this.ref = ref(storage, `images/${this.input.files[0].name}`);
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
            this.handlerMessage = 'Alert confirmed';
            this.storage.create();
            const storage = getStorage();
            const gsReference = ref(
              storage,
              `gs://vitorf-2a488.appspot.com/images/${this.input.files[0].name}`
            );
            getDownloadURL(gsReference).then((response) => {
              this.urlImage = response;
              this.storage
                .get('users')
                .then((resp) => {
                  const uid = resp;
                  const listDB = this.db.database.ref('/users').child(uid);
                  listDB.on('value', (snapshot) => {
                    const items = snapshot.val();
                    if (items) {
                      this.list = Object.keys(items).map((i) => {
                        items[i]._id = i;
                        this.id = items[i]._id;
                      });
                      this.urlImages = this.formbuilder.group({
                        img: [this.urlImage],
                      });
                      this.db.database
                        .ref(`/users/${uid}/${this.id}`)
                        .update(this.urlImages.value)
                        .then(() => {
                          console.log('Adicionado');
                          this.urlImages.reset();
                        });
                    }
                  });
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode);
                  console.log(errorMessage);
                });
            });
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
}
