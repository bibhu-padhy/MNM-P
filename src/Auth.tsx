import { useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { signUpEmailPassword } = useSignUpEmailPassword();
  const { signInEmailPassword } = useSignInEmailPassword();

  const handleAuth = async (e: any) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { isSuccess, error } = await signInEmailPassword(email, password);
        if (isSuccess && !error) {
          navigate("/", { replace: true });
        }
      } else {
        const { isSuccess, error } = await signUpEmailPassword(
          email,
          password,
          {
            displayName,
          }
        );

        if (isSuccess && !error) {
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="max-w-xs shadow-lg px-3 py-5 mx-auto"
      onSubmit={handleAuth}
    >
      <div className="text-3xl font-bold text-center text-blue-600">
        {isLogin ? "Login" : "Register"}
      </div>
      <label className="font-medium text-blue-500" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2  block my-2 border-blue-400 w-full placeholder:text-blue-200"
        placeholder="jhon@doe.com"
      />
      {!isLogin ? (
        <>
          <label className="font-medium text-blue-500" htmlFor="email">
            User Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-2  block my-2 border-blue-400 w-full placeholder:text-blue-200"
            placeholder="John Doe"
          />
        </>
      ) : (
        ""
      )}

      <label className="font-medium text-blue-500" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2  block my-2 border-blue-400 w-full placeholder:text-blue-200"
        placeholder="xxxxxxx"
      />
      <div className="flex justify-between items-center">
        <button
          className="px-3 py-1 shadow font-medium text-gray-600"
          type="submit"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <a
          className="underline text-blue-500 font-medium cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create" : "Exist"} account
        </a>
      </div>
    </form>
  );
}
export default Auth;
