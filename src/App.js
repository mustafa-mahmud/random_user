import React, { useState, useEffect } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaMap,
  FaPhone,
  FaLock,
  FaCalendar,
} from 'react-icons/fa';
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState('Stiven Stive');
  const [title, setTitle] = useState('name');

  const fetchPerson = async () => {
    const res = await fetch(url);
    const { results } = await res.json();
    const {
      email,
      phone,
      dob: { age },
      name: { first, last },
      location: {
        street: { name, number },
      },
      picture: { large: image },
      login: { password },
    } = results[0];

    const newPerson = {
      email,
      phone,
      age,
      name: `${first} ${last}`,
      location: `${number} ${name}`,
      image,
      password,
    };

    setPerson(newPerson);
    setValue(newPerson.name);
    setLoading(false);
  };

  const handleMouseOver = (e) => {
    if (!e.target.classList.contains('icon')) return;

    const dataLabel = e.target.getAttribute('data-label');
    console.log(dataLabel);

    setTitle(dataLabel);
    setValue(person[dataLabel]);
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleMouseOver}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleMouseOver}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseOver={handleMouseOver}
            >
              <FaCalendar />
            </button>
            <button
              className="icon"
              data-label="location"
              onMouseOver={handleMouseOver}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleMouseOver}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleMouseOver}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={fetchPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
