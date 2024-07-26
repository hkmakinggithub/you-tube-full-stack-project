import React, { useState , useEffect} from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from 'axios';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type }) => {

const [video,setVideo] = useState([])
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`/videos/${type}`);
      setVideo(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  fetchData();
}, [type]);


  return (
    <Container>
      {video.map(video=>(

      <Card key={video._id} video={video} />
      ))}
     
    </Container>
  );
};

export default Home;
