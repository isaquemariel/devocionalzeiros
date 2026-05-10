import { useCallback, useRef } from 'react';

/**
 * Module-level lock set so the same action key cannot run concurrently
 * even across rapid re-mounts. Each entry expires after `cooldownMs`
 * once the action settles, blocking accidental double-clicks.
 */
const inFlight = new Set<string>();
const cooldown = new Map<string, number>();
const DEFAULT_COOLDOWN = 800;

export function isLocked(key: string) {
  if (inFlight.has(key)) return true;
  const until = cooldown.get(key);
  if (until && until > Date.now()) return true;
  if (until) cooldown.delete(key);
  return false;
}

/**
 * Run an async action exclusively for the given key.
 * Returns the action result, or `undefined` if it was blocked.
 */
export async function runLocked<T>(
  key: string,
  fn: () => Promise<T> | T,
  cooldownMs: number = DEFAULT_COOLDOWN,
): Promise<T | undefined> {
  if (isLocked(key)) return undefined;
  inFlight.add(key);
  try {
    return await fn();
  } finally {
    inFlight.delete(key);
    cooldown.set(key, Date.now() + cooldownMs);
  }
}

/**
 * Hook variant — keeps a stable instance id so anonymous keys
 * (e.g. one-off save buttons) won't collide with other components.
 */
export function useActionLock() {
  const idRef = useRef<string>(Math.random().toString(36).slice(2));
  const run = useCallback(
    <T,>(key: string, fn: () => Promise<T> | T, cooldownMs?: number) =>
      runLocked(`${idRef.current}:${key}`, fn, cooldownMs),
    [],
  );
  return { run, runLocked };
}
