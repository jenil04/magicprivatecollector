import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import apiReturn from "../utils/apiReturn";
import { parseMetadata } from "../utils/parseMetadata";
import { orderByOwned } from "../utils/orderByOwned";
import { DynamoDB } from "aws-sdk";
import { dynamodbQueryCall, dynamodbScanCall } from "../utils/dynamodb";
import { NFT } from "../../types/NFT";
import { Ownership } from "../../types/Ownership";
/**
 * Get a list of NFTs minted on our platform
 * Returns two arrays (all NFTs minted and all NFTs belonging to a user)
 */
export const nftsApi = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {

    // get all nfts and remove the ones this user owns
    const scanInput: DynamoDB.DocumentClient.ScanInput = {
      TableName: process.env.MPC_NFT_TABLE as string
    };

    const allNFTs = await dynamodbScanCall(scanInput);

    const allNFTsArray = allNFTs && allNFTs.Items ? (allNFTs.Items as Array<NFT>) : [];
    
    
    // parse metadata
    const parsedNFTs = parseMetadata(allNFTsArray);
    
    // get all nfts this user owns
    if (event.queryStringParameters?.address) {
      const address = event.queryStringParameters?.address.toLowerCase();

      const queryInput: DynamoDB.DocumentClient.QueryInput = {
        TableName: process.env.MPC_ADDRESS_TABLE as string,
        KeyConditionExpression: "address = :address",
        ExpressionAttributeValues: {
            ":address": address,
          },
      };

      const ownedNFTs = await dynamodbQueryCall(queryInput);

      const ownedNFTsArray = ownedNFTs && ownedNFTs.Items ? (ownedNFTs.Items as Array<Ownership>) : [];
     
      return apiReturn(200, orderByOwned(parsedNFTs, ownedNFTsArray));
      
    } else {

        return apiReturn(200, {
          notOwned: parsedNFTs,
          owned: [],
        });
    }

    
  } catch (error) {
    return apiReturn(500, error);
  }
};
