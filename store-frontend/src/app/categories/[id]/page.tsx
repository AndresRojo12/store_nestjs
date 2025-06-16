// app/categories/[id]/page.tsx
import React from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TabGroup,
  TabList,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';


interface Params {
  params: {
    id: string;
  };
}
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const styles = {
  select: {
    backgroundColor: '#1F2937',
    color: 'white',
    padding: '10px 20px',
    margin: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display:'flex',
    aling:'center'
  },
};

export default async function CategoryPage({ params }: Params) {
  const res = await fetch(`http://localhost:3000/categories/${params.id}`);
  const category = await res.json();
  const dataProduct = await fetch('http://localhost:3000/products');
  const productss = await dataProduct.json();

  const data = await fetch('http://localhost:3000/categories/');
  const posts = await data.json();

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
                  <a href='/'
                  >
                  <img
                    alt="Your Company"
                    src="/store.png"
                    className="h-20 w-20"
                  />
                  </a>
                </div>
                <Menu as="div" className="relative ml-8 block p-2 font-medium text-white-900">
                  <div>
                    <MenuButton className=" block p-4 font-medium text-white-900 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      Categorias
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {posts.map((cate:any)=> (

                    <MenuItem

                      key={cate.id}
                    >
                      <a
                        href={`/categories/${cate.id}`}

                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >{cate.name}

                      </a>
                    </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
              <div className="relative w-1/2">
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-indigo-500"
                  placeholder="Search..."
                />
                <a
                  href="#"
                  className="absolute top-2 right-2 p-2 text-black-400 hover:text-gray-500"
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5" />
                </a>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flow-root">
                  <a href="../login" className="block p-2 font-medium text-white-900">
                    Sign in
                  </a>
                </div>
                <div className="flow-root">
                  <a href="../register" className="block p-2 font-medium text-white-900">
                    Create account
                  </a>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    type="button"
                  >
                    <ShoppingCartIcon
                      aria-hidden="true"
                      className="size-6"
                    ></ShoppingCartIcon>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {posts.map((item: any) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
        <div>
          <h1 style={styles.select} className="bg-black">{category.name}</h1>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {category.products.map((product: any) => (
              <div
                key={product.id}
                className="border p-2 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={product.imagen}
                  alt={product.name}
                  className={classNames(
                    product.current
                      ? 'bg-gray-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  />
                <h2 className="">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.name}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-600">stock: {product.stock}</p>
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
