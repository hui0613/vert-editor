const config = {
  // 针对所有工作区的 TypeScript 和 JavaScript 文件
  '**/*.{ts,tsx,js,jsx}': (filenames) => {
    return filenames.map((file) => `npm exec eslint ${file} --fix`);
  },
};

export default config;
