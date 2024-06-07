package com.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Type {  // 물품종류 테이블 DTO
	
	private int TYPE_NUM;
	private String TYPE_NAME;
	

}
