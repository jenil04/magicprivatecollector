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

      console.log(tokenAddressTokenId);
      console.log(chainId);
     
      const nft = await getNFTById(tokenAddressTokenId, chainId, event.queryStringParameters?.address ? event.queryStringParameters?.address : undefined);
      console.log(nft);

      if (nft !== null) {
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
  chainId: string,
  address?: string,
): Promise<NFT | null> => {
  
  const queryInput: DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.MPC_NFT_TABLE as string,
    KeyConditionExpression: "tokenAddressTokenId = :tokenAddressTokenId AND chainId = :chainId",
    ExpressionAttributeValues: {
      ":tokenAddressTokenId": tokenAddressTokenId.toLowerCase(),
      ":chainId": chainId,
    },
  };

  const nfts = await dynamodbQueryCall(queryInput);

  const nftsArray = nfts && nfts.Items ? (nfts.Items as Array<NFT>) : [];

  if (nftsArray.length > 0) {
    // parse metadata
    const parsedNFTs = parseMetadata(nftsArray);

    // check if someone owns it
    if(address && await ownerOfNFT(tokenAddressTokenId, address)) {
      parsedNFTs[0].isOwner = true;
    } else {
      parsedNFTs[0].isOwner = false;
    }

    return parsedNFTs[0];
  }

    return null;

};


export const ownerOfNFT = async (
  tokenAddressTokenId: string,
  address: string,
): Promise<boolean> => {

  const queryInput: DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.MPC_ADDRESS_TABLE as string,
    KeyConditionExpression: "tokenAddressTokenId = :tokenAddressTokenId AND address = :address",
    ExpressionAttributeValues: {
      ":tokenAddressTokenId": tokenAddressTokenId.toLowerCase(),
      ":address": address.toLowerCase(),
    },
  };

  const owners = await dynamodbQueryCall(queryInput);

  const ownersArray = owners && owners.Items ? (owners.Items as Array<Ownership>) : [];

  if (ownersArray.length > 0) {
    return true;
  }

  return false;
}