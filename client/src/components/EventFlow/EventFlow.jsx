import React, { useState } from 'react';
import styled from 'styled-components';
// import { DateCalendar } from '@mui';
import { Calendar, DatePicker, Space } from 'antd';

import Logo from '../../assets/logo.png';
import { Layout } from '../shared/components';
import { DetailsStage, Progress, Map, MemberLimit } from './components';
import { Button } from '../shared';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const ScreenContainer = styled(Layout)`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 90svh;
`;

const LogoImage = styled.img`
    width: 140px;
    height: 140px;
    object-fit: contain;
`;

const ColWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

`;

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  jutify-content: center;
`;

const EventFlow = () => {
  const [stage, setStage] = useState(1);
  const [date, setDate] = useState(null);
  const [membersLimit, setMembersLimit] = useState('');


  const handleNextStage = () => {
    if (stage === 4) {
      console.log('submit');
    } else {
      setStage(stage + 1);
    }
    
  };


  
  return (
    <ScreenContainer>
        <ColWrapper>
            <LogoImage src={Logo} />
            <Progress stageNum={stage}/> 
            {stage === 1 && <DetailsStage />}
            {/* <DateCalendar
                // defaultValue={dayjs('2022-04-17')}
                views={['year', 'month', 'day']}
            /> */}

            {/* <DatePicker onChange={() => {}} /> */}
            {stage === 2 && <Calendar fullscreen={false} onSelect={(e) => setDate(e.$d)}/>}
            <MapWrapper>
                {stage === 3 && <Map />}
            </MapWrapper>
            {stage === 4 && <MemberLimit membersLimit={membersLimit} setMembersLimit={setMembersLimit} />}
            
        </ColWrapper>

        <Button onClick={handleNextStage}>{stage === 4 ? 'Submit' : 'Next'}</Button>
    </ScreenContainer>
  );
};

export default EventFlow;