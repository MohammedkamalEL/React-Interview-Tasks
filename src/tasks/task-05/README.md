# Task 05: useEffect Missing Dependency

## The Issue

When a `useEffect` hook uses variables (props, state, functions) but doesn't include them in its dependency array, the effect will use stale values and won't re-run when those values change.

## Why It Happens

### The Exhaustive-Deps Rule

React's ESLint plugin has a rule called `exhaustive-deps` that warns you when dependencies are missing:

```jsx
useEffect(() => {
  doSomething(value); // Uses 'value'
}, []); // ⚠️ Warning: missing dependency 'value'
```

### Why Dependencies Matter

`useEffect` runs when its dependencies change. If you don't list a dependency:

- The effect won't re-run when that value changes
- The effect will use the value from when it was first created (stale closure)

```jsx
const [count, setCount] = useState(0);
const [multiplier, setMultiplier] = useState(2);

useEffect(() => {
  const result = count * multiplier;
  console.log(result);
}, [count]); // Missing 'multiplier'!

// When multiplier changes from 2 to 3:
// - Effect doesn't re-run
// - Still uses multiplier = 2
// - Result is wrong!
```

## How to Fix It

### Include All Dependencies

```jsx
// FIXED
useEffect(() => {
  const result = count * multiplier;
  setResult(result);
}, [count, multiplier]); // All dependencies included
```

### What to Include

Include any value from the component scope that the effect uses:

- **State variables**: `count`, `user`, `items`
- **Props**: `userId`, `onUpdate`, `config`
- **Functions**: `fetchData`, `handleClick`
- **Derived values**: `const doubled = count * 2`

### What NOT to Include

Don't include:

- **setState functions**: `setCount`, `setUser` (stable references)
- **Refs**: `myRef.current` (mutable, doesn't trigger re-renders)
- **Constants**: Values defined outside the component
- **Functions from hooks**: `dispatch` from useReducer, `navigate` from useRouter

## Common Patterns

### API Calls with Parameters

```jsx
// ❌ WRONG
useEffect(() => {
  fetchUser(userId); // Uses userId
}, []); // Missing userId!

// ✅ CORRECT
useEffect(() => {
  fetchUser(userId);
}, [userId]); // Re-fetch when userId changes
```

### Using Props

```jsx
// ❌ WRONG
function Component({ onUpdate, data }) {
  useEffect(() => {
    onUpdate(data); // Uses both
  }, [data]); // Missing both!

  // ✅ CORRECT
  useEffect(() => {
    onUpdate(data);
  }, [onUpdate, data]); // Include all props used
}
```

### Functions as Dependencies

```jsx
// ⚠️ PROBLEM: Function recreated every render
function Component() {
  const fetchData = () => {
    // fetch logic
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Runs every render!

  // ✅ SOLUTION 1: Move function inside effect
  useEffect(() => {
    const fetchData = () => {
      // fetch logic
    };
    fetchData();
  }, []); // No external dependencies

  // ✅ SOLUTION 2: Use useCallback
  const fetchData = useCallback(() => {
    // fetch logic
  }, []); // Stable reference

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Only runs when fetchData changes
}
```

### Conditional Dependencies

```jsx
// ❌ WRONG: Can't conditionally use hooks
if (condition) {
  useEffect(() => {
    // ...
  }, []);
}

// ✅ CORRECT: Condition inside effect
useEffect(() => {
  if (condition) {
    // ...
  }
}, [condition]); // Include condition as dependency
```

## The Corrected Code

```jsx
function Calculator() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);
  const [result, setResult] = useState(0);

  // Include all used variables
  useEffect(() => {
    const calculated = count * multiplier;
    setResult(calculated);
  }, [count, multiplier]); // ✅ Complete dependency array

  return (
    <div>
      <h3>
        {count} × {multiplier} = {result}
      </h3>
    </div>
  );
}
```

## Handling Complex Dependencies

### Object/Array Dependencies

```jsx
// ⚠️ PROBLEM: New object every render
const config = { url, method }; // New object reference

useEffect(() => {
  fetch(config.url, { method: config.method });
}, [config]); // Runs every render!

// ✅ SOLUTION: Depend on primitives
useEffect(() => {
  fetch(url, { method });
}, [url, method]); // Only re-run when these change
```

### useMemo for Stable References

```jsx
const config = useMemo(() => ({ url, method }), [url, method]); // Stable reference when url/method don't change

useEffect(() => {
  fetch(config.url, { method: config.method });
}, [config]); // Only runs when config actually changes
```

## Key Takeaways

- **Include all dependencies** that the effect uses
- **React's ESLint rule** helps catch missing dependencies
- **Missing dependencies** cause stale closures
- **setState functions** don't need to be included
- **Functions as dependencies** often need `useCallback`
- **Objects/arrays** as dependencies can cause extra runs
- **Trust the linter** - it's usually right!

## When to Ignore the Rule

Very rarely, you might intentionally want stale values:

```jsx
useEffect(() => {
  // Intentionally only run once on mount
  logInitialValue(count);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // Explicitly ignore the rule
```

But this is almost always a code smell. Consider if you really need this.

## Further Reading

- [React Docs: useEffect Dependencies](https://react.dev/reference/react/useEffect#specifying-reactive-dependencies)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [ESLint exhaustive-deps rule](https://github.com/facebook/react/issues/14920)
