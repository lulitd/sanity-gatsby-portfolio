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
    relatedProjects,
    awards
  } = props;

  const collaborators = members;

  let merged = [...accolades,...awards];

    const allIds = merged.map( el => el["_id"]); 
    const uniqueAccolades=merged.filter( (obj, index) => {
    return allIds.indexOf(obj["_id"]) === index;
    }); // removing all duplicates

    uniqueAccolades.sort((a, b) => (a.date) - (b.date)).reverse();


    const filteredProjects = relatedProjects.filter(item=> {return item && item.publishedAt});
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
              <RoleList items={collaborators} title="Team" />
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

            {uniqueAccolades && uniqueAccolades.length > 0 && (
              <div className={styles.accolades}>
                <h3 className={styles.accoladesHeadline}>Exhibitions & Awards</h3>
                <ul>
                  {uniqueAccolades.map(accolade => {
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

        {filteredProjects && filteredProjects.length > 0 && (
          <div className={styles.relatedProjects}>
             <h2 className={styles.relatedProjectsTitle}>Featured Projects</h2>

            <ProjectPreviewGrid nodes={filteredProjects} />
          </div>
        )}
        
      </Container>
    </article>
  );
}

export default Project;
