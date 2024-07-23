import type { APIRoute } from "astro";
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {

    await request.json().then(data => {
        if (!data) {
            return new Response(
                JSON.stringify({
                    message: "OH NOES",
                }), { status: 400 }
            )
        }
    });
    // Validate the data 
    // if (!data) {
    //     return new Response(
    //         JSON.stringify({
    //             message: "Missing required fields",
    //         }),
    //         { status: 400 }
    //     );
    // }
    // Booking logic here, then return success
    return new Response(
        JSON.stringify({
            message: "Booking submitted successfully"
        }),
        { status: 200 }
    );
};