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
import com.smhrd.entity.MonthlySum;
import com.smhrd.entity.Notice;
import com.smhrd.entity.Path;
import com.smhrd.entity.TodayYN;
import com.smhrd.entity.Workload;
import com.smhrd.mapper.BoardMapper;
import com.smhrd.mapper.MemberMapper;

// 비동기 방식만 가능
// 데이터, 객체...
// 페이지 이동이 불가능
@RequestMapping("/member")
@RestController
@CrossOrigin // CorsFiler class생성해두어서 이제 originPatterns 이거 필요 없다. @CrossOrigin(originPatterns = "http://localhost:3000") -> @CrossOrigin("http://localhost:3000")
public class LoginRestController {
      // 실험으로 구현한 가상의 DB 회원정보 Member ArrayList<>
      // List<Member> members = new ArrayList<>();
      

      @Autowired
      private BoardMapper mapper;
      
      @Autowired
  	  private MemberMapper memberMapper;
   
           
      
	   // 사번 로그인 기능 
	   @GetMapping("/login")  //  /member/login로 요청.
	   public Path login(@RequestParam("compnum") String IDENTIFI_ID, HttpSession session) {
	 		System.out.println(IDENTIFI_ID);
	  		Company loginMem = memberMapper.login(IDENTIFI_ID);
	  		Path path = new Path();
	  		
	  		if(loginMem == null) {
	  			// 로그인 실패 and COMPANY테이블에 정보 추가.
	  			memberMapper.insertCompanyNum(IDENTIFI_ID);
	  			return null;
	  		}else {
	  			// 로그인 성공
	  			session.setAttribute("mem", loginMem);
	  			path.setPath("/admin/index");
	  			System.out.println(path.getPath());
	  			return path;  // react메인 페이지 path경로 리턴함.
	  		}
	  		
	  	}
      
      
      
      
      // 게시글 상세보기
//      @GetMapping("/{idx}") // board/{idx}
//      public Board boardContent(@PathVariable("idx") int idx) {
//         Board board = mapper.boardContent(idx);
//         return board;
//      }
//
//      // 게시글 삭제하기
//      @DeleteMapping("/{idx}") // board/{idx}
//      public void boardDelete(@PathVariable("idx") int idx) {
//         mapper.boardDelete(idx);
//      }
//      
//      // 게시글 수정하기
//      @PutMapping("/update")
//      public void boardUpdate(@RequestBody Board board) { // idx, title, content
//         mapper.boardUpdate(board);
//      }
//      
//      // 게시글 조회수 올리기
//      @PutMapping("/count/{idx}")
//      public void boardCount(@PathVariable("idx") int idx) {
//         mapper.boardCount(idx);
//      }
//      
   
}
