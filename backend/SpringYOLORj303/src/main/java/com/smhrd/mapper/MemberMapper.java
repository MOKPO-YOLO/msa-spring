package com.smhrd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.entity.Auth;
import com.smhrd.entity.Company;
import com.smhrd.entity.Detection;
import com.smhrd.entity.Member;

@Mapper
public interface MemberMapper {

   // Spring과 MyBatis를 연결하는 역할
   
   
    public Company login(String IDENTIFI_ID);
    
    // 모든 유저정보 불러옴.
    public List<Member> getuserAll();

    // 로그인 실패 and COMPANY테이블에 정보 insert 기능.
    public int insertCompanyNum(String companyNum);
    
   
    // Member 테이블에서 유저 권한 검사하기위해 권한 가져오기.
    public Member getUserAuth(String IDENTIFI_ID);
    
    // member테이블에 저장된 정보없으면 추가함.
    public void insertMemberNum(String IDENTIFI_ID);
    
    // 해당 유저권한 업데이트기능.
    public void userAuthUpdate(Auth authData);

    
   
   
   
}



