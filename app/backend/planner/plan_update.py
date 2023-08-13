import json
import boto3

REGION = 'ap-northeast-2'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('team3-icn-planner-table')

def lambda_handler(event, context):
    try:
        # Extract "index" from query string parameters
        index = event['queryStringParameters']['Index']

        # Extract attribute values from the request body
        event_data = json.loads(event['body'])
        new_date = event_data.get('Date')
        new_title = event_data.get('Title')
        new_end_date = event_data.get('EndDate')
        new_memo = event_data.get('Memo')

        # Prepare the update expression and attribute values
        update_expression_parts = []
        expression_attribute_values = {}
        expression_attribute_names = {'#d': 'Date'}

        if new_date:
            update_expression_parts.append('#d = :d')
            expression_attribute_values[':d'] = new_date
        if new_title:
            update_expression_parts.append('Title = :t')
            expression_attribute_values[':t'] = new_title
        if new_end_date:
            update_expression_parts.append('EndDate = :ed')
            expression_attribute_values[':ed'] = new_end_date
        if new_memo:
            update_expression_parts.append('Memo = :m')
            expression_attribute_values[':m'] = new_memo

        update_expression = 'SET ' + ', '.join(update_expression_parts)

        # Update the item with the specified index in the DynamoDB table
        response = table.update_item(
            Key = {'Index': index},
            UpdateExpression = update_expression,
            ExpressionAttributeValues = expression_attribute_values,
            ExpressionAttributeNames = expression_attribute_names,
            ReturnValues = 'UPDATED_NEW'
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
