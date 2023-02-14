import React from 'react';
import s from './Footer.module.css';

function Footer() {
  return (
    <footer className={s.footer_bkgr}>
      <div className={s.footer_styles}>
        <div className={s.footer_rights}>
          <a href="https://correctarium.com/terms">Договір публічної оферти</a>
          <p>© Correctarium</p>
          <p>2015-2023</p>
        </div>
        <img src="https://correctarium.com/img/footer_logo.png" alt="" />

        <div className={s.footer_contacts}>
          <p>Надіслати текст на переклад:</p>
          <a href="mailto:manager@correctarium.com">manager@correctarium.com</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
