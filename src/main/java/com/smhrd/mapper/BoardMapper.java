package com.smhrd.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.smhrd.entity.Board;
import com.smhrd.entity.MonthlySum;
import com.smhrd.entity.Notice;
import com.smhrd.entity.Workload;

@Mapper
public interface BoardMapper {  
	// 여기에 공지사항 mapper로 쓰겠습니다.
	// Spring과 MyBatis를 연결하는 역할
	
	// 공지사항 전부가져오기
	public List<Notice> noticeList(); 
	
	// 위해물품 작업량 전체보기
	public List<MonthlySum> workloadList(); 

	public Board boardContent(int idx);

	public void boardInsert(Board vo);

	public void boardDelete(int idx);

	public void boardUpdate(Board vo);

	public void boardCount(int idx);

}















