import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PlannerData')  # 여기에 테이블 이름을 적절히 변경해야 합니다.

def lambda_handler(event, context):
    try:
        event_data = json.loads(event['body'])
        response = table.put_item(Item = event_data) # DynamoDB 테이블에 데이터 추가
        return {
            'statusCode': 200,
            'body': json.dumps('Event created successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error creating event: ' + str(e))
        }
