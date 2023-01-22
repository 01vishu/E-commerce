import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Spiner from "../../components/spiner";
import { getSession } from "next-auth/react";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `/api/auth/register`,
        {
          email,
          password,
          passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setError(err.response.data.message);
      } else if (err.originalStatus === 400) {
        setError("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setError("Unauthorized");
      } else {
        setError("Registration Failed");
      }
    }
  };
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePasswordConfirm = (e) => setPasswordConfirm(e.target.value);
  return (
    <section>
      {loading && <Spiner loading={loading} />}
      <div className=" h-[70vh] flex-col gap-12 flex items-center justify-center">
        <h2 className="secondary text-2xl font-semibold">
          Register E-commerce
        </h2>
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
          <input
            type="password"
            placeholder="Password"
            required
            className="border min-w-[300px]  px-4 py-2 focus-visible:outline-[#8D735F]"
            value={password}
            onChange={handlePassword}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="border min-w-[300px]  px-4 py-2 focus-visible:outline-[#8D735F]"
            value={passwordConfirm}
            onChange={handlePasswordConfirm}
          />
          <button type="submit" className="secondary-bg w-full px-4 py-2">
            Register
          </button>
          <Link href={"/auth/login"}>
            <p className="font-sans secondary">Have An Account?</p>
          </Link>
          <span>{error}</span>
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
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
export default Register;
