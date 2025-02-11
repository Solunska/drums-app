'use client'

import DrumSlot from "./DrumSlot";
import styled from '@emotion/styled';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6.5em;
  align-items: center;
  padding: 6em 10em;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1rem; 
  width:100%
`

const Header = styled.h1`
  color: white;
  width: 100%;
  font-weight: 400;
`

export default function Home() {
  const items = [...Array(12)];

  return (
    <MainContainer>
      <Header>Drum Machine</Header>
      <Container>
        {items.map((_, i) => (
          <DrumSlot key={i} />
        ))}
      </Container>
    </MainContainer>
  );
}
