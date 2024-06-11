import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Card, Container, Row, Col, Button, Input, ListGroup, ListGroupItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import MapsHeader from "components/Headers/MapsHeader";
import { useLocation } from 'react-router-dom';

const Maps = () => {
  const location = useLocation();
  const { item, detectionTime } = location.state || {};
  const [localDetectionData, setLocalDetectionData] = useState(item ? { name: item.name, img: item.img, time: detectionTime } : {});

  return (
    <>
      <MapsHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper detectionData={localDetectionData} setDetectionData={setLocalDetectionData} />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

const MapWrapper = (props) => {
  const [file, setFile] = useState(null);
  const [detectionList, setDetectionList] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (props.detectionData?.img) {
      const newItem = {
        name: `전송된 이미지: ${props.detectionData.name}`,
        src: props.detectionData.img,
      };
      setDetectionList(prevList => [...prevList, newItem]);
    }
  }, [props.detectionData]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      const newItem = {
        name: `내 업로드: ${selectedFile.name}`,
        src: reader.result,
      };
      setDetectionList([...detectionList, newItem]); // 탐지 리스트에 항목 추가
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = () => {
    setFile(null);
    setImageSrc(null);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleListItemClick = (item) => {
    setImageSrc(item.src);
  };

  const handleDownloadCSV = () => {
    const csvContent = detectionList.map(item => item.name).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "detection_list.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseImage = () => {
    setImageSrc(null);
    if (props.detectionData) {
      const updatedDetectionData = { ...props.detectionData, img: null };
      props.setDetectionData(updatedDetectionData);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
  };

  return (
    <Row style={{ height: '680px' }}>
      <Col md="8" className="d-flex align-items-center justify-content-center">
        <div style={{ width: '100%', height: '100%', textAlign: 'center', position: 'relative' }}>
          <Input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            innerRef={fileInputRef}
          />

          {(props.detectionData?.img || imageSrc) ? (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={props.detectionData?.img || imageSrc}
                alt="Selected file preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover' // 이미지가 컨테이너를 가득 채우도록 조정
                }}
              />
              <Button color="danger" size="sm" onClick={handleCloseImage} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </div>
          ) : (
            <Button color="primary" className="btn-icon" size="lg" onClick={handleButtonClick} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          )}

          {file && (
            <Button color="secondary" onClick={handleUpload} style={{ marginTop: '10px' }}>
              업로드
            </Button>
          )}
        </div>
      </Col>
      <Col md="4">
        <div style={{ height: '100%', padding: '20px', boxSizing: 'border-box', borderLeft: '0.5px solid ', borderColor: "gray" }}>
          <h3>위해물품 탐지 리스트
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} style={{ marginLeft: 150 }}>
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
          </h3>
          
          <Button color="primary" onClick={handleDownloadCSV} style={{ marginTop: '10px' }}>
            CSV 다운로드
          </Button>

          <h3 style={{  marginTop : '150PX'}}>내가 업로드한 사진</h3>
          <ListGroup>
            {detectionList.map((item, index) => (
              <ListGroupItem key={index} onClick={() => handleListItemClick(item)} style={{ cursor: 'pointer' , marginTop : '10PX'}}>
                {item.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </Col>
    </Row>
  );
};

export default Maps;