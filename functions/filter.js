const filterArray = (interactions, ...time) => {
  if (time[0].start && time[0].end) {
    const res = [];
    for (let i = 0; i < interactions.length; i++) {
      const timestamp = Object.keys(interactions[i])[0];
      if (timestamp >= time[0].start && timestamp <= time[0].end)
        res.push(interactions[i]);
    }
    return res;
  }
  return interactions;
};

module.exports = {
  filterArray,
};
