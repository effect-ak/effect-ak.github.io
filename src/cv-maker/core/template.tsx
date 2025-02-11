import { EmploymentRecord, ProjectDetails, ProjectTechnology, ResumeObject } from "#/cv-maker/core/schema";
import { DateTime, pipe, Array } from "effect";

export function Resume(resume: ResumeObject) {
  return (
    <div id="resume">

    {ResumeHead(resume)}

    <div className="section-header">
      <span id="label">Summary</span>
    </div>
    
    <div id="summary">
      {resume.me.expertSummary.map(s =>
        <p dangerouslySetInnerHTML={{ __html: s }}></p>
      )}
    </div>
    
    <div className="section-header">
      <span id="label">Skills</span>
    </div>
    
    <div id="skills">

      {Object.entries(getSkills(resume)).map(([ category, group ]) => 
        <div className="skill-group">
        <span>{category}</span>
        <div className="group-list">
          {group.map(t =>
            <span className="stack-item">{t.technology.name}</span>
          )}
        </div>
      </div>
      )}
    
    </div>

    <div className="section-header">
      <span id="label">Employment</span>
    </div>
    
    <div id="employment">
      {EmploymentHistory(resume)}
    </div>
    
    </div>
    
  )
}

function Headline(resume: ResumeObject) {
  return (
    <span>
      Software Engineer. <span id='expertise'>Expertise: {resume.me?.expertise.join("/")}</span>
    </span>
  )
}

function CompanySubHeader(company: EmploymentRecord) {
  return <span>{company.position} · {company.location.city}, {company.location.country} · {company.workType}</span>
}

function CompanyHeader(company: EmploymentRecord) {
  return (
    <span>
      <a
        className="companyLink"
        href={company.website}
      >{company.companyName}</a> · {company.companyDescription}
    </span>
  )
}

function ProjectStack(project: ProjectDetails) {
  return (
    <span>
      {project.stack.map(t => <span className="stack-item">{t}</span>)}
    </span>
  )
}

function ResumeHead(resume: ResumeObject) {
  return (
    <div id="head">
      <div id="name">{resume.me.name}</div>
      <div id="role">{Headline(resume)}</div>
      <div id="location">{resume.me?.location}</div>
      <div id="contact">
        <div id="email">
          <span className="fa-regular fa-envelope"></span>
          <a
            href={`mailto:${resume.me.email}`}
          > {resume.me.email}</a>
        </div>
        <div id="phone">
          <span className="fa-solid fa-mobile-screen-button"></span>
          <a
            href={`tel:${resume.me.phone}`}
          > {resume.me.phone}</a>
        </div>
      </div>
      <div id="profiles">
        {resume.me.profiles.map(p => {
          const iconClass = `fa-${p.icon.split(' ').at(0)}`;
          return (
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              <span
                className={`fa-brands fa-lg ${iconClass}`}
                style={{ "color": p.icon.split(' ').at(1) }}
              ></span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

function CompanyProject(project: ProjectDetails) {
  return (
    <div className="project">
    <div style={{ display: "flex" }}>
      <div style={{ marginBottom: "3px" }}>
        <b>Project: </b>
        <span>{project.title}</span>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <b>Roles: </b>
        <span>{project.roles.join('/')}</span>
      </div>
    </div>
    <span
      style={{display: "block"}}
    ><b>Stack: </b>{ProjectStack(project)}</span>
    <ul>
      {project.achivements.map(achivement =>
        <div>
          <li>{achivement.human ?? achivement.technical}</li>
        </div>
      )}
    </ul>
  </div>
  )
}

function EmploymentHistory(resume: ResumeObject) {
  return (
    <div id="employment">
      {resume.employmentHistory.map(company => {

        return (
          <div className="company">
            <div style={{ "display": "flex" }}>
              <span>{CompanyHeader(company)}</span>
              <span
                style={{ "marginLeft": "auto" }}
              >{getPeriod(company)}</span>
            </div>
            <span
              style={{ display: "block", marginBottom: "5px" }}
            >{CompanySubHeader(company)}</span>
            {company.projects.map(CompanyProject)}
            <hr />
          </div>
        )
      })}

    </div>
  )
}

function getPeriod(company: EmploymentRecord) {
  const start = DateTime.unsafeMake(company.start);
  const end = DateTime.unsafeMake(company.end);
  const period_ms = DateTime.distance(start, end);

  const msInYear = 365.25 * 24 * 60 * 60 * 1000;
  const msInMonth = msInYear / 12;

  let years = Math.floor(period_ms / msInYear);
  let months = Math.ceil((period_ms % msInYear) / msInMonth);

  if (months === 12) {
    years = years + 1;
    months = 0;
  }

  const t1 = DateTime.format(start, { month: "short", year: "numeric" });
  const t2 = DateTime.format(end, { month: "short", year: "numeric" });

  let duration = `${months} mos`;
  if (years) duration = `${years} yr ${duration}`

  return <span>{t1} - {t2} · {duration}</span>;

}

function getSkills(resume: ResumeObject) {

  const categories: { code: string, technology: ProjectTechnology }[] | undefined =
    resume.employmentHistory?.flatMap(e =>
      e.projects.flatMap(p =>
        [...p.stack, ...p.tools].flatMap(t => {
          const technology = resume.technologies?.find(_ => _.id == t);
          if (!technology) return [];
          return [{
            code: t,
            category: technology.category,
            technology
          }]
        })
      )
    );

  if (!categories) {
    console.warn("Skill categories not found")
    return {};
  };

  const grouped =
    pipe(
      categories,
      Array.dedupeWith((a, b) => a.code == b.code),
      Array.groupBy(_ => _.technology.category)
    );

  return grouped;
};
