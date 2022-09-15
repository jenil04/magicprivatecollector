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

    const item: NFT = {
      ...mintObj, 
      chainId: mintObj.chainId.toString(),
      metadata: JSON.stringify(mintObj.metadata),
      tokenAddressTokenId: `${mintObj.tokenAddress}_${mintObj.tokenId}`
    };

    console.log(item);

    const nftParams: DynamoDB.DocumentClient.PutItemInput = {
      TableName: process.env.MPC_NFT_TABLE as string,
      Item: item,
    };
  
    await dynamodbPut(nftParams);

    const addressItem = {
      tokenAddressTokenId: `${mintObj.tokenAddress}_${mintObj.tokenId}`,
      address: mintObj.owner,
      amount: mintObj.amount
    }

    const addressParams: DynamoDB.DocumentClient.PutItemInput = {
      TableName: process.env.MPC_ADDRESS_TABLE as string,
      Item: addressItem,
    };
  
    dynamodbPut(addressParams);

    return apiReturn(200, 'done');
  } catch (error) {
    return apiReturn(500, error);
  }
};
