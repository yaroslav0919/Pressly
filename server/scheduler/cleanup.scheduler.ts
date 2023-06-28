import cron from 'node-cron';

export default function scheduleCleanup() {
  cron.schedule('0 0 * * *', async function () {
    // Performance cleanup db here
  });
}
