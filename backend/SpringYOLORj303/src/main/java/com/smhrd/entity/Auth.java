package com.smhrd.entity;

import lombok.Data;
import lombok.ToString;


@Data
@ToString
public class Auth { // 회원 권한 업데이트 정보 받을 DTO
   
   private String identifiID;
   private String memberAUTH;   

}
