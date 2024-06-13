package com.smhrd.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.smhrd.entity.SelectModel;
import com.smhrd.entity.SendToFastApiDto;
import com.smhrd.mapper.BoardMapper;
import com.smhrd.service.FastApiService;


//비동기 방식만 가능
//데이터, 객체...
//페이지 이동이 불가능
@RequestMapping("/fastYolo")
@RestController
@CrossOrigin // CorsFiler class생성해두어서 이제 originPatterns 이거 필요 없다. @CrossOrigin(originPatterns = "http://localhost:3000") -> @CrossOrigin("http://localhost:3000")
public class FastApiController {
	
	@Autowired
	private BoardMapper mapper;
	@Autowired
    private FastApiService fastApiService;
	
	
	
	// Spring 과 FastAPI 통신 테스트
	@PostMapping("/springFastapi")  //  /fastYolo/springFastapi 으로 요청.
	public String sendToFastapi(@RequestBody SendToFastApiDto dto) throws JsonProcessingException {
		// return "board/springTest"; // WEB-INF/views/board/springTest.jsp
		
		return fastApiService.sendToFastapi(dto);
	}
	
	 
	// 모델 변경하기 기능.
    @PostMapping("/modelChange/{model}")   //  /fastYolo/modelChange로 요청.
    public String modelChange (@PathVariable("model") String model, HttpSession session) throws JsonProcessingException {
       // 로그인된 회원의 사번을 memberDto의 MEMBER_ID에 넣어줌.
       System.out.println(model); 
       SelectModel selModel = new SelectModel();
       selModel.setModel(model);
      // System.out.println("모델 객체 확인" + selModel);
       
       return fastApiService.sendModelToFastapi(selModel);
       
    }
	
	

}
