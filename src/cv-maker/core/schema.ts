import { Schema as S } from "effect"

const httpsRegex = /https:\/\//;

export class ProjectTechnology
  extends S.Class<ProjectTechnology>("ProjectTechnology")({
    id: S.NonEmptyString,
    name: S.NonEmptyString,
    category:
      S.Literal(
        "programming language",
        "framework",
        "cloud computing",
        "database",
        "devops tool",
        "testing",
        "collaboration tool",
        "frontend",
        "other"
      ),
    version: S.NonEmptyString.pipe(S.optional),
    url: S.NonEmptyString.pipe(S.optional)
  }) { }

export class ProjectDetails
  extends S.Class<ProjectDetails>("ProjectDetails")({
    order: S.Number,
    client:
      S.Struct({
        name: S.NonEmptyString,
        description: S.NonEmptyString
      }).pipe(S.optional),
    title: S.NonEmptyString,
    stack: S.NonEmptyString.pipe(S.NonEmptyArray),
    tools: S.NonEmptyString.pipe(S.NonEmptyArray),
    roles: S.NonEmptyString.pipe(S.NonEmptyArray),
    achivements:
      S.Struct({
        technical: S.NonEmptyString,
        human: S.NonEmptyString.pipe(S.optional)
      }).pipe(S.NonEmptyArray)
  }) { }

export class EmploymentRecord
  extends S.Class<EmploymentRecord>("EmploymentRecord")({
    position: S.NonEmptyString,
    workType: S.Literal("hybrid", "on-site", "remote"),
    companyName: S.NonEmptyString,
    companyDescription: S.NonEmptyString,
    website: S.NonEmptyString.pipe(S.pattern(httpsRegex)),
    start: S.NonEmptyString,
    end: S.NonEmptyString,
    location:
      S.Struct({
        city: S.NonEmptyString,
        country: S.NonEmptyString,
        timezone: S.NonEmptyString
      }).pipe(S.partial),
    projects:
      ProjectDetails.pipe(S.NonEmptyArray)
  }) { }

export class Me
  extends S.Class<Me>("Me")({
    name: S.NonEmptyString,
    expertise: S.NonEmptyString.pipe(S.NonEmptyArray),
    location: S.NonEmptyString.pipe(S.optional),
    phone: S.NonEmptyString.pipe(S.optional),
    email: S.NonEmptyString,
    profiles:
      S.Struct({
        url: S.NonEmptyString.pipe(S.pattern(httpsRegex)),
        icon: S.NonEmptyString
      }).pipe(
        S.NonEmptyArray
      ),
    expertSummary:
      S.NonEmptyString.pipe(
        S.NonEmptyArray
      )
  }) { }

// Backend/Frontend/DevOps
export class ResumeObject
  extends S.Class<ResumeObject>("ResumeObject")({
    $schema: S.NonEmptyString.pipe(S.optional),
    me: Me,
    technologies: ProjectTechnology.pipe(S.NonEmptyArray),
    employmentHistory: EmploymentRecord.pipe(S.NonEmptyArray)
  }) { };
