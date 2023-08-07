import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, Form, Input, Select, Space} from 'antd';
import {Icon} from '../shared';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {firestore} from '../../firebase';


const FormWrapper = styled.div`
  padding: 10px 30px 30px 30px;
  background-color: ${({theme}) => theme.colors.background};
  height: 100vh;
  overflow: auto;
`;

const Text = styled.div`
  font-size: 20px;
`;

const BackIcon = styled(Icon)`
  font-size: 30px;
  color: ${({theme}) => theme.colors.black};
  margin: 20px 0 0 20px;
`;

const FormItem = styled(Form.Item)`
  background-color: ${({theme}) => theme.colors.container};
  border-radius: 10px;
  padding: 12px;
`;

const ColoredInput = styled(Input)`
  background-color: ${({theme}) => theme.colors.subContainer};
  border-radius: 10px;
  border: none;
  font-size: 20px;
  color: ${({theme}) => theme.colors.mainText};
  margin: 8px;
  width: 80%;
`;


const HOBBIES_DUMMY_DATA = [{
  label: 'Basketball',
  value: 'Basketball',
}, {
  label: 'Soccer',
  value: 'Boccer',
}, {
  label: 'Tennis',
  value: 'Tennis',
}, {
  label: 'Volleyball',
  value: 'Volleyball',
}, {
  label: 'Hiking',
  value: 'Hiking',
}, {
  label: 'Running',
  value: 'Running',
}, {
  label: 'Swimming',
  value: 'Swimming',
}, {
  label: 'Netflix',
  value: 'Netflix',
}, {
  label: 'Gaming',
  value: 'Gaming',
}, {
  label: 'Reading',
  value: 'Reading',
}, {
  label: 'Cooking',
  value: 'Cooking',
}, {
  label: 'Baking',
  value: 'Baking',
}, {
  label: 'Gardening',
  value: 'Gardening',
}, {
  label: 'Photography',
  value: 'Photography',
}, {
  label: 'Painting',
  value: 'Painting',
}];

const EditProfile = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid');

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [formState, setFormState] = useState({
    phone: '',
    instagramUrl: '',
    facebookUrl: '',
    about: '',
    intrests: [],
  });


  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firestore
      .collection('users')
      .where('uid', '==', uid)
      .onSnapshot((snapshot) => {
        const user = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIsLoading(false);
        setUserDetails(user[0] ?? {});
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFormState({
      phone: userDetails.phone ?? '',
      instagramUrl: userDetails.instagramUrl ?? '',
      facebookUrl: userDetails.facebookUrl ?? '',
      about: userDetails.about ?? '',
      intrests: userDetails.intrests  ?? [],
      });
  }, [userDetails]);

  const onFinish = () => {
    const user = {
      ...userDetails,
      ...formState,
    };
  
    firestore
      .collection('users')
      .doc(userDetails.uid)
      .update(user)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch((error) => {
        console.log('Error updating user:', error);
      });

      navigate(-1);
  };

  return (
    <>
        
        <FormWrapper>
          <BackIcon name="arrow-left" onClick={() => navigate(-1)} />
            {isLoading ? <div>Loading...</div> :
              <Form form={form} autoComplete="off" onFinish={onFinish}>
                <FormItem
                  name="phone"
                >
                  <Text>Phone Number:</Text>
                  <ColoredInput size={'large'} style={{height: 50, fontSize: 20}} defaultValue={userDetails.phone}
                                onChange={(e) => setFormState((oldState) => {
                                  return {...oldState, phone: e.target.value}
                                })}/>
                </FormItem>
                <FormItem
                  name="instagramUrl"
                >
                  <Text>Instagram URL:</Text>
                  <ColoredInput size={'large'} style={{height: 50, fontSize: 20}}
                                defaultValue={userDetails.instagramUrl} onChange={(e) => setFormState((oldState) => {
                    return {...oldState, instagramUrl: e.target.value}
                  })}/>
                </FormItem>
                <FormItem
                  name="facebookUrl"
                >
                  <Text>Facebook URL:</Text>
                  <ColoredInput size={'large'} style={{height: 50, fontSize: 20}} defaultValue={userDetails.facebookUrl}
                                onChange={(e) => setFormState((oldState) => {
                                  return {...oldState, facebookUrl: e.target.value}
                                })}/>
                </FormItem>
                <FormItem
                  name="about"
                >
                  <Text>About:</Text>
                  <ColoredInput.TextArea maxLength={200} size={'large'} style={{height: 180, fontSize: 20}}
                                         defaultValue={userDetails.about} onChange={(e) => setFormState((oldState) => {
                    return {...oldState, about: e.target.value}
                  })}/>
                </FormItem>

                <FormItem>
                  <Text>Intrests:</Text>
                  <Select
                    size={'large'}
                    mode="multiple"
                    style={{width: '100%', fontSize: 20}}
                    placeholder="Please select"
                    defaultValue={userDetails?.intrests ?? []}
                    onChange={(interstsList) => setFormState((oldState) => {
                      return {...oldState, intrests: interstsList}
                    })}
                    options={HOBBIES_DUMMY_DATA}
                  />
                </FormItem>

                <FormItem>
                  <Space>
                    <Button type="primary" htmlType="submit"
                            style={{width: 100, height: 60, fontSize: 20, backgroundColor: "#9381ff"}}>Submit</Button>
                    {/* <Button htmlType="reset" style={{ width: 100, height: 60, fontSize: 20 }}>Reset</Button> */}
                  </Space>
                </FormItem>
            </Form>}
        </FormWrapper>
    </>
    
  );
};

export default EditProfile;