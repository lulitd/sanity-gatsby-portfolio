import { Link } from "gatsby";
import React from "react";
import { cn } from "../lib/helpers";
import styles from "./footer.module.css";
import SocialsFromBio from "./socials-from-bio";

const Footer = ({ author }) => (
  <footer className={styles.footer}>
    <div className={styles.footerWrapper}>
      <div className={styles.siteInfo}>
        Designed & Built by <Link to="/">{author.name}</Link>
        <SocialsFromBio bio={author} />
      </div>
    </div>
  </footer>
);

export default Footer;
