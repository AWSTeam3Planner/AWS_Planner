import json
import boto3

REGION = 'ap-northeast-2'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('team3-icn-planner-table')

def lambda_handler(event, context):
    try:
        # Extract values from JSON payload
        payload = json.loads(event['body'])
        user_id = payload['ID']
        index = payload['Index']
        
        # Extract attributes to update
        new_date = payload.get('Date')
        new_title = payload.get('Title')
        new_end_date = payload.get('EndDate')
        new_memo = payload.get('Memo')

        # Prepare the update expression and attribute values
        update_expression_parts = []
        expression_attribute_values = {}
        expression_attribute_names = {}

        if new_date:
            update_expression_parts.append('#d = :d')
            expression_attribute_values[':d'] = new_date
            expression_attribute_names['#d'] = 'Date'
        if new_title:
            update_expression_parts.append('#t = :t')
            expression_attribute_values[':t'] = new_title
            expression_attribute_names['#t'] = 'Title'
        if new_end_date:
            update_expression_parts.append('#ed = :ed')
            expression_attribute_values[':ed'] = new_end_date
            expression_attribute_names['#ed'] = 'EndDate'
        if new_memo:
            update_expression_parts.append('#m = :m')
            expression_attribute_values[':m'] = new_memo
            expression_attribute_names['#m'] = 'Memo'

        update_expression = 'SET ' + ', '.join(update_expression_parts)

        # Update the item with the specified index in the DynamoDB table
        response = table.update_item(
            Key={'ID': user_id, 'Index': index},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ExpressionAttributeNames=expression_attribute_names,
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
