const  validate=(schema)=>(req,res,next)=>{
    try{
        const result=schema.safeParse(req.body)
        if(!result.success){
            return res.status(400).json({
                errors:result.error.errors.map(err=>({
                    field:err.path[0],
                    message:err.message
                }))
            })
        }
        req.body=result.data;
        next()
        }
    catch(error){
        next(error)
    }
}
export default validate;