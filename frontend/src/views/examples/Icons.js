import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import LiveHeader from "components/Headers/LiveHeader.js";
import { Swiper, SwiperSlide } from 'swiper/react'; // 이미지 슬라이드 라이브러리 
import 'swiper/css';
import 'swiper/css/autoplay'; // Autoplay 모듈의 스타일 임포트
import { Autoplay } from 'swiper/modules'; // Autoplay 모듈 임포트
import { useDispatch, useSelector } from 'react-redux'; // 디스패치를 보내주고 selector로 가져온다.
import { sendDetectionData } from "store";
import { useNavigate } from "react-router-dom"; // 네비게이트 페이지 이동 함수 
import { sendData } from "store";

const Icons = () => {
  const [isForceStopModalOpen, setIsForceStopModalOpen] = useState(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [detectionData, setDetectionData] = useState({});
  const [detectionTime, setDetectionTime] = useState(null); // 탐지 시간을 관리하는 상태
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(true); // 슬라이드쇼 상태 관리
  const [detectedIndex, setDetectedIndex] = useState(null); // 탐지된 이미지 인덱스를 관리하는 상태
  const [slideData, setSlideData] = useState([
    { img: 'https://miro.medium.com/v2/resize:fit:627/1*t73lHngAIii4mt98hBgzqA.png', name: "산" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "바다" },
    { img: 'https://miro.medium.com/v2/resize:fit:627/1*t73lHngAIii4mt98hBgzqA.png', name: "논" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" },
    { img: 'https://pbs.twimg.com/media/CFatycaW8AA2fM9.jpg', name: "서울" }
  ]);
  let Index = useSelector((state) => { return state.Index; });  // 리덕스에서 가져온 번호

  const dispatch = useDispatch(); // 리덕스로 데이터를 보낼때 사용하는 디스패치함수를 사용해야함. 
  const swiperRef = useRef(null); // Swiper 레퍼런스

  useEffect(() => {
    if (swiperRef.current && !isSlideshowRunning) {
      swiperRef.current.autoplay.stop();
    } else if (swiperRef.current && isSlideshowRunning) {
      swiperRef.current.autoplay.start();
    }
  }, [isSlideshowRunning]);

  const toggleForceStopModal = () => {
    setIsForceStopModalOpen(!isForceStopModalOpen);
  };

  const toggleRestartModal = () => {
    setIsRestartModalOpen(!isRestartModalOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setDropdownOpen(false);
  };

  const handleForceStop = () => {
    setIsSlideshowRunning(false);
    toggleForceStopModal();
  };

  const handleRestart = () => {
    setIsSlideshowRunning(true);
    toggleRestartModal();
  };

  const handleDetection = (item, index) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    setDetectionData(item);
    setDetectionTime(formattedTime);
    setDetectedIndex(index); // 탐지된 이미지 인덱스 설정
    dispatch(sendDetectionData(item));  // 리덕스로 탐지된 위해물품 데이터 전송함.
  };

  return (
    <>
      <style>
        {`
          @keyframes blink {
            0% { border-color: red; }
            50% { border-color: transparent; }
            100% { border-color: red; }
          }
          .blink {
            animation: blink 1s infinite;
          }
        `}
      </style>
      <LiveHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">실시간 분석</h3>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    {selectedModel ? selectedModel : "모델 선택"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleModelSelect("모델 1")}>모델 1</DropdownItem>
                    <DropdownItem onClick={() => handleModelSelect("모델 2")}>모델 2</DropdownItem>
                    <DropdownItem onClick={() => handleModelSelect("모델 3")}>모델 3</DropdownItem>
                    <DropdownItem onClick={() => handleModelSelect("모델 4")}>모델 4</DropdownItem>
                    {/* 다른 모델들 추가 */}
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>
              <CardBody>
                <Swiper
                  spaceBetween={10} // 각 슬라이드의 간격을 10 px 로 설정 . 
                  slidesPerView={2} // 사용자에게 보여줄 사진 갯수 
                  modules={[Autoplay]} // 자동 슬라이드 
                  speed={8000} // 슬라이드 속도 
                  direction="horizontal" // 슬라이드 방향을 수평으로 설정
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false // 사용자가 이미지 클릭했을때 선택기능 false 가 선택가능함. 
                  }}
                  onSwiper={(swiper) => { swiperRef.current = swiper; }}
                  style={{ transform: 'scaleX(-1)', height: "700px" }} // 전체 슬라이드 방향 반전
                >
                  {slideData.map((item, i) => ( // slideData 배열을 순회하여 각 항목과 인덱스를 반환
                    <SwiperSlide key={i} style={{ transform: 'scaleX(-1)' }}>  
                    {/* // 각 항목을 SwiperSlide 컴포넌트로 렌더링하며, 요소를 수평 반전 */}
                      <div
                        id="itemBox"
                        className={detectedIndex === i ? 'blink' : ''} // 탐지된 이미지 인덱스와 현재 인덱스가 같으면 blink 클래스를 적용
                        style={{
                          position: 'relative', // 상대 위치 지정
                          border: detectedIndex === i ? '5px solid red' : 'none', // 탐지된 이미지일 경우 빨간색 테두리 적용, 아니면 없음
                        }}
                      >
                        <img
                          src={item.img} // 이미지 소스 설정
                          alt={`이미지 ${i + 1}`} // 이미지 대체 텍스트 설정
                          style={{ width: '100%', height: '650px', maxHeight: '700px' }} // 이미지 크기 및 최대 높이 설정
                        />
                        <button onClick={(e) => {
                          dispatch(sendData(item)); // 리덕스로 보냄
                          handleDetection(item, i)

                        }}>stop</button> 
                                {/* // 버튼 클릭 시 handleDetection 함수 호출, 탐지된 항목과 인덱스를 인자로 전달 */}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div style={{ border: 1, border: 3, marginTop: 20 }}>
                  {/* props 보내는방법 */}
                  <AlarmDetection detectionData={detectionData} detectionTime={detectionTime} />
                  <Button
                    color="danger"
                    onClick={toggleForceStopModal}
                    style={{ marginRight: "10px" }}
                  >
                    작업중지
                  </Button>
                  <Button color="primary" onClick={toggleRestartModal}>
                    재시작
                  </Button>
                </div>
                {!isSlideshowRunning && <p style={{ color: "red" }}>작업이 중지되었습니다.</p>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* 강제 종료 모달 */}
      <Modal isOpen={isForceStopModalOpen} toggle={toggleForceStopModal} className="modal-dialog-centered">
        <ModalHeader toggle={toggleForceStopModal}>작업 중지</ModalHeader>
        <ModalBody>
          정말로 작업을 중지하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleForceStop}>
            작업 중지
          </Button>
          <Button color="secondary" onClick={toggleForceStopModal}>
            취소
          </Button>
        </ModalFooter>
      </Modal>

      {/* 재시작 모달 */}
      <Modal isOpen={isRestartModalOpen} toggle={toggleRestartModal} className="modal-dialog-centered">
        <ModalHeader toggle={toggleRestartModal}>재시작</ModalHeader>
        <ModalBody>
          정말로 재시작하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRestart}>
            재시작
          </Button>
          <Button color="secondary" onClick={toggleRestartModal}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

function AlarmDetection(props) {
  const navigate = useNavigate();

  return (
    <div>
      {props.detectionData.name && (
        <p style={{ color: "red" }}>{props.detectionData.name} 이미지에서 이상탐지가 발생했습니다. 시간:  {props.detectionTime}
          <Button color="danger" onClick={() => navigate('/admin/maps')} style={{ marginLeft: "25px" }}>
            바로가기
          </Button>
        </p>
      )}
    </div>
  );
}

export default Icons;