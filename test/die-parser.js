'use strict';

const expect = require('chai').expect;
const parser = require('../src/die-parser');

describe('die parser', () => {
  const parsesAs = function (input, expected) {
    return () => {
      var ast = parser.parse(input);
      expect(ast.dump()).to.equal(expected);
    };
  };

  it('parses a die roll', parsesAs('1d20', 'Die(Int(1), Int(20))'));
  it('defaults die count to 1', parsesAs('d20', 'Die(Int(1), Int(20))'));

  it('parses addition', parsesAs('1d10+2d6+7',
    'Add(Die(Int(1), Int(10)), Add(Die(Int(2), Int(6)), Int(7)))'));

  it('parses subtraction', parsesAs('1-3+3d4',
    'Sub(Int(1), Add(Int(3), Die(Int(3), Int(4))))'));
});
