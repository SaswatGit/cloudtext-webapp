import { getCurrentTimeMs } from "./getCurrentTime";

export function getExpireTime(ttl_seconds, req) {
    const now = getCurrentTimeMs(req);
    if (ttl_seconds > 0) {
        return new Date(now + ttl_seconds * 1000);
    }
    return null;
}