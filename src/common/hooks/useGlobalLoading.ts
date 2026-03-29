import type { RootState } from '@/app/model/store.ts'
import { useSelector } from 'react-redux'
 
export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // Получаем все активные запросы из RTK Query API
    const queries = Object.values(state.movieApi.queries || {})

 
    // Проверяем, есть ли активные запросы (статус 'pending')
    const hasActiveQueries = queries.some(query => query?.status === 'pending')

 
    return hasActiveQueries 
  })
}