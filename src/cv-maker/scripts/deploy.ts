import { makeS3Client, s3, S3ClientTag } from "#/generated/s3.js"
import { Effect } from "effect"
import { readFile } from "fs/promises";

const deploy =
  Effect.gen(function* () {

    const bucketName = "kondaurovdev";

    yield* s3("create_bucket", {
      Bucket: bucketName
    }).pipe(
      Effect.catchTags({
        S3BucketAlreadyOwnedByYou: () => Effect.void
      })
    );

    yield* s3("put_public_access_block", {
      Bucket: bucketName,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        BlockPublicPolicy: false,
        IgnorePublicAcls: false,
        RestrictPublicBuckets: false
      }
    })

    const policy = JSON.stringify({
      Version: "2012-10-17",
      Statement: [{
        Sid: "PublicRead",
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: `arn:aws:s3:::${bucketName}/*`,
      }],
    });

    yield* s3("put_bucket_policy", {
      Bucket: bucketName,
      Policy: policy
    }).pipe(
      Effect.catchAll(error => Effect.logError("policy error", error))
    );

    const html = yield* Effect.tryPromise(() => readFile("resume.html"));

    yield* s3("put_object", {
      Bucket: bucketName,
      Key: "kondaurov_resume.pdf",
      Body: html
    });

  })

deploy.pipe(
  Effect.provideServiceEffect(S3ClientTag, makeS3Client({
    region: "eu-west-1"
  })),
  Effect.catchAllCause(error => Effect.logError("deploy error", error)),
  Effect.runPromise
);
