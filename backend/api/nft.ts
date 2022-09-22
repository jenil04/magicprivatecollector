import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import apiReturn from "../utils/apiReturn";
import { parseMetadata } from "../utils/parseMetadata";
import { orderByOwned } from "../utils/orderByOwned";
import { DynamoDB } from "aws-sdk";
import { dynamodbQueryCall, dynamodbScanCall } from "../utils/dynamodb";
import { NFT } from "../../types/NFT";
import { Ownership } from "../../types/Ownership";
/**
 * Get NFT by chainId, tokenAddress and tokenId
 */
export const nftApi = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {

    if (event.queryStringParameters?.tokenId && event.queryStringParameters?.tokenAddress && event.queryStringParameters?.chainId) {

      const tokenAddressTokenId = `${event.queryStringParameters?.tokenAddress}_${event.queryStringParameters?.tokenId}`;
      const chainId = event.queryStringParameters.chainId;

      const nft = await getNFTById(tokenAddressTokenId, chainId);

      if(!nft === null) {
        return apiReturn(200, nft);
      }
      else {
        return apiReturn(404, 'empty');
      }

    }

    return apiReturn(404, 'empty');

  } catch (error) {
    return apiReturn(500, error);
  }
};


export const getNFTById = async (
  tokenAddressTokenId: string,
  chainId: string
): Promise<NFT | null> => {
  
  const queryInput: DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.MPC_NFT_TABLE as string,
    KeyConditionExpression: "tokenAddressTokenId = :tokenAddressTokenId AND chainId = :chainId",
    ExpressionAttributeValues: {
      ":tokenAddressTokenId": tokenAddressTokenId,
      ":chainId": chainId,
    },
  };

  const nfts = await dynamodbQueryCall(queryInput);

  const nftsArray = nfts && nfts.Items ? (nfts.Items as Array<NFT>) : [];

  if (nftsArray.length > 0) {
    // parse metadata
    const parsedNFTs = parseMetadata(nftsArray);
    return parsedNFTs[0];
  }

    return null;

};
