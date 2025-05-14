// filepath: c:\Users\Administrator\Learnings\GitHub-Copilot\bucks2bar\js\scripts.test.js
const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

describe('Username Validation Regex', () => {
    test('Valid username: contains uppercase, number, special character, and is at least 8 characters', () => {
        expect(regex.test('Password1!')).toBe(true);
        expect(regex.test('Valid123@')).toBe(true);
        expect(regex.test('Test@2023')).toBe(true);
    });

    test('Invalid username: less than 8 characters', () => {
        expect(regex.test('Pass1!')).toBe(false);
        expect(regex.test('Abc@1')).toBe(false);
    });

    test('Invalid username: missing uppercase letter', () => {
        expect(regex.test('password1!')).toBe(false);
        expect(regex.test('valid123@')).toBe(false);
    });

    test('Invalid username: missing number', () => {
        expect(regex.test('Password!')).toBe(false);
        expect(regex.test('Valid@!')).toBe(false);
    });

    test('Invalid username: missing special character', () => {
        expect(regex.test('Password1')).toBe(false);
        expect(regex.test('Valid123')).toBe(false);
    });
});