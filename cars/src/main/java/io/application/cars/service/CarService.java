package io.application.cars.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

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

    public void deleteCars(){
        carRepository.deleteAll();
    }

    public void updateCar(Long id,Car car) throws Exception{
        if(carRepository.existsById(id)){
            car.setId(id);
            carRepository.save(car);
        }else{
            throw new Exception("Car with id "+id+" not found");
        }
    }

    public Optional<Car> getCar(Long id) {
        return carRepository.findById(id);
    }
}
