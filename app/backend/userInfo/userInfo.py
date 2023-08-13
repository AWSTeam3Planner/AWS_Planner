import boto3
import botocore.exceptions
import json

REGION = 'ap-northeast-2'

        
def lambda_handler(event, context):
    
    #헤더 추출
    header = event['headers']['Authorization']
    
    
    #액세스 토큰 추출출
    access_token = header.split(' ')[1]
    client = boto3.client('cognito-idp', region_name=REGION)

    try:
        response = client.get_user(
            AccessToken=access_token
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps(response)
            #{
                #"body": {
                #   \"Username\": \"alswns11346\",  <== response['Username']
                #   \"ResponseMetadata\": 
                #   {
                #   \"RequestId\": \"39a08729-3d61-4fdd-ac54-ea2120dca9b7\", 
                #   \"HTTPStatusCode\": 200, 
                #   \"HTTPHeaders\": 
                #   {
                #   \"date\": \"Thu, 10 Aug 2023 18:45:41 GMT\", 
                #   \"content-type\": \"application/x-amz-json-1.1\", 
                #   \"content-length\": \"197\",
                #   \"connection\": \"keep-alive\", 
                #   \"x-amzn-requestid\": \"39a08729-3d61-4fdd-ac54-ea2120dca9b7\"}, 
                #   \"RetryAttempts\": 0}
                #   }"   이런식으로 나와요
                #
            #}

        }
        
    except botocore.exceptions.ClientError as e:
        error_code = e.response['Error']['Code']
        print(f"An error occurred: {error_code}")
        return {
            'statusCode': 500,
            'body': 'failed'
        }