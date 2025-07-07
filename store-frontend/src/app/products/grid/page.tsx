'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
export default function GridProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id: any) => {
    console.log('Editar producto:', id);
    // Redirigir o mostrar modal de edición
  };

  const handleDelete = async (id: any) => {
    console.log('Eliminar producto:', id);
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto permanentemente.',
      icon: 'warning',
      background:'#090435',
      showCancelButton: true,
      confirmButtonColor: '#9b9191',
      cancelButtonColor: '#091138',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    // Confirmar y eliminar producto
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await fetch(`http://localhost:3000/products/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          // Actualizar la lista después de la eliminación
          setProducts(products.filter((product) => product.id !== id));
          Swal.fire(
            'Eliminado',
            'El producto ha sido eliminado correctamente.',
            'success',
          );
        } else {
          Swal.fire(
            'Error',
            `No se pudo eliminar el producto (Error ${response.status}).`,
            'error',
          );
        }
      } catch (error) {
        console.log(error);
        Swal.fire(
          'Error',
          'Ocurrió un error al intentar eliminar el producto.',
          'error',
        );
      }
    } else {
      console.log('Eliminación cancelada');
    }
  };

  return (
    <main>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Nombre</th>
              <th className="px-6 py-4 font-medium text-gray-900">Precio</th>
              <th className="px-6 py-4 font-medium text-gray-900">
                Descripción
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">Imagen</th>
              <th className="px-6 py-4 font-medium text-gray-900 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {products.map((product: any) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">
                  <img
                    src={product.imagen}
                    alt={product.name}
                    className="h-10 w-10 object-cover rounded-full"
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    {/* Eliminar */}
                    <button
                      onClick={() => handleDelete(product.id)}
                      title="Eliminar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M4.772 5.79a48.11 48.11 0 013.478-.397m7.5 0a48.667 48.667 0 00-7.5 0m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916"
                        />
                      </svg>
                    </button>

                    {/* Editar */}
                    <button
                      onClick={() => handleEdit(product.id)}
                      title="Editar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 text-blue-500 hover:text-blue-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
