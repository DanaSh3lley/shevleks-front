import aboutUsImage from '../assets/aboutUsImage.png'
import React from 'react';
import { Typography, Paper } from '@mui/material';
import {Container, styled} from '@mui/system';

const AboutContainer = styled(Container)({
    marginTop: '30px',
    marginBottom: '30px'
});

const AboutContent = styled('div')({
    display: 'flex',
    gap: '100px'
});


const AboutTitle = styled(Typography)({
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center'
});

const AboutText = styled(Typography)({
    fontSize: '28px',
    marginBottom: '24px',
    textAlign: 'justify',
});

const AboutImage = styled('img')({
    width: '500px',
    height: 'auto',
    marginRight: '40px',
});

const AboutUs = () => {
    return (
        <AboutContainer maxWidth={'xl'}>
            <AboutTitle variant="h4">About Us</AboutTitle>
            <AboutContent>
                    <AboutText>
                        Компанія Шевлекс відкрилась ще у 2010 році та є на ринку уже більше 12 років.
                        <br />
                        <br />
                        Засновники:
                        <br />
                        - Вітюк Олексій Євгенович
                        <br />
                        - Шевчук Петро Степанович
                    </AboutText>
                    <AboutImage src={aboutUsImage} alt="About Us Image" />
            </AboutContent>
        </AboutContainer>
    );
};

export default AboutUs;
