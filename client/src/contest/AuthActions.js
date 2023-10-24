

export const LoginStart=(userCredentials)=>({
     type:"LOGIN_START",
})

export const LoginSuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user,
})

export const LoginFailure=(error)=>({
    type:"LOGIN_FAILURE",
    payload:error
})

export const Follow =(userId)=>{
    return {
        type:"FOLLOW",
        payload:userId,
    }
}

export const UnFollow=(userId)=>{
    return {
        type:"UNFOLLOW",
        payload:userId
    }
}