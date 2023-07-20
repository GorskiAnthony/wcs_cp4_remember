import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastifyError, toastifySuccess } from "../../services/toast.service";
import * as PostUser from "../../services/form.service";

const eye = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const eyeSlash = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

export default function Register() {
  const [typeInput, setTypeInput] = useState("password");
  const [typeInputConfirm, setTypeInputConfirm] = useState("password");
  const [user, setUser] = useState({
    name: "azerty qwerty",
    email: "azerty@azerty.fr",
    password: "@zertY123",
    confirmPassword: "@zertY123",
  });
  const navigate = useNavigate();

  const handleViewPwd = (inputType) => {
    if (inputType === "password") {
      setTypeInput(typeInput === "password" ? "text" : "password");
    } else if (inputType === "confirmPassword") {
      setTypeInputConfirm(
        typeInputConfirm === "password" ? "text" : "password"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = user;
    if (password !== confirmPassword) {
      toastifyError("Les mots de passe ne correspondent pas");
    } else {
      try {
        const data = await PostUser.add("/users/register", user);
        toastifySuccess(data.message);
        navigate("/login");
      } catch (error) {
        toastifyError(error.response);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-5 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inscris-toi, et plus personne ne te fera chier avec leurs
          anniversaires
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ton nom complet
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Harry Potter"
                  onChange={handleChange}
                  value={user.name}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Adresse email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="harry.potter@poudlard.com"
                  onChange={handleChange}
                  value={user.email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mot de passe
              </label>
              <div className="mt-2 flex">
                <input
                  id="password"
                  name="password"
                  type={typeInput}
                  onChange={handleChange}
                  value={user.password}
                  placeholder="********"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => handleViewPwd("password")}
                  className="pl-2"
                  type="button"
                >
                  {typeInput === "password" ? eye : eyeSlash}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirme le, s'il te plaît
              </label>
              <div className="mt-2 flex">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={typeInputConfirm}
                  placeholder="********"
                  onChange={handleChange}
                  value={user.confirmPassword}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={() => handleViewPwd("confirmPassword")}
                  className="pl-2"
                  type="button"
                >
                  {typeInputConfirm === "password" ? eye : eyeSlash}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm leading-6">
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ok let's go 🚀
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
