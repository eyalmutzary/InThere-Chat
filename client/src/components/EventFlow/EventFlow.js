import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
// import {Input} from 'antd';
import Logo from '../../assets/logo.png';
import {DateTimePicker, DetailsStage, LocationPicker, MemberLimit, Progress} from './components';
import {Button, Icon} from '../shared';
import {useNavigate} from 'react-router-dom';
import {convertToDayMonth, convertToHHmm} from '../shared/utils';
import {useSelector} from 'react-redux';
import {firestore} from '../../firebase';
import {addDoc, collection,} from "firebase/firestore";


const ScreenContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  //height: 100svh;
    // background-color: ${({theme}) => theme.colors.container};

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

// const MapWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

const BackIcon = styled(Icon)`
  font-size: 30px;
  color: ${({theme}) => theme.colors.black};
  margin: 20px 0 0 20px;
  position: fixed;
`;

const BackButton = styled(Button)`
  background: ${({theme}) => theme.colors.white};
  border: 2px solid ${({theme}) => theme.colors.main1};
  color: ${({theme}) => theme.colors.main1};
`;

const EventFlow = () => {
  const user = useSelector((state) => state.auth.user);
  const [stage, setStage] = useState(1);
  const [form, setForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    eventHour: '',
    eventLocation: '',
    membersLimit: '',
  });
  const navigate = useNavigate();

  const onTimePickerSelect = useCallback((e) => setForm((oldForm) => {
    return {
      ...oldForm,
      eventHour: e.$d,
    };
  }), [])

  const createEventObject = () => {

    const event = {
      ...form,
      eventDate: convertToDayMonth(form.eventDate),
      eventHour: convertToHHmm(form.eventHour),
      membersLimit: Number(form.membersLimit),
      createdAt: new Date().toISOString(),
      membersRegistered: 0,
      room: user.location,
      createdBy: user.name,
      createdByUid: user.uid,
      members: [user.uid],
    };
    return event;
  };

  
  const createEvent = (event) => {  
    addDoc(collection(firestore, 'Events'), event);
  };

  const handleNextStage = () => {
    if (stage === 4) {
      const event = createEventObject();
      createEvent(event);
      navigate('/chat');
    } else {
      setStage(stage + 1);
    }

  };


  return (
    <>
      <BackIcon name="arrow-left" onClick={() => navigate(-1)}/>
      <ScreenContainer>
        <ColWrapper>
          <LogoImage src={Logo}/>
          <Progress stageNum={stage}/>
          {stage === 1 && <DetailsStage form={form} setForm={setForm}/>}
          {stage === 2
            && (
              <DateTimePicker form={form} setForm={setForm}/>
            )}

          {/*<MapWrapper>*/}
          {stage === 3
            && (
              // <ErrorBoundary>
              <LocationPicker form={form} setForm={setForm}/>
              // </ErrorBoundary>
            )}
          {/*</MapWrapper>*/}

          {stage === 4 && <MemberLimit membersLimit={form.membersLimit} setForm={setForm}/>}

        </ColWrapper>

        <div>
          {stage > 1 && <BackButton onClick={() => setStage(stage - 1)} disabled={stage === 1}>Back</BackButton>}
          <Button onClick={handleNextStage}>{stage === 4 ? 'Submit' : 'Next'}</Button>
        </div>

      </ScreenContainer>
    </>
  );
};

export default EventFlow;
//
// <>
//   <Map/>
//   <Input
//     style={{fontSize: '24px', marginTop: '40px'}}
//     placeholder="Event Location"
//     onChange={(e) => setForm((oldForm) => {
//       return {
//         ...oldForm,
//         eventLocation: e.target.value,
//       };
//     })}
//   />
// </>