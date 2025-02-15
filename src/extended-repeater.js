const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options = {}) {
  str = String(str);

  const {
    repeatTimes = 1,
    separator = "+",
    addition = "",
    additionRepeatTimes = 1,
    additionSeparator = "|",
  } = options;

  let additionPart = "";
  if (addition !== "") {
    const additionStr = String(addition);
    const additionArray = Array(additionRepeatTimes).fill(additionStr);
    additionPart = additionArray.join(additionSeparator);
  }

  const repeatedPart = str + additionPart;
  const resultArray = Array(repeatTimes).fill(repeatedPart);
  return resultArray.join(separator);
}

module.exports = {
  repeater,
};
