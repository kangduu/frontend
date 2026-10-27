const { execSync } = require("child_process");

execSync("ffmpeg -i input.mp4 -vf scale=640:360 output.mp4");
