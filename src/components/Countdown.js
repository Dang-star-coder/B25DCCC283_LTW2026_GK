import React, { useEffect, useState } from 'react';

const Countdown = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const eventTime = new Date(`${date}T00:00:00`).getTime();

    const updateCountdown = () => {
      const difference = eventTime - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft('Sự kiện đã diễn ra');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return <span>{timeLeft}</span>;
};

export default Countdown;
