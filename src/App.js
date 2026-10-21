import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Layout from './components/Layout';
import Home from './pages/Home';
import EventList from './pages/EventList';
import AddEvent from './pages/AddEvent';
import EventDetail from './pages/EventDetail';

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('gk_events');
    if (savedData) {
      setEvents(JSON.parse(savedData));
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    axios.get('/data/events.json', { signal: controller.signal })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && events.length > 0) {
      localStorage.setItem('gk_events', JSON.stringify(events));
    }
  }, [events, loading]);

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleRegisterEvent = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id && event.registered < event.capacity
          ? { ...event, registered: event.registered + 1 }
          : event
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home events={events} loading={loading} error={error} />} />
        <Route
          path="events"
          element={
            <EventList
              events={events}
              loading={loading}
              error={error}
              onDelete={handleDeleteEvent}
              onRegister={handleRegisterEvent}
            />
          }
        />
        <Route path="events/new" element={<AddEvent events={events} onAdd={handleAddEvent} />} />
        <Route path="events/:id" element={<EventDetail events={events} />} />
      </Route>
    </Routes>
  );
};

export default App;
