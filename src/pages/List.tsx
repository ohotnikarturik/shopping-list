import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface Product {
  id: string
  productName: string
  category: string
}

const List = () => {
  const [fetchProducts, setFetchProducts] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { listId } = useParams()

  useEffect(() => {
    if (fetchProducts) {
      setIsLoading(true)
      const getProducts = async () => {
        const response = await fetch("http://localhost:7777/products")
        const products = await response.json()
        setProducts(products)
        setIsLoading(false)
      }
      getProducts()
      setFetchProducts(false)
    }
  }, [fetchProducts])

  const renderProducts = () => {
    if (isLoading) return <div>Loading...</div>
    // if (products.length === 0) return <div>Let's plan your shopping!</div>
    return products.map((product) => (
      <div key={product.id}>{product.productName}</div>
    ))
  }

  return (
    <div>
      List:{listId}
      {!products.length ? (
        <span>Let's plan your shopping!</span>
      ) : (
        <span>Select products!</span>
      )}
      {products.length === 0 && (
        <button
          className="bg-slate-400"
          onClick={() => setFetchProducts(true)}
          disabled={isLoading}
        >
          + Add product
        </button>
      )}
      {renderProducts()}
    </div>
  )
}
export default List
