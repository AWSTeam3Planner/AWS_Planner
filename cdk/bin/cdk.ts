#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PlannerStack } from '../lib/planner-stack';
import { getAccountUniqueName, getDevAccount } from '../lib/config/accounts';

const app = new cdk.App();

const devAccount = getDevAccount('team3')
if (devAccount !== undefined) {
    new PlannerStack(app, `${getAccountUniqueName(devAccount)}`, {
    env: devAccount,
    context: devAccount,
  })
}

app.synth()