import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PlannerData')  # 여기에 테이블 이름을 적절히 변경해야 합니다.

def lambda_handler(event, context):
    try:
        event_id = event['queryStringParameters']['event_id']
        response = table.get_item(Key={'event_id': event_id})
        if 'Item' in response:
            return {
                'statusCode': 200,
                'body': json.dumps(response['Item'])
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('Event not found.')
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error reading event: ' + str(e))
        }
