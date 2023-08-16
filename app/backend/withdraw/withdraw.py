import boto3
import botocore.exceptions
import json

USER_POOL_ID = 'ap-northeast-2_nriSIXluH'
REGION = 'ap-northeast-2'

def lambda_handler(event, context):
    
    header = event['headers']['Authorization']
    
    #액세스 토큰 추출
    access_token = header.split(' ')[1]
    client = boto3.client('cognito-idp', region_name=REGION)

    #토큰으로 유저 정보 가져오기
    response = client.get_user(
        AccessToken=access_token
    )
    #id 추출
    username = response['Username']

    db = boto3.client('dynamodb')

    try:
        #PK data 추출
        response = db.query(
            TableName='team3-icn-planner-table',
            KeyConditionExpression='ID = :pk',
            ExpressionAttributeValues={
                ':pk': {'S': username}
            }
        )
        
        #해당 pk data 삭제
        for item in response['Items']:
            db.delete_item(
                TableName='team3-icn-planner-table',
                Key={
                    'ID': {'S': username},
                    'DATE': item['DATE']
                }
            )
            
            
        #user list delete
        response = client.admin_delete_user(
            UserPoolId=USER_POOL_ID,
            Username = username
        )

        
        return {
            'statusCode': 200,
            'body': json.dumps('회원탈퇴 성공')
        }
    except botocore.exceptions.ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps('회원탈퇴 실패'+ str(e.response['Error']['Message']))
        }
