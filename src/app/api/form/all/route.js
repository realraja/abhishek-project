import { ResponseFailed, ResponseSuccess } from "@/middleware/response";

const { default: User } = require("@/models/user");
const { userTryCatch } = require("@/utils/authRequests");


export const GET = userTryCatch(async(req,res)=>{
    const forms = await User.find();
    const formsWithData = forms.filter(form => form.form?.name);
    return ResponseSuccess("Forms retrieved successfully", formsWithData);
})


export const PUT = userTryCatch(async (req) => {
    const {id,status} = await req.json();
    const user = await User.findById(id);
    if (!user) {
        return ResponseFailed('User not found');
    }

    user.form = {...user.form,status};
    await user.save();
    console.log(user,id,status)
    return ResponseSuccess("Form status updated successfully");
})