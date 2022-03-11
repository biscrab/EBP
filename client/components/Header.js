import * as S from '../styles/Header'
import {GoogleLogin} from 'react-google-login'
import Link from 'next/link'

const Header = () => {

    const clientId = "236232072754-81f153ainje620b38lonfi9u4r6qv3cc.apps.googleusercontent.com";

    const onSuccess = async(response) => {
    	document.cookie = `account=${JSON.stringify(response)}`;
    
        const { googleId, profileObj : { email, name } } = response;
        
        await onSocial({
            socialId : googleId,
            socialType : 'google',
            email,
            nickname : name
        });
    }

    const onFailure = (error) => {
        console.log(error);
    }

    return(
        <S.Header>
            <Link href={"/"}>
                <img src="https://t1.daumcdn.net/cfile/tistory/9971C8435C64FD6610"/>
            </Link>
            <input />
            <GoogleLogin 
                buttonText='로그인' 
                icon={false} 
                disabledStyle={false}
                clientId={clientId}
                responseType={"id_token"}
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </S.Header>       
    )
}

export default Header