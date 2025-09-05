import { uploadResponse } from "@/lib/cloudinary";
import { ResponseSuccess } from "@/middleware/response";
import { userTryCatch } from "@/middleware/tryCatch";

export const POST = userTryCatch(async(req,res)=>{
    const data = await req.json();
    
    if(!data) return ResponseSuccess("No data provided",null)
    let uploadedMarksheet,uploadedCertificate;

    if(data?.marksheet){
        uploadedMarksheet = await uploadResponse([data.marksheet])
    }
    if(data?.certificate){
        uploadedCertificate = await uploadResponse([data.certificate])
    }

    req.user.form = {...data,marksheet:uploadedMarksheet ? uploadedMarksheet[0]:undefined,certificate:uploadedCertificate ? uploadedCertificate[0]:undefined,status:'pending',submittedDate:new Date()};
    await req.user.save();

    return ResponseSuccess("Form submitted successfully",req.user)
})