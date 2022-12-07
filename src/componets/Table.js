import React, { useState, useEffect } from "react";

const BasicTable = () => {
  const [columns, setColumns] = useState();
  const [arr, setarr] = useState();

  // we fetch the data to fill the table from an API when the component loads
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(json => setColumns(json.products))
  }, [])

  // function to show the expanded row
  function show(id) {
    setarr(id)
  }

  return (
    <>
      {!columns && <h1 style={{ textAlign: 'center', marginTop: '3rem' }}><b>Loading....</b></h1>}
      {/* table loads only when columns is not undefined */}
      {columns && <div>
        <h1 style={{ textAlign: 'center', marginTop: '5rem' }}>List of items</h1>

        <table border={1} style={{ margin: 'auto', marginTop: '1rem', width: '80%' }}>
          <thead>
            <tr style={{ backgroundColor: '#43a2e8' }}>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {/* using map function, columns data is obtained and onclick event is added to each row */}
            {columns && columns.map((col) => (
              <>
                <tr key={col.id} onClick={() => show(col.id)} style={{ backgroundColor: '#eeeeee', height: '50px', border: 'none', cursor: 'pointer' }}>
                  <td>{col.title}</td>
                  <td>{col.brand}</td>
                  <td>{col.category}</td>
                  <td style={{ width: '150px', zIndex: '10' }}>Rs. {col.price}</td>
                </tr>
                {/* this portion shows the expanded part of the row and is visible only when the corresponding row is clicked */}
                {arr === col.id && <div style={{ textAlign: 'center' }}>
                  <div style={{ margin: '1rem' }}><b>Description:</b> {col.description}</div>
                  <div style={{ margin: '1rem' }}><b>Discounted Percentage:</b> {col.discountPercentage}</div>
                  <img style={{ margin: '1rem' }} src={col.thumbnail} alt="" />
                  <button onClick={() => setarr()} style={{ margin: '1rem', backgroundColor: 'yellow', padding: '1rem', cursor: 'pointer', border: 'none' }}><b>Close</b></button>
                </div>}
              </>
            ))}
          </tbody>

        </table>
      </div>}
    </>
  );
};

export default BasicTable;
