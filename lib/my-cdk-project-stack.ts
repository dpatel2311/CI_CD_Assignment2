import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';


export class MyCdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // Create S3 bucket
    const myBucket = new s3.Bucket(this, 'rusticmonkey8933139', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Only for dev/test environments
    });

    // Create Lambda function
    const myLambda = new lambda.Function(this, 'rusticlambda8933139', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log('Lambda invoked!');
          return { statusCode: 200, body: 'Hello, World!' };
        }
      `),
      environment: {
        BUCKET_NAME: myBucket.bucketName,
      },
    });

    // Dynamo DB creation
    const myTable = new dynamodb.Table(this, 'rustic8933139', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: '8933139',
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Only for dev/test environments
    });
  }
}

// Define the app and stack
const app = new cdk.App();
new MyCdkProjectStack(app, 'MyCdkProjectStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
