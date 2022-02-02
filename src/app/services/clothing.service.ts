import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {defer, map, Observable} from "rxjs";
import {Clothing} from "../models/clothing.model";
import {  uploadBytes, ref, getStorage, getDownloadURL } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  ref: AngularFireList<unknown>;

  constructor(private db: AngularFireDatabase) {
    this.ref = this.db.list('clothes');
  }

  getData(): Observable<any> {
    return this.ref.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return {data, key};
        })
      })
    );
  }

  pushData(response: Clothing) {
    return this.ref.push(response);
  }

  deleteData(key: string) {
    return this.ref.remove(key);
  }

  editData(key: string, data: Clothing) {
    return this.ref.set(key, data);
  }

  findSKU(SKU: number) {
        return this.ref.query.orderByChild('SKU')
          .equalTo(SKU)
          .once('value')
          .then((snapshot) => {
            return snapshot.val();
          }).catch(err => console.log(err));
  }
  async uploadFile(file: File): Promise<string>  {
    return new Promise(((resolve) => {
      const storage = getStorage();
      const storageRef = ref(storage, Date.now().toString());
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(url => resolve(url));
      })
    }))
  }
}
