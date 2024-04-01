import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarService } from '../car.service'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
}

@Component({
  selector: 'app-car-edit',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  
  updateCarForm!: FormGroup;
  id: number = this.activatedRoute.snapshot.params["id"]

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private fb: FormBuilder,
    private router: Router
  ) {}


  ngOnInit() {
    this.updateCarForm = this.fb.group({
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      year: [null, [Validators.required]],
      color: [null, [Validators.required]]
    })      
    this.getCarById();
  }

  getCarById(){
    this.carService.getCarById(this.id).subscribe(res=>{
      console.log(res);
      this.updateCarForm.patchValue(res)
    },error=>{
      console.log(error)
    })
  }

  updateCar(){
    this.carService.updateCar(this.id,this.updateCarForm.value).subscribe(res=>{
      console.log(res);
    })
    this.router.navigateByUrl('/')
    this.ngOnInit()
  }
}
