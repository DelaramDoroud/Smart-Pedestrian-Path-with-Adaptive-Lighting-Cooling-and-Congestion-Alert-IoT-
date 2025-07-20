function handleLightMessage(data, mqttClient, topicOut) {
  const light = data.light;
  console.log(`Light = ${light}`);

  let brightness;
  if (light < 2804) {
    brightness = 255;
  } else if (light < 3277) {
    brightness = 100;
  } else {
    brightness = 0;
  }

  const controlMsg = JSON.stringify({ light: brightness });
  mqttClient.publish(topicOut, controlMsg);
  console.log(`Published to ${topicOut}: ${controlMsg}`);
}

module.exports = {
  handleLightMessage
};