import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarEditComponent } from '../car-edit/car-edit.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CarService } from '../car.service';

interface Car{
  id: number,
  brand: string,
  model: string,
  year: number,
  color: string
}

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,FormsModule,CarEditComponent,HttpClientModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit{

  idName!: number;
  brandName!: string;
  modelName!: string;
  yearName!: number;
  colorName!: string;


  carList: Car [] = []

  car: any

  constructor(private httpClient: HttpClient, private carService : CarService){ }

  ngOnInit(): void {
    this.httpClient.get<Car[]>("http://localhost:8080/cars").subscribe(response =>{
      this.carList = response
    }
    ,error =>{
      console.log('error')
    })
  }

  deleteAllCars():void{
    this.carService.deleteAllCars()
  }

  deleteCar(id : number){
    this.carService.deleteCar(id)
  }

}
