import { FC } from "react";
import "./FormListing.css";

import { TManagedForm } from "../../types/globals";

interface IFormListingProps {
  data: TManagedForm[];
}

export const FormListing: FC<IFormListingProps> = (props) => {
  return (
      <div className="form-listing-container">
        <h2>Your forms</h2>
        <div className="top-level-actions">
          {props.data?.length ? <input
            type="text"
            placeholder="Search"
            name="search"
            onChange={() => { }}
            value=""
          />: null}
          <button className="primary">
            Create a form
          </button>
        </div>

        <table className="form-listing">
          <thead>
            <th>Name</th>
            <th>Created</th>
            <th>Description</th>
            <th>Stats</th>
            <th>Actions</th>
          </thead>

          {props.data.map((managedForm: TManagedForm) => (
            <tr>
              <td>{managedForm.name}</td>
              <td>{managedForm.createdAt}</td>
              <td>{managedForm.description}</td>
              <td>{`Fields: ${managedForm.stats.fieldCount} Usages: ${managedForm.stats.usageCount}`}</td>
              <td>
                <div className="actions">
                  <button className="primary compact">Preview</button>
                  <button className="primary compact">Edit</button>
                  <button className="secondary compact">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </table>
        <div className="pagination">1</div>
      </div>
  );
};
