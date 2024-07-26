import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import Uplod from "./Uplod";


const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  color: ${({ theme }) => theme.text};

  border: none;
  background-color: transparent;
  outline: none;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar2 = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const  navigate = useNavigate()
  const { currentuser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [q, setq] = useState("");

  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search"  onChange={e=>setq(e.target.value)}/>
          <SearchOutlinedIcon onClick={()=>{navigate(`search?q=${q}`)}} />
        </Search>
        {currentuser ? (
          <User>
            <VideoCallOutlinedIcon  onClick={() => setOpen(true)} />
            <Avatar2 src={currentuser.img}  />
            {currentuser.name}
          </User>
        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
    {open && <Uplod setOpen={setOpen} />}
        </>
  );
};

export default Navbar;
