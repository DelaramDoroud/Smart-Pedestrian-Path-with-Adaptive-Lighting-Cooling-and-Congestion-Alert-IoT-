let lastCrowdValue = 0;

function setCrowd(value) {
  lastCrowdValue = value;
}

function getCrowd() {
  return lastCrowdValue;
}

module.exports = { setCrowd, getCrowd };
