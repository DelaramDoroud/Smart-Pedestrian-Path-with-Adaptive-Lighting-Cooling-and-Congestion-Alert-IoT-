function handleLightMessage(data, mqttClient, topicOut) {
  const light = data.light;
  const crowd = data.crowd?.value ?? 0;
  console.log(`Light = ${light}`);
  let brightness;
  if (light < 2804) {
    brightness = 255; crowd > 0 ? 255 : 100;
  } else if (light >= 2804 && light < 3277) {
    brightness = 50; crowd > 0 ? 100 : 0;
  } else if (light >= 3277) {
    brightness = 0;
  }

  const controlMsg = JSON.stringify({ light: brightness });
  mqttClient.publish(topicOut, controlMsg);
  console.log(`Published to ${topicOut}: ${controlMsg}`);
}

module.exports = {
  handleLightMessage
};
