'use client';
//import { log } from 'console';
import { useState, useEffect } from 'react';

export default function UpdatedProduct({ producto, onClose, onUpdated }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState<File | string>('');
  const [imagenPreview, setImagenPreview] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/brand')
      .then((res) => res.json())
      .then((data) => setMarcas(Array.isArray(data) ? data : []));
    fetch('http://localhost:3000/categories')
      .then((res) => res.json())
      .then((data) => setCategorias(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    if (producto) {
      setName(producto.name || '');
      setPrice(producto.price || '');
      setDescription(producto.description || '');
      setStock(producto.stock || '');
      setImagen(producto.imagen || '');
      setImagenPreview(producto.imagen || '');
      setMarca(producto.brand?.id || '');
      setCategoria(producto.categories?.[0]?.id || '');
    }
  }, [producto]);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accesstoken');
    console.log('Token:', token);

    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('brandId', marca);
    formData.append('categoryId', categoria);
        if (imagen !== null && typeof imagen === 'object' && 'name' in imagen) {
      formData.append('file', imagen);
    }

    console.log([...formData]);

    const response = await fetch(
      `http://localhost:3000/products/${producto.id}`,
      {
        method: 'PUT',
        headers: {
          //'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (response.ok) {
      alert('Producto actualizado correctamente');
      if (onUpdated) {
        await onUpdated(); // Llama a la función onUpdated
      }
      onClose(); // Cierra el formulario
    } else {
      const errorText = await response.text();
      console.error('Error al actualizar:', errorText);
      alert('Error al actualizar el producto');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div style={{ height: '600px', overflowY: 'scroll'}} className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">
              Nombre
            </label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // Ref to scroll to this input when
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">
              Precio
            </label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded text-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}

              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">
              Descripción
            </label>
            <textarea
              className="w-full border px-3 py-2 rounded text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Stock</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded text-black"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Imagen
            </label>
            {imagenPreview && (
              <img
                src={imagenPreview}
                alt="Previsualización"
                className="mb-2 w-32 h-32 object-cover rounded"
              />
            )}
            <input
              type="file"
              name="imagen"
              accept="image/*"
              //value={imagen}
              onChange={handleImagenChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Marca</label>
            <select
              className="w-full border px-3 py-2 rounded text-black"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
            >
              <option value="">Selecciona una marca</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">
              Categoria
            </label>
            <select
              className="w-full border px-3 py-2 rounded text-black"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}

              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
