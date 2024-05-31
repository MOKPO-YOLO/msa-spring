package com.smhrd.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.entity.Company;
import com.smhrd.entity.Member;

@Mapper
public interface MemberMapper {

	// Spring과 MyBatis를 연결하는 역할
	public Member getMember(String memId);

	public int join(Member mem);

	public Company login(String IDENTIFI_ID);
	
	
	
}















