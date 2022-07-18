import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Component, OnInit } from '@angular/core';
import 'firebase/compat/storage';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  listRef: any;
  lista: any[];
  urlImage: string;

  constructor(
  ) { }

  ngOnInit() {
    const storage = getStorage();
// Create a reference under which you want to list
// const listRef = ref(storage, 'images/');
const gsReference = ref(storage, 'gs://vitorf-2a488.appspot.com/images/AirBrush_20220523193143.jpg');
// Find all the prefixes and items.
// gsReference.on('value', (snapshot)=>{
//   const items = snapshot.val();
// });
const list = getDownloadURL(gsReference).then((response)=>{
this.urlImage = response;

});

  }

}
