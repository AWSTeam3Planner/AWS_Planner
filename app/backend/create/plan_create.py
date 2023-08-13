import json
import boto3

REGION = 'ap-northeast-2'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('team3-icn-planner-table')

def generate_index(date, current_max_index):
    # Parse the current max index and increment it by 1
    new_index = current_max_index + 1

    # Format the date and index as "YYMMDD#XXX"
    formatted_date = date.strftime('%y%m%d')
    formatted_index = str(new_index).zfill(3)

    return f'{formatted_date}#{formatted_index}'

def lambda_handler(event, context):
    try:
        event_data = json.loads(event['body'])
        event_date = event_data['Date']

        # Get the current maximum index for the given date
        response = table.query(
            KeyConditionExpression = '#d = :d',
            ExpressionAttributeNames = {'#d': 'Date'},
            ExpressionAttributeValues = {':d': event_date},
            ScanIndexForward = False, # Sort in descending order to get the highest index first
            Limit = 1
        )

        current_max_index = 0
        if 'Items' in response and len(response['Items']) > 0:
            current_max_index = int(response['Items'][0]['Index'].split('#')[1])

        # Generate the new index for the data entry
        new_index = generate_index(event_date, current_max_index)

        # Add the generated index to the event data
        event_data['Index'] = new_index

        # Add the data entry to the DynamoDB table
        response = table.put_item(Item = event_data)

        return {
            'statusCode': 200,
            'body': json.dumps('Event created successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error creating event: ' + str(e))
        }