import json
import boto3

REGION = 'ap-northeast-2'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('team3-icn-planner-table')

def get_max_index(entries):
    max_index = 0
    for entry in entries:
        index_parts = entry['Index'].split('#')
        if len(index_parts) > 2:
            index = int(index_parts[2])
            if index > max_index:
                max_index = index
    return max_index

def lambda_handler(event, context):
    try:
        event_data = json.loads(event['body'])
        user_id = event_data['ID']
        event_date = event_data['DATE']

        # Get the current entries for the given user and date
        response = table.query(
            KeyConditionExpression='#id = :id AND begins_with(#index, :date)',
            ExpressionAttributeNames={'#id': 'ID', '#index': 'Index'},
            ExpressionAttributeValues={':id': user_id, ':date': event_date},
            ScanIndexForward=False
        )

        entries = response.get('Items', [])
        total_entries = len(entries)
        max_index = get_max_index(entries)

        # Generate the new index for the data entry
        new_index = max_index + 1
        formatted_date = event_date.replace('-', '')
        formatted_index = str(new_index).zfill(3)
        new_index_with_date = f'{formatted_date}#{formatted_index}'

        # Add the generated index and Date attribute to the event data
        event_data['Index'] = new_index_with_date
        event_data['DATE'] = event_date

        # Add the data entry to the DynamoDB table
        response = table.put_item(Item=event_data)

        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "http://localhost:3000",  # 허용할 출처
                "Access-Control-Allow-Headers": "Content-Type",  # 요청에서 허용할 헤더
                "Access-Control-Allow-Methods": "POST"  # 허용할 메서드
            },
            'body': json.dumps('Event created successfully!'),
            # 클라이언트에서 호출시 cors에러 해결하기 위해 추가.
            
        }
    except Exception as e:
        return {
            'statusCode': 500,
             # 클라이언트에서 호출시 cors에러 해결하기 위해 추가.
            'headers': {
                "Access-Control-Allow-Origin": "http://localhost:3000/planner",  # 허용할 출처
                "Access-Control-Allow-Headers": "Content-Type",  # 요청에서 허용할 헤더
                "Access-Control-Allow-Methods": "POST"  # 허용할 메서드
            },
            'body': json.dumps('Error creating event: ' + str(e))
        }
