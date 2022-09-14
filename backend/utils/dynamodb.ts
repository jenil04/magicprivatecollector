import { DynamoDB } from "aws-sdk";

// configure and connect dynamodb client
interface DynamoDBConfig {
  apiVersion: string;
  region?: string;
  endpoint?: string;
}

const params: DynamoDBConfig = {
  apiVersion: "2012-08-10",
};

if (process.env.STAGE === "local") {
  params.region = process.env.LOCAL_REGION;
  params.endpoint = process.env.LOCAL_ENDPOINT;
}

export const dbClient = new DynamoDB.DocumentClient(params);

export const dynamodbQueryCall = async (
  queryInput: DynamoDB.DocumentClient.QueryInput,
): Promise<DynamoDB.DocumentClient.QueryOutput> => {
  const result: DynamoDB.DocumentClient.QueryOutput = await dbClient
    .query(queryInput)
    .promise();
  return result;
};

export const dynamodbScanCall = async (
  scanInput: DynamoDB.DocumentClient.ScanInput,
): Promise<DynamoDB.DocumentClient.ScanOutput> => {
  const result: DynamoDB.DocumentClient.ScanOutput = await dbClient
    .scan(scanInput)
    .promise();
  return result;
};

export const dynamodbPut = async (
  input: DynamoDB.DocumentClient.PutItemInput,
): Promise<DynamoDB.DocumentClient.PutItemOutput> => dbClient.put(input).promise();


export const dynamodbUpdate = async (
  input: DynamoDB.DocumentClient.UpdateItemInput,
): Promise<DynamoDB.DocumentClient.UpdateItemOutput> => dbClient.update(input).promise();
