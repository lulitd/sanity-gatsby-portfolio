import { format, distanceInWords, differenceInDays } from "date-fns";
import React from "react";
import { Link } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import Container from "./container";
import RoleList from "./role-list";
import ProjectPreviewGrid from "./project-preview-grid";

import styles from "./project.module.css";

function Project(props) {
  const {
    _rawProjectBrief,
    _rawProjectBreakdown,
    title,
    categories,
    members,
    accolades,
    mainImage,
    relatedProjects
  } = props;

  const collaborators = members.filter(member => !member.person.name.includes("Lalaine"));

  return (
    <article className={styles.root}>
      <Container>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{title}</h1>
          {props.mainImage && mainImage.asset && (
            <div className={styles.mainImage}>
              <img
                src={imageUrlFor(buildImageObj(mainImage))
                  .width(1200)
                  .height(Math.floor((9 / 16) * 1200))
                  .fit("crop")
                  .url()}
                alt={mainImage.alt}
              />
            </div>
          )}
        </div>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            {_rawProjectBrief && (
              <div className={styles.projectBrief}>
                <h1 className={styles.header}>Project Description</h1>{" "}
                <BlockContent blocks={_rawProjectBrief || []} />
              </div>
            )}
            {_rawProjectBreakdown && (
              <div className={styles.projectBreakdown}>
                <h1 className={styles.header}>Project Breakdown</h1>
                <BlockContent blocks={_rawProjectBreakdown || []} />
              </div>
            )}
          </div>
          <aside className={styles.metaContent}>
            {collaborators && collaborators.length > 0 && (
              <RoleList items={collaborators} title="Collaborators" />
            )}
            {categories && categories.length > 0 && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Categories</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {accolades && accolades.length > 0 && (
              <div className={styles.accolades}>
                <h3 className={styles.accoladesHeadline}>Exhibitions & Awards</h3>
                <ul>
                  {accolades.map(accolade => {
                    let label = "";
                    label += `${accolade.date.split("-")[0]}: `;
                    label += accolade.title;
                    label += accolade.event ? `, ${accolade.event}` : "";

                    return (
                      <li key={accolade._id}>
                        <span className={styles.accoladeLabel}>{label}<br></br></span>
                        <span className={styles.accoladeAddress}>{accolade.address}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {relatedProjects && relatedProjects.length > 0 && (
          <div className={styles.relatedProjects}>
            <ProjectPreviewGrid nodes={relatedProjects} />
          </div>
        )}
      </Container>
    </article>
  );
}

export default Project;
