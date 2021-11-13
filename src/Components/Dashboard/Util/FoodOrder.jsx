import React from "react";
import "./utilStyle.css";

export default function FoodOrderComponent() {
  return (
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Item No</th>
            <th scope="col">Food Items</th>
            <th scope="col">QTY</th>
            <th scope="col">Unit price</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody className="table-body-fixed-height">
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Larry the Bird</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <div className="row justify-content-end">
        <label className="col-2 text-center">Total</label>
        <label className="col-4 text-center">$20000</label>
      </div>
    </div>
  );
}
