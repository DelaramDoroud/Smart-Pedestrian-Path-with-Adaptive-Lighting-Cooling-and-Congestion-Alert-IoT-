const { setCrowd } = require('./crowdState');
const CROWD_THRESHOLD = 10;
let lastAlertState = null;

function handleCrowdMessage(data, mqttClient, topicOut) {
  const  crowd  = data.crowd.value;
  console.log(`Received crowd count: ${crowd}`);
  setCrowd(crowd);
  const shouldAlert = crowd > CROWD_THRESHOLD;

  if (shouldAlert !== lastAlertState) {
    lastAlertState = shouldAlert;

    const payload = {
      alert: shouldAlert,
      message: shouldAlert
        ? "Congestion alert: Crowd exceeds threshold"
        : "Crowd under control",
      timestamp: new Date().toISOString(),
      count: crowd,
    };

    console.log("Publishing alert:", payload);
    mqttClient.publish(topicOut, JSON.stringify(payload));
  } else {
    console.log("No change in alert status.");
  }
}

module.exports = { handleCrowdMessage };
