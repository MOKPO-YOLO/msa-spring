<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Bootstrap Example</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

<script type="text/javascript">

	$(document).ready(function(){
		if(${not empty msgType}){
			if(${msgType eq "실패 메세지"}){ // msgType "실패 메세지"가 아닐 수도있기 때문
				$("#messageType").attr("class", "modal-content panel-warning");
			}
			$("#myMessage").modal("show");
		}
	});


	function idCheck() {
		// 아이디 중복체크
		var memId = $("#memId").val();
		/* console.log(memId); */
		$.ajax({
			url : "idCheck.do",
			type : "get",
			data : {
				"memId" : memId
			},
			success : function(data) {
				// data == 1 : 사용가능 or data == 0 : 사용 불가능
				/* console.log(data); */
				if(data == 1){
					$("#checkMessage").text("사용할 수 있는 아이디 입니다!");
					$("#checkType").attr("class", "modal-content panel-success");
				}else{
					$("#checkMessage").text("사용할 수 없는 아이디 입니다..");
					$("#checkType").attr("class", "modal-content panel-warning");
				}
				
				$("#myModal").modal("show");
				
			},
			error : function() {
				alert("error");
			}
		})
	}
	
	function passwordCheck(){
		var memPassword1 = $("#memPassword1").val();
		var memPassword2 = $("#memPassword2").val();
		
		if(memPassword1 != memPassword2){
			$("#passCheck").text("비밀번호가 서로 일치하지 않습니다.");
		}else{
			$("#passCheck").text("");
			$("#memPassword").val(memPassword1);
		}
	}
	
</script>



</head>
<body>

	<div class="container">

		<jsp:include page="../common/header.jsp" />
		<h2>Panel Heading</h2>
		<div class="panel panel-default">
			<div class="panel-heading">회원가입</div>
			<div class="panel-body">

				<form action="join.do" method="post">

					<input type="hidden" id="memPassword" name="memPassword" value="">

					<table class="table table-bordered"
						style="border: 1px solid #dddddd; text-align: center;">

						<tr>
							<td style="vertical-align: middle; width: 110px;">아이디</td>
							<td><input type="text" name="memId" id="memId"
								class="form-control" placeholder="아이디를 입력하세요." maxlength="20"></td>
							<td style="width: 110px">
								<button type="button" class="btn btn-sm btn-primary"
									onclick="idCheck()">중복체크</button>
							</td>
						</tr>
						
						<tr>
							<td style="vertical-align: middle; width: 110px;">비밀번호</td>
							<td colspan="2">
								<input type="password" maxlength="20" onkeyup="passwordCheck()" name="memPassword1" id="memPassword1" class="form-control" placeholder="비밀번호를 입력하세요.">
							</td>
						</tr>
						<tr>
							<td style="vertical-align: middle; width: 110px;">비밀번호확인</td>
							<td colspan="2">
								<input type="password" maxlength="20" onkeyup="passwordCheck()" name="memPassword2" id="memPassword2" class="form-control" placeholder="비밀번호를 입력하세요.">
							</td>
						</tr>
						<tr>
							<td style="vertical-align: middle; width: 110px;">사용자이름</td>
							<td colspan="2">
								<input type="text" maxlength="20" name="memName" id="memName" class="form-control" placeholder="이름을 입력하세요.">
							</td>
						</tr>
						<tr>
							<td style="vertical-align: middle; width: 110px;">나이</td>
							<td colspan="2">
								<input type="number" maxlength="20" name="memAge" id="memAge" class="form-control" placeholder="나이를 입력하세요.">
							</td>
						</tr>
						
						<tr>
							<td style="vertical-align: middle; width: 110px;">성별</td>
							<td colspan="2">
								<div class="form-group" style="text-align: center; margin: 0 auto;">
									<div class="btn-group" data-toggle="buttons">
										<label class="btn btn-primary active">
											<input type="radio" name="memGender" id="memGender" autocomplete="off" value="남자" checked="checked">남자
										</label>
										
										<label class="btn btn-primary">
											<input type="radio" name="memGender" id="memGender" autocomplete="off" value="여자">여자
										</label>
									</div>
								</div>
							</td>
						</tr>
						
						<tr>
							<td style="vertical-align: middle; width: 110px;">이메일</td>
							<td colspan="2">
								<input type="email" maxlength="50" name="memEmail" id="memEmail" class="form-control" placeholder="이메일을 입력하세요.">
							</td>
						</tr>
						
						<tr>
							<td colspan="3">
								<span id="passCheck" style="color: red;"></span>
								<input type="submit" class="btn btn-sm btn-primary" value="회원가입">
								<input type="reset" class="btn btn-sm btn-warning" value="초기화">
							</td>
						</tr>
						

					</table>

				</form>

			</div>
			<div class="panel-footer">스프링 - 이주희</div>
		</div>
	</div>

	<!-- 회원가입 실패 시 띄울 모달창 -->
	<!-- Modal -->
	<div class="modal fade" id="myMessage" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div id="messageType" class="modal-content panel-info">
				<div class="modal-header panel-heading">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">${msgType }</h4>
				</div>
				<div class="modal-body">
					<p id="">${msg }</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>

	<!-- 아이디 중복체크를 위한 모달창 -->
	<!-- Modal -->
	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div id="checkType" class="modal-content panel-info">
				<div class="modal-header panel-heading">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">메세지 확인</h4>
				</div>
				<div class="modal-body">
					<p id="checkMessage"></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>


</body>
</html>
