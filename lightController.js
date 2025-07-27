const { getCrowd } = require('./crowdState');
function handleLightMessage(data, hivemqClient, topicOut, ubidotsClient) {
  const light = data.light;
  //const crowd = data.crowd?.value ?? 0;
  const crowd = getCrowd();
  console.log(`Light = ${light}, Crowd = ${crowd}`);
  let brightness;
  if (light < 2804) {
    brightness = (crowd > 0) ? 255 : 100;
  } else if (light >= 2804 && light < 3277) {
    brightness = (crowd > 0) ? 50 : 0;
  } else if (light >= 3277) {
    brightness = 0;
  }

  //console.log("Received data:", JSON.stringify(data, null, 2));
  const controlMsg = JSON.stringify({ light: brightness });
  hivemqClient.publish(topicOut, controlMsg);
  const statusMsg = JSON.stringify({ light_status: (brightness > 0 ? 1 : 0) });
  ubidotsClient.publish("/v1.6/devices/esp32-node1", statusMsg);
  console.log(`Published to ${topicOut}: ${controlMsg}`);

}

module.exports = {
  handleLightMessage
};
