process.on('SIGTERM', () => {
  // 做清理工作
  console.log('Received SIGTERM signal. Shutting down gracefully.');
  // 優雅地退出
  process.exit(0);
});