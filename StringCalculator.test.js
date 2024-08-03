const StringCalculator = require('./StringCalculator');

describe('StringCalculator', () => {
    test('should return 0 for an empty string', () => {
        expect(StringCalculator.add("")).toBe(0);
    });

    test('should return the number itself for a single number', () => {
        expect(StringCalculator.add("1")).toBe(1);
    });

    test('should return the sum of two numbers', () => {
        expect(StringCalculator.add("1,5")).toBe(6);
    });

    test('should handle new lines between numbers', () => {
        expect(StringCalculator.add("1\n2,3")).toBe(6);
    });

    test('should support different delimiters', () => {
        expect(StringCalculator.add("//;\n1;2")).toBe(3);
    });

    test('should throw an exception for negative numbers', () => {
        expect(() => StringCalculator.add("1,-2,3")).toThrow("negative numbers not allowed -2");
    });

    test('should show all negative numbers in the exception message', () => {
        expect(() => StringCalculator.add("1,-2,-3")).toThrow("negative numbers not allowed -2, -3");
    });
});