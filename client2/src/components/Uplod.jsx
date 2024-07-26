import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styled from 'styled-components';
import app from "../Firebase"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 10, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;`


const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bglight};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
;
`
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
;
`
const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
;
`
const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
   background-color: ${({ theme }) => theme.bglight};
`;

const Desc = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

`;

const Label = styled.label`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
`;

const StyledButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
    &:hover {
      background-color: ${({ theme }) => theme.primaryDark};
    }
  }
`;

const Uplod = ({ setOpen }) => {
    const [img, setimg] = useState(undefined)
    const [video, setvideo] = useState(undefined)
    const [imgperc, setimgperc] = useState(0)
    const [videperc, setvideoperc] = useState(0)
    const [inputs, setinputs] = useState({})
    // const [desc, setdesc] = useState("")
    const [tags, settags] = useState([])

    const handletags = (e) => {
        settags(e.settags.target.value.splie(","))
    }

    const handlechange=(e)=>{
        setinputs((prev)=>{
            return{...prev,[e.target.name]:e.target.value}
        })
    }

    const handleuplod = async(e)=>{
        e.preventDefualt()
        const res = await axios.post("/videos",{...inputs, tags})
        setOpen(false)
        res.status===200 && navigation(`/video/${res.data._id}`)
        }

        const navigation = useNavigate()
    const Uploadfile = (file, urlType) => {

        const storage = getStorage(app);
        const fileName = new Date().gettime+ file.name
        const storageRef = ref(storage, file.name)


        const uploadTask = uploadBytesResumable(storageRef, file, );
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === "imgUrl" ?  setimgperc(Math.round(progress)):setvideoperc(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => { },() => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setinputs((prev)=>{
                        return{...prev, [urlType]:downloadURL}
                    })
                });
              }
        );
    }
    useEffect(() => {
      video &&  Uploadfile(video,"videoUrl")
    }, [video])
    useEffect(() => {
        img && Uploadfile(img ,"imgUrl")
    }, [img])

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>x</Close>
                <Title>Upload the video</Title >
                <Label>Video:</Label>
              { videperc >  0 ?("uploding:"+videperc +"") :( <Input type="file" accept="video/*" onChange={e => setvideo(e.target.files[0])} />)}
                <Input type="text" placeholder="Title" onChange={handlechange} />
                <Desc placeholder="Description" rows={8} onChange={handlechange} />
                <Input type="text" placeholder="Messages..." onChange={handletags} />
                <Label>Thumbnail:</Label>
          {imgperc > 0 ?("uplodingimg" +imgperc +"%"):      (<Input type="file" accept="image/*" onChange={e => setimg(e.target.files[0])} />)}
                <StyledButton onClick={handleuplod}>Upload</StyledButton>
            </Wrapper>
        </Container>
    );
};

export default Uplod;
