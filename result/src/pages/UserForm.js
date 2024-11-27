import React from 'react';

const UserForm = ({ userData, setUserData }) => {
  return (
    <div>
      <div className="mb-3">
        <label className="form-label">ID</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter Student ID"
          value={userData.id || ''}
          onChange={(e) => setUserData({ ...userData, id: e.target.value })}
          required
        />

      </div>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Student Name"
          value={userData.name || ''}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Batch</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Batch"
          value={userData.batch || ''}
          onChange={(e) => setUserData({ ...userData, batch: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Gender</label>
        <select
          className="form-select"
          value={userData.gender || ''}
          onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Department</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Department"
          value={userData.department || ''}
          onChange={(e) => setUserData({ ...userData, department: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="tel"
          className="form-control"
          placeholder="Enter Phone Number"
          value={userData.phone || ''}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email Address"
          value={userData.email || ''}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
      </div>
    </div>
  );
};

export default UserForm;
