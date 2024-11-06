import { test, expect } from '@playwright/test';
import { DataHelper } from '../helpers/DataHelper';

test.describe('DataHelper Unit Tests', () => {
  test('should fetch all data successfully', async () => {
    const data = await DataHelper.fetchAllData();
    
    expect(data).toHaveProperty('about');
    expect(data).toHaveProperty('skills');
    expect(data).toHaveProperty('projects');
    expect(data).toHaveProperty('experience');
    expect(data).toHaveProperty('certificates');
  });
});