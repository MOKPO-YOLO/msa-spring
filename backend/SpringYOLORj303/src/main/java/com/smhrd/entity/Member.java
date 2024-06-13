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

   private String IDENTIFI_ID;
   private String MEMBER_NAME;
   private String MEMBER_AUTH;   
   private String MEMBER_STATUS;
   private String JOINED_AT;

   
}
