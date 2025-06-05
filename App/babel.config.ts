import type { ConfigAPI } from '@babel/core';

export default function (api: ConfigAPI) {
  (api as any).cache(true); // 👈 이렇게 강제로 any로 처리
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
}