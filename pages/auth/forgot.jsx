import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Spiner from "../../components/spiner";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", { email });
      setSuccess(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value), setError(""), setSuccess("");
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
            type={"email"}
            required
            placeholder="Email"
            className="border min-w-[300px]  px-4 py-2 focus-visible:outline-[#8D735F]"
            value={email}
            onChange={handleEmail}
          />
          <button type="submit" className="secondary-bg w-full px-4 py-2">
            Send Reset Link
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

  const session = await getSession({ req });
  if (session !== null) {
    return {
      redirect: {
        destination: process.env.URL,
      },
    };
  }
  return {
    props: {},
  };
}
export default Forgot;
