import React from 'react';
import style from './privacyPolicy.module.css';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className={style.container}>
      <h1>Privacy Policy</h1>
      <p>Last updated: March 2026</p>

      <h2>1. Introduction</h2>
      <p>
        We respect your privacy and are committed to protecting your personal information. 
        This Privacy Policy explains how we collect, use, and share information about you.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>Personal information you provide directly (e.g., name, email, password)</li>
        <li>Information collected automatically (e.g., usage data, cookies)</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To provide and maintain our services</li>
        <li>To communicate with you</li>
        <li>To improve our website and services</li>
      </ul>

      <h2>4. Sharing of Information</h2>
      <p>
        We do not sell your personal information. We may share data with service providers who assist us in providing services.
      </p>

      <h2>5. Security</h2>
      <p>
        We take reasonable measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You may request access, correction, or deletion of your personal information. Contact us for any privacy-related inquiries.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at: 
        <a href="mailto:privacy@example.com">privacy@example.com</a>
      </p>
    </div>
  );
};