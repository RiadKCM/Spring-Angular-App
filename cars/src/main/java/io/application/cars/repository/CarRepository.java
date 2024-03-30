package io.application.cars.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.application.cars.entity.Car;

@Repository
public interface CarRepository extends JpaRepository<Car,Long>{
    
}
