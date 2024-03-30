package io.application.cars;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CarsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarsApplication.class, args);
		// spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
		// spring.datasource.url=jdbc:mysql://localhost:3306/cars
		// spring.datasource.username=root
		// spring.datasource.password=Riadoriado09!
		// spring.jpa.show-sql=true
		// spring.jpa.hibernate.ddl-auto=update
	}

}