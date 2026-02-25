import rateLimit from "express-rate-limit";
const authRateLimiter=rateLimit({
    windowMs:1*60*1000,
    max:5,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        message:"Too many attempts. Please try again later."
    }
})
export const limiter=rateLimit({
    windowMs:1*60*1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        status:429,
        message:"Too many attempts. Please try again later.",
    }
})
export default authRateLimiter;