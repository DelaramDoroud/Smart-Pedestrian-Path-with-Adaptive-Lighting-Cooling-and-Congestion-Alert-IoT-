const mqtt = require('mqtt');
const { handleLightMessage } = require('./lightController');
const { handleCrowdMessage } = require('./crowdController');
const broker = 'mqtts://broker.hivemq.com';
const topic = 'smartpath/data';
const topicCrowd = 'smartpath/alert';
const topicOutLight = 'smartpath/lights/control';

const client = mqtt.connect(broker);
//client.publish('smartpath/lights/control', '', { retain: true });
// console.log("Connecting to MQTT broker");
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    //client.publish('smartpath/lights/control', '', { retain: true });
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Subscription error:', err);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}:`, message.toString());
    try {
        const data = JSON.parse(message.toString());
        if ('light' in data) {
            handleLightMessage(data, client, topicOutLight);
        }
        if ('crowd' in data) {
            handleCrowdMessage(data, client, topicCrowd);
        }
    } catch (error) {
        console.error('Error processing message:', error);
    }
});