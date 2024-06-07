/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { useState, useEffect } from "react";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";



const Tables = () => {
   let [usersInfo, setUsersInfo] = useState([]);

   // 유저정보가져 오는 비동기 코드
   const getUserInfo = async () => {
        let result = await axios.get("http://localhost:8081/controller/board/all"); 
    
        setUsersInfo(result.data);
       
   };

   useEffect(() => {
    // 여기서 호출.
    // getUserInfo();
  
   }, []);



  return (
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">공지사항</h3>
                <h5>YORORAY 의 최근소식을 알려드립니다.</h5>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                 <th> <h3 className="mb-0">공지사항</h3>
                <h5>YORORAY 의 최근소식을 알려드립니다.</h5> </th>
                  <tr>
                    <th scope="col">여기에제목</th>
                 
                    
                  </tr>
                </thead>
                <tbody>
                
                 
                   <tr>
                    <th scope="row" className="mid" style={{height : '700px',}}>
                      <Media className="align-items-center">
                          여기에 내용    
                      </Media>
                    </th>
                  </tr>
                 
                  
                </tbody>
              </Table>
              <CardFooter className="py-4">
                 
                <tr className="nowpost" style={{border : "1" , }}>
                  <td>index</td>
                  <td> <a href="#"> 여기에 현재글 제목</a> </td>
                </tr>
                <tr className="nextpost">
                  <td>index</td>
                  <td><a href="#"> 여기에 다음글 제목</a></td>
                </tr>
                
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
  );
};

export default Tables;
