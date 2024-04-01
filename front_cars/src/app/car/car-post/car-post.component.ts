import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarEditComponent } from '../car-edit/car-edit.component';

interface Car{
  id: number,
  brand: string,
  model: string,
  year: number,
  color: string
}

@Component({
  selector: 'app-car-post',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './car-post.component.html',
  styleUrl: './car-post.component.css'
})
export class CarPostComponent implements OnInit{

  idName!: number;
  brandName!: string;
  modelName!: string;
  yearName!: number;
  colorName!: string;


  carList: Car [] = []

  car: any

  constructor(private httpClient: HttpClient, 
    private carService : CarService,
    private router: Router
    ){ }

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
    this.router.navigateByUrl("/")
  }


}
