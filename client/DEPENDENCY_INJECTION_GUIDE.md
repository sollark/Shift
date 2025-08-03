# Dependency Injection Refactoring Guide

## What is Dependency Injection Anti-Pattern?

**Anti-Pattern**: When a service or module directly imports and uses other services/stores, creating tight coupling and making testing/maintenance difficult.

**Solution**: Pass dependencies as parameters (functions, objects) instead of hard-coding imports.

---

## The Problem We Fixed

### ❌ BEFORE: Anti-Pattern (store.service.ts)

```typescript
// store.service.ts - BAD: Direct store manipulation from service layer
import useAccountStore from "@/stores/accountStore";
import useAuthStore from "@/stores/tokenStore";
import useProfileStore from "@/stores/userStore";

// Anti-pattern: Service directly manipulates stores
function saveAccount(account: Account) {
  const { setStatus, setRole } = useAccountStore.getState();
  const { setProfile } = useProfileStore.getState();

  setStatus(account.status);
  setRole(account.role);
  setProfile(account.profile);
}

// Anti-pattern: Service directly manipulates stores
function clearStoreStates() {
  useAccountStore.getState().clearAccount();
  useProfileStore.getState().clearProfile();
  useAuthStore.getState().clearToken();
}
```

```typescript
// auth.service.ts - BAD: Hard-coded dependency
import { storeService } from "./store.service";

async function signIn(email: string, password: string) {
  const response = await httpService.post("auth/signin", { email, password });

  if (response?.success) {
    // Hard-coded dependency - tight coupling
    storeService.saveAccessToken();
    await accountService.getAccount();
  }
}
```

### ✅ AFTER: Dependency Injection Pattern

```typescript
// useAppState.ts - GOOD: Hook-based state management
export function useAppState() {
  const accountActions = useAccountStore((state) => ({
    setStatus: state.setStatus,
    setRole: state.setRole,
    clearAccount: state.clearAccount,
  }));

  const saveAccount = useCallback(
    (account: Account) => {
      accountActions.setStatus(account.status);
      accountActions.setRole(account.role);
      profileActions.setProfile(account.profile);
    },
    [accountActions, profileActions]
  );

  return { saveAccount, saveAccessToken, clearAllStates };
}
```

```typescript
// auth.service.ts - GOOD: Accepts callbacks as dependencies
async function signIn(
  email: string,
  password: string,
  onTokenSave?: (token: string) => void, // ✅ Injected dependency
  onAccountSave?: (account: Account) => void // ✅ Injected dependency
) {
  const response = await httpService.post("auth/signin", { email, password });

  if (response?.success) {
    // Use injected callbacks instead of hard-coded dependencies
    onTokenSave?.(response.data.accessToken);
    await accountService.getAccount(onAccountSave);
  }
}
```

---

## Key Benefits

| Aspect          | Before (Anti-Pattern)                 | After (Dependency Injection)      |
| --------------- | ------------------------------------- | --------------------------------- |
| **Coupling**    | Tight - service knows about stores    | Loose - service accepts callbacks |
| **Testing**     | Hard - must mock entire stores        | Easy - just pass test callbacks   |
| **Reusability** | Low - tied to specific stores         | High - works with any callbacks   |
| **Maintenance** | Difficult - changes affect many files | Easy - isolated changes           |

---

## Implementation Pattern

### 1. For React Components (Use Hooks)

```typescript
// ✅ Component usage with dependency injection
function SignInForm() {
  const { saveAccessToken, saveAccount } = useAppState();

  const handleSubmit = async (email: string, password: string) => {
    // Pass state management functions as dependencies
    await authService.signIn(email, password, saveAccessToken, saveAccount);
  };
}
```

### 2. For Non-React Contexts (Use Direct State Manager)

```typescript
// stateManager.ts - For axios interceptors, route guards, etc.
export const stateManager = {
  saveAccount: (account: Account) => {
    useAccountStore.getState().setStatus(account.status);
    useAccountStore.getState().setRole(account.role);
    useProfileStore.getState().setProfile(account.profile);
  },

  clearAllStates: () => {
    useAccountStore.getState().clearAccount();
    useProfileStore.getState().clearProfile();
    useAuthStore.getState().clearToken();
  },
};

// Usage in axios interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      stateManager.clearAllStates(); // ✅ Dependency injection
    }
  }
);
```

---

## Quick Implementation Checklist

### Step 1: Identify Anti-Patterns

- [ ] Services directly importing stores
- [ ] Hard-coded dependencies between modules
- [ ] Tight coupling between layers

### Step 2: Create Dependency Injection Interface

- [ ] Create hooks for React components (`useAppState`)
- [ ] Create state managers for non-React contexts (`stateManager`)
- [ ] Define clear callback interfaces

### Step 3: Refactor Services

- [ ] Replace hard-coded imports with callback parameters
- [ ] Add optional parameters with `?` for backward compatibility
- [ ] Use meaningful parameter names (`onSuccess`, `onTokenSave`, etc.)

### Step 4: Update Consumers

- [ ] Components: Use hooks and pass callbacks to services
- [ ] Non-React: Use state managers and pass callbacks
- [ ] Remove direct store imports from service files

---

## Common Patterns

### Service Function Signature Pattern

```typescript
// Pattern: (data, dependencies) => result
async function serviceFunction(
  // Business data first
  businessParam1: string,
  businessParam2: number,
  // Dependencies last (optional)
  onSuccess?: (result: SomeType) => void,
  onError?: (error: Error) => void
) {
  // Implementation
}
```

### Component Usage Pattern

```typescript
// Pattern: Extract callbacks from hooks, pass to services
function MyComponent() {
  const { saveData, clearData } = useAppState();

  const handleAction = async () => {
    await someService.performAction(
      "business-data",
      saveData, // ✅ Inject dependency
      clearData // ✅ Inject dependency
    );
  };
}
```

### Error Handling Pattern

```typescript
// Pattern: Handle both success and error cases
async function robustServiceCall() {
  const { saveData, showError } = useAppState();

  try {
    await someService.riskyOperation(
      data,
      saveData, // Success callback
      (error) => showError(error.message) // Error callback
    );
  } catch (error) {
    // Fallback error handling
  }
}
```

---

## Future Implementation Rules

1. **Never import stores directly in services** - Always use dependency injection
2. **Services should be pure** - No side effects, only return data and call callbacks
3. **Components manage state** - Use hooks to get state management functions
4. **Non-React contexts use state managers** - For interceptors, guards, utilities
5. **Test with mock callbacks** - Easy to test when dependencies are injected

This pattern makes your code more maintainable, testable, and follows the principle of inversion of control.
