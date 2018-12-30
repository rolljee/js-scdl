const cp = require("child_process");

const Soundcloud = {
  start(url = "", outputFolder = "") {
    if (outputFolder.charAt(0) === "~") {
      // path must be absolute for spawn to work.
      throw new Error("You must use absolute path");
    }

    if (!url.includes("soundcloud")) {
      throw new Error("Are you sure url come from soundcloud ?");
    }

    return cp.spawn("scdl", ["-l", url, "--path", `${outputFolder}`, "-c"]);
  }
};

module.exports = Soundcloud;
