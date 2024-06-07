package com.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class TodayYN { // 오늘날짜 받아오는 DTO
   
   private String TODAY;
   private int TODAY_Y;
   private int TODAY_N;
   
}