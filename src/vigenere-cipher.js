const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error("Incorrect arguments!");

    const result = [];
    let keyIndex = 0;
    message = message.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0; i < message.length; i++) {
      if (message[i].match(/[A-Z]/)) {
        const shift = key[keyIndex % key.length].charCodeAt(0) - 65;
        const charCode = ((message[i].charCodeAt(0) - 65 + shift) % 26) + 65;
        result.push(String.fromCharCode(charCode));
        keyIndex++;
      } else {
        result.push(message[i]);
      }
    }

    return this.direct ? result.join("") : result.reverse().join("");
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error("Incorrect arguments!");

    const result = [];
    let keyIndex = 0;
    message = message.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0; i < message.length; i++) {
      if (message[i].match(/[A-Z]/)) {
        const shift = key[keyIndex % key.length].charCodeAt(0) - 65;
        const charCode =
          ((message[i].charCodeAt(0) - 65 - shift + 26) % 26) + 65;
        result.push(String.fromCharCode(charCode));
        keyIndex++;
      } else {
        result.push(message[i]);
      }
    }

    return this.direct ? result.join("") : result.reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
