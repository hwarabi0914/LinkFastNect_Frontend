require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // .env ファイルの変数をビルド時に使用できるようにする
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  output: 'standalone', // ✅ 追加: standalone モードを有効化
  experimental: {
    appDir: true, // ✅ Next.js App Router を使用している場合に必要
  },
};

module.exports = nextConfig;
