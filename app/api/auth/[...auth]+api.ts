import { auth } from "@/utils/auth";

const handler = auth.handler;
export { handler as GET, handler as POST };
