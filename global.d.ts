// global.d.ts
/// <reference types="nativewind/types" />

// 이미지 파일 import를 위한 타입 선언
declare module '*.jpg';
declare module '*.svg';
declare module '*.mp3';
declare module '*.png' {
  const value: any;
  export default value;
}
