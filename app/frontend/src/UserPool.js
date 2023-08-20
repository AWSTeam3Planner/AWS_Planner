import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-northeast-2_nriSIXluH",
  ClientId: "232c93kgb5kq509qu45v85a23m",
};

export default new CognitoUserPool(poolData);
