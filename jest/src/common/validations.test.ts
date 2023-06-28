import { EMAIL_REGEX, PASSWORD_REGEX } from '@common/utils/validations';

describe('validations', () => {
  describe('email', () => {
    it('should return true if email is valid', () => {
      expect(EMAIL_REGEX.test('testemail@gmail.com')).toBe(true);
    });
    it('should return true if email is valid', () => {
      expect(EMAIL_REGEX.test('test.email@gmail.com')).toBe(true);
    });
    it('should return true if email is valid', () => {
      expect(EMAIL_REGEX.test('test.email+subname@gmail.com')).toBe(true);
    });
    it('should return false if email is empty', () => {
      expect(EMAIL_REGEX.test('')).toBe(false);
    });
    it('should return false if recipient name is missing', () => {
      expect(EMAIL_REGEX.test('@gmail.com')).toBe(false);
    });
    it('should return false if @ is missing', () => {
      expect(EMAIL_REGEX.test('testemailgmail.com')).toBe(false);
    });
    it('should return false if domain name is missing', () => {
      expect(EMAIL_REGEX.test('testemail@.com')).toBe(false);
    });
    it('should return false if domain extension is missing', () => {
      expect(EMAIL_REGEX.test('testemail@gmail')).toBe(false);
    });
    it('should return false if email is invalid', () => {
      expect(EMAIL_REGEX.test('testemail@gmail.')).toBe(false);
    });
    it('should return false if email contains spaces', () => {
      expect(EMAIL_REGEX.test('test email@gmail.com')).toBe(false);
    });
    it('should return false if recipient name ends with a dot', () => {
      expect(EMAIL_REGEX.test('testemail.@gmail.com')).toBe(false);
    });
    it('should return false if email starts with a dot', () => {
      expect(EMAIL_REGEX.test('.testemail@gmail.com')).toBe(false);
    });
    it('should return false if email ends with a dot', () => {
      expect(EMAIL_REGEX.test('testemail@gmail.com.')).toBe(false);
    });
    it('should return false if email contains consecutive dots', () => {
      expect(EMAIL_REGEX.test('test..email@gmail.com')).toBe(false);
    });
  });

  describe('password', () => {
    it('should return true if password is valid', () => {
      expect(PASSWORD_REGEX.test('Abcde123!')).toBe(true);
    });
    it('should return false if password is too short', () => {
      expect(PASSWORD_REGEX.test('Abce12!')).toBe(false);
    });
    it('should return false if password is missing uppercase letters', () => {
      expect(PASSWORD_REGEX.test('abcde123!')).toBe(false);
    });
    it('should return false if password is missing special characters', () => {
      expect(PASSWORD_REGEX.test('Abcde1234')).toBe(false);
    });
    it('should return false if password contains whitespace', () => {
      expect(PASSWORD_REGEX.test('Abcde123! ')).toBe(false);
    });
    it('should return false if password contains only letters or only numbers', () => {
      expect(PASSWORD_REGEX.test('Abcdefgh')).toBe(false);
      expect(PASSWORD_REGEX.test('12345678')).toBe(false);
    });
    it('should return false if password contains only special characters', () => {
      expect(PASSWORD_REGEX.test('!@#$%^&*')).toBe(false);
    });
  });
});
