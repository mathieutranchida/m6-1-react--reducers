import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";
import Seat from "./Seat";

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
  } = useContext(SeatContext);

  const { actions } = useContext(BookingContext);

  const { beginBookingProcess } = actions;

  if (!hasLoaded) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);
        return (
          <Row key={rowIndex}>
            <RowLabel>{rowName}</RowLabel>
            {range(seatsPerRow).map((seatIndex) => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seat = seats[seatId];
              return (
                <SeatWrapper
                  key={seatId}
                  disabled={seat.isBooked ? true : false}
                  onClick={() => {
                    beginBookingProcess({
                      price: seat.price,
                      selectedSeatId: seatId,
                    });
                  }}
                >
                  <Seat
                    rowName={rowName}
                    seatIndex={seatIndex}
                    width={36}
                    height={36}
                    price={seat.price}
                    status={seat.isBooked ? "unavailable" : "available"}
                    isBooked={seat.isBooked}
                  />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0px;
`;

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  width: 630px;
  margin: 100px auto;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  /* &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  } */
`;

const RowLabel = styled.div`
  font-weight: bold;
  font-size: 18pt;
  padding: 0px 20px;
  width: 50px;
  margin: 0px auto;
  color: black;
`;

const SeatWrapper = styled.button`
  padding: 5px;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default TicketWidget;
