import { Routes } from '@angular/router';
import { CarEditComponent } from './car/car-edit/car-edit.component';
import { CarComponent } from './car/car/car.component';
import { CarPostComponent } from './car/car-post/car-post.component';

export const routes: Routes = [
  { path: '' , component: CarComponent },
  { path: 'car-edit/:id', component: CarEditComponent },
  { path: 'car-post', component: CarPostComponent }
];
