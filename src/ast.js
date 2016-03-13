'use strict';

function Additive(left, operator, right) {
  this.left = left;
  this.operator = operator;
  this.right = right;

  let op = () => {
    throw new Error(`Unrecognized operator: ${this.operator}`);
  };

  if (this.operator === '+') op = (l, r) => l + r;
  if (this.operator === '-') op = (l, r) => l - r;

  this.value = op(this.left.value, this.right.value);
}

exports.Additive = Additive;

Additive.prototype.report = function () {
  return `${this.left.report()} ${this.operator} ${this.right.report()}`;
};

Additive.prototype.dump = function () {
  return `(${this.operator} ${this.left.dump()} ${this.right.dump()})`;
};

function Die(count, sides) {
  this.count = count == null ? one : count;
  this.sides = sides;

  this.rolls = [];

  for (var i = 0; i < this.count.value; i++) {
    let max = this.sides.value;
    let min = 1;

    let roll = Math.floor(Math.random() * (max - min + 1)) + min;
    this.rolls.push(roll);
  }

  this.value = this.rolls.reduce((a, b) => a + b);
}

exports.Die = Die;

Die.prototype.report = function () {
  let rs = this.rolls.map((r) => r.toString()).join(", ");

  let result = '';
  if (!this.count.isAtom) {
    result += `(${this.count.report()})`;
  } else if (this.count.value !== 1) {
    result += this.count.report();
  }
  result += 'd';
  if (!this.sides.isAtom) {
    result += `(${this.sides.report()})`;
  } else {
    result += this.sides.report();
  }
  result += ` [${rs}]`;

  return result;
};

Die.prototype.dump = function () {
  return `(d ${this.count.dump()} ${this.sides.dump()})`;
};

function Int(digits) {
  this.value = parseInt(digits.join(""), 10);

  this.isAtom = true;
}

exports.Int = Int;

const one = new Int(['1']);

Int.prototype.report = function () {
  return this.value.toString();
};

Int.prototype.dump = function () {
  return `(i ${this.value})`
};

let valueOf = function (astNode) {
  if (!astNode.cachedValue) {
    astNode.cachedValue = astNode.evaluate();
  }

  return astNode.cachedValue;
};

let report = function (astNode) {
  return `${astNode.report()} = ${astNode.value}`;
};

exports.report = report;
