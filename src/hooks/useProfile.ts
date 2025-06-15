import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user'

export function useProfile(enabled?: boolean) {
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile(),
    refetchInterval: 1800000,
    enabled,
  })

  return {
    profile: data,
    isLoading,
    isSuccess,
    refetch,
  }
}
