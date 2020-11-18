import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom';
import ActionButtons from './ActionButtons'
import { removeFile, editFile } from '../../lib/api/album';

const ReadBlock = styled.div`
    width: 70%;
    padding: 50px 0 0 0;
    margin: 0 auto;
    height: 75%;
    display: flex;
    align-items: center;
    @media(max-width: 1080px) {
        width: 80%;
    }
    @media(max-width: 768px) {
        width: 100%;
    }
`;
const ArrowBackBox = styled.div`
    width: 70px !important;
    height: 100%;
    display: flex;
    align-items: center;
`
const ArrowForwardBox = styled.div`
    width: 70px;
    height: 100%;
    display: flex;
    align-items: center;
`

const ItemBox = styled.div`
    width:90%;
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
`

const BoxBody = styled.div`
    width:100%;
    // height:90%;
    display: flex;
    align-items: center;
    img {
        z-index: -9999;
        margin: 0 auto;
        max-width: 700px;
        max-height: 500px;
        @media(max-width: 1080px) {
            width: 100%;
            // height: 500px;
        }
        @media(max-width: 768px) {
            width: 90%;
        }
    }
`

function ReadAlbum({ album, error, loading, albumIdx}) {
    let abc = Number(albumIdx);    
    if(error) {
        if(error.response && error.response.status === 404) {
            return <ReadBlock>존재하지 않는 포스트입니다.</ReadBlock>
        }
        return <ReadBlock>오류 발생!</ReadBlock>
    }
    
    if(loading || !album) {
        return null; // 그냥넘어가~
    }
    
    const { fileData } = album;
    const len = fileData.files.length; 
    const filename = fileData.files[albumIdx].filename;
    const likes = fileData.files[albumIdx].like;
    
    const onRemove = async () => {
        try {   
            console.log(albumIdx);  
            await removeFile(albumIdx).then(res => {
                console.log('삭제성공!');              
                window.location.href=`http://localhost:3000/kkiri/albums/${abc < len-1 ? abc : (abc-1)}`;
            }).catch(err => {
                console.log(err);
            });
            
        }catch(e) {
            console.log(e);
        }
    }
    const keyid = fileData.files[albumIdx].keyid;

    const onEdit = async () => {
        await editFile(keyid).then(res => {           
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <>
        <ActionButtons onEdit={onEdit} onRemove={onRemove} likes={likes}/>
        <ReadBlock>
            <ArrowForwardBox>
                {albumIdx < len-1 &&
                <Link to={`${parseInt(albumIdx)+1}`}>
                    <IoIosArrowBack size="70" cursor="pointer" color="#ffb6c1"/>
                </Link>
                }
            </ArrowForwardBox>
            <ItemBox>
                <BoxBody>
                <img src={`http://localhost:3000/uploads/${filename}`} alt={filename}/>
                </BoxBody>
            </ItemBox>
            <ArrowBackBox>
                {albumIdx > 0 && 
                <Link to={`${parseInt(albumIdx)-1}`}>
                    <IoIosArrowForward size="70" cursor="pointer" color="#ffb6c1"/>
                </Link>
                }   
            </ArrowBackBox>
        </ReadBlock>
        </>
    );
}

export default React.memo(ReadAlbum);