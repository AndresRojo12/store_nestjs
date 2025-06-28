'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VenProducts() {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const storedToken = localStorage.getItem('accesstoken');
    if (!storedToken) {
      // Redirigir si no hay token
      router.push('/login');
    } else {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  // if (isLoading) return null; // o un loading spinner
  // if (!token) return <p className="text-center text-red-500 mt-10">Acceso denegado. Debes iniciar sesión.</p>;


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

    const formData = new FormData();
    formData.append('name', form.nombre);
    formData.append('description', form.descripcion);
    formData.append('price', form.precio);
    formData.append('stock', form.stock);
    formData.append('brandId', form.marca);
    formData.append('categoryId', form.categoria);

    // 👇 Importante: solo si hay imagen seleccionada
    if (form.imagen) {
      formData.append('file', form.imagen); // 'file' debe coincidir con el nombre usado en el backend
    }

    try {
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ No pongas 'Content-Type': 'multipart/form-data'
          // El navegador lo pondrá automáticamente con los límites correctos
        },
        body: formData,
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
                  Imagen
                </label>
                <input
                  type="file"
                  name="imagen"
                  accept='image/'
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
