
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  let [inputRef, setinputRef] = useState('');
  let inputCompanyRef = useRef(null);
  const navigate = useNavigate();

  console.log(inputCompanyRef.current);
  // input사원번호 가져옴.

  let compNUM = '';
  let compnumChange = (e) => {
    compNUM = e.target.value;
  };
  console.log(inputRef);

  // 로그인기능 버튼
  let loginButton = async () => {
    console.log(compNUM);
    try {
      let { data } = await axios.get(`http://localhost:8081/controller/member/login?compnum=${compNUM}`);
      console.log(data);

      if (data.path == 'ok') {
        alert("저장된 회원정보가 없으므로 새로 등록 되셨습니다.");
      } else if (data.path == '/admin/index') {
        alert("로그인 되셨습니다.");
        navigate(`${data.path}`);
      } else {
        // 아직 권한 승인을 요청을 기다리는 중입니다.
        alert(`${data.path}`);
      }
    } catch (e) {
      console.log(e);
    }

  };


  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small></small>
            </div>
            <p>사번</p>
            <Form action="http://localhost:8081/controller/login.do" method="post" >
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-id-card" /> 
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input id="compnum"
                    ref={inputCompanyRef}
                    placeholder="사원 번호를 입력하세요."
                    type="text"
                    //  name="IDENTIFI_ID"
                    autoComplete="new-email"
                    onChange={compnumChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4 btn-block" color="primary" type="button" onClick={loginButton}>
                  로그인
                </Button>

              </div>
              <div>
                <p className="text-center">또는</p>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon btn-block"
                  color="default"
                  onClick={(e) => e.preventDefault()}
                  style={{ backgroundColor: "#FEE500", color: "#3c1e1e", border: "none" }}  // 노란색 배경과 글자 색상 변경
                >
                  <span className="btn-inner--icon">
                
                  </span>
                  <span className="btn-inner--text">카카오 로그인</span>
                </Button>
              </div>

            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
