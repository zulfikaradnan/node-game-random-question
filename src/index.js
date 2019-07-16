/* eslint-disable no-console */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const command = require('inquirer');
const questions = require('./questions');

/**
 * String to random
 * @param {string} str Value of string
 * @returns {string} Random string
 */
function strToRandom(str) {
  str = str.split('');
  let tmp = '';
  for (let i = str.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    tmp = str[i];
    str[i] = str[j];
    str[j] = tmp;
  }
  return str.join('');
}

/**
 * Get Command Line Question
 * @param {number} scored Score user
 * @returns {void}
 */
function getQuestion(scored) {
  const index = Math.floor(Math.random() * questions.length);
  const { answer, score } = questions[index];

  command.prompt({
    type: 'input',
    name: 'value',
    message: `Coba tebak ini kata apa!! \n \x1b[32m${strToRandom(answer)}\x1b[`
  }).then((data) => {
    if (data.value === answer) {
      scored += score;
      console.info(`Jawabanmu benar, skormu saat ini ${scored}`);
    } else {
      console.warn(`Jawabanmu salah, skormu saat ini masih ${scored}`);
    }
    getQuestion(scored);
  });
}

const currentScore = 0;
getQuestion(currentScore);
