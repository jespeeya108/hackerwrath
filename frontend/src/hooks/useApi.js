
import { useCallback, useEffect, useState } from "react";

export default function useApi(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result?.data ?? result);
      return result;
    } catch (err) {
      setError(err.message || "Something went wrong.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction();
        if (active) setData(result?.data ?? result);
      } catch (err) {
        if (active) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, dependencies);

  return { data, loading, error, refetch: execute };
}
