import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CarService } from './car.service';
import { response } from 'express';
import { error } from 'console';

interface Car{
  id: number,
  brand: string,
  model: string,
  year: number,
  color: string
}

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

  constructor(private httpClient: HttpClient, private carService : CarService, private route : ActivatedRoute){ }

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

  updateCar(): void {
    this.carService.updateCar(this.car.id, this.car).subscribe(
      () => {
        console.log('Car updated successfully');
        // Redirigez ou effectuez d'autres actions si nécessaire après la mise à jour
      },
      error => {
        console.log('Error updating car:', error);
      }
    );
  }

}
