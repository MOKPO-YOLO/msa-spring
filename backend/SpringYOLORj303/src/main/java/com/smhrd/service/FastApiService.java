package com.smhrd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.entity.SelectModel;
import com.smhrd.entity.SendToFastApiDto;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class FastApiService {
	
	 // RestTemplate 이란 Spring에서 지원하는 객체로 REST API를 호출할 수 있습니다.
	 // Spring 3 이상부터 사용할 수 있으며 동기 , 비동기 REST Client을 제공합니다.
	 @Autowired
	 private final RestTemplate restTemplate;
	
     //데이터를 JSON 객체로 변환하기 위해서 사용	
     private final ObjectMapper objectMapper;
	
     
     // 스프링과 Fastapi 통신 테스트용.
     @Transactional
     public String sendToFastapi(SendToFastApiDto dto) throws JsonProcessingException{
    	 //헤더를 JSON으로 설정함
         HttpHeaders headers = new HttpHeaders();
         
        //파라미터로 들어온 dto를 JSON 객체로 변환
        headers.setContentType(MediaType.APPLICATION_JSON);
        String param = objectMapper.writeValueAsString(dto);
        HttpEntity<String> entity = new HttpEntity<String>(param, headers);
        
        
        //실제 FastAPI 서버랑 연결하기 위한 URL
        String url = "http://127.0.0.1:8000/receive_string";
     
	    //FastAPI서버로 데이터를 전송하고 받은 응답 값을 return
	    return restTemplate.postForObject(url, entity, String.class);    	
     }
    
     
     
     // 선택한 모델 fastAPI서버에 보내기.
     @Transactional
     public String sendModelToFastapi(SelectModel smodel) throws JsonProcessingException{
    	 //헤더를 JSON으로 설정함
         HttpHeaders headers = new HttpHeaders();
         
        //파라미터로 들어온 dto를 JSON 객체로 변환
        headers.setContentType(MediaType.APPLICATION_JSON);
        String param = objectMapper.writeValueAsString(smodel);
        HttpEntity<String> entity = new HttpEntity<String>(param, headers);
        System.out.println("지금되니?" + entity);
        
        //실제 FastAPI 서버랑 연결하기 위한 URL
        String url = "http://127.0.0.1:8000/receive_model"; // 이쪽으로 모델보냄.
        System.out.println("응답 확인" + restTemplate.postForObject(url, entity, String.class)); 
	    //FastAPI서버로 데이터를 전송하고 받은 응답 값을 return
	    return restTemplate.postForObject(url, entity, String.class);
     }
	

}
