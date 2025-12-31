import { dbConnect } from "@/db/db";
import Paste from "@/models/Paste";
import { getCurrentTimeMs } from "@/utils/getCurrentTime";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await dbConnect();
        const paste = await Paste.findOne({ pid: id });
        if (!paste) {
            return new Response(JSON.stringify({ error: "Paste not found" }), { status: 404 });
        }
        const expireTime = new Date(paste.expire_time);
        const now = getCurrentTimeMs(req);
        if (paste.expire_time && now > expireTime) {
            return new Response(JSON.stringify({ error: "Paste has been expired!" }), { status: 404 });
        }
        if (paste.max_views > 0 && paste.remaining_views <= 0) {
            return new Response(JSON.stringify({ error: "Max view count reached!" }), { status: 404 });
        }
        if (paste.max_views > 0) {
            paste.remaining_views -= 1;
            await paste.save();
        }
        return new Response(JSON.stringify({ content: paste.content, remaining_views: paste.remaining_views, expires_at: paste.expire_time }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }

}