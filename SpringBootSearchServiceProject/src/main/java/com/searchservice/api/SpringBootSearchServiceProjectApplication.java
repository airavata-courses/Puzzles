package com.searchservice.api;





import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class SpringBootSearchServiceProjectApplication{

	public static void main(String[] args)  {
		SpringApplication.run(SpringBootSearchServiceProjectApplication.class, args);
		
	}
	
	
	 @PostConstruct
 	 public void init(){
	      // Setting Spring Boot SetTimeZone
	      TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	  }
	 

}
