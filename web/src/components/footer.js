import {Link} from 'gatsby'
import React from 'react'
import {cn} from '../lib/helpers'
import styles from './footer.module.css'

const Footer = () => (
    <footer className={styles.footer}>
    <div className={styles.footerWrapper}>
      <div className={styles.siteInfo}>
      Designed & Built by <Link to="/">Lalaine Ulit-Destajo</Link>
      </div>
    </div>
  </footer>
)

export default Footer
