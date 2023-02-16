import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "@services/axios";
import toastify from "@services/toastify";

export default function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    height: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register.password.length < 6) {
      return toastify(
        "Le mot de passe doit contenir au moins 6 caractères",
        "error"
      );
    }

    if (register.password !== register.repeatPassword) {
      return toastify("Les mots de passe ne correspondent pas", "error");
    }

    instance
      .post("/auth/signup", register)
      .then(() => {
        navigate("/");
        return toastify("Inscription réussie", "success");
      })
      .catch((err) => {
        console.error(err);
        return toastify("une erreur est survenue", "error");
      });
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Créer un compte
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nom
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="John Doe"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Taille
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="height"
                      name="height"
                      type="number"
                      autoComplete="height"
                      placeholder="Taille en cm"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="example@provider.com"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="********"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="repeatPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirmation mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      autoComplete="current-password"
                      placeholder="********"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Vous avez déjà un compte?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Je me connecte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/4793229/pexels-photo-4793229.jpeg"
          alt=""
        />
      </div>
    </div>
  );
}
