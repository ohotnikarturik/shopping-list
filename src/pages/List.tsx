import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const BASE_URL = "http://localhost:7777"

interface Product {
  id: string
  productName: string
  category: string
  quantity: number
}

const List = () => {
  const [defaultProducts, setDefaultProducts] = useState<Product[]>([])
  const [plannedListProducts, setPlannedListProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { listId } = useParams()
  const updatedProducts = defaultProducts.filter((p) => p.quantity > 0) || []

  const getDefaultProducts = async () => {
    setIsLoading(true)
    const response = await fetch(`${BASE_URL}/products`)
    const data = await response.json()
    const modifiedProduct = data.map((product: Product) => {
      const plannedProduct = plannedListProducts.find(
        (p) => p.id === product.id
      )
      if (plannedProduct) {
        return { ...product, quantity: plannedProduct.quantity }
      } else {
        return product
      }
    })
    setDefaultProducts(modifiedProduct)
    setIsLoading(false)
  }

  const getPlannedProducts = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/lists/${listId}`)
    const data = await response.json()
    setPlannedListProducts(data.products || [])
  }, [listId])

  useEffect(() => {
    getPlannedProducts()
  }, [getPlannedProducts])

  const updatePlannedListProducts = async (listId: string) => {
    setIsLoading(true)
    await fetch(`${BASE_URL}/lists/${listId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: updatedProducts }),
    })
    getPlannedProducts()
    setIsLoading(false)
  }

  // TODO: combine this with the removeProductFromList function
  const addProductToList = (id: string) => {
    setDefaultProducts((prev: Product[]) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    )
  }

  const removeProductFromList = (id: string) => {
    setDefaultProducts((prev: Product[]) =>
      prev.map((product) => {
        return product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      })
    )
  }

  const renderProducts = () => {
    if (isLoading) return <div>Loading...</div>
    return defaultProducts.map((product) => (
      <div key={product.id}>
        <span>{product.productName}</span>
        {product.quantity > 0 && <span>{product.quantity}</span>}
        <button
          className="bg-slate-400"
          onClick={() => addProductToList(product.id)}
        >
          +
        </button>
        {product.quantity > 0 && (
          <button
            className="bg-slate-400"
            onClick={() => removeProductFromList(product.id)}
          >
            -
          </button>
        )}
      </div>
    ))
  }

  return (
    <div>
      List:{listId}
      {/* {!products.length ? (
        <span>Let's plan your shopping!</span>
      ) : (
        <span>Add products to list!</span>
      )} */}
      <div>
        {plannedListProducts.length > 0 && (
          <div>
            <h4>Products in list</h4>
            <ul>
              {plannedListProducts.map(({ id, productName, quantity }) => (
                <li key={id}>
                  <span>{productName}</span>
                  <span>{quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {defaultProducts.length === 0 && (
        <button
          className="bg-slate-400"
          onClick={() => getDefaultProducts()}
          disabled={isLoading}
        >
          + Add product
        </button>
      )}
      {updatedProducts.length > 0 && (
        <button
          className="bg-slate-400"
          onClick={() => {
            if (!listId) return
            updatePlannedListProducts(listId)
          }}
          disabled={isLoading}
        >
          Save shopping list
        </button>
      )}
      {renderProducts()}
    </div>
  )
}
export default List
