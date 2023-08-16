import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { PlannerLambdaStack } from "./stack/lambda-stack";
import { PlannerDynamoDBStack } from "./stack/dynamodb-stack";
import { PlannerAPIgatewayStack } from "./stack/apigateway-stack";
import { PlannerCognitoStack } from "./stack/cognito-stack";
import { SYSTEM_NAME } from "./config/commons";
import { Account } from "./config/accounts";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface PlannerStackProps extends cdk.StackProps {
  context: Account;
  dynamoStack?: PlannerDynamoDBStack;
  lambdaStack?: PlannerLambdaStack;
  gatewayStack?: PlannerAPIgatewayStack;
  cognitoStack?: PlannerCognitoStack;
}

export class PlannerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PlannerStackProps) {
    super(scope, id, props);

    const lambdaStack = new PlannerLambdaStack(
      this,
      `${SYSTEM_NAME}-lambdaStack`,
      props
    );
    props.lambdaStack = lambdaStack;

    const dynamodbStack = new PlannerDynamoDBStack(
      this,
      `${SYSTEM_NAME}-dynamodbStack`,
      props
    );
    props.dynamoStack = dynamodbStack;

    const APIgatewayStack = new PlannerAPIgatewayStack(
      this,
      `${SYSTEM_NAME}-apiGatewayStack`,
      props
    );
    props.gatewayStack = APIgatewayStack;

    const cognitoStack = new PlannerCognitoStack(
      this,
      `${SYSTEM_NAME}-cognitoStack`,
      props
    );
    props.cognitoStack = cognitoStack;
  }
}
