package com.smhrd.entity;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
public class UserAuthRequest {  // 이걸 @RequestBody List<Auth> updateList 통으로 받기 위해서 
   
   private List<Auth> authupArr;
   
}
