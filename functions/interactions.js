const addInteractions = (res) => {
  const interactions = [];

  const log = res.split("\n");

  const interact = {};
  log.forEach((line) => {
    const match = line.match(
      /\[.*\] Received (.*) from .* at (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/
    );
    if (match) {
      const event = match[0];
      const time = match[2];
      interact[time] = event;
      interactions.push(interact);
    }
  });

  return interactions;
};

module.exports = {
  addInteractions,
};
