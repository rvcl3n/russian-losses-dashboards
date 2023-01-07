from __future__ import print_function

import boto3
import json

print('Loading function')


def handler(event, context):
    '''Provide an event that contains the following keys:

      - operation: one of the operations in the operations dict below
      - tableName: required for operations that interact with DynamoDB
      - payload: a parameter to pass to the operation being performed
    '''
    #print("Received event: " + json.dumps(event, indent=2))

    dynamo = boto3.resource('dynamodb').Table('lossesTestWithDayId')
    
    lossesJsonString = dynamo.scan()['Items']
    
    return {
        'statusCode': '200',
        'body': sorted(lossesJsonString, key=lambda x: x['date'], reverse=False),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        }
    }