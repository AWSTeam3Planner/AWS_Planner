import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SYSTEM_NAME } from "../config/commons";
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
//npm install @aws-cdk/aws-lambda-python-alpha 로 다운 받으세요
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from "path";
import { ManagedPolicy, Role, ServicePrincipal, CompositePrincipal, PolicyDocument, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { PlannerStackProps } from '../planner-stack';
import { getAccountUniqueName } from '../config/accounts';

export class PlannerLambdaStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: PlannerStackProps) {
        super(scope, id, props);

        const lambdaRole = new Role(this, `${SYSTEM_NAME}-lambda-role`, {
            roleName: `${getAccountUniqueName(props.context)}-lambda-role`,
            assumedBy: new CompositePrincipal(
                new ServicePrincipal('lambda.amazonaws.com'),
            ),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonCognitoPowerUser')
            ]
        })

        // index.py -> lambda_handler

        new PythonFunction(this, `withdraw`, {
            functionName: `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-withdraw`,
            entry: path.join(__dirname, '../../../app/backend/withdraw'),
            index: 'withdraw.py',
            runtime: Runtime.PYTHON_3_10,
            role: lambdaRole,
            handler:'lambda_handler',
            environment: {}
        })

        new PythonFunction(this, `userInfo`, {
            functionName: `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-userInfo`,
            entry: path.join(__dirname, '../../../app/backend/userInfo'),
            index: 'userInfo.py',
            runtime: Runtime.PYTHON_3_10,
            role: lambdaRole,
            handler:'lambda_handler',
            environment: {}
        })

        new PythonFunction(this, `create`, {
            functionName: `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-create`,
            entry: path.join(__dirname, '../../../app/backend/create'),
            index: 'plan_create.py',
            runtime: Runtime.PYTHON_3_10,
            role: lambdaRole,
            handler:'lambda_handler',
            environment: {}
        })

        new PythonFunction(this, `delete`, {
            functionName: `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-delete`,
            entry: path.join(__dirname, '../../../app/backend/delete'),
            index: 'plan_delete.py',
            runtime: Runtime.PYTHON_3_10,
            role: lambdaRole,
            handler:'lambda_handler',
            environment: {}
        })

        new PythonFunction(this, `read`, {
            functionName: `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-read`,
            entry: path.join(__dirname, '../../../app/backend/read'),
            index: 'plan_read.py',
            runtime: Runtime.PYTHON_3_10,
            role: lambdaRole,
            handler:'lambda_handler',
            environment: {}
        })

        new PythonFunction(this, `update`, {
            functionName: `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-update`,
            entry: path.join(__dirname, '../../../app/backend/update'),
            index: 'plan_update.py',
            runtime: Runtime.PYTHON_3_10,
            role: lambdaRole,
            handler:'lambda_handler',
            environment: {}
        })
       
    }
}