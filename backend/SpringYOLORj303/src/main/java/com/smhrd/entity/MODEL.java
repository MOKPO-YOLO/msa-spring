package com.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class MODEL {  //모델 업로드 테이블 DTO
	
	private String MODEL_NAME;
	private String MODEL_AT;
	private String MODEL_FILE;
	

}
