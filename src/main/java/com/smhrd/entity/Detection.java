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
	private String MEMBER_ID;
	private String DETECTION_NAME;
	private String DETECTION_DATE;
	private String DETECTION_FILE;
	

}
