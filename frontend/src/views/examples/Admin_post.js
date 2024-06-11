import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import TablesHeader from "components/Headers/TablesHeader";

const AdminPost = () => {
  const [posts, setPosts] = useState([
    { id: 7, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.27", views: 10 },
    { id: 6, title: "업데이트 안내입니다.", content: "업데이트 안내 내용입니다.", date: "2024.05.27", views: 100 },
    { id: 5, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.26", views: 8 },
    { id: 4, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.26", views: 3 },
    { id: 3, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.25", views: 10 },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeletePost = (id) => {
    setPostToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePost = () => {
    setPosts(posts.filter((post) => post.id !== postToDelete));
    setPostToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleCreateOrUpdatePost = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;

    if (currentPost) {
      setPosts(
        posts.map((post) =>
          post.id === currentPost.id ? { ...post, title, content } : post
        )
      );
    } else {
      const newPost = {
        id: posts.length ? posts[0].id + 1 : 1,
        title,
        content,
        date: new Date().toISOString().split('T')[0],
        views: 0,
      };
      setPosts([newPost, ...posts]);
    }
    setCurrentPost(null);
    setIsPostModalOpen(false);
  };

  const openPostModal = (post = null) => {
    setCurrentPost(post);
    setIsPostModalOpen(true);
  };

  return (
    <>
      <TablesHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h1 className="mb-0">공지사항</h1>
                <h5>YORORAY의 최근 소식을 알려드립니다.</h5>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{ fontSize: "16px" }}>
                        번호
                      </th>
                      <th scope="col" style={{ fontSize: "16px" }}>
                        제목
                      </th>
                      <th scope="col" style={{ fontSize: "16px" }}>
                        내용
                      </th>
                      <th scope="col" style={{ fontSize: "16px" }}>
                        등록일
                      </th>
                      <th scope="col" style={{ fontSize: "16px" }}> 
                        조회
                      </th>
                      <th scope="col" style={{ fontSize: "16px" }}>
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>{post.date}</td>
                        <td>{post.views}</td>
                        <td >
                        <Button color="primary" onClick={() => openPostModal(post)} >
                            수정
                          </Button>
                          <Button color="danger" onClick={() => handleDeletePost(post.id)}>
                            삭제
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter className="py-4">
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
                <div className="d-flex justify-content-end mt-4">
                  <Button color="primary" className="mr-2" onClick={() => openPostModal()}>
                    게시글 작성
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

      {/* 삭제 확인 모달 */}
      <Modal isOpen={isDeleteModalOpen} toggle={() => setIsDeleteModalOpen(false)}>
        <ModalHeader toggle={() => setIsDeleteModalOpen(false)}>삭제 확인</ModalHeader>
        <ModalBody>
          선택한 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDeletePost}>
            삭제
          </Button>
          <Button color="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            취소
          </Button>
        </ModalFooter>
      </Modal>

      {/* 게시글 작성/수정 모달 */}
      <Modal isOpen={isPostModalOpen} toggle={() => setIsPostModalOpen(false)} size="lg">
        <ModalHeader toggle={() => setIsPostModalOpen(false)}>
          {currentPost ? "게시글 수정" : "게시글 작성"}
        </ModalHeader>
        <Form onSubmit={handleCreateOrUpdatePost}>
          <ModalBody>
            <FormGroup>
              <Label for="title">제목</Label>
              <Input
                type="text"
                name="title"
                id="title"
                defaultValue={currentPost ? currentPost.title : ""}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">내용</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                defaultValue={currentPost ? currentPost.content : ""}
                required
                style={{ height: "300px" }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              저장
            </Button>
            <Button color="secondary" onClick={() => setIsPostModalOpen(false)}>
              취소
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AdminPost;