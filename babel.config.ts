import type { ConfigAPI } from '@babel/core';

export default function (api: ConfigAPI) {
  (api as any).cache(true); 
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
}
