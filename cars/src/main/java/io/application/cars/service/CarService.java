package io.application.cars.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.application.cars.entity.Car;
import io.application.cars.repository.CarRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarService {
    
    private final CarRepository carRepository;

    public Car addCar(Car car){
        return carRepository.save(car);
    }

    public List<Car> getCars(){
        return carRepository.findAll();
    }

    public Car getCar(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    public void deleteCars(){
        carRepository.deleteAll();
    }

    @Transactional
    public boolean deleteCar(Long id) {
        if (carRepository.existsById(id)) {
            try {
                carRepository.deleteById(id);
                return true;
            } catch (Exception e) {
                // Log the exception
                System.out.println("Error deleting car with ID: " + id);
                return false;
            }
        } else {
            System.out.println("Attempted to delete a car that does not exist with ID: " + id);
            return false;
        }
    }

    public Car updateCar(Long id, Car carDetails) {
        return carRepository.findById(id).map(car -> {
            car.setBrand(carDetails.getBrand());
            car.setModel(carDetails.getModel());
            car.setYear(carDetails.getYear());
            car.setColor(carDetails.getColor());
            return carRepository.save(car);
        }).orElse(null);
    }

}
