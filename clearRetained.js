const mqtt = require('mqtt');

const broker = 'mqtt://broker.hivemq.com';
const topic = 'smartpath/lights/control';

const client = mqtt.connect(broker);

client.on('connect', () => {
  console.log('✅ Connected to HiveMQ');

  // پاک کردن پیام retained با ارسال پیام خالی
  client.publish(topic, '', { retain: true, qos: 0 }, (err) => {
    if (err) {
      console.error('❌ Failed to clear retained message:', err);
    } else {
      console.log(`🧹 Retained message on "${topic}" cleared.`);
    }
    client.end();
  });
});
