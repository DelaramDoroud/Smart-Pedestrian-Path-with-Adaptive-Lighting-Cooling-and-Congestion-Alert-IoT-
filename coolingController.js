const { getCrowd } = require('./crowdState');
function handleCoolingMessage(data, hivemqClient, topicOut, ubidotsClient) {
  const temp = data.temp;
  const humidity = data.humidity;
  const crowd = getCrowd();

  if (temp === undefined || humidity === undefined) {
    console.warn("Cooling: Temp or humidity missing in data");
    return;
  }

  const shouldCool = (crowd > 0) ? (temp > 30 || (temp > 27 && humidity > 50)) : false;
  console.log(`Cooling decision: Temp = ${temp}, Humidity = ${humidity}, Cooling = ${shouldCool}`);

  const payload = JSON.stringify({ cooling: shouldCool });
  hivemqClient.publish(topicOut, payload);
  const statusMsg = JSON.stringify({ cooling_status: shouldCool ? 1 : 0 });
  ubidotsClient.publish("/v1.6/devices/esp32-node1", statusMsg);
  console.log(`Published to ${topicOut}: ${payload}`);
}

module.exports = { handleCoolingMessage };
