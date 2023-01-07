import json
import boto3
import sys
import logging

s3 = boto3.client('s3')
dynamodbclient=boto3.resource('dynamodb')


def lambda_handler(event, context):
    
    sample_table = dynamodbclient.Table('lossesTestWithDayId')
    
    bucket = 'orcslosses-data'
    key = 'russian-losses.json'
    
    response = s3.get_object(Bucket = bucket, Key = key)
    content = response['Body']
    jsonObject = json.loads(content.read())
    print(jsonObject[0])
    
    for object in jsonObject:

       
       dateList = object["date"].split("-")
       
       object['day'] = int(dateList[0]+dateList[1]+dateList[2])
       
       print(object['day'])
       
       sample_table.put_item(Item=object)
    
    # TODO implement
    return {
        'statusCode': 200,
        'body': jsonObject[0]
    }
