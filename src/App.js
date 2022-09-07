
//import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
//! 자동 배칭(automatic batching) 기능 off => flushSync() import
import {flushSync} from 'react-dom';


// function App() {
//   const [cnt, setCnt] = useState(0);
//   const [flag, setFlag] = useState(false);

//   function handleClick(){
//     setCnt((c)=> c+1);
//     setFlag((f)=>!f);
//     // 이 함수가 끝날때 한번에 리렌더링을 하는 것이 배칭
//   };
//   console.log("리렌더링");

//   return (
//     <div>
//       <button onClick={handleClick}>버튼</button>
//       <h1>{cnt}</h1>
//     </div>
//   );
// };


function App() {

  const [number, setNumber] = useState(0);
  const [boolean, setBoolean] = useState(false);

  // 기존 v17: 하나의 핸들러에서 2가지 상태 업데이트가 진행되어도 리렌더링은 1번만 일어남
  // v18 변경점: 2가지 상태 업데이트가 진행됨으로 리렌더링이 2번 일어남을 알 수 있음
  const onClickCreateNum1 = () => {
    // 하나의 핸들러에서 2가지 상태 업데이트 진행
    flushSync(() => {
      setNumber((prev) => prev+1);
    });
    flushSync(() => {
      setBoolean((prev) => !prev);
    })
  };
  // console.log("리렌더링함(기본)");
  //! 클릭 1번당 리렌더링 1회
  console.log("자동배칭off(flushSync");
// ! 클릭 1번당 리렌더링 2회 발생함을 확인


  // 핸들러 내부에서 fetch() 함수를 사용해 상태 업데이트 여러번 발생시키는 경우
  const onClickCreateNum2 = () => {
    // 가상데이터 이용(JSONPlaceholder)
    fetch("https://jsonplaceholder.typicode.com/posts/3").then((res) => {
      setNumber((prev) => prev+1);
      setBoolean((prev) => !prev);
    });
  };
  // console.log("리렌더링(fetch사용)")
//! 변경점에 의하면 버튼 클릭1번 당 리렌더링 1회 발생해야 함(자동 배칭)
// 현재: 1번 클릭 시 2회 리렌더링 발생
// 자동 배칭이 되지 않는다...
// 추후 확인해야 할듯: 콘솔 창에서 보기 방식 필터링?의 문제였던듯?
// !보기 방식을 착각한 것: 클릭1번당 리렌더링 1회 발생 확인

// 이벤트 핸들러 내부에서 2가지 상태를 혼용할 경우
const onClickCreateNum3 = () => {
  // 1. 일반적인 상태 업데이트
  setNumber((prev) => prev+1);

  // 2. fetch() 콜백 함수 내부에서 상태 업데이트 진행
  fetch("https://jsonplaceholder.typicode.com/posts/3").then((res) => {
      setBoolean((prev) => !prev);
    });
}
// console.log("리렌더링함(혼용)");
//! 클릭 1번당 리렌더링 2회 발생(자동 배칭이 작동하지 않음) -> 혼용 사용 불가

  return (
    <>
      <div className='num'>
        {number}
      </div>
      <button className='btn1' onClick={onClickCreateNum1}>버튼1</button>
      <br/>
      <button className='btn2' onClick={onClickCreateNum2}>버튼2</button>
      <br/>
      <button className='btn2' onClick={onClickCreateNum3}>버튼3</button>
    </>
  );
}

export default App;
