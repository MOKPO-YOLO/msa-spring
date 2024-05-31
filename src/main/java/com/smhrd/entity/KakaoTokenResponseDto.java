package com.smhrd.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor  //역직렬화를 위한 기본 생성자
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoTokenResponseDto {
	// 카카오로부터 받은 Response DTO를 미리 만들어 둔다.
	// 역직렬화를 위해 @JsonProperty를 이용하여 매핑해주고, default 생성자를 선언해둔다.
	
	// 컨트롤러 : @Controller (프레젠테이션 레이어, 웹 요청과 응답을 처리함)
	// 로직 처리 : @Service (서비스 레이어, 내부에서 자바 로직을 처리함)
	// 외부I/O 처리 : @Repository (퍼시스턴스 레이어, DB나 파일같은 외부 I/O 작업을 처리함)
	
	 @JsonProperty("token_type")
     public String tokenType;
     @JsonProperty("access_token")
     public String accessToken;
     @JsonProperty("id_token")
     public String idToken;
     @JsonProperty("expires_in")
     public Integer expiresIn;
     @JsonProperty("refresh_token")
     public String refreshToken;
     @JsonProperty("refresh_token_expires_in")
     public Integer refreshTokenExpiresIn;
     @JsonProperty("scope")
     public String scope;
		
	

}
