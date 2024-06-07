package com.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Member {

	private String MEMBER_ID;
	private String MEMBER_AUTH;
	private String MEMBER_NAME;
	private String JOINED_AT;

	
}
