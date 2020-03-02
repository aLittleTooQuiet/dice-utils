# dice-utils

A library for parsing dice notation strings and rolling dice.

If you're unfamilar with dice notation, you can [learn more about it here](https://en.wikipedia.org/wiki/Dice_notation).

## API

`dice-utils` exports an object with three functions:

* [`roll`](#roll), to get results from a dice notation string (ie "2d6")
* [`parseDieNotation`](#parseDieNotation), to parse dice notiation string
* [`rollDie`](#rollDie), to roll an individual die

### `roll`

Requires a dice notation string as a parameter, and returns an object with `results` and `total` properties.

* `results` [Integer], The results of the individual die rolls.
* `total` Integer, The sum of the die results, including any modifiers.

Uses [`parseDieNotation`](#parseDieNotation) internally.

```javascript
import { roll } from 'dice-utils';

roll('2d6');
// {
//  results: [ 2, 3 ],
//  total: 5
// }

roll('2d6+5');
// {
//  results: [ 1, 4 ],
//  total: 10
// }

roll('1d6x10');
// {
//  results: [ 5 ],
//  total: 50
// }
```

### `parseDieNotation`

Requires a dice notation string as a parameter, and returns an object with the following properties:

* `sides`: Integer, The number of sides on the dice to roll.
* `count`: Integer, The number of dice to roll.
* `mod`: Integer, A postive or negative value that modifies the total result. Default `0`.
* `multiply`: (optional) Boolean, `true` if the total is to multiplied by mod.
* `dropLow`: (optional) Boolean, `true` if the lowest die value should be dropped before calculating the total.
* `succes`: (optional) Integer, `-1` if counting low successes, `1` if counting high successes.

#### Basic Die Notation

This function supports any number of dice of arbitrary sizes, using the convention `"XdY"` where X is the number of dice to roll and Y is the number of sizes.

`"5d10"` represents 5 10-sided dice.

#### Modifiers

##### Add or subtract from the total

A positive or negative integer can be appended, which will be applied to the total.

`"3d6-2"` represents 3 6-sided dice, with 2 subtracted from the sum of the results.

##### Multiply the total

The results can also be multiplied by appending an integer using `x` or `*`.

`"2d6x10"` or `"2d6*10"` represents 2 6-sided dice, with the sum of the results multiplied by 10.

##### Drop the lowest die

You can drop the lowest die result with a `"-L"` modifier.

`"4d6-L"` represents rolling 4 6-sided dice and dropping the lowest die value, totaling the higher 3.

##### Count individual successes

You can count individual successes on the die against a high target number using the syntax `">X"`, where X is the target number. This will count all dice that are greater than or equal to the target number.

`"10d6>5"` represents 10 6-sided dice, with the total equal to the number of dice that are 5 or greater.

You can count against a low target number using the syntax `"<X"`.

`"2d20<10"` represents 2 20-sided dice, with the total equal to the number of dice that are 10 or lower.

#### Fudge Dice

You can roll Fudge dice by specifying "F" for the number of sides.

Fudge dice have an equal probability to return -1, 0, or 1.

`"4dF"` represents 4 Fudge dice.

### `rollDie`

Requires a parameter `sides`, which is either an integer or "F", and returns an integer between 1 and `sides`, or rolls Fudge dice for "F".

```javascript
roll(6);
// 5

roll('F');
// -1
```
