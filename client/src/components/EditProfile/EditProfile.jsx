import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Select, Space } from 'antd';
import { Icon } from '../shared';
import { useNavigate } from 'react-router';

const FormWrapper = styled.div`
    padding: 30px;
`;

const Text = styled.div`
    font-size: 24px;
`;

const BackIcon = styled(Icon)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.black};
  margin: 20px 0 0 20px;
`;

const HOBBIES_DUMMY_DATA = [{
  label: 'Basketball',
  value: 'basketball',
}, {
  label: 'Soccer',
  value: 'soccer',
}, {
  label: 'Tennis',
  value: 'tennis',
}, {
  label: 'Volleyball',
  value: 'volleyball',
}, {
  label: 'Hiking',
  value: 'hiking',
}, {
  label: 'Running',
  value: 'running',
}, {
  label: 'Swimming',
  value: 'swimming',
}, {
  label: 'Netflix',
  value: 'netflix',
}, {
  label: 'Gaming',
  value: 'gaming',
}, {
  label: 'Reading',
  value: 'reading',
}, {
  label: 'Cooking',
  value: 'cooking',
}, {
  label: 'Baking',
  value: 'baking',
}, {
  label: 'Gardening',
  value: 'gardening',
}, {
  label: 'Photography',
  value: 'photography',
}, {
  label: 'Painting',
  value: 'painting',
}];

const EditProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
        <BackIcon name="arrow-left" onClick={() => navigate(-1)} />
        <FormWrapper>

            <Form form={form} autoComplete="off" onFinish={onFinish}>
                <Form.Item 
                    name="phoneNumber"
                >
                    <Text>Phone Number:</Text>
                    <Input size={'large'} style={{ height: 70, fontSize: 24 }}/>
                </Form.Item>
                <Form.Item
                    name="instagram"
                >
                    <Text>Instagram URL:</Text>
                    <Input size={'large'} style={{ height: 70, fontSize: 24 }}/>
                </Form.Item>
                <Form.Item
                    name="facebook"
                >
                    <Text>Facebook URL:</Text>
                    <Input size={'large'} style={{ height: 70, fontSize: 24 }}/>
                </Form.Item>
                    <Form.Item
                    name="description"
                    >
                    <Text>Description:</Text>
                    <Input.TextArea maxLength={200} size={'large'} style={{ height: 180, fontSize: 24 }}/>
                </Form.Item>

                <Form.Item>
                    <Text>Intrests:</Text>
                    <Select
                        size={'large'}
                        mode="multiple"
                        style={{ width: '100%', fontSize: 20 }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={()=>{}}
                        options={HOBBIES_DUMMY_DATA}
                    /> 
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" style={{ width: 100, height: 60, fontSize: 20 }}>Submit</Button>
                        <Button htmlType="reset" style={{ width: 100, height: 60, fontSize: 20 }}>Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </FormWrapper>
    </>
    
  );
};

export default EditProfile;