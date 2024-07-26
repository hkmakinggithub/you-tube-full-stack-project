import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess } from "../redux/videoSlice";
import { like } from "../redux/videoSlice";
import { dislike } from "../redux/videoSlice";
import { Subscription } from "../redux/userSlice";

import { format } from "timeago.js";
import Recomdation from "../components/Recomdation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
max-height:720px;
width:100%;
object-fit:cover;
`

const Video = () => {
  const { currentuser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        console.error("Failed to fetch video or channel data", error);
      }
    };
    fetchData();
  }, [path, dispatch]);

  


  const handleLike = async () => {
   
     await axios.put(`/users/like/${currentVideo._id}`) 
    dispatch(like(currentuser._id))
     
    
  }

  const handleDislike = async () => {

         await axios.put(`/users/dislike/${currentVideo._id}`)
         dispatch(dislike(currentuser._id))
   
  }
  const handlesub = async ()=>{
currentuser.subscribedUsers.includes(channel._id)?
await axios.put(`/users/unsub/${channel._id}`):

    await axios.put(`/users/sub/${channel._id}`);
    dispatch(Subscription(channel._id))
  }
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="720"
            src="https://www.youtube.com/embed/2WKqQivSkkI?si=eYHtLUKF1W1hF-fR"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <VideoFrame src={currentVideo.VideoUrl} controls/>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentuser._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              {" "} {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentuser._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />}
              {" "} {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} alt="Channel Avatar" />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{channel.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handlesub}>{currentuser.subscribedUsers?.includes(channel._id)?"Subscribed":"unSubscribe"}</Subscribe>
        </Channel>
        <Hr />  
        <Comments videoId={currentVideo._id} />
      </Content>
      {/* Uncomment and customize Recommendation component if needed */}
     <Recomdation tags={currentVideo.tags}/>
    </Container>
  );
};

export default Video;
