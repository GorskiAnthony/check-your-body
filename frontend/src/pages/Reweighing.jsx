import { useState } from "react";
import Form from "@components/Form";
import fakeData from "@services/fakeData";
import arm from "@assets/muscles.png";
import chest from "@assets/chest.png";
import hips from "@assets/hips.png";
import thigh from "@assets/liposuction.png";
import Layout from "./layout/Layout";

function isEmpty() {
  return (
    <>
      <h1 className="text-2xl font-bold">Hello World</h1>
      <div className="text-gray-600 py-24">
        Vous n’avez pas de statistique, n’oubliez pas de remplir le formulaire !
      </div>
      <div className="text-gray-600">
        Votre corps vous remercie de prendre soin de lui, n’hésitez pas à
        compléter votre profil pour avoir un suivi plus détaillé.
      </div>
    </>
  );
}

function displayData(data) {
  return data.reverse().map((item) => (
    <div key={item.date}>
      <div className="date flex justify-between w-52">
        <span>
          <i className="fa-regular fa-calendar pr-2" />
          {item.date}
        </span>
        <span>
          <i className="fa-solid fa-weight-scale pr-2" />
          {item.weight} kg
        </span>
      </div>
      <div className="flex justify-around mt-5">
        <div>
          {item.chest && (
            <div className="text-gray-600 flex">
              <img className="pr-2" src={chest} alt="chest" />
              <span className="text-center">{item.chest} cm</span>
            </div>
          )}
          {item.hip && (
            <div className="text-gray-600 flex">
              <img className="pr-2" src={hips} alt="hips" />
              <span className="text-center">{item.hip} cm</span>
            </div>
          )}
        </div>
        <div>
          <div>
            {item.arm && (
              <div className="text-gray-600 flex">
                <img className="pr-2" src={arm} alt="arm" />
                <span className="text-center">{item.arm} cm</span>
              </div>
            )}
            {item.thigh && (
              <div className="text-gray-600 flex">
                <img className="pr-2" src={thigh} alt="thigh" />
                <span className="text-center">{item.thigh} cm</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
}

export default function Reweighing() {
  const [data] = useState(fakeData.reverse());
  return (
    <Layout>
      <div className="flex gap-8 flex-wrap">
        <div className="bg-gray-50 p-10 rounded-md sm:flex-none flex-grow">
          <Form />
        </div>
        <div className="sm:flex-1">
          {data.length === 0 ? (
            isEmpty()
          ) : (
            <>
              <h2 className="my-3 font-bold text-lg">Détails</h2>
              <div className="flex gap-28 flex-wrap justify-around">
                {displayData(data)}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
