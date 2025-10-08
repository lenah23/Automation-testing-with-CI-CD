const { describe, it } = require('mocha');
const { expect } = require('chai');
const { readFileSync } = require('fs');
const NumbersValidator = require('../src/file.js');

describe('Number validator', () => {
  const validator = new NumbersValidator();

  describe('isNumberEven', () => {
    it('If the number is even, return true', () => {
      expect(validator.isNumberEven(2)).to.equal(true);
      expect(validator.isNumberEven(-2)).to.equal(true);
      expect(validator.isNumberEven(0)).to.equal(true);
    });

    it('If the number is odd, return true', () => {
      expect(validator.isNumberEven(1)).to.equal(false);
      expect(validator.isNumberEven(-1)).to.equal(false);
    });

    it('If it is not a number type', () => {
      expect(() => validator.isNumberEven('simple string')).to.throw(
        '[simple string] is not of type "Number" it is of type "string"'
      );
    });
  });

  describe('getEvenNumbersFromArray', () => {
    it('If the array contains only numbers, return an array of even numbers', () => {
      expect(validator.getEvenNumbersFromArray([1, 2, 3, 4])).to.deep.equal([
        2, 4
      ]);
      expect(validator.getEvenNumbersFromArray([-1, -2, -3, -4])).to.deep.equal(
        [-2, -4]
      );
      expect(validator.getEvenNumbersFromArray([0, 1, 2])).to.deep.equal([
        0, 2
      ]);
    });

    it('If that is not an array then throw error', () => {
      expect(() => validator.getEvenNumbersFromArray('simple string')).to.throw(
        '[simple string] is not an array of "Numbers"'
      );
    });
  });

  describe('isAllNumbers', () => {
    it('If the array contains only numbers, return true', () => {
      expect(validator.isAllNumbers([1, 2, 3, 4])).to.equal(true);
      expect(validator.isAllNumbers([-1, -2, -3, -4])).to.equal(true);
      expect(validator.isAllNumbers([0, 1, 2])).to.equal(true);
    });

    it('If the array contains not only numbers, return false', () => {
      expect(validator.isAllNumbers([1, '2', 3, 4])).to.equal(false);
      expect(validator.isAllNumbers([-1, -2, null, -4])).to.equal(false);
      expect(validator.isAllNumbers([0, 1, undefined])).to.equal(false);
    });

    it('If it is not an array, throw error', () => {
      expect(() => validator.isAllNumbers('simple string')).to.throw(
        '[simple string] is not an array'
      );
    });
  });

  describe('isInteger', () => {
    it('arg is a number', () => {
      expect(validator.isInteger(1)).to.equal(true);
      expect(() => validator.isInteger('simple string')).to.throw(
        '[simple string] is not a number'
      );
    });
  });
});

//DO NOT MODIFY THESE TESTS
describe('config validation', () => {
  let gitIgnore;

  before(() => {
    gitIgnore = readFileSync(__dirname + '/../.gitignore', 'utf8');
  });

  it('should contain test script', () => {
    const packageJson = require('../package.json');
    expect(packageJson.scripts).to.have.property('test');
  });

  it('should contain coverage script', () => {
    const packageJson = require('../package.json');
    expect(packageJson.scripts).to.have.property('coverage');
  });

  it('should contain lint script', () => {
    const packageJson = require('../package.json');
    expect(packageJson.scripts).to.have.property('lint');
  });

  it('should contain .eslintrc.json file', () => {
    const eslintrc = require('../.eslintrc.json');
    expect(eslintrc).to.be.an('object');
  });

  it('.gitignore file should exist', () => {
    expect(gitIgnore, '.gitignore file is not found').not.to.equal(null);
  });

  it('.gitignore file should contain node_modules', () => {
    expect(gitIgnore, '.gitignore file is not found').to.contain(
      'node_modules'
    );
  });
});
