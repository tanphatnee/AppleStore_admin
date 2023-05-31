import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

const AddProduct = () => {
  const [newProductData, setNewProductData] = useState({
    id: null,
    productName: "",
    imgUrl: "",
    imgFile: null,
    category: "",
    price: "",
    shortDesc: "",
    description: "",
  });

  const [imageUrls, setImageUrls] = useState([]);

  const handleNewProductInputChange = (e) => {
    if (e.target.name === "imgFile") {
      setNewProductData((prevData) => ({
        ...prevData,
        imgFile: e.target.files[0],
      }));
    } else {
      setNewProductData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const uploadFile = () => {
    if (newProductData.imgFile == null) return;

    const imageRef = ref(storage, `images/${newProductData.imgFile.name}`);

    uploadBytes(imageRef, newProductData.imgFile)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setNewProductData((prevData) => ({
              ...prevData,
              imgUrl: url,
            }));
            setImageUrls((prev) => [...prev, url]);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const imagesListRef = ref(storage, "images/");
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const handleAddProduct = () => {
    uploadFile();
    // Gửi yêu cầu POST để thêm sản phẩm mới
    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // In ra dữ liệu trả về từ API
        // Reset dữ liệu sản phẩm mới
        setNewProductData({
          id: null,
          productName: "",
          imgUrl: "",
          category: "",
          price: "",
          shortDesc: "",
          description: "",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="add-product-container">
      <h2>Thêm  mới sản phẩm</h2>
      <div>
        <label>Tên sản phẩm:</label>
        <input
          type="text"
          name="productName"
          value={newProductData.productName}
          onChange={handleNewProductInputChange}
        />
      </div>
      <div>
        <label>Ảnh sản phẩm:</label>
              <input
                  
          type="file"
          name="imgFile"
          onChange={handleNewProductInputChange}
        />
        {newProductData.imgUrl && (
          <img src={newProductData.imgUrl} alt="Product"  />
        )}
      </div>
      <div>
        <label>Loại:</label>
        <input
          type="text"
          name="category"
          value={newProductData.category}
          onChange={handleNewProductInputChange}
        />
      </div>
      <div>
        <label>Giá tiền:</label>
        <input
          type="text"
          name="price"
          value={newProductData.price}
          onChange={handleNewProductInputChange}
        />
      </div>
      <div>
        <label>Mô tả ngắn</label>
        <textarea
          name="shortDesc"
          value={newProductData.shortDesc}
          onChange={handleNewProductInputChange}
        />
      </div>
      <div>
        <label>Miêu tả Sp:</label>
        <textarea
          name="description"
          value={newProductData.description}
          onChange={handleNewProductInputChange}
        />
      </div>
      <button onClick={handleAddProduct}>Thêm mới SP</button>
    </div>
  );
};

export default AddProduct;
