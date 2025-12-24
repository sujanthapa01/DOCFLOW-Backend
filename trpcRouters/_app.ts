import {router} from "../trpc/trpc"
import {greet} from "./greeting.trpcRouter"
import {mathRoute} from "./math.trpcRouter"
import {aiChatProcedure} from "../trpcRouters/aiChat.trpc"

export const appRouter = router({
 greet,
 math: mathRoute,
 aiChat: aiChatProcedure


})

export type AppRouter = typeof appRouter