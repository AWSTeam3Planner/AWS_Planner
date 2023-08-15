import { EndpointType } from "@aws-cdk/aws-apigateway";
import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { getAccountUniqueName } from "../config/accounts";
import { PlannerStackProps } from "../planner-stack";
import { SYSTEM_NAME } from "../config/commons";

export class PlannerAPIgatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PlannerStackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, `Team3-${SYSTEM_NAME}`, {
      cloudWatchRole: true,
      restApiName: `${getAccountUniqueName(props.context)}-${SYSTEM_NAME}-api`,
      deploy: false,
      endpointTypes: [EndpointType.REGIONAL],
    });

    //cors 옵션 설정
    const corsOptions: apigateway.CorsOptions = {
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
    };

    //lambda function definition
    const createARN =
      "arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-create";
    const create = lambda.Function.fromFunctionArn(
      this,
      "createFunction",
      createARN
    );

    const readARN =
      "arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-read";
    const read = lambda.Function.fromFunctionArn(this, "readFunction", readARN);

    const updateARN =
      "arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-update";
    4;
    const update = lambda.Function.fromFunctionArn(
      this,
      "updateFunction",
      updateARN
    );

    const deleteARN =
      "arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-delete";
    const del = lambda.Function.fromFunctionArn(
      this,
      "deleteFunction",
      deleteARN
    );

    const withdrawARN =
      "arn:aws:lambda:ap-northeast-2:842292639267:function:team3-ICN-Planner-withdraw";
    const withdraw = lambda.Function.fromFunctionArn(
      this,
      "withdrawFunction",
      withdrawARN
    );

    //main resource definition
    const mainResource = api.root.addResource("planner");
    mainResource.addCorsPreflight(corsOptions);

    //create
    mainResource.addMethod("POST", new apigateway.LambdaIntegration(create));

    //read
    mainResource.addMethod("GET", new apigateway.LambdaIntegration(read));

    //update
    mainResource.addMethod("PUT", new apigateway.LambdaIntegration(update));

    //delete
    mainResource.addMethod("DELETE", new apigateway.LambdaIntegration(del));

    //withdraw resource definition
    const withdrawResource = mainResource.addResource("withdraw");
    withdrawResource.addCorsPreflight(corsOptions);

    withdrawResource.addMethod(
      "DELETE",
      new apigateway.LambdaIntegration(withdraw)
    );
  }
}
