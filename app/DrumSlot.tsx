import React from 'react'
import styled from '@emotion/styled';
import icon from '../public/plus_icon.png';
import Image from 'next/image';

const DrumSlotContainer = styled.div`
    background-color: #1C1C1C;
    border: 1px solid #FFFFFF33;
    border-radius: 1em;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DrumSlot = () => {
    return (
        <DrumSlotContainer>
            <Image src={icon} alt="Plus icon" />
        </DrumSlotContainer>
    )
}

export default DrumSlot
