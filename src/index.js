const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');

const fizzBuzz = i => `${i % 3 === 0 ? 'Fizz' : ''}${i % 5 === 0 ? 'Buzz' : ''}`;

/** 
 * Question 1
 * Print numbers from 1 to 100 to the console
 * but for each number also print a random word using the function getRandomWordSync
 */
const printNumbers = ()=>
[...Array(100).keys()].map( n=>{
  return (`${n+1}: ${getRandomWordSync()}`)
});

/**
 * Question 2
 * Modify your code to be a "Fizz Buzz" program.
 * That is, print the numbers as in the previous step,
 * but for multiples of three, print "Fizz" (instead of the random word),
 * for multiples of five, print "Buzz" and for numbers
 * which are both multiples of three and five, print "FizzBuzz".
 */
const printFizzBuzz = () => 
[...Array(100).keys()].map( n=>{
  return (`${n+1}: ${fizzBuzz(n+1) || getRandomWordSync()}`);
});

/**
 * Question 3
 * Create a version of steps 1 and 2 using the asynchronous function,
 * getRandomWord. This function returns a Promise,
 * which resolves to a random word string.
 */
const printNumbersAsync = async ()=>{
  let promises =
    [...Array(100).keys()].map( async (n)=>{
      return (`${n+1}: ${ await getRandomWord()}`);
    });

    return await Promise.all(promises);
}

const printFizzBuzzAsync = async () => {
  let promises =
    [...Array(100).keys()].map( async n=>{
      return (`${n+1}: ${fizzBuzz(n+1) || await getRandomWord()}`)
    });
  return await Promise.all(promises);
}

/**
 * Question 4
 * Add error handling to both the synchronous and asynchronous solutions
 * (calling getRandomWord({ withErrors: true }) will intermitently
 * throw an error instead of returning a random word).
 * When an error is caught, the programm should 
 * print "It shouldn't break anything!" instead of the random word,
 * "Fizz", "Buzz" or "FizzBuzz"
 */
const printNumbersWithErrorAsync = async ()=>{
  let promises =
    [...Array(100).keys()].map( async (n)=>{
      try {
        return (`${n+1}: ${ await getRandomWord({ withErrors: true })}`);
      } catch (err){
        return (`${n+1}: It shouldn't break anything!`);
      }
    });

    return await Promise.all(promises);
}

const printFizzBuzzWithErrorAsync = async () => {
  let promises =
    [...Array(100).keys()].map( async n=>{
      try {
        return (`${n+1}: ${fizzBuzz(n+1) || await getRandomWordSync({ withErrors: true })}`);
      } catch (err){
        return (`${n+1}: ${fizzBuzz(n+1) || 'It shouldn\'t break anything!'}`);
      }
    });
  return await Promise.all(promises);
}

//write result to seperate txt files
fs.writeFile('Q1_Print_Numbers.txt', printNumbers().join('\n'), function (err) {
  if (err) throw err;
  console.log('Q1 Saved!');
});

fs.writeFile('Q2_Fizz_Buzz.txt', printFizzBuzz().join('\n'), function (err) {
  if (err) throw err;
  console.log('Q2 Saved!');
});

printNumbersAsync().then( n=>{
  fs.writeFile('Q3_Print_Numbers_Async.txt', n.join('\n'), (err)=>{
    if (err) throw err;
  });
});

printFizzBuzzAsync().then( n=>{
  fs.writeFile('Q3_Print_FizzBuzz_Async.txt', n.join('\n'), (err)=>{
    if (err) throw err;
    console.log('Q3 Saved!');
  });
});

printNumbersWithErrorAsync().then( n=>{
  fs.writeFile('Q4_Print_Numbers_WithError_Async.txt', n.join('\n'), (err)=>{
    if (err) throw err;
  });
});

printFizzBuzzWithErrorAsync().then( n=>{
  fs.writeFile('Q4_Print_FizzBuzz_WithError_Async.txt', n.join('\n'), (err)=>{
    if (err) throw err;
    console.log('Q4 Saved!');
  });
});
