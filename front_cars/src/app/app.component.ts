import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CarService } from './car.service';
import { Router } from '@angular/router';
import { CarEditComponent } from './car-edit/car-edit.component';

interface Car{
  id: number,
  brand: string,
  model: string,
  year: number,
  color: string
}

const routes: Routes = [
  { path: 'car-edit/:id', component: CarEditComponent, pathMatch: 'full' }
];



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'front_cars';

  idName!: number;
  brandName!: string;
  modelName!: string;
  yearName!: number;
  colorName!: string;


  carList: Car [] = []

  car: any

  constructor(private httpClient: HttpClient, private carService : CarService, private router : Router){ }

  ngOnInit(): void {
    this.httpClient.get<Car[]>("http://localhost:8080/cars").subscribe(response =>{
      this.carList = response
    }
    ,error =>{
      console.log('error')
    })
  }

  save(): void {
    const carData = {
      id: this.idName,
      brand: this.brandName,
      model: this.modelName,
      year: this.yearName,
      color: this.colorName
    };
  
    this.httpClient.post("http://localhost:8080/car", carData).subscribe(response => {
      console.log('ok');
    }, error => {
      console.log('error');
    });
    console.log('saved');
  }

  deleteAllCars():void{
    this.carService.deleteAllCars()
  }

  deleteCar(id : number){
    this.carService.deleteCar(id)
  }


  loadCar(id: number): void {
    this.carService.getCarById(id).subscribe(
      (car: Car) => {
        this.car = car;
      },
      error => {
        console.log('Error fetching car:', error);
      }
    );
  }

  navigateToCarEdit(): void {
    this.router.navigate(['/car-edit']);
  }

}
