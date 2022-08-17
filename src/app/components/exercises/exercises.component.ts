import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {
  list: any;
  constructor(public db: AngularFireDatabase,
    public storage: Storage,) { }

  ngOnInit() {
    this.storage.create();

      const listDB = this.db.database.ref('/exercises');
      console.log(listDB);
      listDB.on('value', (snapshot)=>{
        const items = snapshot.val();
        console.log(items);
        if(items){
          this.list= Object.keys(items).map(i=> {
            console.log(i);
            return items[i];
          });
          console.log(this.list);
          console.log(items.name);
        }
  });

}
}
