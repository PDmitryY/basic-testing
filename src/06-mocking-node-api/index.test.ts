// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 500);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 500);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 500);
    expect(callback).not.toBeCalled;
    jest.runAllTimers;
    expect(callback).toBeCalled;
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 500);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 200);
    expect(callback).not.toBeCalled;
    jest.advanceTimersByTime(1000);
    expect(callback).toBeCalled;
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('file.txt');
    expect(joinSpy).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously('file.txt')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
