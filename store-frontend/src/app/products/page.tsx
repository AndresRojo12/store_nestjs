'use client';

import { useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  Disclosure,
  DisclosureButton,
  // DisclosurePanel,
  // Menu,
  // MenuButton,
  // MenuItem,
  // MenuItems,
} from '@headlessui/react';
import {
  Bars3Icon,
  //BellIcon,
  XMarkIcon,
  //ShoppingCartIcon,
  // MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GridProducts from './grid/page';

export default function VenProducts() {
  const router = useRouter();
  const [showTable, setShowTable] = useState(false);
  //const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

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
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowTable(false); // Cierra la tabla si se hace clic fuera
      }
    }

    if (showTable) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTable]);

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

  useEffect(() => {
    const hasSomeValue = Object.values(form).some((val) => val !== '');
    const allFilled = Object.values(form).every((val) => val !== '');
    setIsFormDirty(hasSomeValue);
    setIsFormValid(allFilled);
  }, [form]);

  // const handleClick = () => {
  //   alert('Hiciste clic');
  // };

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

  // Activar botón de cancelar

  const handleCancel = () => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: '¿Desea cancelar?',
    text: 'Se perderán los datos ingresados.',
    icon: 'warning',
    iconColor:'gray',
    color:'gray',
    background:'#0e072e',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      setForm({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: '',
        marca: '',
        categoria: '',
      });
    }
  });
};

  return (
    <html>
      <body>
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="/store.png"
                    className="h-20 w-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
        <div className="relative">
          {!showTable && (
            <div className="flex justify-end p-6">
              <button
                onClick={() => setShowTable(true)}
                className="text-blue-600 text-sm font-medium px-4 py-2 bg-white rounded shadow"
              >
                Gestionar
              </button>
            </div>
          )}

          {showTable && (
            <div ref={modalRef} className="px-6">
              <div className="flex justify-end p-6">
                <button
                  ref={buttonRef}
                  onClick={() => setShowTable(false)}
                  className="text-blue-600 text-sm font-medium px-4 py-2 bg-white rounded shadow"
                >
                  Ocultar
                </button>
              </div>
              <h3 className="mt-12 mb-4 text-lg font-bold text-center">
                Productos
              </h3>
              <GridProducts />
            </div>
          )}
        </div>
        {!showTable && (
          <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Registrar Producto
            </h2>

            {/* Tu formulario aquí */}
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
                  accept="image/"
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
                  onClick={handleCancel}
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    isFormDirty
                      ? 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!isFormDirty}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md ${
                    isFormValid
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-300 text-white cursor-not-allowed'
                  }`}
                  disabled={!isFormValid}
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        )}
      </body>
    </html>
  );
}
