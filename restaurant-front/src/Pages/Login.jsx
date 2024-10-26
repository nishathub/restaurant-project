import { Link } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

import { FaGoogle } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../ContextProvider/ContextProvider";

const Login = () => {
  const { customAlert } = useContext(RestaurantContext);
  const [isValidCaptcha, setValidCaptcha] = useState(true);
  const [captchaInput, setCaptchaInput] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const userEmail = form.email.value;
    const userPassword = form.password.value;
    const captchaInput = form.captcha.value;
    console.log(userEmail, userPassword, validateCaptcha(captchaInput));
  };
  const handleValidateCaptcha = (e) => {
    e.preventDefault();
    if (validateCaptcha(captchaInput)) {
      setValidCaptcha(false);
      customAlert("Verified");
    } else {
      setValidCaptcha(true);
      customAlert("Wrong Captcha!");
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <div className="mt-20 lg:mt-24 text-gray-200">
      <section className="py-4 lg:py-8 bg-gray-300">
        <h4 className="max-w-7xl mx-auto px-4 text-2xl lg:text-4xl text-gray-800 cinzel-regular">
          My Account
        </h4>
      </section>
      <div className="max-w-xl mx-auto px-4 py-12 lg:py-20">
        <div className="w-full mx-auto">
          <h2 className="text-2xl lg:text-4xl cinzel-regular mb-8">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6 lg:space-y-8">
            <div>
              <label>
                <p className="text-sm mb-1">Email address *</p>
              </label>
              <input
                className="w-full px-6 py-3 rounded-sm bg-transparent border"
                type="email"
                name="email"
              />
            </div>
            <div>
              <label>
                <p className="text-sm mb-1">Password *</p>
              </label>
              <input
                className="w-full px-6 py-3 rounded-sm bg-transparent border"
                type="password"
                name="password"
              />
            </div>
            <div>
              <label>
                <p className="text-sm mb-1">Verification *</p>
              </label>
              <div className="flex">
                <div className="w-1/2 border">
                  <LoadCanvasTemplate reloadColor="red" />
                </div>
                <input
                  className="w-1/2 px-6 py-3 rounded-sm bg-transparent border"
                  type="text"
                  placeholder="Enter Captcha here"
                  name="captcha"
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between items-start">
              <input
                className="py-2 px-6 rounded-sm btn bg-red-700 hover:bg-red-800"
                type="submit"
                value="Login"
                disabled={isValidCaptcha}
              />
              <input
                className="w-fit ml-auto py-1 px-4 rounded-sm bg-gray-700 hover:bg-gray-800 cursor-pointer"
                type="button"
                value="Verify"
                onClick={handleValidateCaptcha}
              />
            </div>
          </form>
          {/* OTHER LOGINs */}
          <div className="mt-4 space-y-4">
            <div className="flex gap-2">
              <p>New here?</p>
              <Link className="italic" to={"/register"}>
                Create a New Account
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <p className="border-t flex-grow"></p>
              <p className="">Or Sign in with</p>
              <p className="border-t flex-grow"></p>
            </div>
            <div className="flex items-center justify-center">
              <button
                title="Google"
                className="w-full flex rounded-l-sm items-center justify-center py-2 bg-green-700 hover:bg-green-800 duration-300"
              >
                <p className="text-2xl">
                  <FaGoogle></FaGoogle>
                </p>
                <p></p>
              </button>
              <button
                title="Github"
                className="w-full flex rounded-r-sm items-center justify-center py-2 bg-gray-300 hover:bg-gray-400 duration-300 text-gray-800"
              >
                <p className="text-2xl">
                  <VscGithub></VscGithub>
                </p>
                <p></p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
