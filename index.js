#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
var round = 1;
let log = console.log;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow("__Guess Number__");
    await sleep(1000);
    rainbowTitle.stop();
}
async function figlett() {
    figlet("__Guess-Number__", function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
}
async function des() {
    await sleep(100);
    console.log(`
    ${chalk.blue('How To Play')} 
    This is a command line number guessing game computer will generate number from 1 to 10 and you will guess it if correct congratulations otherwise play again.Good Luck.
    `);
}
await welcome();
await figlett();
await des();
let que1 = {
    type: "list",
    name: "que1",
    message: "Enter your first number",
    choices: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
};
let que2 = {
    type: "list",
    name: "que2",
    message: `If you want to play again select ${chalk.blue("YES")} otherwise ${chalk.green("NO")} . `,
    choices: ['YES', 'NO']
};
async function question1() {
    let value = await inquirer.prompt([que1]);
    return value.que1;
}
async function getValueQue1() {
    let x = await question1().then(data => data);
    return x;
}
async function question2() {
    let value = await inquirer.prompt([que2]);
    return value.que2;
}
async function getValueQue2() {
    let x = await question2().then(data => data);
    return x;
}
async function answer() {
    let x = await getValueQue1();
    x = Number(x);
    let guessed = Math.floor(Math.random() * 11);
    if (x === guessed) {
        log(`
        ${chalk.blue(" Congradulations your guessed number is correct ")}
        `);
    }
    else {
        log(`
        The number is ${guessed}.
        ${chalk.red(" Better Luck next time. ")}
        `);
    }
}
async function playAgain() {
    let x = await getValueQue2();
    x = String(x);
    if (x !== "YES") {
        log("As you like");
    }
    else {
        log(`________________________Round :: ${round}________________________`);
        round++;
        await answer();
        if (await getValueQue2() === "YES") {
            log(`________________________Round :: ${round}________________________`);
            round++;
            await answer();
            await playAgain();
        }
        else {
            log("As you like");
        }
    }
}
log(`________________________Round :: ${round}________________________`);
round++;
await answer();
await playAgain();
