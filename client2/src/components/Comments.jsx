import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({videoId}) => {

const [comment ,setcomment] = useState([])
useEffect(()=>{
const fetchcomments = async()=>{
  try {
    const res = await axios.get(`/comments/${videoId}`)
    
    setcomment(res.data)

    
  } catch (error) {
    
  }
}
fetchcomments()
},[videoId])

const { currentuser } = useSelector((state) => state.user);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentuser.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
     {comment.map(comment=>(

      <Comment key={comment._id} comment={comment}/>
     ))}
    </Container>
  );
};

export default Comments;
