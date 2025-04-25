import React from 'react';
import AccountSection from '../components/AccountSection';
import './Account.css';

const Account = () => {
  return (
    <div className="account-container">
      <div>
    <h1>Client Account</h1>
    <AccountSection />
  </div>

      <section className="account-section">
        <h2>Program List</h2>
        <ul className="program-list">
          <li>Nutrition Plan</li>
          <li>Fitness Coaching</li>
          <li>Mental Wellness Program</li>
        </ul>
      </section>

      <section className="account-section">
        <h2>Client Details</h2>
        <div className="client-details">
          <p><strong>Name:</strong> Jane Doe</p>
          <p><strong>Email:</strong> jane@example.com</p>
          <p><strong>Phone:</strong> +123 456 7890</p>
        </div>
      </section>

      <section className="account-section">
        <h2>Profile</h2>
        <div className="profile-info">
          <p><strong>Age:</strong> 34</p>
          <p><strong>Health Goals:</strong> Lose weight, improve sleep</p>
          <p><strong>Member Since:</strong> Jan 2023</p>
        </div>
      </section>
    </div>
  );
};

export default Account;
