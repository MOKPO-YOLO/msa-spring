<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
		if(${msgType eq "성공 메세지"}){ // msgType "성공 메세지"가 아닐 수도있기 때문
			$("#messageType").attr("class", "modal-content panel-success");
		}
		if(${msgType eq "로그아웃 메세지"}){
			$("#messageType").attr("class", "modal-content panel-primary");
		}
		$("#myMessage").modal("show");
	}
});
	
</script>

</head>
<body>


	<div class="container">
		<jsp:include page="./common/header.jsp" />
		<h2>Spring Day3</h2>
		<div class="panel panel-warning">
			<div class="panel panel-heading">Body</div>
			<div class="panel-body">
				<img alt="" src="resources/images/main.jpg" style="width: 100%; height: 500px;">
			</div>
			<div class="panel-footer">스프링 - 오진희꺼</div>
		</div>
	</div>


	<!-- 회원가입 성공 시 띄울 모달창 -->
	<!-- Modal -->
	<div class="modal fade" id="myMessage" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div id="messageType" class="modal-content panel-info">
				<div class="modal-header panel-heading">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">${msgType}</h4>
				</div>
				<div class="modal-body">
					<p id="">${msg}</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>


</body>
</html>
