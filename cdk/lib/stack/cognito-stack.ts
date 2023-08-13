import { OAuthScope } from '@aws-cdk/aws-cognito';
import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { PlannerStackProps } from '../planner-stack';
import { getAccountUniqueName } from '../config/accounts';
import { SYSTEM_NAME } from '../config/commons';

export class PlannerCognitoStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: PlannerStackProps) {
      super(scope, id, props);
  
      // Cognito UserPool 생성
      const userPool = new cognito.UserPool(this, `${SYSTEM_NAME}-UserPool`, {
        userPoolName:`${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-UserPool`,
        selfSignUpEnabled: true,
        signInAliases: { username: true },
        autoVerify:{
            email:true,
            phone:false
        },
        userVerification: {
          emailStyle: cognito.VerificationEmailStyle.LINK,
        },
        standardAttributes: {
            email: {
              required: true,
              mutable: true,
            }
        },
        passwordPolicy:{
            requireUppercase:false,
        },
        accountRecovery:cognito.AccountRecovery.EMAIL_ONLY,
        deletionProtection:true,
        removalPolicy:cdk.RemovalPolicy.DESTROY

      });

      const userPoolDomain = new cognito.UserPoolDomain(this, 'PlannerUserPoolDomain', {
        userPool : userPool,
        cognitoDomain: {
          domainPrefix: `team3planner`, // 사용자 정의 도메인 접두사
        },
      });

      const userPoolClient = new cognito.UserPoolClient(this, 'PlannerUserPoolClient', {
        userPool : userPool,
        userPoolClientName : `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-UserPoolClient`,
        generateSecret: true,
        authFlows : {
            userSrp : true
        },
        oAuth:{
            flows:{
                implicitCodeGrant : true,
                authorizationCodeGrant : false
            },
            scopes:[OAuthScope.EMAIL,OAuthScope.COGNITO_ADMIN,OAuthScope.OPENID,OAuthScope.PROFILE],
            callbackUrls:["https://localhost:3000"],

        }
      });


    }
  }