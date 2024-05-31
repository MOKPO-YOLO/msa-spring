package com.smhrd.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import com.smhrd.entity.Detection;
import com.smhrd.mapper.BoardMapper;

// 비동기 방식만 가능
// 데이터, 객체...
// 페이지 이동이 불가능
@RequestMapping("/detection")
@RestController
@CrossOrigin // CorsFiler class생성해두어서 이제 originPatterns 이거 필요 없다. @CrossOrigin(originPatterns = "http://localhost:3000") -> @CrossOrigin("http://localhost:3000")
public class AnalyzeRestController {
		// 실험으로 구현한 가상의 DB 회원정보 Member ArrayList<>
		// List<Member> members = new ArrayList<>();
		

		@Autowired
		private BoardMapper mapper;
		

		// Detection테이블데이터로 알림사항 전체보기
		@GetMapping("/alarm") //  /detection/alarm
		public List<Detection> detectionalarmList(){
			System.out.println("[위해물품 탐지알림 전체보기]");
			
			List<Detection> detectionalarmList = mapper.detectionalarmList();
			System.out.println(detectionalarmList);
			return detectionalarmList;
		}
		 
		
	
	
	
}
