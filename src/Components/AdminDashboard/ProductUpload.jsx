import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductUploadStyle.css";

function ProductUpload() {
  const [formData, setFormData] = useState({
    Product_Name: "",
    Product_Category: "",
    Product_Price: "",
    Product_Quantity: "",
    Product_Img: null, // Store the selected file here
    Product_Des: "", // Product Description
  });

  const [errors, setErrors] = useState({
    Product_Name: "",
    Product_Category: "",
    Product_Price: "",
    Product_Quantity: "",
    Product_Img: "",
    Product_Des: "",
  });
  const [showmessage, setShowMessage] = useState("");
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file input separately
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Store the selected file
      });
    } else if (name === "Product_Des") {
      if (value.length <= 30) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear validation error for the field when the user makes a change
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    let formValid = true;
    const newErrors = { ...errors };

    if (!formData.Product_Name) {
      newErrors.Product_Name = "Please enter a product name";
      formValid = false;
    }

    if (!formData.Product_Category) {
      newErrors.Product_Category = "Please select a category";
      formValid = false;
    }

    if (!formData.Product_Price) {
      newErrors.Product_Price = "Please enter a price";
      formValid = false;
    }

    if (!formData.Product_Quantity) {
      newErrors.Product_Quantity = "Please enter a quantity";
      formValid = false;
    }

    if (!formData.Product_Img) {
      newErrors.Product_Img = "Please select an image";
      formValid = false;
    }

    if (formData.Product_Des && formData.Product_Des.length > 30) {
      newErrors.Product_Des =
        "Product description must be 30 characters or less";
      formValid = false;
    }

    if (!formValid) {
      // If there are validation errors, set them and return
      setErrors(newErrors);
      return;
    }

    // Prepare the data to send to the API
    const formDataToSend = new FormData();
    formDataToSend.append("Product_Name", formData.Product_Name);
    formDataToSend.append("Product_Category", formData.Product_Category);
    formDataToSend.append("Product_Price", formData.Product_Price);
    formDataToSend.append("Product_Quantity", formData.Product_Quantity);
    formDataToSend.append("Product_Img", formData.Product_Img);
    formDataToSend.append("Product_Des", formData.Product_Des);
    formDataToSend.append("Product_Discount", 0);

    try {
      // Make the API request
      const apiEndpoint = "newProductUpload";
      const apiUrl = process.env.REACT_APP_API_BASE_URL + apiEndpoint;

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setShowMessage("This Product Uploaded SuccessFully !");
        // API request successful
      } else {
        if (response.status == "400") {
          setShowMessage("This Product already Uploaded with this category!");
        }
        setErrors("Error uploading the product.");
      }
    } catch (error) {
      console.log("error1111", error);
      setErrors("Error uploading the product.");
    }
  };

  return (
    <>
      <section className="product_upload_main_block">
        <div className="form_main_block">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              fontSize: "20px",
            }}
          >
            <Link to="/product" style={{ textAlign: "right" }}>
              Go to Product
            </Link>
          </div>

          <h1>Product Upload</h1>
          <h2 style={{ color: "green" }}>{showmessage}</h2>
          <div className="form_block">
            <form onSubmit={handleSubmit}>
              <div className="all_input_feild_main_block">
                <div className="input_main_block">
                  <label htmlFor="Product_Name">Product Name</label>
                  <input
                    type="text"
                    id="Product_Name"
                    name="Product_Name"
                    onChange={handleInputChange}
                  />
                  <div className="error">{errors.Product_Name}</div>
                </div>
                <div className="input_main_block">
                  <label htmlFor="Product_Price">Product Price</label>
                  <input
                    type="number"
                    id="Product_Price"
                    name="Product_Price"
                    onChange={handleInputChange}
                  />
                  <div className="error">{errors.Product_Price}</div>
                </div>
                <div className="input_main_block">
                  <label htmlFor="Product_Quantity">Product Quantity</label>
                  <input
                    type="number"
                    id="Product_Quantity"
                    name="Product_Quantity"
                    onChange={handleInputChange}
                  />
                  <div className="error">{errors.Product_Quantity}</div>
                </div>

                <div className="input_main_block">
                  <label htmlFor="Product_Category">Product Category</label>
                  <select
                    id="Product_Category"
                    name="Product_Category"
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      Choose Category
                    </option>
                    <option value="COMPUTER">COMPUTER</option>
                    <option value="FRUITS">FRUITS</option>
                    <option value="CLOTHING">CLOTHING</option>
                    <option value="SERVICES">SERVICES</option>
                    <option value="BURGER">BURGER</option>
                    <option value="PIZZA">PIZZA</option>
                  </select>
                  <div className="error">{errors.Product_Category}</div>
                </div>
                <div className="input_image_main_block">
                  <label htmlFor="Product_Img">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="Product_Img"
                    name="Product_Img"
                    onChange={handleInputChange}
                  />
                  <div className="error">{errors.Product_Img}</div>
                </div>

                <div className="input_main_block">
                  <label htmlFor="Product_Des">Product Description</label>
                  <textarea
                    id="Product_Des"
                    name="Product_Des"
                    cols="35"
                    rows="4"
                    onChange={handleInputChange}
                  ></textarea>
                  <div className="error">{errors.Product_Des}</div>
                </div>
              </div>
              <div className="submit_btn">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductUpload;
