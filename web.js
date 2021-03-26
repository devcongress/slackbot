"use strict";

const { bot } = require("./bootstrap");

if (process.env.NODE_ENV !== "development") {
  // Initialise Webhooks server
  require("./webhooks/server")(bot);
}
