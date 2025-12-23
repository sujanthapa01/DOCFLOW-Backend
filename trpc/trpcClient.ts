import {AppRouter} from "../trpcRouters/_app"
import {httpBatchLink, createTRPCProxyClient} from "@trpc/client"
export const trpcClient = createTRPCProxyClient<AppRouter>({
                links : [
                    httpBatchLink({
                        url : `http://localhost:${process.env.PORT}/trpc`,
                        fetch: globalThis.fetch
                    })
                ]
            })