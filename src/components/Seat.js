import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";

import seatImg from "../assets/seat-available.svg";

const Seat = ({ rowName, seatIndex, price, status, isBooked }) => {
  if (!isBooked) {
    return (
      <Tippy content={`Row ${rowName}, Seat ${seatIndex} - $${price}`}>
        <SeatUnit src={seatImg} alt={status} width={36} height={36} />
      </Tippy>
    );
  } else {
    return (
      <SeatUnitUnavailable src={seatImg} alt={status} width={36} height={36} />
    );
  }
};

const SeatUnit = styled.img``;

const SeatUnitUnavailable = styled.img`
  filter: grayscale(100%);
`;

export default Seat;
