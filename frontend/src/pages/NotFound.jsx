import { Link } from "react-router-dom";

export default function Pages404() {
  return (
    <div className="flex min-h-screen flex-col bg-white lg:relative">
      <div className="flex flex-grow flex-col">
        <main className="flex flex-grow flex-col bg-white">
          <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-6 lg:px-8">
            <div className="flex-shrink-0 pt-10 sm:pt-16">
              <a href="/" className="inline-flex">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="my-auto flex-shrink-0 py-16 sm:py-32">
              <p className="text-base font-semibold text-indigo-600">404</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link
                  to="/home"
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Go back home
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 bg-gray-50">
          <div className="mx-auto w-full max-w-7xl py-16 px-6 lg:px-8">
            <nav className="flex space-x-4">
              <a
                href="!#"
                className="text-sm font-medium text-gray-500 hover:text-gray-600"
              >
                Contact Support
              </a>
              <span
                className="inline-block border-l border-gray-300"
                aria-hidden="true"
              />

              <a
                href="!#"
                className="text-sm font-medium text-gray-500 hover:text-gray-600"
              >
                Twitter
              </a>
            </nav>
          </div>
        </footer>
      </div>
      <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/3747159/pexels-photo-3747159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
      </div>
    </div>
  );
}
