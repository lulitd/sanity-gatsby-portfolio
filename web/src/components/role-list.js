import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { ucfirst } from "../lib/string-utils";

import styles from "./role-list.module.css";

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

function RoleList({ items, title }) {
  return (
    <div className={styles.root}>
      <h2 className={styles.headline}>{title}</h2>
      <ul className={styles.list}>
        {items.map(item => {
          let link =
            item.person.website ||
            item.person.linkedin ||
            item.person.github ||
            item.person.twitter ||
            item.person.instagram;
          
            if (item.person.name==="Lalaine Ulit-Destajo") link="";
          return (
            <li key={item._key} className={styles.listItem}>
              <ConditionalWrapper
                condition={link}
                wrapper={children => <a href={link}>{children}</a>}
              >
                <div>
                  <div className={styles.avatar}>
                    {item.person && item.person.image && item.person.image.asset && (
                      <img
                        src={imageUrlFor(buildImageObj(item.person.image))
                          .width(100)
                          .height(100)
                          .fit("crop")
                          .url()}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <strong>{(item.person && item.person.name) || <em>Missing name</em>}</strong>
                  </div>
                  {item.roles && (
                    <div className={styles.roles}>
                      {item.roles.map((role, idx) => {
                        switch (true) {
                          case idx === 0:
                            return <span key={role}>{ucfirst(role)}</span>;
                          case idx === item.roles.length - 1:
                            return <span key={role}> & {role}</span>;
                          default:
                            return <span key={role}>, {role}</span>;
                        }
                      })}
                    </div>
                  )}
                </div>
              </ConditionalWrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RoleList;
