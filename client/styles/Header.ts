import styled from 'styled-components'

export const Header = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background-color: white;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0px 20px;
    justify-content: space-between;
    img{
        height: 30px;
        cursor: pointer;
    }
    button{
        border: 0;
        border-radius: 0px 5px 5px 0px;
    }
    input{
        height: 30px;
        width: 400px;
        border: 0;
        background-color: #efefef;
        outline: 0;
        padding: 0px 10px;
        border-radius: 5px 0px 0px 5px;
    }
`

export const GoogleLogin = styled.div`
    height: 30px;
    cursor: pointer;
    background-color: #eee;
    border: 0;
    outline: 0;
    color: #333;
    border: 0;
    width: 70px;
    font-weight: bold;
    border-radius: 5px;
    span{
        padding: 0;
    }
    :hover{
        background-color: #ccc;
    }
`