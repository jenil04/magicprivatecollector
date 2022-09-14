import { APIGatewayProxyResult } from "aws-lambda";

/**
 * api Return
 */
export default async (
    statusCode: number,
    body: any
): Promise<APIGatewayProxyResult> => ({
        statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
