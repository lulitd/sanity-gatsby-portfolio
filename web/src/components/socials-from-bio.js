import React from "react";
import Icon from "./icon";
import styles from "./socials-from-bio.module.css";

function SocialsFromBio({ bio }) {
  let socials = [];

  if (!bio) return null;

  if (bio.twitter) socials.push({ name: "twitter", link: bio.twitter });
  if (bio.instagram) socials.push({ name: "instagram", link: bio.instagram });
  if (bio.linkedin) socials.push({ name: "linkedin", link: bio.linkedin });
  if (bio.github) socials.push({ name: "github", link: bio.github });

  const socialIcons = socials.map(social => {
    return (
      <a
        className={styles.socialIcon}
        href={social.link}
        key={social.name}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Icon symbol={social.name} />
      </a>
    );
  });

return <div className={styles.socialContainer}>{socialIcons}</div>
}

export default SocialsFromBio;