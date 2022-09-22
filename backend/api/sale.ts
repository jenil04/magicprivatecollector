import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import apiReturn from "../utils/apiReturn";
import { DynamoDB } from "aws-sdk";
import { dynamodbPut } from "../utils/dynamodb";
import { getNFTById } from "./nft";
import { NFT } from "../../types/NFT";

/**
 * Sell NFT
 *
 */
export const saleApi = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {

        const eventBody = event.body as string;
        const saleObj = JSON.parse(eventBody);

        if (!saleObj.tokenAddressTokenId || !saleObj.chainId || !saleObj.buyer) {
            return apiReturn(500, 'error');
        }

        // get item

        const nft = await getNFTById(saleObj.tokenAddressTokenId, saleObj.chainId);

        if (nft !== null) {


            const item: NFT = {
                ...nft,
                metadata: JSON.stringify(nft.metadata),
                availableSupply: nft.availableSupply - 1,
            };

            const nftParams: DynamoDB.DocumentClient.PutItemInput = {
                TableName: process.env.MPC_NFT_TABLE as string,
                Item: item,
            };

            // insert new NFT
            await dynamodbPut(nftParams);

            const addressItem = {
                tokenAddressTokenId: nft.tokenAddressTokenId,
                address: saleObj.buyer,
                amount: 1
            }

            const addressParams: DynamoDB.DocumentClient.PutItemInput = {
                TableName: process.env.MPC_ADDRESS_TABLE as string,
                Item: addressItem,
            };

            // insert owner and amount
            await dynamodbPut(addressParams);

            return apiReturn(200, 'done');
        }

        return apiReturn(500, 'something went wrong');
        
    } catch (error) {
        return apiReturn(500, error);
    }
};
