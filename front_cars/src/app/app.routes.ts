import { Routes } from '@angular/router';
import { CarEditComponent } from './car-edit/car-edit.component'; // Ajustez le chemin
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '' , component: AppComponent },
  { path: 'car-edit', component: CarEditComponent },
];
