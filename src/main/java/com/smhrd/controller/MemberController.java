package com.smhrd.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.oreilly.servlet.MultipartRequest;
import com.smhrd.entity.Company;
import com.smhrd.entity.KakaoUserInfoResponseDto;
import com.smhrd.entity.Member;
import com.smhrd.entity.Path;
import com.smhrd.mapper.BoardMapper;
import com.smhrd.mapper.MemberMapper;
import com.smhrd.service.KakaoService;

import lombok.RequiredArgsConstructor;



@Controller
@RequiredArgsConstructor
public class MemberController {
	/*
	 * private final KakaoTokenJsonData kakaoTokenJsonData;
	 *  private final KakaoUserInfo kakaoUserInfo;	 * 
	 * private final UserService userService;
	 */

	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired
	private BoardMapper boardMapper;
	

	
	
	@Autowired
	private final KakaoService kakaoService;
	

	// 이미지 업로드 기능
	@PostMapping("/imageUpdate.do")
	public String imageUpdate(HttpServletRequest request) {
		// 파일업로드 필요한 API -> cos.jar -> MultipartRequest객체
		MultipartRequest multi = null;
		
		// MultipartRequest객체 생성하기위해 매개변수 필요
		// 1. request 객체
		// 2. 이미지를 저장할 폴더의 경로(String)
		// 3. 허용가능한 크기(int)
		// 4. 파일이름에 대한 인코딩(String)
		// 5. 파일명 중복 제거
		String savePath = request.getSession().getServletContext().getRealPath("resources/upload");
		
		return null;
	}
	
	// 이미지 업로드하는 페이지로 이동
	@GetMapping("/imageForm.do")
	public String imageForm() {
		return "member/imageForm";
	}
	
	
	// 리엑트메인페이지 이동 /joinForm.do
//	@GetMapping("/http://localhost:3000/admin/index")
//	public String reactMain() {
//		return "http://localhost:3000/admin/index";
//	}



	
	// 로그인 페이지로 이동 /loginForm.do
	@GetMapping("/loginForm.do")
	public String loginForm(Model model) {
		 String location = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a4993846c327ef55eec1b9091c6615f6&redirect_uri=http://localhost:8081/controller/oauth.do";
		 model.addAttribute("location", location);
		
		 return "member/loginForm";
	}
	
	
	@Description("회원이 소셜 로그인을 마치면 자동으로 실행되는 API입니다. 인가 코드를 이용해 토큰을 받고, 해당 토큰으로 사용자 정보를 조회합니다." +
	            "사용자 정보를 이용하여 서비스에 회원가입합니다.")
	// 카카오 리다이렉트 페이지로 이동 /oauth.do
	@GetMapping("/oauth.do")
	@ResponseBody
	public ResponseEntity<?> kakaoOauth(@RequestParam("code") String code) {
		// 카카오로부터 받은 code를 카카오에 토큰 발급 요청을 하면, 사용자 정보가 담겨있는 토큰을 받을 수 있다.		 
		// https://kauth.kakao.com/oauth/token URL로 POST 요청을 보내면, 토큰을 받을 수 있다. 
		
		// 이제 code를 이용해서 accessToken을 받아올 수 있게 됨.
	    String accessToken = kakaoService.getAccessTokenFromKakao(code);
	    // 토큰 받아와서 유저 정보 가져오기.
	     kakaoService.getUserInfo(accessToken);
	    
		// return "member/oauth";
	    return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
	
	// 모든 회원정보 list불러오기.
	@GetMapping("/memberall.do")
	public List<Member> memberAll(){
		System.out.println("[모든 회원정보 가져오기]");
		
		List<Member> memberAllList = boardMapper.getMemberAll();
		System.out.println(memberAllList);
		
		return memberAllList;
	}
	
	
	// 회원정보 auth 업데이트 기능.
//	@PutMapping("/memberauthUpdate.do")
//	public void boardUpdate(@RequestParam String boolean) { // idx, title, content
//		mapper.boardUpdate(board);
//	}
//	
	
	
	
	
	
	
	// 회원가입 페이지로 이동 /joinForm.do
	@GetMapping("/joinForm.do")
	public String joinForm() {
		return "member/joinForm";
	}

	// 아이디 중복체크 기능 /idCheck.do
//	@GetMapping("/idCheck.do")
//	public @ResponseBody int idCheck(@RequestParam("memId") String memId) {
//		Member mem = memberMapper.getMember(memId);
//		// mem = null -> 사용 가능한 아이디 -> 1
//		// mem != null -> 사용 불가능한 아이디 -> 0
//
//		if (mem != null) {
//			
//		} else {
//			return "/index";
//		}
//	}

//	// 회원가입 기능 /join.do
//	@PostMapping("/join.do")
//	public String join(Member mem, RedirectAttributes rttr, HttpSession session) { // memId, memPassword, memName,
//																					// memAge...
//
//		// RedirectAttributes
//		// Redirect 방식으로 페이지를 이동할 때 뭔가 전달할 데이터가 있는데
//		// request에 담자니 데이터가 사라지고 session에 담자니 뭔가 아까워....
//		// 다음 페이지에 딱 한번만 데이터를 저장해서 뿌려주는 저장소(객체)
//
//		// null -> name값이 틀린거(못받아옴), "" -> 아무것도 안적은 것
//		if (mem.getMemId() == null || mem.getMemId().equals("") || mem.getMemPassword() == null
//				|| mem.getMemPassword().equals("") || mem.getMemName() == null || mem.getMemName().equals("")
//				|| mem.getMemAge() == 0 || mem.getMemEmail() == null || mem.getMemEmail().equals("")) {
//			// 회원가입 실패 시
//
//			rttr.addFlashAttribute("msgType", "실패 메세지");
//			rttr.addFlashAttribute("msg", "모든 내용을 입력해주세요.");
//
//			return "redirect:/joinForm.do"; // joinForm.jsp -> ${msgType}, ${msg}
//		} else { // 입력한 값이 null 값도 없고 ""도 없다!
//
//			// 사진파일이 없기 때문에 null이 아닌 ""로 DB에 넣자!
//			mem.setMemProfile("");
//			int cnt = memberMapper.join(mem);
//
//			if (cnt == 1) {
//				// 회원가입 성공
//
//				rttr.addFlashAttribute("msgType", "성공 메세지");
//				rttr.addFlashAttribute("msg", "회원가입에 성공했습니다.");
//
//				// 회원가입 성공시 로그인 처리까지 하기
//				session.setAttribute("mem", mem);
//
//				return "redirect:/";
//			} else {
//				// 회원가입 실패
//
//				rttr.addFlashAttribute("msgType", "실패 메세지");
//				rttr.addFlashAttribute("msg", "회원가입에 실패했습니다.");
//
//				return "redirect:/joinForm.do"; // joinForm.jsp
//			}
//		}
//	}
	

	// 로그아웃 기능
	@GetMapping("/logout.do")
	public String logout(HttpSession session, RedirectAttributes rttr) {
		
		// session.removeAttribute("mem");
		session.invalidate();
		
		rttr.addFlashAttribute("msgType", "로그아웃 메세지");
		rttr.addFlashAttribute("msg", "정상적으로 로그아웃 되었습니다.");
		
		return "redirect:/";
	}
	
	
	
	
	
	
}
