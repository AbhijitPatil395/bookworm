import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../PubPro.css';
import axios from "axios";
import Navigationbar from './Navigationbar';

export function AddProduct2() {
  let userid = sessionStorage.getItem("UserId")
  const [product, setProduct] = useState({ productPublisher: userid });
  const [imgfile, setImgFile] = useState();
  const [imgName, setImgFileName] = useState();
  const [pdffile, setPdfFile] = useState();
  const [pdfName, setPdfFileName] = useState();
  const [lang, setLang] = useState([]);
  const [genere, setGenere] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/language/get")
      .then(res => res.json())
      .then((result) => { setLang(result) });
    fetch("http://localhost:8080/genere/get")
      .then(res => res.json())
      .then((result) => { setGenere(result) });
  }, [])
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProduct(values => ({ ...values, [name]: value }))
    if (event.target.name == "isRentable") {
      if (event.target.checked)
        setProduct(values => ({ ...values, [name]: true }))
      else
        setProduct(values => ({ ...values, [name]: false }))
    }
    console.log(product)
  }
  const imgHandler = (event) => {
    console.log("inside img handler")
    setImgFile(event.target.files[0])
    setImgFileName(event.target.files[0].name)
    setProduct({ ...product, productImage: event.target.files[0].name });

  }
  const fileHandler = (event) => {
    console.log("inside file handler")
    setPdfFile(event.target.files[0])
    setPdfFileName(event.target.files[0].name)
    setProduct({ ...product, productPdf: event.target.files[0].name });

  }


  const handleSubmit = event => {

    alert("on submit signup " + product.productName);

    console.log(imgfile);
    const fd = new FormData();
    fd.append('file', imgfile, imgName);
    fd.append('file', pdffile, pdfName);

    //console.log('inside submit handler');
    console.log(fd);
    const urlImage = 'http://localhost:8080/upload'
    axios.post(urlImage, fd).then(res => console.log(res))


    const url = 'http://localhost:8080/crud/addProduct'
    const requestOptions =
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    console.log(product);
    alert("To see");
    fetch(url, requestOptions)
      .then(response => console.log('Submitted successfully'))
      .catch(error => console.log('Form submit error: ', error))
    navigate("/AddProduct")
    console.log(product);

    alert("Product Added Successfully.")

  };

  return (<><Navigationbar />

    <div class="signup-form2">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <legend>ADD PRODUCT DETAILS</legend><br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT NAME</label>  </div>
          <div className="col">
            <input id="product_name" onChange={handleChange} name="productName" placeholder="PRODUCT NAME" className="form-control input-md" required="" type="text" />


          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT ENGLISH NAME</label>  </div>
          <div className="col">
            <input id="english" onChange={handleChange} name="productEnglishName" placeholder="PRODUCT ENGLISH NAME" className="form-control input-md" required="" type="text" />

          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT TYPE</label></div>
          <div className="col">
            <select id="productType" onChange={handleChange} name="productType" className="form-control">
              <option>Select Product type</option>
              <option id='1' value={1}>E-Book</option>
              <option id='2' value={2}>Audio-Book</option>
            </select>
          </div>
        </div>


        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT BASE PRICE</label>  </div>
          <div className="col">
            <input id="gyg" onChange={handleChange} name="productBaseprice" placeholder="PRODUCT BASE PRICE" className="form-control input-md" required="" type="text" />

          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT SELLING PRICE</label> </div>
          <div className="col">
            <input id="oioi" onChange={handleChange} name="productSpCost" placeholder="PRODUCT SP" className="form-control input-md" required="" type="text" />
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label">PRODUCT OFFER PRICE</label>  </div>
          <div className="col">
            <input id="product_offerprice" onChange={handleChange} name="productOfferprice" placeholder="PRODUCT Offer Price" className="form-control input-md" required="" type="text" />
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT OFFER EXPIRY</label>  </div>
          <div className="col">
            <input id="product_offerprice_expiry" onChange={handleChange} name="productOfferpriceExpirydate" className="form-control input-md" required="" type="date" />
          </div>
        </div>

        {/* <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label">PRODUCT DESCRIPTION SHORT</label></div>
          <div className="col">
            <textarea className="form-control" onChange={handleChange} id="productDescShort" name="productDescShort"></textarea>
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT DESCRIPTION LONG</label></div>
          <div className="col">
            <textarea className="form-control" onChange={handleChange} id="productDescLong" name="productDescLong"></textarea>
          </div>
        </div> */}


        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT ISBN</label>  </div>
          <div className="col">
            <input id="product_isbn" onChange={handleChange} name="productIsbn" placeholder="PRODUCT ISBN" className="form-control input-md" required="" type="text" />

          </div>
        </div>


        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT AUTHOR ID</label>  </div>
          <div className="col">
            <input id="stock_alert" onChange={handleChange} name="productAuthorId" placeholder="product_author_id" className="form-control input-md" required="" type="text" />

          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT LANGUAGE</label></div>
          <div className="col">
            <select id="product_language" onChange={handleChange} name="productLanguage" className="form-control">
              <option>Select Language</option>
              {console.log(lang)}
              {lang.map(elem => {
                return <option value={elem.langId}>{elem.langDesc}</option>
              })}
            </select>
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT GENRE</label></div>
          <div className="col">
            <select id="product_genre" onChange={handleChange} name="productGenere" className="form-control">
              <option>Select Genere</option>
              {console.log(genere)}
              {genere.map(elem => {
                return <option value={elem.genereId}>{elem.genereDesc}</option>
              })}
            </select>
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >Is Rentable</label></div>
          <div className="col">
            <input id="is_rent" value={true} onChange={handleChange} name="isRentable" className="input-file" type="checkbox" />
            &nbsp;&nbsp;&nbsp;Do you want to make this book available for Rent?
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT PER DAY PRICE if it is Rentable</label>  </div>
          <div className="col">
            <input id="gyg" onChange={handleChange} name="productBasePricePerDay" placeholder="PRODUCT PER DAY PRICE if rentable" className="form-control input-md" required="" type="text" />

          </div>
        </div>



        {/* <input type="radio" name="yes_no" checked>Yes</input>
<input type="radio" name="yes_no">No</input> */}
        {/* <div className="form-group">
  <label className="col-md-4 control-label" for="stock_critical">IS RENTABLE?</label>
  <div className="col-md-4">
    <input id="is_rentable" name="is_rentable" type="radio"className="form-control input-md" required=""> YES</input>
    <input id="is_rentable" name="is_rentable" type="radio" className="form-control input-md" required=""> NO</input>
  </div>
</div> */}

        {/* <div className="form-group">
  <label className="col-md-4 control-label" for="stock_critical">IS LIBRARY?</label>
  <div className="col-md-4">
    <input id="is_library" name="is_library" type="radio"className="form-control input-md" required=""> YES</input>
    <input id="is_library" name="is_library" type="radio" className="form-control input-md" required=""> NO</input>
  </div>
</div> */}

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label">PRODUCT DESCRIPTION SHORT</label></div>
          <div className="col">
            <textarea className="form-control" onChange={handleChange} id="productDescShort" name="productDescShort"></textarea>
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT DESCRIPTION LONG</label></div>
          <div className="col">
            <textarea className="form-control" onChange={handleChange} id="productDescLong" name="productDescLong"></textarea>
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT IMAGE</label></div>
          <div className="col"><i>Size Limit 1MB</i>&nbsp;
            <input id="product_image" onChange={imgHandler} name="productImage" className="input-file" type="file" />
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >PRODUCT FILE</label></div>
          <div className="col"><i>Size Limit 1MB</i>&nbsp;
            <input id="product_file" onChange={fileHandler} name="productPdf" className="input-file" type="file" />
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col">
            <label className="col-md-4 control-label" >SUBMIT NOW</label> </div>
          <div className="col">
            <button id="singlebutton" name="singlebutton" className="btn btn-primary">Submit</button><br /><br />
          </div>
        </div>
      </form>
    </div>
  </>
  )
}
export default AddProduct2;