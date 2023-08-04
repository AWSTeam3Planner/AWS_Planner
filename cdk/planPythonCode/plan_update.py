import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PlannerData')  # 여기에 테이블 이름을 적절히 변경해야 합니다.

def lambda_handler(event, context):
    try:
        event_id = event['queryStringParameters']['event_id']
        event_data = json.loads(event['body'])
        response = table.update_item(
            Key = {'event_id': event_id},
            UpdateExpression = 'SET event_name = :name, event_date = :date',
            ExpressionAttributeValues = {
                ':name': event_data['event_name'],
                ':date': event_data['event_date']
            },
            ReturnValues='UPDATED_NEW'
        )
        return {
            'statusCode': 200,
            'body': json.dumps('Event updated successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error updating event: ' + str(e))
        }
