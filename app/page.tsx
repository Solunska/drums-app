"use client";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import icon from "../public/plus_icon.png";
import closeIcon from "../public/close.png";

const sounds = {
  "Crash Cymbal": "/crash-cymbal.mp3",
  "Snare Drum": "/snare-drum.mp3",
  "Long Ride Cymbal": "/long-ride-cymbal.mp3",
  "Tom": "/tom.mp3",
  "Hi-Hat": "/hi-hat.mp3",
  "Floor Tom": "/floor-tom.mp3",
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6.5em;
  align-items: center;
  padding: 6em 10em;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
  width: 100%;
`;

const Header = styled.h1`
  color: white;
  width: 100%;
  font-weight: 400;
`;

const DrumSlotContainer = styled.div<{ assigned: boolean }>`
  background-color: ${({ assigned }) => (assigned ? "#1C1C1C" : "#2B2B2B")};
  border: 1px solid ${({ assigned }) => (assigned ? "#FFFFFF99" : "#ffffff33")};
  border-radius: 1em;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: ${({ assigned }) => (assigned ? "start" : "center")};
  align-items: ${({ assigned }) => (assigned ? "start" : "center")};
  font-size: 2em;
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  padding: ${({ assigned }) => (assigned ? "1em" : "0")};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 21em;
  height: 20em;
  background: #000;
  padding: 2.75em 3em;
  border-radius: 1em;
  text-align: center;
  position: relative; 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.01em;
  right: 0.01em; 
  width: 2.5em;
  height: 2.5em;
  background-color: white;
  color: black;
  font-size: 1.5em;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  z-index: 1;
`;

const StyledLabel = styled.p`
  color: white;
  font-size: 1.4em;
  width: 100%;
  text-align: start;
  margin: 0;
`;
const StyledDropdown = styled.select`
  background-color: #ffffff1a;
  color: white;
  width: 100%;
  padding: 0.5em 1.6em;
  font-size: 1.16em;
  border: none;
  border-radius: 2em;
  appearance: none;
  padding-right: 2.5em;
  position: relative;

  background-image: url("/arrow.png");
  background-position: right 1em center;
  background-repeat: no-repeat;
  background-size: 1.2em;
`;

const StyledInput = styled.input`
  background-color: #ffffff1a;
  color: white;
  padding: 0.5em;
  padding-left: 1.6em;
  font-size: 1.16em;
  border: none;
  border-radius: 2em;
`;

const ModalMainContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;s
  width:100%;
  height: 100%;
`;

const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const StyledButton = styled.button`
  width: 100%;
  font-size: 1.2em;
  padding: 0.5em 0;
  border-radius: 2em;
  text-transform: uppercase;
  font-weight: 900;
  background-color: #0085ff;
  color: white;
  border: none;
`;

const StyledOption = styled.option`
  background-color: #000;
  color: white;
  font-size: 1.16em;
  border: none;
`;

const DrumSlot = ({
  onClick,
  assignedKey,
}: {
  index: number;
  onClick: () => void;
  assignedKey: string;
}) => {
  return (
    <DrumSlotContainer assigned={!!assignedKey} onClick={onClick}>
      {assignedKey || <Image src={icon} alt="Plus icon" />}
    </DrumSlotContainer>
  );
};

const Modal = ({
  index,
  onClose,
  onAssign,
}: {
  index: number;
  onClose: () => void;
  onAssign: (index: number, key: string, sound: string) => void;
}) => {
  const [key, setKey] = useState("");
  const [sound, setSound] = useState("");

  const handleSubmit = () => {
    if (key && sound) {
      onAssign(index, key, sound);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <Image src={closeIcon} alt="Close icon" />
        </CloseButton>
        <ModalMainContainer>
          <StyledGroup>
            <StyledLabel>Drum Sample</StyledLabel>
            <StyledDropdown
              value={sound}
              onChange={(e) => setSound(e.target.value)}
            >
              <StyledOption value="">Select Sound</StyledOption>
              {Object.keys(sounds).map((soundName) => (
                <StyledOption key={soundName} value={soundName}>
                  {soundName}
                </StyledOption>
              ))}
            </StyledDropdown>
          </StyledGroup>
          <StyledGroup>
            <StyledLabel>Keyboard Shortcut</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Press a key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              maxLength={1}
            />
          </StyledGroup>
          <StyledButton onClick={handleSubmit}>Save</StyledButton>
        </ModalMainContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default function Home() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [slots, setSlots] = useState<{ key: string; sound: string }[]>(
    Array(12).fill({ key: "", sound: "" })
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const slot = slots.find((slot) => slot.key === event.key);
      if (slot && slot.sound) {
        new Audio(sounds[slot.sound]).play();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [slots]);

  const handleAssign = (index: number, key: string, sound: string) => {
    const newSlots = [...slots];
    newSlots[index] = { key, sound };
    setSlots(newSlots);
    setSelectedSlot(null);
  };

  return (
    <MainContainer>
      <Header>Drum Machine</Header>
      <Container>
        {slots.map((slot, i) => (
          <DrumSlot
            key={i}
            index={i}
            onClick={() => setSelectedSlot(i)}
            assignedKey={slot.key}
          />
        ))}
      </Container>
      {selectedSlot !== null && (
        <Modal
          index={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onAssign={handleAssign}
        />
      )}
    </MainContainer>
  );
}
