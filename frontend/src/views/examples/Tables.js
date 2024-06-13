import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Media,
} from "reactstrap";
import { useState, useEffect } from "react";
import Header from "components/Headers/TablesHeader.js";
import axios from "axios";

const Tables = () => {
  let [usersInfo, setUsersInfo] = useState([]);

  // 유저정보 가져오는 비동기 코드
  const getUserInfo = async () => {
    let result = await axios.get("http://localhost:8081/controller/board/all");
    setUsersInfo(result.data);
  };

  useEffect(() => {
    // 여기서 호출.
    // getUserInfo();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
             
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{fontSize : '24px'}}>여기에 제목</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="mid" style={{ height: '700px' ,fontSize : '18px'}}>
                      <Media className="align-items-center">
                        여기에 내용
                      </Media>
                    </th>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <tr className="nowpost" style={{ border: "1px solid #dee2e6" }}>
                  <td>index</td>
                  <td><a href="#"> 여기에 현재 글 제목</a></td>
                </tr>
                <tr className="nextpost">
                  <td>index</td>
                  <td><a href="#"> 여기에 다음 글 제목</a></td>
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
    </>
  );
};

export default Tables;