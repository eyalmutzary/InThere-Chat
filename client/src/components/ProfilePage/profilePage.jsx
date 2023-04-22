import React, { useCallback } from 'react';
// import { Button, Icon } from '../shared';
import styled from "styled-components";
import { Button, Icon } from '../shared';
// import { Link, useHistory } from 'react-router-dom';
import faceBookLogo from '../../assets/facebookLogo.png';
import instagramIcon from '../../assets/instagramIcon.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`

const ContainerCard = styled.div`
    margin: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 100%;
    padding: 12px;

`

const ProfileContainer = styled(ContainerCard)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.black};
`
const ContentContainer = styled(ContainerCard)`
    background-color: ${({ theme }) => theme.colors.main3};
    color: ${({ theme }) => theme.colors.black};
`


const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
`

const ProfileName = styled.div`
    font-size: 26px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white};
    margin-top: 20px;
`
const OriginFrom = styled.div`
    font-size: 20px;
    /* font-weight: bold; */
    color: ${({ theme }) => theme.colors.darkGray};
    margin-top: 8px;
    display: flex;
    flex-direction: row;
`

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const CircleButton = styled(Button)`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.black};
    /* shadow */
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`

const IconImage = styled.img`
    width: 22px;
    height: 22px;
    /* border-radius: 50%; */
    object-fit: cover;
`

const Precentage = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-left: 8px;
`

const ProgressBarWrapper = styled.div`
    width: 100%;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.colors.white};
    border-radius: 4px;
`

const ProgressBar = styled.div`
    width: ${({ precentage }) => precentage + "%" };
    height: 16px;
    background-color: ${({ theme }) => theme.colors.main1};
    border-radius: 4px;
`

const Title = styled.div`
    font-size: 22px;
    margin-bottom: 12px;
`

const Text = styled.div`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.black};
`

const colors = ['#D943C1', '#F24A4A', '#43D9BE', '#46D943', '#f9d657'];


const Tag = styled.div`
    font-size: 22px;
    color: ${({ theme }) => theme.colors.black};
    margin: 8px;
    background-color: ${({color}) => color};
    padding: 4px 12px;
    border-radius: 100px;
`

const TagsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const dummyTags = [
    {
        id: 1,
        name: "Travel",
    },
    {
        id: 2,
        name: "Food",
    },
    {
        id: 3,

        name: "Music",
    },
    {
        id: 4,
        name: "Art",
    },
    {
        id: 5,
        name: "Sport",
    },
    {
        id: 6,
        name: "Nature",
    },
]

const ProfilePage = (props) => {

    const getRandomColor = useCallback(() => {
        return colors[Math.floor(Math.random()*colors.length)];
    },[]);

    const Tags = dummyTags && dummyTags.map((tag) => { return <Tag key={tag.id} color={getRandomColor()}>{tag.name}</Tag> })

    return (
        <Container>
            <ProfileContainer>
                <ProfileImage src={"https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=430&q=80"}/>
                <ProfileName>Aria Johnson</ProfileName>
                <OriginFrom><Icon name={"globe"}/>&nbsp;&nbsp;Israel, Hebrew</OriginFrom>
                <RowWrapper>
                    <CircleButton>
                        <Icon name={"comment"} />
                    </CircleButton>
                    <CircleButton>
                        <IconImage src={instagramIcon}/>
                    </CircleButton>
                    <CircleButton>
                        <IconImage src={faceBookLogo}/>
                    </CircleButton>
                </RowWrapper>
            </ProfileContainer>

            <ContentContainer>
                <Title>Level 3: Long tripper</Title>
                <RowWrapper>
                    <ProgressBarWrapper>
                        <ProgressBar precentage={50}/>
                    </ProgressBarWrapper>
                    <Precentage>50%</Precentage>
                </RowWrapper>
            </ContentContainer>

            <ContentContainer>
                <Title>About Me</Title>
                <Text>
                    I'm Aria, an adventurous girl on a long journey to meet new people and make unforgettable memories. Join me!
                </Text>
            </ContentContainer>
            <TagsContainer>
                {Tags}
            </TagsContainer>

        </Container>

)};

export default ProfilePage;