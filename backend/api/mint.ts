import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import apiReturn from "../utils/apiReturn";
import { DynamoDB } from "aws-sdk";
import { dynamodbPut } from "../utils/dynamodb";

/**
 * Mint a private NFT
 *
 */
export const mintApi = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const eventBody = event.body as string;
    const mintObj = JSON.parse(eventBody);

    // if (!mintObj.nickname) {
    //   return apiReturn(500, "nickname is missing");
    // }

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: process.env.WIZARD_TABLE as string,
      Item: mintObj,
    };
  
    const newNFT = await dynamodbPut(params);

    return apiReturn(200, newNFT);
  } catch (error) {
    return apiReturn(500, error);
  }
};
