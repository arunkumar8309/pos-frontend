import React, { useState ,useEffect } from 'react';
import "./ProductStyle.css";
import ProductAddCard from "./ProductAddCard";
import ProductCard from "./ProductCard";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Index() {
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [goadmin, setGoadmin] = useState(false);

    const updateData = (newData) => {
        setData(newData);
    };


    useEffect(() => {
        const token_value = localStorage.getItem("token");
        if (token_value) {
            var decoded = jwt_decode(token_value);
            if (decoded.role == "Admin") {
                setGoadmin(true)
            }

        }

    }, []);

    const GoToAdmin = () => {
        navigate("/product/upload");
    }
    return (
        <>
            <section className="product_selected_product_main_block">
                <div className="product_selected_product_sub_main_block">
                    {
                        goadmin && (
                            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", backgroundColor: "rgb(218 226 233 / 24%)" }}>
                                <button style={{ textAlign: "right", padding: "10px", border: "none", fontSize: "17px", cursor: "pointer" }} onClick={() => GoToAdmin()}>Go to product Upload</button>
                            </div>
                        )
                    }
                    {/* <div style={{width:"100%",display:"flex",justifyContent:"flex-end",backgroundColor:"rgb(218 226 233 / 24%)"}}>
            <button style={{textAlign:"right",padding:"10px",border:"none",fontSize:"17px",cursor:"pointer"}} onClick={() => GoToAdmin()}>Go to product Upload</button>
            </div> */}
                    <div className="product_selected_product_sub_block">
                        {/* selected product */}
                        {/* <ProductAddCard /> */}
                        <ProductAddCard data={data} />

                        {/* product card block */}
                        {/* <ProductCard /> */}
                        <ProductCard updateData={updateData} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Index