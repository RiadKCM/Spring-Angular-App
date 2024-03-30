package io.application.cars.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import io.application.cars.entity.Car;
import io.application.cars.service.CarService;
import lombok.RequiredArgsConstructor;


@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequiredArgsConstructor
public class CarController {
    
    private final CarService carService;

    @PostMapping("/car")
    public Car addCar(@RequestBody Car car){
        return carService.addCar(car);
    }

    @GetMapping("/cars")
    public List<Car> getCars(){
        return carService.getCars();
    }

    @GetMapping("/car/{id}")
    public Optional<Car> getCar(Long id){
        return carService.getCar(id);
    }

    @DeleteMapping("/cars")
    public void deleteCars(){
        carService.deleteCars();
    }

    @PutMapping("/car/{id}")
    public void updatecar(Long id,@RequestBody Car car) throws Exception{
        carService.updateCar(id, car);
    }
}
