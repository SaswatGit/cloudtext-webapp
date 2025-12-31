import { dbConnect } from "@/db/db";
import Paste from "@/models/Paste";

export async function GET(req) {
    try {
        await dbConnect();
        const pastes = await Paste.find();
        if (!pastes) {
            return new Response(JSON.stringify({ error: "No pastes found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ pastes }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }

}