import {IAsyncResult} from "@/types/use-async";
import {useCallback, useEffect, useState} from "react";
import {AsyncResult} from "@/providers/async-result";

export default function useAsync<T = any>(asyncFunction: () => Promise<T>, immediate = true): IAsyncResult<T> {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<T | null>( null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      setResult(await asyncFunction());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }

  }, [asyncFunction])

  useEffect(() => {
    if (immediate)
      execute();
  }, [immediate])

  return new AsyncResult<T>(execute, error, loading, result);
}