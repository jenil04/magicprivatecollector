
export interface Metadata {
    image: string;
    name: string;
    description: string;
    externalUrl: string;
    private: {
        url: string;
        name: string;
        description: string;
    }
}


/**
 * NFT
 */
export interface NFT {
    // unique identifier for dynamoDB, gets generated on our lambda
    tokenAddressTokenId?: string;
    tokenAddress: string;
    tokenId: string;
    totalSupply: number;
    availableSupply: number;
    price: number;
    chainId: number;
    chainName: string;
    owner: string;
    contractType: string;
    name: string;
    uri: string;
    metadata: Metadata | string;
}


