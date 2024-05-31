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

import com.smhrd.entity.Board;
import com.smhrd.entity.Member;
import com.smhrd.entity.MonthlySum;
import com.smhrd.entity.Notice;
import com.smhrd.entity.Workload;
import com.smhrd.mapper.BoardMapper;

// 비동기 방식만 가능
// 데이터, 객체...
// 페이지 이동이 불가능
@RequestMapping("/notice")
@RestController
@CrossOrigin // CorsFiler class생성해두어서 이제 originPatterns 이거 필요 없다. @CrossOrigin(originPatterns = "http://localhost:3000") -> @CrossOrigin("http://localhost:3000")
public class BoardRestController {
		// 실험으로 구현한 가상의 DB 회원정보 Member ArrayList<>
		// List<Member> members = new ArrayList<>();
		

		@Autowired
		private BoardMapper mapper;
	
		// 공지사항 전체보기
		@GetMapping("/all") //  /notice/all
		public List<Notice> noticeList(){
			System.out.println("[공지사항 전체보기]");
			
			List<Notice> noticeList = mapper.noticeList();
			System.out.println(noticeList);
			return noticeList;
		}
		
		
		// 위해물품 작업량 전체보기
		@GetMapping("/workloadall")  //  /notice/workloadall
		public List<MonthlySum> workloadList(){
			System.out.println("[위해물품 작업량 전체보기]");
			
			List<MonthlySum> workloadList = mapper.workloadList();
			System.out.println(workloadList);
			
			return workloadList;
		}
		
		
		
		// 게시글 등록하기
		@PostMapping("/new")
		public void boardInsert(Board board) {
			mapper.boardInsert(board);
		}
		
		// 게시글 상세보기
//		@GetMapping("/{idx}") // board/{idx}
//		public Board boardContent(@PathVariable("idx") int idx) {
//			Board board = mapper.boardContent(idx);
//			return board;
//		}
//
//		// 게시글 삭제하기
//		@DeleteMapping("/{idx}") // board/{idx}
//		public void boardDelete(@PathVariable("idx") int idx) {
//			mapper.boardDelete(idx);
//		}
//		
//		// 게시글 수정하기
//		@PutMapping("/update")
//		public void boardUpdate(@RequestBody Board board) { // idx, title, content
//			mapper.boardUpdate(board);
//		}
//		
//		// 게시글 조회수 올리기
//		@PutMapping("/count/{idx}")
//		public void boardCount(@PathVariable("idx") int idx) {
//			mapper.boardCount(idx);
//		}
//		
	
}