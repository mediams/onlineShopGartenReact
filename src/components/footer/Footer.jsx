import { Linkedin, Github, Mail, Globe, FileText, Twitter, Youtube, Send, MessageCircle } from 'lucide-react';
import styles from './Footer.module.scss';
import Container from '../container/Container';
import React from 'react';
import SectionTitle from '../sectionTitle/SectionTitle';
import Icon from '../ui/Icon';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <SectionTitle>Contacts</SectionTitle>
        <ul className={styles.footerList}>
          <li className={styles.footerListCard}>
            <p className={styles.cardTitle}>Phone</p>
            <a
              href="tel:+49 123 456 78 90"
              className={styles.cardData}
              target="_blank"
              rel="noopener noreferrer"
            >
              +49 123 456 78 90
            </a>
          </li>
          
          <li className={styles.footerListCard}>
            <p className={styles.cardTitle}>Socials</p>
            <div className={styles.cardData}>
              <a
                className={styles.cardDataLink}
                href="https://www.linkedin.com/in/yevhenkariev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={43} />
              </a>
              <a
                className={styles.cardDataLink}
                href="https://www.kariev.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe size={43} />
              </a>
              <a
                href="https://www.github.com/mediams"
                className={styles.cardDataLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github  size={43}/>
              </a>
            </div>
          </li>
          <li className={styles.footerListCard}>
            <p className={styles.cardTitle}>Address</p>
            <div className={styles.cardData}>
              <a
                href="https://maps.app.goo.gl/MukrL5EqZxRwu2iG9"
                className={styles.addressLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Jakoberstraße 26, 86152 Augsburg
              </a>
            </div>
          </li>
          <li className={styles.footerListCard}>
            <p className={styles.cardTitle}>Working Hours</p>
            <p className={styles.cardData}>24/7</p>
          </li>
        </ul>
        <div className={styles.footerMap}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5301.035515563268!2d10.9039478!3d48.369789499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ebd57b4de50d3%3A0xa7941a5fce005115!2z0KTRg9Cz0LPQtdGA0LDQuQ!5e0!3m2!1sru!2sde!4v1762276449259!5m2!1sru!2sde"
            style={{ border: 0, borderRadius: 12 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google map Location"
          ></iframe>
        </div>
      </Container>
    </footer>
  );
}
