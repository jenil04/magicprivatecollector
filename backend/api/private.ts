import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import apiReturn from "../utils/apiReturn";
import { NFT } from "../../types/NFT";
import { ethers } from "ethers";
import { getNFTById } from "./nft";

/**
 * Show private NFT
 *
 */
export const privateApi = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {


        const eventBody = event.body as string;
        const txObj = JSON.parse(eventBody);


        if (txObj.tx && txObj.address && txObj.tokenAddress && txObj.tokenId) {

            const quicknodeProvider = process.env.QUICKNODE_PROVIDER;
            const apiKey = process.env.QUICKNODE_APIKEY;

            const provider = new ethers.providers.JsonRpcProvider(`${quicknodeProvider}/${apiKey}`);

            // check if transaction is on the blockchain
            const txInfo = await provider.send("eth_getTransactionByHash", [
                txObj.tx,
            ]);
            console.log(txInfo);

            // check if transaction is from this address
            if (txInfo.from === txObj.address) {

                // return private content
                const tokenAddressTokenId = `${txObj.tokenAddress}_${txObj.tokenId}`;
                const chainId = "37";

                return apiReturn(200, await getNFTById(tokenAddressTokenId, chainId, txObj.address));

            } else {
                return apiReturn(405, 'not allowed');
            }

        }


        return apiReturn(200, 'done');
    } catch (error) {
        return apiReturn(500, error);
    }
};
