package com.hwangfantasy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = "com.hwangfantasy")
@EnableScheduling
public class ComparatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComparatorApplication.class, args);
	}
}
