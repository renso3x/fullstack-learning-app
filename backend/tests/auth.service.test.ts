import { authService } from '../src/services/auth.service';

describe('Auth Service', () => {
  it('should register a new user', async () => {
    const result = await authService.register(
      'Romeo',
      'test@example.com',
      'secret123'
    );

    expect(result.user.email).toBe('test@example.com');
  });

  it('should login successfully', async () => {
    await authService.register('LoginUser', 'login@test.com', 'password123');
    const result = await authService.login('login@test.com', 'password123');
    expect(result.token).toBeDefined();
  });
});
