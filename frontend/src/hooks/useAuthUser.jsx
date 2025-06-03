import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useAuthUser = () => {
    const queryClient = useQueryClient();
    const { data: authUser, isLoading } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.error) return null;
                if (!res.ok || data.error) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        retry: false,
    });
    const invalidateAuthUser = queryClient.invalidateQueries.bind(queryClient, {
        queryKey: ["authUser"],
    });
    return { authUser, isLoading, invalidateAuthUser };
};
