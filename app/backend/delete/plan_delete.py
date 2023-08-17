import json
import boto3

REGION = 'ap-northeast-2'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('team3-icn-planner-table')

def lambda_handler(event, context):
    try:
        # Extract values from JSON payload
        payload = json.loads(event['body'])
        user_id_value = payload['ID']
        index_value = payload['Index']

        # Delete the item with the specified index from the DynamoDB table
        response = table.delete_item(
            Key={
                'ID': user_id_value,
                'Index': index_value
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps('Event deleted successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error deleting event: ' + str(e))
        }
