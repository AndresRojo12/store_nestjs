'use client';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';

//const category = await dataCategories.json();
// const dataBrands = await fetch('http://localhost:3000/brand/');
// const brand = await dataBrands.json();

export default function venProducts() {
  const [category, setCategory] = useState([]);

  async function getCategories() {
    const dataCategories = 'http://localhost:3000/categories/';
    try {
      const response = await fetch(dataCategories);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const categorias = await getCategories();
      if (categorias) {
        setCategory(categorias);
      }
    }
    fetchData();
  }, []);
  return (
    <html>
      <body>
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Registrar Producto
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                // value={form.nombre}
                // onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                name="descripcion"
                // value={form.descripcion}
                // onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                // rows="3"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Precio
              </label>
              <input
                type="number"
                name="precio"
                // value={form.precio}
                // onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Imagen
              </label>
              <input
                type="file"
                name="imagen"
                // onChange={handleChange}
                accept="image/*"
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                // value={form.stock}
                // onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Marca
              </label>
              <select
                name="marca"
                // value={form.marca}
                // onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option className="text-black" value="">
                  Selecciona Una Marca
                </option>
                {/* {brand.map((brand:any)=>(
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))} */}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Categoría
              </label>
              <select
                name="categoria"
                // value={form.categoria}
                // onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="">Selecciona una categoría</option>
                {category.map((cate: any) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                // onClick={handleCancel}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </body>
    </html>
  );
}
