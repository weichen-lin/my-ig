import { useState, useCallback, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

type API<T, V> = (params: T) => Promise<AxiosResponse<V, any>>

interface Error {
  error: string
}

export default function useFetch<T, V>(
  api: API<T, V>,
  props?: {
    onSuccess?: (e: any) => void
    onError?: (e: any) => void
    needInitialRun?: boolean
  }
) {
  const [data, setData] = useState<V | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [refreshControl, setRefreshControl] = useState<boolean>(false)
  const [needRefresh, setNeedRefresh] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const run = (params: T) => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await api(params)
        setData(res.data)
        props?.onSuccess && props.onSuccess(res.data)
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data)
        } else {
          setError({ error: 'something wrong' })
        }

        props?.onError && props.onError(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }

  const refresh = useCallback(() => {
    setNeedRefresh(true)
    setRefreshControl((prev) => !prev)
  }, [])

  useEffect(() => {
    if (props?.needInitialRun || needRefresh) {
      run({} as T)
      if (needRefresh) setNeedRefresh(false)
    }
  }, [refreshControl])

  return { data, error, isLoading, run, refresh }
}
