/**
 * qdrant client
 */

import { QdrantClient } from "@qdrant/js-client-rest"

export const client = new QdrantClient({ host: "localhost", port: 6333 });