import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import * as Auth from "../../services/form.service";
import style from "./Navbar.module.css";
import { toastifySuccess } from "../../services/toast.service";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, handleUser, setIsView } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Auth.logout("/users/logout");
    handleUser(null);
    toastifySuccess("Vous êtes déconnecté");
    setIsView(false);
    navigate("/");
  };
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="BirthdayPal"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 justify-center items-center">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 w-full" */}
                  {user ? (
                    <>
                      {/** Je vais trouver une utiliter à cette route */}
                      {/* <NavLink to="/dashboard" activeclassname={style.active}>
              Dashboard
            </NavLink> */}
                      <Link to="/" className="text-xl">
                        BirthdayPal
                      </Link>{" "}
                      <NavLink
                        to="/friends/users"
                        activeclassname={style.active}
                      >
                        Voir les anniversaires
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <Link to="/" className="text-xl">
                        BirthdayPal
                      </Link>
                      <NavLink to="/" activeclassname={style.active}>
                        Késako?
                      </NavLink>
                      <NavLink to="/login" activeclassname={style.active}>
                        Connexion
                      </NavLink>
                      <NavLink to="/register" activeclassname={style.active}>
                        Inscription
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {user && (
                    <>
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <span className="relative inline-block">
                            <img
                              className="h-12 w-12 rounded-md"
                              src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&rounded=true`}
                              alt=""
                            />
                            <span className="absolute bottom-0 right-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white">
                              <span className="block h-3 w-3 rounded-full bg-green-400" />
                            </span>
                          </span>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profil"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 w-full"
                                )}
                              >
                                Mon profil
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                type="button"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 w-full"
                                )}
                              >
                                <span className="flex">
                                  Déconnexion
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
                                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                    />
                                  </svg>
                                </span>
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 w-full" */}
              {user ? (
                <>
                  <Disclosure.Button className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 w-full text-start">
                    <Link to="/">BirthdayPal</Link>
                  </Disclosure.Button>
                  <Disclosure.Button className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 w-full text-start">
                    <Link to="/friends/users"> Voir les anniversaires</Link>
                  </Disclosure.Button>
                </>
              ) : (
                <>
                  <Disclosure.Button className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 w-full text-start">
                    <Link to="/">Késako?</Link>
                  </Disclosure.Button>
                  <Disclosure.Button className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 w-full text-start">
                    <Link to="/login">Connexion</Link>
                  </Disclosure.Button>
                  <Disclosure.Button className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 w-full text-start">
                    <Link to="/register">Inscription</Link>
                  </Disclosure.Button>
                </>
              )}
            </div>
            {user && (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <span className="relative inline-block">
                      <img
                        className="h-12 w-12 rounded-md"
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&rounded=true`}
                        alt=""
                      />
                      <span className="absolute bottom-0 right-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white">
                        <span className="block h-3 w-3 rounded-full bg-green-400" />
                      </span>
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                    {user.isAdmin ? (
                      <div className="text-sm font-medium text-gray-500">
                        Admin
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    <Link to="/profil">Mon profil</Link>
                  </Disclosure.Button>

                  <Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    <button onClick={handleLogout} type="button">
                      <span className="flex">
                        Déconnexion
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
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                      </span>
                    </button>
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
