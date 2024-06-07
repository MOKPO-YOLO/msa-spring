package com.smhrd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

	// index.jsp로 이동하는 기능
	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
}
