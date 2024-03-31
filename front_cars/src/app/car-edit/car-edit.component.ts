import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarService } from '../car.service'; // Ajustez le chemin selon votre structure de projet

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
  imports: [RouterModule],
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  carForm: FormGroup;
  carId: number;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialisez votre formulaire ici
    this.carForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900)]],
      color: ['', Validators.required]
    });

    // Récupérez l'ID de la voiture depuis l'URL
    this.carId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadCarData();
  }

  loadCarData(): void {
    // Chargez les données de la voiture et mettez à jour le formulaire
    this.carService.getCarById(this.carId).subscribe({
      next: (car: Car) => {
        this.carForm.patchValue({
          brand: car.brand,
          model: car.model,
          year: car.year,
          color: car.color
        });
      },
      error: (error) => {
        console.error('Error fetching car data:', error);
      }
    });
  }

  updateCar(): void {
    // Mettez à jour la voiture avec les valeurs du formulaire
    if (this.carForm.valid) {
      this.carService.updateCar(this.carId, this.carForm.value).subscribe({
        next: () => {
          console.log('Car updated successfully');
          this.router.navigate(['/']); // Naviguez vers la page que vous souhaitez après la mise à jour
        },
        error: (error) => {
          console.error('Error updating the car:', error);
        }
      });
    }
  }
}
