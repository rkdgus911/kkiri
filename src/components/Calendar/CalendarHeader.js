import React from 'react';
import styled from 'styled-components';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAdd,
} from 'react-icons/md';

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 5%;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  background: #ffffff;
  font-size: 2rem;
  color: #999;
  &:hover {
    color: #ff838da0;
  }
  &:focus {
    outline: none;
  }
`;
const TodayButton = styled(Button)`
  margin: 5px 0;
  border-radius: 10px;
  font-size: 1.4rem;
  color: ${(props) => (props.isToday ? '#ff838d' : '#919191')};
  &:hover {
    background: #ff838da0;
    color: #fff;
  }

  @media ${(props) => props.theme.middle} {
    font-size: 1.2rem;
  }
`;
const CurrentRange = styled.h2`
  width: 200px;
  margin: 0;
  text-align: center;
  font-size: 1.8rem;
  cursor: context-menu;
  color: ${(props) => (props.isToday ? '#ff838d' : '#919191')};

  @media ${(props) => props.theme.middle} {
    font-size: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media ${(props) => props.theme.mobile} {
    font-size: 1rem;
  }
`;
const AddButtonBlock = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 75%;
  height: 100%;
`;
const AddButton = styled(Button)`
  background: transparent;
  color: #999;

  &:hover {
    color: #ff838d;
  }
  &:hover + div.msg {
    display: flex;
  }
  transition: ease 0.3s;
  ${({ isOpen }) => (isOpen ? `transform: rotate(45deg); color: #ff838d` : ``)};

  @media ${(props) => props.theme.mobile} {
    &:hover + div.msg {
      display: none;
    }
  }
`;
const Message = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #fff;
  background: #ff838d;
  border-radius: 5px;
`;

const CalendarHeader = ({
  onMoveToPrevRange,
  onMoveToNextRange,
  onMoveToToday,
  isToday,
  year,
  month,
  onOpenForm,
  isOpen,
}) => {
  return (
    <ButtonsBlock>
      <Button onClick={onMoveToPrevRange}>
        <MdKeyboardArrowLeft />
      </Button>
      <CurrentRange isToday={isToday}>
        {year}년 {month}월
      </CurrentRange>
      <Button onClick={onMoveToNextRange}>
        <MdKeyboardArrowRight />
      </Button>
      <TodayButton onClick={onMoveToToday} isToday={isToday}>
        Today
      </TodayButton>
      <AddButtonBlock>
        <AddButton onClick={onOpenForm} isOpen={isOpen}>
          <MdAdd />
        </AddButton>
        <Message className="msg">캘린더 필터 추가</Message>
      </AddButtonBlock>
    </ButtonsBlock>
  );
};

export default CalendarHeader;
