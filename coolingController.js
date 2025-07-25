const { getCrowd } = require('./crowdState');
function handleCoolingMessage(data, mqttClient, topicOut) {
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
  mqttClient.publish(topicOut, payload);
  console.log(`Published to ${topicOut}: ${payload}`);
}

module.exports = { handleCoolingMessage };
