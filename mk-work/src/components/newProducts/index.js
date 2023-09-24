import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./style.css";
import rectangle from "../../assets/Rectangle.png"
import person from "../../assets/person.png"
import footer from "../../assets/footer.png"

export default function NewProducts() {
    const [productCategories, setProductCategories] = useState([]);
    const [selectedProductCategories, setSelectedProductCategories] = useState("");
    const [product, setProduct] = useState([]);
    const [productsToShow, setProductToShow] = useState([]);
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [message, setMessage] = useState("")
    const [messageError, setMessageError] = useState("")
    const getCategoryList = () => {
        axios.get("https://fakestoreapi.com/products/categories").then((res) => {
            setProductCategories(["All", ...res?.data])
        }).catch((err) => console.log(err, "error in getting product categories"))
    };

    const getCategoryListForProduct = () => {
        axios.get("https://fakestoreapi.com/products").then((res) => {
            setProduct(res?.data)
            setProductToShow(res?.data)
        }).catch((err) => console.log(err, "error in getting product categories"))
    };
    useEffect(() => {
        getCategoryList()
        getCategoryListForProduct()
        setSelectedProductCategories("All")
    }, [])
    const handleClickCategory = (type) => {
        setSelectedProductCategories(type)
        const tempProducts = [...product]
        const filteredProducts = tempProducts?.filter(val => val?.category === type)

        setProductToShow(filteredProducts?.length ? filteredProducts : product);
    }
    return (
        <>
            <div>

                <div className='back-ground-orange-header' alt="" />
                <label className='fresh'>Fresh</label>
                <label className='fresh1'>2022</label>
                <label className='fresh2'>Look</label>
                <img className='back-ground-header' src={rectangle} alt="" />
                <img className='person' src={person} alt="" />
            </div>
            <h1 className='w-100 d-flex justify-content-start'>
                NewProducts
            </h1>
            <div className='d-flex '>
                <div className='category    '>

                    {productCategories?.map(val => (
                        <div className={selectedProductCategories !== val ? 'category-item' : 'category-item-selected'} onClick={() => handleClickCategory(val)}>{val}</div>
                    ))}
                </div>
                <div className='products'>
                    {productsToShow?.map(val => (
                        <div className='m-4'>
                            <img src={val?.image} alt="" width={300} height={300} />
                            <h6 className='product-title'>{val?.title}</h6>
                            <p className='d-flex justify-content-start product-description'>
                                {val?.description}
                            </p>
                            <label>$ {val?.price}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <img className='footer' src={footer} alt="footer" />
                <label className='footertext1'>Newslleter</label>
                <label className='footertext2'>
                    Get news about articles and updates in your inbox.</label>
                <label className='footertext3'>GET
                    IN TOUCH</label>

            </div>
            <div>
                <label className='form1' >Name</label>
                <input className='input1' value={name} onChange={(e) => {
                    if (isNaN(e.target.value)) {
                        setName(e.target.value)
                        setNameError("")
                    }
                    else {
                        setNameError("Enter valid name")
                    }
                }}></input>
                <label className='error1'>{nameError}</label>
                <label className='form2'>Email</label>
                <input className='input2' value={email} onChange={(e) => {
                  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                    console.log(emailPattern.test(e.target.value), "kshfsgdfhsdgghf")
                    // if (emailPattern.test(e.target.value)) {
                    //     setEmail(e.target.value)
                    //     setEmailError("")
                    // }
                    // else {
                    //     setEmailError("Enter valid email")
                    // }
                }}></input>
                <label className='error2'>{emailError}</label>

                <label className='form3'>Message</label>
                <input className='input3' value={message} onChange={(e) => {
                    if (isNaN(e.target.value)) {
                        setMessage(e.target.value)
                        setMessageError("")

                    }
                    else {
                        setMessageError("Enter valid message")
                    }
                }}></input>
                <label className='error3'>{messageError}</label>

            </div>
        </>
    )
}
