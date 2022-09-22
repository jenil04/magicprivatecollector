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

    
    const eventBody = event.body as string;
    const mintObj = JSON.parse(eventBody);

    const item: NFT = {
      ...mintObj, 
      tokenId: mintObj.tokenId.toLowerCase(),
      tokenAddress: mintObj.tokenAddress.toLowerCase(),
      owner: mintObj.owner.toLowerCase(),
      chainId: mintObj.chainId.toString(),
      metadata: JSON.stringify(mintObj.metadata),
      tokenAddressTokenId: `${mintObj.tokenAddress}_${mintObj.tokenId}`.toLowerCase()
    };

    const nftParams: DynamoDB.DocumentClient.PutItemInput = {
      TableName: process.env.MPC_NFT_TABLE as string,
      Item: item,
    };
  
    // insert new NFT
    await dynamodbPut(nftParams);

    const addressItem = {
      tokenAddressTokenId: `${mintObj.tokenAddress}_${mintObj.tokenId}`.toLowerCase(),
      address: mintObj.owner.toLowerCase(),
      amount: mintObj.totalSupply
    }

    const addressParams: DynamoDB.DocumentClient.PutItemInput = {
      TableName: process.env.MPC_ADDRESS_TABLE as string,
      Item: addressItem,
    };
  
    // insert owner and amount
    await dynamodbPut(addressParams);

    return apiReturn(200, 'done');
  } catch (error) {
    return apiReturn(500, error);
  }
};
