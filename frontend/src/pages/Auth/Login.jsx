import { useState } from "react";
import * as Auth from "../../services/form.service";
import { toastifyError, toastifySuccess } from "../../services/toast.service";

export default function Login() {
  const [user, setUser] = useState({
    email: "admin@remember.com",
    password: "@dminLebg",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Auth.add("/users/login", user);
      if (result === undefined) {
        toastifyError("Erreur lors de la connexion, mauvais identifiants.");
      } else {
        toastifySuccess("Connexion réussie !");
      }
    } catch (error) {
      toastifyError(error.message);
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
          Connecte toi à ton compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Adresse email
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={user.email}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="xyz@provider.com"
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
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={user.password}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm leading-6">
                <a
                  href="#!"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ok let's go
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
