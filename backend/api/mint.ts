import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import apiReturn from "../utils/apiReturn";
import { DynamoDB } from "aws-sdk";
import { dynamodbPut } from "../utils/dynamodb";
import { NFT } from "../../types/NFT";

/**
 * Mint a private NFT
 *
 */
export const mintApi = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {

    console.log(event);
    const eventBody = event.body as string;
    const mintObj = JSON.parse(eventBody);

    console.log(mintObj);

    const item: NFT = {...mintObj, tokenAddressTokenId: `${mintObj.tokenAddress}_${mintObj.tokenId}`};

    console.log(item);

    // if (!mintObj.nickname) {
    //   return apiReturn(500, "nickname is missing");
    // }

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: process.env.MPC_TABLE as string,
      Item: item,
    };
  
    const newNFT = await dynamodbPut(params);

    return apiReturn(200, newNFT);
  } catch (error) {
    return apiReturn(500, error);
  }
};
