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
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import TablesHeader from "components/Headers/TablesHeader";
const AdminPost = () => {
  const [posts, setPosts] = useState([
    { id: 7, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.27", views: 10 },
    { id: 6, title: "업데이트 안내입니다.", content: "업데이트 안내 내용입니다.", date: "2024.05.27", views: 100 },
    { id: 5, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.26", views: 8 },
    { id: 4, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.26", views: 3 },
    { id: 3, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.25", views: 10 },
    { id: 2, title: "업데이트 안내입니다.", content: "업데이트 안내 내용입니다.", date: "2024.05.24", views: 50 },
    { id: 1, title: "시스템 점검 안내입니다.", content: "시스템 점검 안내 내용입니다.", date: "2024.05.23", views: 30 },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const handleDeletePost = (id) => {
    setPostToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePost = () => {
    setPosts(posts.filter((post) => post.id !== postToDelete));
    setPostToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;
    const newPost = {
      id: posts.length ? posts[0].id + 1 : 1,
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      views: 0,
    };
    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
  };

  const handleEditPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;
    setPosts(
      posts.map((post) =>
        post.id === currentPost.id ? { ...post, title, content } : post
      )
    );
    setCurrentPost(null);
    setIsEditModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const openEditModal = (post) => {
    setCurrentPost(post);
    setIsEditModalOpen(true);
  };

  // 페이지네이션 관련 함수들
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(posts.length / postsPerPage)));

  const prevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

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
                      <th scope="col" style={{ fontSize: "16px" }}>번호</th>
                      <th scope="col" style={{ fontSize: "16px" }}>제목</th>
                      <th scope="col" style={{ fontSize: "16px" }}>내용</th>
                      <th scope="col" style={{ fontSize: "16px" }}>등록일</th>
                      <th scope="col" style={{ fontSize: "16px" }}>조회</th>
                      <th scope="col" style={{ fontSize: "16px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((post) => (
                      <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>{post.date}</td>
                        <td>{post.views}</td>
                        <td>
                          <Button color="primary" onClick={() => openEditModal(post)}>수정</Button>
                          <Button color="danger" onClick={() => handleDeletePost(post.id)}>삭제</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink previous onClick={prevPage} />
                    </PaginationItem>
                    {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((number) => (
                      <PaginationItem key={number + 1} active={currentPage === number + 1}>
                        <PaginationLink onClick={() => paginate(number + 1)}>{number + 1}</PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
                      <PaginationLink next onClick={nextPage} />
                    </PaginationItem>
                  </Pagination>
                </nav>
                <div className="d-flex justify-content-end mt-4">
                  <Button color="primary" className="mr-2" onClick={openCreateModal}>
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
          <Button color="danger" onClick={confirmDeletePost}>삭제</Button>
          <Button color="secondary" onClick={() => setIsDeleteModalOpen(false)}>취소</Button>
        </ModalFooter>
      </Modal>

      {/* 게시글 작성 모달 */}
      <Modal isOpen={isCreateModalOpen} toggle={() => setIsCreateModalOpen(false)} size="lg">
        <ModalHeader toggle={() => setIsCreateModalOpen(false)}>게시글 작성</ModalHeader>
        <Form onSubmit={handleCreatePost}>
          <ModalBody>
            <FormGroup>
              <Label for="title">제목</Label>
              <Input type="text" name="title" id="title" required />
            </FormGroup>
            <FormGroup>
              <Label for="content">내용</Label>
              <Input type="textarea" name="content" id="content" required style={{ height: "300px" }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">저장</Button>
            <Button color="secondary" onClick={() => setIsCreateModalOpen(false)}>취소</Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* 게시글 수정 모달 */}
      <Modal isOpen={isEditModalOpen} toggle={() => setIsEditModalOpen(false)} size="lg">
        <ModalHeader toggle={() => setIsEditModalOpen(false)}>게시글 수정</ModalHeader>
        <Form onSubmit={handleEditPost}>
          <ModalBody>
            <FormGroup>
              <Label for="title">제목</Label>
              <Input type="text" name="title" id="title" defaultValue={currentPost ? currentPost.title : ""} required />
            </FormGroup>
            <FormGroup>
              <Label for="content">내용</Label>
              <Input type="textarea" name="content" id="content" defaultValue={currentPost ? currentPost.content : ""} required style={{ height: "300px" }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">저장</Button>
            <Button color="secondary" onClick={() => setIsEditModalOpen(false)}>취소</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AdminPost;