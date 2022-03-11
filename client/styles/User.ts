import styled from 'styled-components'

export const Body = styled.div`
    position: relative;
    height: 506px;
    padding-top: 70px;
    width: 1250px;
    left: 50%;
    transform: translateX(-50%);

    video{
        height: 506px;
        width: 950px;
        background-color: black;
    }
`

export const VideoDiv = styled.div`
    display: flex;
`

export const ChatBorder = styled.div`
    height: 506px;
    width: 300px;
    border: 1px solid #eee;
    box-sizing: border-box;
`

export const ChatList = styled.ul`
    overflow-y: auto;
    list-style: none;
    width: 300px;
    height: 386px;
    display: flex;
    flex-direction: column;
    padding: 10px 0px 10px 0px;
    margin: 0;
    box-sizing: border-box;
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #efefef;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0);
    }
`

export const InputDiv = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    input{
        border-radius: 5px;
        padding: 9px 10px;
        outline: 0;
        border: 2px solid #772ce8;
        width: 100%
    }
    button{
        margin-top: 5px;
        background-color: #772ce8;
        width: 100%;
        color: white;
        border: 0;
        border-radius: 5px;
        height: 60px;
        cursor: pointer;
        font-weight: bold;
        font-size: 17px
    }
`

export const InfoDiv = styled.div`
    margin-top: 20px;
    display: flex;
    img{
        height: 60px;
        border-radius: 50%;
    }
`