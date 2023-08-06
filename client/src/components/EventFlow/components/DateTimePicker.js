import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Calendar, TimePicker} from 'antd';

const DateTimePickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateTimePickerForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DateTimePicker = ({getForm, setForm}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onTimePickerSelect = useCallback(
    (e) =>
      setForm((oldForm) => {
        return {
          ...oldForm,
          eventHour: e.$d,
        };
      }),
    [setForm]
  );

  // Minimum date is 1 hour into the future
  const minDate = new Date();
  minDate.setHours(minDate.getHours() + 1);

  // Maximum date is 1 year from now
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <DateTimePickerContainer>
      <DateTimePickerForm>
        <Calendar
          fullscreen={false}
          onSelect={(date) => {
            setSelectedDate(date);
            setForm((oldForm) => {
              return {
                ...oldForm,
                eventDate: date,
              };
            });
          }}
          disabledDate={(current) => current && current < minDate}
        />
        <TimePicker
          size={'large'}
          format={'HH:mm'}
          onSelect={onTimePickerSelect}
          disabled={!selectedDate || selectedDate < minDate || selectedDate > maxDate}
        />
      </DateTimePickerForm>
    </DateTimePickerContainer>
  );
};

export default DateTimePicker;
