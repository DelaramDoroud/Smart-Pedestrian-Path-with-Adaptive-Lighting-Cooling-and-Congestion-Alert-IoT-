const CROWD_THRESHOLD = 10;
const ALERT_TOPIC = "smartpath/alert";
let lastAlertState = null;

function handleCrowdMessage(data, mqttClient) {
  const  crowd  = data.crowd.value;
  console.log(`Received crowd count: ${crowd}`);
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
    mqttClient.publish(ALERT_TOPIC, JSON.stringify(payload));
  } else {
    console.log("No change in alert status.");
  }
}

module.exports = { handleCrowdMessage };
