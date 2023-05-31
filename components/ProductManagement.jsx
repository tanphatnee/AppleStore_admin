import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editableProductId, setEditableProductId] = useState(null);
  const [editableProductPrice, setEditableProductPrice] = useState("");
  const [editableProductData, setEditableProductData] = useState({});

  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 5;
  const pagesVisited = pageNumber * productsPerPage;

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  const handleUpdate = (productId, productPrice) => {
    const productData = products.find((product) => product.id === productId);
    setEditableProductId(productId);
    setEditableProductPrice(productPrice);
    setEditableProductData(productData);
  };

  const handleSave = (productId, updatedProductPrice) => {
    // Cập nhật danh sách sản phẩm với giá trị mới
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, price: updatedProductPrice };
      }
      return product;
    });

    // Gọi API để cập nhật sản phẩm
    fetch(`http://localhost:8000/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: updatedProductPrice }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(updatedProducts);
        setEditableProductId(null);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (productId) => {
    // Xử lý xóa sản phẩm với productId
    // Cập nhật danh sách sản phẩm bằng cách loại bỏ sản phẩm có productId khỏi danh sách
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    // Gọi API để xóa sản phẩm
    fetch(`http://localhost:8000/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(updatedProducts);
      })
      .catch((error) => console.log(error));
  };

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <table border={1} width={"100%"}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products
            .slice(pagesVisited, pagesVisited + productsPerPage)
            .map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.imgUrl}
                    alt={product.productName}
                    width="100"
                    height="100"
                  />
                </td>
                <td>{product.productName}</td>
                <td>
                  {editableProductId === product.id ? (
                    <input
                      type="text"
                      value={editableProductPrice}
                      onChange={(e) => setEditableProductPrice(e.target.value)}
                    />
                  ) : (
                    `${product.price}$`
                  )}
                </td>
                <td>
                  {editableProductId === product.id ? (
                    <button
                      onClick={() =>
                        handleSave(product.id, editableProductPrice)
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleUpdate(product.id, product.price)
                      }
                    >
                      Update
                    </button>
                  )}
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default ProductManagement;
