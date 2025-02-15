const { NotImplementedError } = require('../extensions/index.js');

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
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(text, key) {
    if (!text || !key) {
      throw new Error('Incorrect arguments!');
    }

    const result = [];
    const formattedText = text.toUpperCase();
    const formattedKey = key.toUpperCase().repeat(Math.ceil(text.length / key.length)).slice(0, text.length);
    let keyIndex = 0;

    for (let i = 0; i < formattedText.length; i++) {
      const currentChar = formattedText[i];
      if (currentChar >= 'A' && currentChar <= 'Z') {
        const shiftedChar = (currentChar.charCodeAt(0) - 65 + (formattedKey[keyIndex].charCodeAt(0) - 65)) % 26 + 65;
        result.push(String.fromCharCode(shiftedChar));
        keyIndex++;
      } else {
        result.push(currentChar);
      }
    }

    if (!this.isDirect) {
      result.reverse();
    }

    return result.join('');
  }

  decrypt(encryptedText, key) {
    if (!encryptedText || !key) {
      throw new Error('Incorrect arguments!');
    }

    const result = [];
    const formattedText = encryptedText.toUpperCase();
    const formattedKey = key.toUpperCase().repeat(Math.ceil(encryptedText.length / key.length)).slice(0, encryptedText.length);
    let keyIndex = 0;

    for (let i = 0; i < formattedText.length; i++) {
      const currentChar = formattedText[i];
      if (currentChar >= 'A' && currentChar <= 'Z') {
        const shiftedChar = (currentChar.charCodeAt(0) - formattedKey[keyIndex].charCodeAt(0) + 26) % 26 + 65;
        result.push(String.fromCharCode(shiftedChar));
        keyIndex++;
      } else {
        result.push(currentChar);
      }
    }

    if (!this.isDirect) {
      result.reverse();
    }

    return result.join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
