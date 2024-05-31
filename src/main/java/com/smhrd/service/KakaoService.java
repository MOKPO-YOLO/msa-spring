package com.smhrd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.smhrd.entity.KakaoTokenResponseDto;
import com.smhrd.entity.KakaoUserInfoResponseDto;

import io.netty.handler.codec.http.HttpHeaderValues;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class KakaoService {
	
	 @Autowired
	 // RestTemplate 이란 Spring에서 지원하는 객체로 REST API를 호출할 수 있습니다.
	 // Spring 3 이상부터 사용할 수 있으며 동기 , 비동기 REST Client을 제공합니다.
	 private final RestTemplate restTemplate;
	
     private String client_id = "a4993846c327ef55eec1b9091c6615f6";  // REST_API_KEY
     private String REDIRECT_URI = "http://localhost:8081/controller/oauth.do";
    
    
	 public String getAccessTokenFromKakao(String code) { 
		 
		 //헤더를 JSON으로 설정함
		 HttpHeaders headers = new HttpHeaders();
		 headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		 
		 MultiValueMap<String,String> body = new LinkedMultiValueMap<>();
		 
		 body.add("grant_type","authorization_code");
         body.add("client_id", client_id);
         body.add("redirect_uri",REDIRECT_URI);
         body.add("code",code);
		 
         KakaoTokenResponseDto kakaoResponseDto = restTemplate.postForObject(
                 "https://kauth.kakao.com/oauth/token",
                 new HttpEntity<>(body,headers),
                 KakaoTokenResponseDto.class);
                 
        System.out.println("카카오 Access토큰" + kakaoResponseDto.getAccessToken()); 
        
        return kakaoResponseDto.getAccessToken();
	  	  
	 }
	 
	 
	 // 토큰으로  유저 정보 가져오기.
	 public void getUserInfo(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        headers.add("Authorization", "Bearer "+token);

//        KakaoUserInfoResponseDto kakaoUserInfoDto = restTemplate.getForObject("https://kapi.kakao.com/v2/user/me",
//            	new HttpEntity<>(null, headers),
//            	KakaoUserInfoResponseDto.class);
//        
		
		  ResponseEntity<KakaoUserInfoResponseDto> kakaoUserInfoDto = 
				  restTemplate.exchange("https://kapi.kakao.com/v2/user/me", 
				  HttpMethod.GET,
				  new HttpEntity<>(null, headers), 
				  KakaoUserInfoResponseDto.class);
	
      //   String body = response.getBody();
        
        System.out.println("유저 정보 확인" + kakaoUserInfoDto.getBody().toString());
        
        
     }
	 
    	

}
