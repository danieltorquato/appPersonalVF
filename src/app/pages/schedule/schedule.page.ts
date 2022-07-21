import { FormBuilder } from '@angular/forms';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Component, OnInit } from '@angular/core';
import 'firebase/compat/storage';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Storage } from '@ionic/storage-angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  listRef: any;
  list: any;
  urlImage: string;
  urlImages: any;
  id: string;

  constructor( private camera: Camera,
    public storage: Storage,
    public db: AngularFireDatabase,
    public formbuilder: FormBuilder,
  ) { }

  ngOnInit() {
}
openGallery(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   const base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
   console.log(err);
  });
}

uploadImage() {


  };
uploadImageUser(){
  const storage = getStorage();
  const imageName = 'AirBrush_20220523193143.jpg';
  // const listRef = ref(storage, 'images/');
  const gsReference = ref(storage, `gs://vitorf-2a488.appspot.com/images/${imageName}`);

getDownloadURL(gsReference).then((response)=>{
  this.urlImage = response;

    this.storage.get('users').then((resp)=>{
    const uid = resp;
    const listDB= this.db.database.ref('/users').child(uid);
    listDB.on('value', (snapshot)=>{
      const items = snapshot.val();
      // console.log(items);
      if(items){
        this.list= Object.keys(items).map(i=> {
          // console.log(i);
          // eslint-disable-next-line no-underscore-dangle
          items[i]._id= i;
          // eslint-disable-next-line no-underscore-dangle
          this.id = items[i]._id;
          // eslint-disable-next-line no-underscore-dangle
          console.log(this.id);
        });
        // console.log(this.id);
         this.urlImages = this.formbuilder.group({
      img: [this.urlImage]
    });
   this.db.database.ref(`/users/${uid}/${this.id}`).update(this.urlImages.value).then(()=>{
    console.log('Adicionado');
    this.urlImages.reset();
   });
  //   console.log( this.urlImages);
      }
    });


  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
  });
};
}

