import { EmploymentRecord, ProjectDetails, ProjectTechnology, ResumeObject } from "#/cv-maker/core/schema";
import { DateTime, pipe, Array } from "effect";

export function Resume(resume: ResumeObject) {
  const coverLetter = resume.me.coverLetter;
  return (
    <div>

      {ResumeHead(resume)}

      {coverLetter ? (
        <div>
          <div className="section-header">
            <span id="label">Why I'm the Right Choice for "{coverLetter.position}"</span>
          </div>
          <div className="p-3 bg-so">
            {coverLetter.content.map(line => <p dangerouslySetInnerHTML={{ __html: line }}></p>)}
          </div>
          
        </div>
      ): null}

      <div className="section-header">
        <span id="label">Summary</span>
      </div>

      <div className="bg-so p-3">
        {resume.me.expertSummary.map(s =>
          <p dangerouslySetInnerHTML={{ __html: s }}></p>
        )}
      </div>

      <div className="section-header">
        <span id="label">Skills</span>
      </div>

      <div className="flex gap-1 flex-wrap">
        {Object.entries(getSkills(resume)).map(([category, group]) => (
          <div className="w-32" key={category}>
            <span className="uppercase font-light text-sm">{category}</span>
            <div className="flex flex-wrap">
              {group.map((t, idx) => (
                <span 
                  key={idx} 
                  className="bg-so p-1 text-sm ml-1 mt-1"
                >
                  {t.technology.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section-header pt-1">
        <span id="label">Employment history</span>
      </div>

      <div id="employment">
        {EmploymentHistory(resume)}
      </div>

    </div>

  )
}

function Headline(resume: ResumeObject) {
  return (
    <div className="flex gap-2 items-baseline">
      <span className="text-2xl font-thin">Software Engineer</span>
      <span className="text-base">Expertise: {resume.me?.expertise.join("/")}</span>
    </div>
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
    <div id="head" className="pb-6">
      <div className="text-5xl font-thin">{resume.me.name}</div>
      <div className="text-lg font-light">{Headline(resume)}</div>
      <div id="location">{resume.me?.location}</div>
      <div className="flex gap-1 text-sky-600 text-sm">
        <div>
          <span className="fa-regular fa-envelope"></span>
          <a
            href={`mailto:${resume.me.email}`}
          > {resume.me.email}</a>
        </div>
        <div>
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
    <div className="project no-break">
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
        style={{ display: "block" }}
      ><b>Stack: </b>{ProjectStack(project)}</span>
      <ul className="list-disc pt-2 pl-10">
        {project.achivements.map(achivement =>
          <li>{achivement.human ?? achivement.technical}</li>
        )}
      </ul>
    </div>
  )
}

function EmploymentHistory(resume: ResumeObject) {
  return (
    <div id="employment">
      {resume.employmentHistory.map(company => {

        const projects = [...company.projects].sort((a,b) => a.order - b.order).map(CompanyProject)

        return (
          <div className="company border-b-1 border-gray-300 mb-2 pb-1">
            <div style={{ "display": "flex" }}>
              <span>{CompanyHeader(company)}</span>
              <span
                style={{ "marginLeft": "auto" }}
              >{getPeriod(company)}</span>
            </div>
            <span
              style={{ display: "block", marginBottom: "5px" }}
            >{CompanySubHeader(company)}</span>
            {projects}
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
