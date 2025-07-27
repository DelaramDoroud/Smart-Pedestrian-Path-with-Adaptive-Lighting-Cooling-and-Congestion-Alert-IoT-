const mqtt = require('mqtt');
const { handleLightMessage } = require('./lightController');
const { handleCrowdMessage } = require('./crowdController');
const { handleCoolingMessage } = require('./coolingController');
const hivemqBroker = 'mqtts://broker.hivemq.com';
const topic = 'smartpath/data';
const topicCrowd = 'smartpath/alert';
const topicOutLight = 'smartpath/lights/control';
const topicCooling = 'smartpath/cooling/control';

const hivemqClient = mqtt.connect(hivemqBroker);
const ubidotsClient = mqtt.connect('mqtt://industrial.api.ubidots.com', {
  username: 'BBUS-MjkXqWkxTS5MlxmI9H5hqteTIHzAAJ',
  password: '',
});

//client.publish('smartpath/lights/control', '', { retain: true });
// console.log("Connecting to MQTT broker");
hivemqClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    //client.publish('smartpath/lights/control', '', { retain: true });
    hivemqClient.subscribe(topic, (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

hivemqClient.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}:`, message.toString());
    try {
        const data = JSON.parse(message.toString());
        if ('light' in data) {
            handleLightMessage(data, hivemqClient, topicOutLight, ubidotsClient);
        }
        if ('crowd' in data) {
            handleCrowdMessage(data, hivemqClient, topicCrowd, ubidotsClient);
        }
        if ('temp' in data && 'humidity' in data) {
            handleCoolingMessage(data, hivemqClient, topicCooling, ubidotsClient);
}
    } catch (error) {
        console.error('Error processing message:', error);
    }
});