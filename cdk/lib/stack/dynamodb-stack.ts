import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Table, AttributeType,BillingMode} from 'aws-cdk-lib/aws-dynamodb';
import { SYSTEM_NAME } from '../config/commons';
import { PlannerStackProps } from '../planner-stack';
import { getAccountUniqueName } from '../config/accounts';

export class PlannerDynamoDBStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: PlannerStackProps) {
    super(scope, id, props);

    // DynamoDB 테이블 생성
    const dataTable = new Table(this, `${SYSTEM_NAME}-table`, {
        tableName : `team3-icn-planner-table`,
        partitionKey: { name: 'ID', type: AttributeType.STRING },
        sortKey: { name: 'DATE', type: AttributeType.STRING },
        billingMode: BillingMode.PAY_PER_REQUEST,
        removalPolicy: cdk.RemovalPolicy.DESTROY, // 스택 삭제시 테이블도 함께 삭제합니다.
    });
  }
}