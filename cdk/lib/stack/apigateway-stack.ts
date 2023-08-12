import { EndpointType } from '@aws-cdk/aws-apigateway';
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { getAccountUniqueName } from "../config/accounts";
import { PlannerStackProps } from '../planner-stack';
import { SYSTEM_NAME } from '../config/commons';

export class PlannerAPIgatewayStack extends cdk.Stack {
    
    constructor(scope: Construct, id: string, props: PlannerStackProps) {
        super(scope, id, props);

        const api = new apigateway.RestApi(this, `Team3-${SYSTEM_NAME}`, {
            cloudWatchRole: true,
            restApiName: `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-api`,
            deploy: false,
            endpointTypes: [EndpointType.REGIONAL],
        });

        //Cognito User Pool
        const userPool = cognito.UserPool.fromUserPoolArn(this, `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-UserPool}`, 'arn:aws:cognito-idp:ap-northeast-2:842292639267:userpool/ap-northeast-2_SvFdT80N3');

        //Cognito User Pool Client
        const userPoolClient = cognito.UserPoolClient.fromUserPoolClientId(this, `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-UserPoolClient`, '51p3o1cgahv8cvohe9ikpd2fp0');

        const cognitoAuthorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
            cognitoUserPools: [userPool],
            authorizerName: 'CognitoAuthorizer',
        });

        //withdraw
        const withdrawResource = api.root.addResource('withdraw');
        const withdrawARN = 'arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-withdraw'
        const withdraw=lambda.Function.fromFunctionArn(this,'withdrawFunction',withdrawARN)
        withdrawResource.addMethod('DELETE', new apigateway.LambdaIntegration(withdraw),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        });

        //lambda function definition
        const createARN = 'arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-create';
        const create = lambda.Function.fromFunctionArn(this,'createFunction',createARN)

        const readARN = 'arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-read';
        const read = lambda.Function.fromFunctionArn(this,'readFunction',readARN)
        
        const updateARN = 'arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-update';4
        const update = lambda.Function.fromFunctionArn(this,'updateFunction',updateARN)
        
        const deleteARN = 'arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-delete';
        const del = lambda.Function.fromFunctionArn(this,'deleteFunction',deleteARN)

        //main resource definition
        const mainResource = api.root.addResource('main');

        //create
        mainResource.addMethod('POST', new apigateway.LambdaIntegration(create),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        })

        //read
        mainResource.addMethod('GET', new apigateway.LambdaIntegration(read),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        })

        //update
        mainResource.addMethod('PUT', new apigateway.LambdaIntegration(update),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        })

        //delete
        mainResource.addMethod('DELETE', new apigateway.LambdaIntegration(del),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        })
    }
}

