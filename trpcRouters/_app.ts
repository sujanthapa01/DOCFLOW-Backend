import {router} from "../trpc/trpc"
import {greet} from "./greeting.trpcRouter"
import {mathRoute} from "./math.trpcRouter"

export const appRouter = router({
 greet,
 math: mathRoute


})

export type AppRouter = typeof appRouter