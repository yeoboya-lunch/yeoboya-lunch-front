const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['www.mcdonalds.co.kr'], // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
  },
  // experimental: {appDir: true},
};

module.exports = nextConfig;
