import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductService } from './product/product.service';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ColorPipe } from './filter/color.pipe';

const appRoutes: Routes = [
  
  { path: 'product-detail/:id', component: ProductDetailComponent },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  { path: '',
    redirectTo: '/product-list',
    pathMatch: 'full'
  },
];


@NgModule({
  imports:      [ 
    BrowserModule, 
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  declarations: [ AppComponent,ProductDetailComponent,ProductListComponent, ColorPipe],
  providers: [ProductService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }