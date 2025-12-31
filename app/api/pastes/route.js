import { dbConnect } from "@/db/db";
import Paste from "@/models/Paste";
import { getExpireTime } from "@/utils/getExpireTime";
import { v4 as uuidv4 } from 'uuid';


export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();
        const { content, ttl_seconds, max_views } = body;




        console.log("Content: ", content, "ttl_seconds: ", ttl_seconds, "max_views: ", max_views);

        if (!content) {
            return new Response(JSON.stringify({ error: "Content is required" }), { status: 400 });
        }

        const expire_time = getExpireTime(ttl_seconds, req);

        const newPaste = new Paste({
            pid: uuidv4(),
            content,
            ttl_seconds,
            max_views,
            expire_time
        });
        const savedPaste = await newPaste.save();
        const url = `${process.env.APP_URL}/p/${savedPaste.pid}`;
        return new Response(JSON.stringify({ id: savedPaste.pid, url }));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }

}