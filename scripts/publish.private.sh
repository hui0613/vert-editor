#! /bin/bash

cd packages/
npm version patch
cd ..
yarn build
cd dist/vert-editor
npm publish --registry "http://npm.xiaohuispace.com/"