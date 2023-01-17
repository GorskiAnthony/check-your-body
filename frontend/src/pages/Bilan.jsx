import { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import instance from "@services/axios";
import { AuthContext } from "../contexts/AuthContext";

import Layout from "./layout/Layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getImc(weight, height) {
  return weight / (height / 100) ** 2;
}

export default function Bilan() {
  const { user } = useContext(AuthContext);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    instance.get("api/stats").then((response) => {
      setDatas(response.data);
    });
  }, []);

  const [view, setView] = useState("poids");

  const labels = datas.map((item) =>
    new Date(item.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
  );
  const poids = {
    labels,
    datasets: [
      {
        label: "Poids",
        data: datas.map((item) => item.weight),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "IMC",
        data: datas.map((item) => getImc(item.weight, user.height)),
        backgroundColor: "rgba(21, 128, 61, 0.2)",
        borderColor: "rgba(21, 128, 61, 1)",
        borderWidth: 1,
      },
    ],
  };
  const mesures = {
    labels,
    datasets: [
      {
        label: "Taille",
        data: datas.map((item) => item.hips),
        backgroundColor: "rgba(255, 0, 255, 0.2)",
        borderColor: "rgba(255, 0, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Poitrine",
        data: datas.map((item) => item.chest),
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        borderColor: "rgba(0, 255, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Bras",
        data: datas.map((item) => item.arm),
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Cuisse",
        data: datas.map((item) => item.waist),
        backgroundColor: "rgba(138, 43, 226, 0.2)",
        borderColor: "rgba(138, 43, 226, 1)",
        borderWidth: 1,
      },
    ],
  };

  const views = {
    poids: { buttonLabel: "Poids", data: poids },
    mesures: { buttonLabel: "Mesures", data: mesures },
  };

  const buttons = Object.keys(views).map((oneView) => (
    <button
      key={oneView}
      type="button"
      onClick={() => setView(oneView)}
      className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-5"
    >
      {views[oneView].buttonLabel}
    </button>
  ));

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl">C'est l'heure du bilan</h1>
        <div className="my-4">{buttons}</div>
        <Line
          options={options}
          data={views[view].data}
          style={{ width: "auto", height: "12rem" }}
        />
        <div className="mt-8">
          <p>
            Il est important de garder un oeil sur votre poids et vos mesures.
            Vous pouvez consulter vos données ci-dessus.{" "}
          </p>
          <p>
            Les informations ci-dessous vous permettent de comprendre ce que
            signifie votre IMC.
          </p>
          <p>
            Il est la pour votre informations, ne pas hésitez à consulter votre
            médecin.
          </p>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">IMC</th>
                <th className="px-4 py-2">Interprétation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">+ de 40</td>
                <td className="border px-4 py-2">obésité morbide ou massive</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">35 à 40</td>
                <td className="border px-4 py-2">obésité sévère</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">30 à 35</td>
                <td className="border px-4 py-2">obésité modérée</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">25 à 30</td>
                <td className="border px-4 py-2">surpoids</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">18.5 à 25</td>
                <td className="border px-4 py-2">corpulence normale</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">16.5 à 18.5</td>
                <td className="border px-4 py-2">maigreur</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">- de 16.5</td>
                <td className="border px-4 py-2">famine</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl">Photos</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {datas.map((data) => (
            <div
              key={data.id}
              className="flex justify-center flex-col items-center bg-gray-200 rounded-md"
            >
              <img
                className="rounded-lg gl:mt-4"
                src={`${import.meta.env.VITE_BACKEND_URL}/images/${
                  data.userStatId
                }/${data.photo}`}
                alt=""
              />
              <p className="text-gray-600 text-base mb-2">
                {new Date(data.createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
