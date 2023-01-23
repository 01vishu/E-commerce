import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Spiner from "../../components/spiner";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { SiAuth0 } from "react-icons/si";
import { getCsrfToken, getSession } from "next-auth/react";
import { signIn } from "next-auth/react";
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    let options = {
      redirect: false,
      email,
      password,
    };
    const res = await signIn("credentials", options);
    if (res.error) {
      setLoading(false);
      return setError(res.error);
    }
    router.push("/");
    setEmail("");
    setPassword("");
    setLoading(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value), setError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value), setError("");
  };
  return (
    <section>
      {loading && <Spiner loading={loading} />}
      <div className=" h-[70vh] flex-col gap-12 flex items-center justify-center">
        <h2 className="secondary text-2xl font-semibold">Login E-commerce</h2>
        <form
          className="flex border-b-2 border-[#88888]   flex-col gap-4 items-center"
          onSubmit={handleSubmit}
        >
          <input
            type={"email"}
            required
            placeholder="Email"
            className="border min-w-[300px] focus-visible:outline-[#8D735F] px-4 py-2"
            value={email}
            onChange={handleEmail}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="border min-w-[300px] focus-visible:outline-[#8D735F]  px-4 py-2"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit" className="secondary-bg w-full  px-4 py-2">
            Log In
          </button>
          <Link href={"/auth/forgot"}>
            <p className="font-sans secondary">Forgot Password?</p>
          </Link>
          <span>{error}</span>
        </form>
        <div className="flex items-center max-w-[300px] w-full justify-center flex-col gap-4">
          <button
            className="flex items-center border-2 gap-4 font-medium w-full justify-center border-[#f4f4f4] py-4 px-8"
            onClick={() => {
              signIn("google");
            }}
          >
            Continue With Google <FcGoogle size={20} />
          </button>
          <button
            className="flex items-center border-2 gap-4 font-medium w-full justify-center border-[#f4f4f4] py-4 px-8"
            onClick={() => {
              signIn("github");
            }}
          >
            Continue With Github <BsGithub size={20} />
          </button>
          <button
            className="flex items-center border-2 gap-4 font-medium w-full justify-center border-[#f4f4f4] py-4 px-8"
            onClick={() => {
              signIn("auth0");
            }}
          >
            Continue With Auth0 <SiAuth0 size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const { req } = context;
  const session = await getSession({ req });
  console.log(session);
  if (session != null) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {
      csrfToken,
    },
  };
}
export default Login;
