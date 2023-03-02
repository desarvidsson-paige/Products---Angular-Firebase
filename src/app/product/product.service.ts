import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { Product } from './product-interface';

@Injectable()
export class ProductService {
  productList: Product[] = [];
  product$: Observable<Product>;
  private dbPath = '/';
  productsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);  
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/db.json');
  }
  getAll(): Observable<any>{
      // Use snapshotChanges().map() to store the key
     this.items = this.productsRef
       .snapshotChanges()
       .pipe(
         map((changes) =>
           changes.map((c) => ({ key: c.key, ...c.payload.val() }))
         )
       );
       return this.items;
  }
  getAllNoKey(): AngularFireList<Product> {
    return this.productsRef;
  }
  get(key: string): any {
    const getPath = `${this.dbPath}/${key}`;
    return this.db.object(getPath);
  }
  getBySKUNoKey(sku: string) {
    return this.db.list('/', (ref) => ref.orderByChild('sku').equalTo(sku));
  }
  getBySKU(sku: string): Observable<any> {
    return this.db.list('/', (ref) => ref.orderByChild('sku').equalTo(sku)).snapshotChanges().pipe(map((changes) =>
    changes.map((c) => ({ key: c.key, ...c.payload.val() as Product}))
  ));

  }
  delete(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }
  update(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }
  getProduct(id: string): Observable<Product> {
    this.product$ = this.http
      .get<Product[]>('assets/db.json')
      .pipe(map((item) => item.filter((x) => x.sku === id)[0]));
    return this.product$;
  }
  
  updateProduct(item) {
    let selected: Boolean = false;
    this.productList.map((val, index) => {
      if (val.id == item.id) {
        this.productList[index] = item;
        selected = true;
      }
    });
    return selected;
  }
}
