type MemoizedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T>;
  clearCache: () => void;
};

function memoize<T extends (...args: any[]) => any>(func: T): MemoizedFunction<T> {
  const cache: Map<string, ReturnType<T>> = new Map();

  const memoizedFunc: MemoizedFunction<T> = (...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);

    return result;
  };

  memoizedFunc.clearCache = () => {
    cache.clear();
  };

  return memoizedFunc;
}

// Here is the result of execution of this function.

function doubling(n: number): number {
  // Simulating a time-consuming operation
  console.log('Doubled value: ');
  return n * 2;
}

const memoized = memoize(doubling);

console.log(memoized(5)); // Doubled value: 10
console.log(memoized(5)); // 10 (cached result)

console.log(memoized(10)); // Doubled value: 20
console.log(memoized(10)); // 20 (cached result)

memoized.clearCache();

console.log(memoized(5)); // Doubled value: 10
