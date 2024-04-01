import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Car{
  id: number,
  brand: string,
  model: string,
  year: number,
  color: string 
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  getCarById(id: number) : Observable<any>{
    return this.httpClient.get(`http://localhost:8080/car/${id}`)
  }

  constructor(private httpClient: HttpClient) { }

  deleteAllCars(){
    this.httpClient.delete("http://localhost:8080/cars").subscribe(response=>{
      console.log('response')
    },error=>{
      console.log('error')
    })
  }

  deleteCar(id: number){
    return this.httpClient.delete(`http://localhost:8080/car/${id}`).subscribe(response=>{
      console.log('response')
    },error=>{
      console.log(error)
    })
  }

  updateCar(id: number, car : any): Observable<any>{
    return this.httpClient.put(`http://localhost:8080/car/${id}`,car);
  }
}
