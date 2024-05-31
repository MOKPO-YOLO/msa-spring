package com.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Notice { // 공지사항 테이블 DTO
	
	private int NOTICE_IDX;
	private String NOTICE_TITLE;
	private String NOTICE_AT;
	private String NOTICE_DETAIL;
	

}
