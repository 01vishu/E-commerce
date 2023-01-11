import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Spiner from "../../../components/spiner";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
const Reset = ({ user }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === passwordConfirm) {
        setLoading(true);
        const { data } = await axios.patch("/api/auth/reset", {
          password,
          _id: user.id,
        });
        let options = {
          redirect: false,
          email: data.email,
          password,
        };
        signIn("credentials", options);
        setSuccess(data.message);
        setLoading(false);
        router.push("/");
      } else {
        setError("Password is not same!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value), setError(""), setSuccess("");
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value), setError(""), setSuccess("");
  };
  return (
    <section>
      {loading && <Spiner loading={loading} />}
      <div className=" h-[50vh] flex-col gap-12 flex items-center justify-center">
        <h2 className="secondary text-2xl font-semibold">Forgot Password</h2>
        <form
          className="flex  flex-col gap-4 items-center"
          onSubmit={handleSubmit}
        >
          <input
            type={"password"}
            required
            placeholder="Password"
            className="border min-w-[300px]  px-4 py-2 focus-visible:outline-[#8D735F]"
            value={password}
            onChange={handlePassword}
          />
          <input
            type={"password"}
            required
            placeholder="Confirm Password"
            className="border min-w-[300px]  px-4 py-2 focus-visible:outline-[#8D735F]"
            value={passwordConfirm}
            onChange={handlePasswordConfirm}
          />
          <button type="submit" className="secondary-bg w-full px-4 py-2">
            Reset Password
          </button>
          <Link href={"/auth/login"}>
            <p className="font-sans secondary">Login?</p>
          </Link>
          <span>{error}</span>
          <span>{success}</span>
        </form>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const token = context.query.resetToken;

  const user = jwt.verify(token, process.env.RESET_SECRET_TOKEN);

  const session = await getSession({ req });
  if (session !== null && !user) {
    return {
      redirect: {
        destination: process.env.URL,
      },
    };
  }
  return {
    props: { user },
  };
}
export default Reset;
