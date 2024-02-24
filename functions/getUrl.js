const getUrl = (res) => {
  let url = "";
  if (res.includes("oast")) {
    let u = res.split(" ");
    url = u[u.length - 1];
    url = url.slice(0, -1);
  }

  return url;
};

module.exports = {
  getUrl,
};
