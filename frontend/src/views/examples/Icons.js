import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import LiveHeader from "components/Headers/LiveHeader.js";
import { useDispatch } from 'react-redux';
import { sendDetectionData } from "store";
import { useNavigate } from "react-router-dom";
import detetct1 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_01.png";
import detetct2 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_02.png";
import detetct3 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_03.png";
import detetct4 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_04.png";
import detetct5 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_05.png";
import detetct6 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_06.png";
import detetct7 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_07.png";
import detetct8 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_08.png";
import detetct9 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_09.png";
import detetct10 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_10.png";


const Icons = () => {
  const [isForceStopModalOpen, setIsForceStopModalOpen] = useState(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [detectionData, setDetectionData] = useState({});
  const [detectionTime, setDetectionTime] = useState(null);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(true);
  const [detectedIndexes, setDetectedIndexes] = useState([]);
  const [slideData, setSlideData] = useState([
    { img: detetct1, name: "1" },
    { img: detetct2, name: "2" },
    { img: detetct3, name: "3" },
    { img: detetct4, name: "4" },
    { img: detetct5, name: "5" },
    { img: detetct6, name: "6" },
    { img: detetct7, name: "7" },
    { img: detetct8, name: "8" },
    { img: detetct9, name: "9" },
    { img: detetct10, name: "10" },


  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderWrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(slideData.length - 1);
  const slideWidth = 830; // Image width (800px) + padding (20px) + margin-right (10px)

  useEffect(() => {
    const sliderWrapper = sliderWrapperRef.current;
    const totalSlides = slideData.length;

    function moveSlide(index) {
      sliderWrapper.style.transition = 'transform 2s linear';
      sliderWrapper.style.transform = `translateX(${index * -slideWidth}px)`;
      setCurrentIndex(index);

      if (index === totalSlides || index === -totalSlides) {
        setTimeout(() => {
          sliderWrapper.style.transition = 'none';
          sliderWrapper.style.transform = `translateX(${(totalSlides - 1) * -slideWidth}px)`;
          setCurrentIndex(totalSlides - 1);
        }, 10);
      }
    }

    let interval;
    if (isSlideshowRunning) {
      interval = setInterval(() => {
        moveSlide(currentIndex - 1);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isSlideshowRunning, currentIndex]);

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
    setIsForceStopModalOpen(false);
    setIsSlideshowRunning(false);
  };

  const handleRestart = () => {
    setIsRestartModalOpen(false);
    setIsSlideshowRunning(true);
  };

  const handleDetection = (item, index) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    setDetectionData(item);
    setDetectionTime(formattedTime);
    setDetectedIndexes(prev => [...prev, index]);
    dispatch(sendDetectionData(item));
    setIsSlideshowRunning(false); 
  };

  const handleNavigate = () => {
    navigate('/admin/maps', { state: { item: detectionData, detectionTime } });
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
            border: 10px solid red;
            animation: blink 1s infinite;
          }
          .slider-container {
            overflow: hidden;
            width: 100%;
            background-color: black; 
            border: 1px solid #ccc;
            position: relative;
          }
          .slider-wrapper {
            display: flex;
            transition: transform 2s linear;
            transform: translateX(${(slideData.length - 1) * -slideWidth}px); 
            padding: 10px;
          }
          .icon-slide {
            min-width: 800px;
            margin-right: 10px;
            background-color: #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 700px;
            font-size: 24px;
            color: #333;
            cursor: pointer; 
            box-sizing: border-box;
          }
          .icon-slide.shrink img { 
            width: 790px;
            height: 690px;
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
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>
              <CardBody>
                <div className="slider-container">
                  <div className="slider-wrapper" ref={sliderWrapperRef}>
                    {slideData.map((item, index) => (
                      <div
                        className={`icon-slide ${detectedIndexes.includes(index) ? 'blink shrink' : ''}`}
                        key={index}
                        onDoubleClick={() => handleDetection(item, index)}
                      >
                        <img src={item.img} width={'800px'} height={'700px'} alt={`Slide ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ border: 1, border: 3, marginTop: 20 }}>
                  <AlarmDetection detectionData={detectionData} detectionTime={detectionTime} handleNavigate={handleNavigate} />
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
  return (
    <div>
      {props.detectionData.name && (
        <p style={{ color: "red" }}>
          {props.detectionData.name} 이미지에서 이상탐지가 발생했습니다. 시간: {props.detectionTime}
          <Button color="danger" onClick={props.handleNavigate} style={{ marginLeft: "25px" }}>
            바로가기
          </Button>
        </p>
      )}
    </div>
  );
}

export default Icons;