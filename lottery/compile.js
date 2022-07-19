const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "LotteryV8.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

// console.log(solc.compile(source, 1));

// module.exports = solc.compile(source, 1).contracts[":LotteryV8"];

const input = {
  language: "Solidity",
  sources: {
    "LotteryV8.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

// console.log(
//   JSON.parse(solc.compile(JSON.stringify(input))).contracts["LotteryV8.sol"]
//     .LotteryV8
// );

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "LotteryV8.sol"
].LotteryV8;
