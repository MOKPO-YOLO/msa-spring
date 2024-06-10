import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Container,
  Row,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const MemberManagement = () => {
  const [data, setData] = useState([
    { id: 1, name: 'aaa11', date: '2024.05.27', status: '신청 완료', role: '승인', user: 'aaa11!!', process: '진행중', action: '강제 종료' },
    { id: 2, name: 'aaa121', date: '2024.05.27', status: '가입 완료', role: '사용자', user: 'aaa121', process: 'STOP', action: '재시작' },
    { id: 3, name: 'aaa131', date: '2024.05.26', status: '가입 완료', role: '사용자', user: 'aaa121', process: '진행중', action: '강제 종료' },
    { id: 4, name: 'aaa141', date: '2024.05.26', status: '가입 완료', role: '사용자', user: 'aaa121', process: '진행중', action: '강제 종료' },
    { id: 5, name: 'aaa151', date: '2024.05.25', status: '가입 완료', role: '사용자', user: 'aaa141', process: '진행중', action: '강제 종료' },
  ]);

  const handleRoleChange = (id, value) => {
    setData(data.map(item => item.id === id ? { ...item, role: value } : item));
  };

  const handleActionClick = (id) => {
    // 버튼 클릭 로직을 여기에 추가 fdddd
    console.log(`Button clicked for id: ${id}`);
  };

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">회원 관리</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"><Input type="checkbox" /></th>
                      <th scope="col">사번</th>
                      <th scope="col">등록 일자</th>
                      <th scope="col">가입 여부</th>
                      <th scope="col">권한</th>
                      <th scope="col">사용자</th>
                      <th scope="col">처리 상태</th>
                      <th scope="col">모델 탐지</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(item => (
                      <tr key={item.id}>
                        <td><Input type="checkbox" /></td>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{item.status}</td>
                        <td>
                          <Input type="select" value={item.role} onChange={(e) => handleRoleChange(item.id, e.target.value)}>
                            <option>승인</option>
                            <option>사용자</option>
                          </Input>
                        </td>
                        <td>{item.user}</td>
                        <td>
                          <span style={{ color: item.process === 'STOP' ? 'red' : 'blue', fontWeight: item.process === 'STOP' ? 'bold' : 'normal' }}>
                            {item.process}
                          </span>
                        </td>
                        <td>
                          <Button color={item.action === '재시작' ? 'primary' : 'danger'} onClick={() => handleActionClick(item.id)}>
                            {item.action}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Row className="mt-3">
                  <Col className="d-flex justify-content-between align-items-center">
                    <Pagination>
                      <PaginationItem disabled>
                        <PaginationLink first href="#" />
                      </PaginationItem>
                      <PaginationItem disabled>
                        <PaginationLink previous href="#" />
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href="#">
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem disabled>
                        <PaginationLink next href="#" />
                      </PaginationItem>
                      <PaginationItem disabled>
                        <PaginationLink last href="#" />
                      </PaginationItem>
                    </Pagination>
                    <div>
                      <Button color="danger" style={{ marginRight: '10px' }}>삭제</Button>
                      <Button color="primary">등록</Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MemberManagement;