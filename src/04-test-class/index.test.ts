// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(300);
    expect(bankAccount.getBalance()).toBe(300);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(300);
    expect(() => bankAccount.withdraw(500)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(300);
    expect(() => bankAccount.withdraw(500)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(300);
    expect(() => bankAccount.transfer(500, bankAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(300);
    expect(bankAccount.deposit(200).getBalance()).toBe(500);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(300);
    expect(bankAccount.withdraw(200).getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const  bankAccount1 = getBankAccount(300);
    const  bankAccount2 = getBankAccount(100);
    expect(bankAccount1.transfer(200, bankAccount2).getBalance()).toBe(100);
    expect(bankAccount2.getBalance()).toBe(300);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(300);
    const fetchBalance = await bankAccount.fetchBalance();
    if(fetchBalance) {
      expect(typeof fetchBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(300);
    bankAccount.fetchBalance = jest.fn().mockResolvedValueOnce(100);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(100);
    }
  );

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(300);
    bankAccount.fetchBalance = jest.fn().mockResolvedValueOnce(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});

