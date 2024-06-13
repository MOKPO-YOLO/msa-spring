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

import com.smhrd.entity.Auth;
import com.smhrd.entity.UserAuthRequest;
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
           System.out.println(loginMem);
           if(loginMem == null) {
              System.out.println("저장된 정보 없음.");
              // 로그인 실패 and COMPANY테이블에 정보 추가.
              int res = memberMapper.insertCompanyNum(IDENTIFI_ID);
              // member테이블에도 동시에 정보 추가함.
              memberMapper.insertMemberNum(IDENTIFI_ID);
              if(res > 0){ // COMPANY테이블에 정보 추가 완료.
                path.setPath("ok"); 
                return  path;  // 이제 회원권한 요청을 기다려야함.
              }else { System.out.println("COMPANY테이블에 추가 실패 하였습니다."); }
              return null;
           }else {
              System.out.println("일단 저장된 사번 있음.");
              // Member 테이블에서 유전 권한검사하기위해 권한 가져오기.
              Member memAuth = memberMapper.getUserAuth(IDENTIFI_ID);
              System.out.println(memAuth);
              if(memAuth.getMEMBER_AUTH().equals("TRUE")) { 
                 // 로그인 성공
                 session.setAttribute("mem", loginMem);
                 path.setPath("/admin/index");
                 System.out.println("로그인 성공" + path.getPath());
                 return path;  // react메인 페이지 path경로 리턴함.
              } else{ // 아직 권한이 false인 상태
                 System.out.println("권한이 아직 false임. 승인 요청 기다려야함");
                 path.setPath("아직 권한 승인을 요청을 기다리는 중입니다.");
                 System.out.println(path.getPath());
                 return path;  // 아직 권한 승인을 요청을 기라리는 중입니다. 라는 경고창 띄어줌.(front)
              }              
           }
           
        }
      
      
       // 모든 회원정보 list불러오기.
        @GetMapping("/all")    // /member/all 로 요청
        public List<Member> getuserAll(){
           System.out.println("[모든 회원정보 가져오기]");
           
           List<Member> memberAllList = memberMapper.getuserAll();
           System.out.println(memberAllList);
           
           return memberAllList;
        }
      
        
      
      // 유저권한 업데이트 기능.
        @PostMapping("/authUpdate")  //  /member/authUpdate 로 요청
        public List<Member> userAuthUpdate(@RequestBody UserAuthRequest userRequset){ // 이걸 @RequestBody List<Auth> updateList 통으로 받는다.
            System.out.println("넘어오니?" + userRequset.getAuthupArr());
            
           for (Auth authData : userRequset.getAuthupArr()) {
               // 해당 유저권한 업데이트기능.
               memberMapper.userAuthUpdate(authData);
           }
                      
              // 업데이트가 완료 됬으면 새로 갱신된 모든유저정보 List를 가져온다.
            List<Member> memberAllList = memberMapper.getuserAll();
           return memberAllList;
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
