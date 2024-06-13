package com.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CreateNotice {
	
	private int noticeIDX;
	private String noticeTITLE;
	private String noticeDETAIL;
	

}
