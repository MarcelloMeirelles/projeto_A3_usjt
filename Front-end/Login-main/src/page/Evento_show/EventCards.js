import React from "react";

const EventCards = ({ events }) => {
  return (
    <div className="event-cards">
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <h3>{event.banda.nome}</h3>
          <p>Data: {event.data}</p>
          <p>Horário: {event.horario}</p>
          <p>Local: {event.local}</p>
        </div>
      ))}
    </div>
  );
};

export default EventCards;
