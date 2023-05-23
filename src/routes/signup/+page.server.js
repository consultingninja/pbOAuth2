import { redirect } from '@sveltejs/kit';

export async function load({locals,url,cookies}){

    //console.log(' load',url.origin)
    return{

    }

}

export const actions = {
    signup: async()=>{
        console.log("Nope!")
    },
    OAuth2: async({cookies,url,locals})=>{

        const authMethods = await locals.pb?.collection('users').listAuthMethods();
        //console.log("authmethods", authMethods);
        if (!authMethods) {
            return {
                authProviderRedirect: '',
                authProviderState: ''
            };
        }
        const redirectURL = `${url.origin}/oauth`;
        const googleAuthProvider = authMethods.authProviders[0];
        const authProviderRedirect = `${googleAuthProvider.authUrl}${redirectURL}`;
        const state = googleAuthProvider.state;
        const verifier = googleAuthProvider.codeVerifier

        cookies.set('state',state);
        cookies.set('verifier',verifier);

        throw redirect(302,authProviderRedirect)
    

    }

}