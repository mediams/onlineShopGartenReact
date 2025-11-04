import { Instagram } from 'lucide-react';
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
              href="tel:+499999999999"
              className={styles.cardData}
              target="_blank"
              rel="noopener noreferrer"
            >
              +49 999 999 99 99
            </a>
          </li>
          <li className={styles.footerListCard}>
            <p className={styles.cardTitle}>Socials</p>
            <div className={styles.cardData}>
              <a
                className={styles.cardDataLink}
                href="https://www.instagram.com/startainstitute"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={43} />
              </a>
              <a
                href="https://t.me/+-NYIpDtp4aIzMTky"
                className={styles.cardDataLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon id="ic-whatsapp" w={43} h={43} />
              </a>
            </div>
          </li>
          <li className={styles.footerListCard}>
            <p className={styles.cardTitle}>Address</p>
            <div className={styles.cardData}>
              <a
                href="https://maps.google.com/?q=Linkstraße+2,+8+OG,+10785,+Berlin,+Deutschland"
                className={styles.addressLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland
              </a>
            </div>
          </li>
          <li className={styles.footerListCard}>
            <p className={styles.cardTitle}>Working Hours</p>
            <p className={styles.cardData}>24 hours a day</p>
          </li>
        </ul>
        <div className={styles.footerMap}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.4579918195495!2d13.37274847668035!3d52.50793367205793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851cbdeaf3909%3A0xf7ba771ff4a1e901!2sLinkstra%C3%9Fe%202%2F8%20OG%2C%2010785%20Berlin!5e0!3m2!1sru!2sde!4v1741001389026!5m2!1sru!2sde"
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
