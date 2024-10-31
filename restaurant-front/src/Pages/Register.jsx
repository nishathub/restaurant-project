import { FaGoogle } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../ContextProvider/ContextProvider";
import CustomLoading from "../Component/Shared/CustomLoading/CustomLoading";
import { Link, useNavigate } from "react-router-dom";
import useSavourYumContext from "../Hooks/useSavourYumContext";
import useAxiosHookPublic from "../Hooks/useAxiosHookPublic";

const Register = () => {
  const { customAlert, createNewUser, updateUser, googleSignIn } =
    useSavourYumContext();
  const axiosPublic = useAxiosHookPublic();
  const navigate = useNavigate();
  const [isCreateAccountLoading, setCreateAccountLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const handleGoogleLogIn = async () => {
    setErrorText("");
    try {
      const result = await googleSignIn();
      customAlert("Logged in by google");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      // Create New user in the backend userCollection
      const response = await axiosPublic.get("/allUsers");
      const allUsers = response.data;
      const userExist = allUsers.some(
        (user) => user.userEmail === result.user.email
      );
      if (!userExist && allUsers.length) {
        const userInfo = {
          userName: result.user.displayName,
          userPhotoUrl: result.user.photoURL,
          userEmail: result.user.email,
        };
        axiosPublic.post("/allUsers", userInfo);
      }
    } catch (error) {
      setErrorText(error.message.slice(9));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorText("");
    const form = e.target;

    const photo = form.photo.value;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const hasCapital = /[A-Z]/;
    const hasSpecial = /[~!@#_+)(*&^%$#-]/;
    const hasNumber = /[0-9]/;
    if (password.length < 6) {
      setErrorText("Password must be at least 6 character");
    } else if (!hasCapital.test(password)) {
      setErrorText("Password should have at least one capital letter");
    } else if (!hasSpecial.test(password)) {
      setErrorText(
        "Password should have at least one special Character (@#$...)"
      );
    } else if (!hasNumber.test(password)) {
      setErrorText("Password should have at least one digit.");
    } else {
      setCreateAccountLoading(true);
      try {
        await createNewUser(email, password);
        customAlert("Account Created");
        // Redirect to Home Page
        setTimeout(() => {
          navigate("/");
          customAlert("Redirected to Homepage");
        }, 4000);
        //Update user info
        setTimeout(async () => {
          // firebase update
          await updateUser(name, photo);
          const userInfo = {
            userName: name,
            userPhotoUrl: photo,
            userEmail: email,
          };
          // backend collection
          await axiosPublic.post("/allUsers", userInfo);
          customAlert("Info Updated");
        }, 2000);
        // form.reset();
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setErrorText("This email is already associated with an account.");
          customAlert("Email already in use");
        } else {
          setErrorText(error.message);
          customAlert("Error occurred");
        }
      } finally {
        setCreateAccountLoading(false);
      }
    }

    // form.reset(); // clear the form
  };
  return (
    <div className="mt-20 lg:mt-24 text-gray-200 relative">
      <section className="py-4 lg:py-8 bg-gray-300">
        <h4 className="max-w-7xl mx-auto px-4 text-2xl lg:text-4xl text-gray-800 cinzel-regular">
          My Account
        </h4>
      </section>
      <div className="max-w-xl mx-auto px-4 py-12 lg:py-20">
        <div className="w-full mx-auto">
          <h2 className="text-2xl lg:text-4xl cinzel-regular mb-8">Register</h2>
          {/* ERROR TEXT  */}
          <div>
            <h2 className="text-red-800 text-lg mb-6">{errorText}</h2>
          </div>
          {/* LOADING  */}
          <div>
            {isCreateAccountLoading && (
              <div className="absolute bg-white/40 inset-0 flex items-center justify-center ">
                {" "}
                <CustomLoading size={32}></CustomLoading>
              </div>
            )}
          </div>
          {/* MAIN CODE  */}
          <form onSubmit={handleRegister} className="space-y-6 lg:space-y-8">
            <div>
              <label>
                <p className="text-sm mb-1">Name *</p>
              </label>
              <input
                className="w-full px-6 py-3 rounded-sm bg-transparent border"
                type="text"
                name="name"
                required
              />
            </div>
            <div>
              <label>
                <p className="text-sm mb-1">Photo Url (optional)</p>
              </label>
              <input
                className="w-full px-6 py-3 rounded-sm bg-transparent border"
                type="text"
                name="photo"
              />
            </div>
            <div>
              <label>
                <p className="text-sm mb-1">Email address *</p>
              </label>
              <input
                className="w-full px-6 py-3 rounded-sm bg-transparent border"
                type="email"
                name="email"
                required
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
                required
              />
            </div>
            <div className="flex justify-between items-start">
              <input
                className="py-2 px-6 rounded-sm btn bg-red-700 hover:bg-red-800"
                type="submit"
                value="Create Account"
              />
            </div>
          </form>
          {/* OTHER LOGINs */}
          <div className="mt-4 space-y-4">
            <div className="flex gap-2">
              <p>Already have an account?</p>
              <Link className="italic" to={"/login"}>
                Sign in
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <p className="border-t flex-grow"></p>
              <p className="">Or Sign in with</p>
              <p className="border-t flex-grow"></p>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleGoogleLogIn}
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

export default Register;
