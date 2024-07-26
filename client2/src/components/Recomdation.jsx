import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Card } from '@mui/material';

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/tags?tags=${tags}`);
        setVideos(res.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (

        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
