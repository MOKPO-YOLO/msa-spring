package com.smhrd.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;


@Configuration
public class Config {

	// RestTemplate에 대한 의존성 관리를 스프링 컨테이너가 관리하도록 등록한다.
	@Bean
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }	
	
	// ObjectMapper에 대한 의존성 관리를 스프링 컨테이너가 관리하도록 등록한다.
	@Bean
	public ObjectMapper objectMapper(){
	return new ObjectMapper();
	}

	
	
}
