package com.smhrd.controller;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;

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

import com.smhrd.entity.Board;
import com.smhrd.entity.Company;
import com.smhrd.entity.Detection;
import com.smhrd.entity.Member;
import com.smhrd.entity.Workload;
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
		
		private Member memberDto;
		private Workload workloadDto;		
		

		// Detection테이블데이터로 알림사항 전체보기
		@GetMapping("/alarm") //  /detection/alarm
		public List<Detection> detectionalarmList(){
			System.out.println("[위해물품 탐지알림 전체보기]");
			
			List<Detection> detectionalarmList = mapper.detectionalarmList();
			System.out.println(detectionalarmList);
			return detectionalarmList;
		}
		 
		
		// 실시간 분석 - 돌릴때마다 정상탐지물품도 Workload테이블에 insert해줌.
		@PostMapping("/normal")   //  /detection/normal로 요청.
		public void normalWorkloadInsert (Workload normalWorkload, HttpSession session) {
			// 로그인된 회원의 사번을 memberDto의 MEMBER_ID에 넣어줌.
			Company loginMem = (Company) session.getAttribute("mem");
			memberDto.setMEMBER_ID(loginMem.getIDENTIFI_ID());
			
			// Workload테이블에 MEMBER_ID가 필요함.
			normalWorkload.setMEMBER_ID(memberDto.getMEMBER_ID());
			normalWorkload.setWORK_PRESENCE("N");
			
			// DB INSET
			mapper.workloadInsert(workloadDto);
		}
				
		
		
		// 실시간 분석 - 위해물품 탐지시 stop 일어난뒤 DB(DETECTION, WORKLOAD)테이들에 동시에 insert 기능
		@PostMapping("/stop")    //  /detection/stop로 요청.
		public void detectionInsert (Detection detec, HttpSession session) {
			// 로그인된 회원의 사번을 memberDto의 MEMBER_ID에 넣어줌.
			Company loginMem = (Company) session.getAttribute("mem");
			memberDto.setMEMBER_ID(loginMem.getIDENTIFI_ID());
			
			// Detection테이블과, Workload테이블에 MEMBER_ID가 필요함. 
			detec.setMEMBER_ID(memberDto.getMEMBER_ID());
			workloadDto.setMEMBER_ID(memberDto.getMEMBER_ID());
			workloadDto.setWORK_PRESENCE("Y");
			
			// DB INSET
			mapper.detectionInsert(detec);
			mapper.workloadInsert(workloadDto);
		}
		
		
		
		// 해당 유저의 이상탐지기록 :탐지된품목 번호로 탐지(DETECTION)테이블과 품목이름 결합하여 출력하는 기능.
		@GetMapping("/combinationType") //  /detection/combinationType
		public List<Detection> detectionCombinationType(HttpSession session){
			System.out.println("[유저 이상탐지 TYPE결합된 ALL list]");
			// 로그인된 회원의 사번을 memberDto의 MEMBER_ID에 넣어줌.
			Company loginMem = (Company) session.getAttribute("mem");
			memberDto.setMEMBER_ID(loginMem.getIDENTIFI_ID());
			
			List<Detection> CombinationTypeAll = mapper.detectionCombinationType(memberDto.getMEMBER_ID());
			System.out.println(CombinationTypeAll);
			return CombinationTypeAll;
		}
				 
		
		
	
	
	
}
