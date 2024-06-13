package com.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Detection { // 위해물폼탐지 테이블 DTO
	
	private int DETECTION_IDX;
	private String IDENTIFI_ID;
	private String TYPE_NAME_ENG;
	private int TYPE_NUM;
	private String DETECTION_DATE;
	private String DETECTION_FILE;
	

}
