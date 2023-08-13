import json
import boto3

REGION = 'ap-northeast-2'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('team3-icn-planner-table')

def lambda_handler(event, context):
    try:
        # Extract "index" from query string parameters
        index = event['queryStringParameters']['Index']

        # Delete the item with the specified index from the DynamoDB table
        response = table.delete_item(Key = {'Index': index})

        return {
            'statusCode': 200,
            'body': json.dumps('Event deleted successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error deleting event: ' + str(e))
        }