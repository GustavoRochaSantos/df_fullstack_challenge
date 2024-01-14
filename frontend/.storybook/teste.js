const jwt = require("./sign.min.js");

const token = jwt.sign(
  { foo: "bar" },
  privateKey,
  { algorithm: "RS256" },
  function (err, token) {
    console.log(token);
  }
);

console.log(token);
