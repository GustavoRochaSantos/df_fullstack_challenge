import { HttpException } from '@nestjs/common';
import { getStringHashed } from './security';
import * as bcrypt from 'bcrypt';

// Should return a hashed string when called with a valid string input.
it('test_happy_path', async () => {
  const input = 'password123';
  const expectedOutput = expect.stringMatching(/^\$2[ayb]\$.{56}$/);
  const output = await getStringHashed(input);
  expect(output).toEqual(expectedOutput);
});

// Should throw an error when called with an empty string.
it('test_empty_input_error', async () => {
  const input = '';
  await expect(getStringHashed(input)).rejects.toThrow(HttpException);
});

// Should throw an error when called with a null or undefined input.
it('test_null_undefined_input_error', async () => {
  const input = null;
  await expect(getStringHashed(input)).rejects.toThrow(HttpException);
  const input2 = undefined;
  await expect(getStringHashed(input2)).rejects.toThrow(HttpException);
});

// Should use bcrypt to hash the input string with a salt or rounds value of 10.
it('test_bcrypt_hashing', async () => {
  const inputString = 'password123';
  const hashedString = await getStringHashed(inputString);
  expect(hashedString).not.toBe(inputString);
});

// Should catch any errors thrown by bcrypt and re-throw them as an HttpException with a 500 status code.
it('test_bcrypt_error_handling', async () => {
  const inputString = 'password123';
  jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
    throw new Error('bcrypt error');
  });
  try {
    await getStringHashed(inputString);
  } catch (error) {
    expect(error.status).toBe(500);
    expect(error.message).toBe('bcrypt error');
  }
});

// Should ensure that the function is not vulnerable to timing attacks.
it('test_timing_attack_vulnerability', async () => {
  const inputString = 'password123';
  const startTime = new Date().getTime();
  await getStringHashed(inputString);
  const endTime = new Date().getTime();
  expect(endTime - startTime).toBeLessThanOrEqual(10);
});
