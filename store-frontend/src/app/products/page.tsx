'use client';

import { useEffect, useState } from 'react';

export default function VenProducts() {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [token, setToken] = useState<string | null>(null);

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: '',
    marca: '',
    categoria: '',
  });

  // Leer token del localStorage una vez al montar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem('accesstoken');
    console.log('Token cargado desde localStorage:', storedToken);
    setToken(storedToken);
  }, []);

  // Cargar categorías y marcas desde la API
  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, brandRes] = await Promise.all([
          fetch('http://localhost:3000/categories/'),
          fetch('http://localhost:3000/brand/'),
        ]);

        if (!catRes.ok || !brandRes.ok) {
          throw new Error('Error al obtener datos');
        }

        const [categorias, marcas] = await Promise.all([
          catRes.json(),
          brandRes.json(),
        ]);

        setCategory(categorias);
        setBrand(marcas);
      } catch (error) {
        console.error('Error al cargar categorías o marcas:', error);
      }
    }

    fetchData();
  }, []);

  // Manejar cambios del formulario
  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Enviar el formulario
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!token) {
      alert('Token no encontrado. Por favor, inicia sesión.');
      return;
    }

    const producto = {
      name: form.nombre,
      description: form.descripcion,
      price: parseInt(form.precio),
      stock: parseInt(form.stock),
      imagen: form.imagen,
      brandId: form.marca,
      categoryId: form.categoria,
    };

    try {
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(producto),
      });

      if (!res.ok) throw new Error('Error al registrar producto');

      const data = await res.json();
      alert('✅ Producto registrado exitosamente');
      console.log('Producto creado:', data);

      // Limpiar formulario
      setForm({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: '',
        marca: '',
        categoria: '',
      });
    } catch (error) {
      console.error('Error detallado:', error);
      alert('❌ Ocurrió un error al registrar el producto');
    }
  };

  return (
    <>
    <html>
      <body>

      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Registrar Producto
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              step="0.01"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Imagen */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Imagen (URL)
            </label>
            <input
              type="text"
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Marca */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Marca
            </label>
            <select
              name="marca"
              value={form.marca}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una marca</option>
              {brand.map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Categoría */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Categoría
            </label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Selecciona una categoría</option>
              {category.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
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
    </>
  );
}
