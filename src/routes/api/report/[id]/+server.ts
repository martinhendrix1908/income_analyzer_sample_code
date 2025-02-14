import { API_KEY, SERVER_URL } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, locals }) => {

    const id: string = (params as { id: string }).id;
    if (!id || id === "undefined") {
        return json(
            {
                success: false,
                data: "NotFound",
            },
            { status: 200 }
        );
    }
    let status: string = "Processing";
    const terminationStatus = ["Completed", "Error", "NotFound"];

    const startTime = Date.now();
    const timeout = 2 * 60 * 1000; // 2 minutes in milliseconds

    // AbortController to cancel all pending fetch calls
    const abortController = new AbortController();

    const checkStatus = async () => {
        try {
            const res = await fetchProcessingResult(id, locals, abortController.signal);
            if (res.success) {
                status = res.data as string;
            }
        } catch (err: any) {
            if (err.name === "AbortError") {
                console.log("Fetch aborted due to termination condition.");
            } else {
                console.error("Fetch error:", err);
            }
        }
    };

    while (!terminationStatus.includes(status) && Date.now() - startTime < timeout) {
        checkStatus();

        // Wait 5 seconds before the next iteration
        await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    // Terminate any pending API calls once a termination condition is met
    abortController.abort();

    return json(
        {
            success: status === "Completed" || false,
            data: status,
        },
        { status: 200 }
    );
}

async function fetchProcessingResult(id: string, locals: App.Locals, signal: AbortSignal) {
    try {
        const response = await fetch(
            `${SERVER_URL}/TransDetails/GetProcessingResults?rid=${id}&product=Incomes`,
            {
                method: "POST",
                headers: {
                    authorization: `bearer ${locals.user.authToken}`,
                    "Content-Type": "application/json",
                    "Ocp-Apim-Subscription-Key": API_KEY,
                },
                signal,
            }
        );
        const res = await response.json();
        return {
            success: true,
            data: res?.processingResult?.status,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
}
