import connectDB from "@/DB/ConnectDB";
import { uploadResponse } from "@/lib/cloudinary";
import { signToken } from "@/lib/jwt";
import { setCookie } from "@/middleware/cookie";
import {
  errorResponse,
  ResponseFailed,
  successResponse,
} from "@/middleware/response";
import User from "@/models/user";
import { OAuth2Client } from "google-auth-library";
import bcrypt from 'bcryptjs';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { googleToken } = body;
    if (!googleToken) {
      return ResponseFailed("token is required!");
    }

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    // console.log(payload);

    const email = payload?.email;
    if (!email) {
      return ResponseFailed("invailid Token!");
    }

    // console.log(payload);

    const user = await User.findOne({ email });

    if (!user) {
      let imgUrl = undefined;

      if (payload.picture) {
        imgUrl = await uploadResponse([payload.picture]);
      }

      // console.log(imgUrl);

      const hashedPassword = await bcrypt.hash(payload.name + email, 10);
      const token = signToken({ email }); // JWT creation

      const user = await User.create({
        name:payload.name,
        email,
        password: hashedPassword,
        image: imgUrl ? imgUrl[0] : undefined,
      });


      const res = successResponse("User registered successfully", user);

      setCookie(res, token);

      return res;
    }

    const token = signToken({ email: user.email });




    const res = successResponse("Login successful", user);
    setCookie(res, token);

    return res;
  } catch (error) {
    console.log("Google auth error:", error);
    return errorResponse("google auth error", error.message);
  }
};

// export const POST = async (req) => {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const { app = false, googleToken } = body;
//     if (!googleToken) {
//       return ResponseFailed("token is required!");
//     }

//     // Verify the Google token
//     const ticket = await client.verifyIdToken({
//       idToken: googleToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     // console.log(payload);

//     const email = payload?.email;
//     if (!email) {
//       return ResponseFailed("invailid Token!");
//     }

//     // console.log(payload);

//     const user = await User.findOne({ email });

//     if (!user)
//       return ResponseFailed("User not found with this email", {
//         goToRegistration: true,
//       });

//     const jwtToken = signToken({ email: user.email });

//     app ? user.tokenApp : (user.tokenWeb = jwtToken);
//     await user.save();

//     const res = successResponse("Login successful", user);
//     setCookie(res, jwtToken);

//     return res;
//   } catch (error) {
//     console.error("Google auth error:", error);
//     return errorResponse("google auth error", error.message);
//   }
// };

