import { configureStore, createSlice } from '@reduxjs/toolkit';  


const detectionData = createSlice({   // Explanation컴포넌트 보일 상태,  Slice는 하나의 state를 뜻함.
    name : 'detectionData',  // state 이름
    initialState : {}, // state초기값.
    reducers : {  // state변경함수를 이곳에 작성.
       sendDetectionData(state, action){  // switch병경.
           return action.payload;
       },  
       
    /*    getIndex(state, action){  // 선택한 ind번호 가져온다.
          state.ind = action.payload;     
       } */
    }
});

export let { sendDetectionData } = detectionData.actions;


// 받아온 위해물품 데이터객체 
const sendDetection= createSlice({   // Explanation컴포넌트 보일 상태,  Slice는 하나의 state를 뜻함.
    name : 'sendDetection',  // state 이름
    initialState : {}, // state초기값.
    reducers : {  // state변경함수를 이곳에 작성.
       sendData(state, action){  // switch병경.
           return action.payload;
       },  
       
    /*    getIndex(state, action){  // 선택한 ind번호 가져온다.
          state.ind = action.payload;     
       } */
    }
});

export let { sendData } = sendDetection.actions;






export default configureStore({
    reducer : { 
        detectionData : detectionData.reducer, // state 변경 함수 내보냄. 
        sendDetection : sendDetection.reducer, // state 변경 함수 내보냄. 
    }    
}); 