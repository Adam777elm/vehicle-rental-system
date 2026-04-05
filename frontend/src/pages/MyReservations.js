import React,
{
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function MyReservations() {

  const [reservations,
    setReservations
  ] = useState([]);

  useEffect(() => {

    const getReservations =
      async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/reservations/my",
            {
              headers: {
                Authorization:
                  "Bearer " + token,
              },
            }
          );

        setReservations(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

    getReservations();

  }, []);

  return (
    <div>

      <h2>
        My Reservations
      </h2>

      {reservations.map((r) => (

        <div key={r._id}>

          <p>
            Vehicle:
            {r.vehicle.name}
          </p>

          <p>
            Status:
            {r.status}
          </p>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default MyReservations;